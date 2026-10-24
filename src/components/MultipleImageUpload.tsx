import React, { useEffect, useRef, useState } from 'react'

export interface MultiImageUploadFieldProps {
  /** Field name sent in FormData (e.g. 'images') */
  name: string
  /** Label displayed above the grid */
  label: string
  /** Array of existing image URLs or newly selected File objects */
  value?: (File | string)[]
  /** Callback triggered when the array of items changes */
  onChange: (files: (File | string)[]) => void
  /** Maximum number of photos allowed */
  maxFiles?: number
  /** Disable controls during loading/submitting */
  disabled?: boolean
}

interface ImageItem {
  id: string
  source: File | string
  previewUrl: string
  isNew: boolean
}

export const MultiImageUploadField: React.FC<MultiImageUploadFieldProps> = ({
  name,
  label,
  value = [],
  onChange,
  maxFiles = 10,
  disabled = false
}) => {
  const [items, setItems] = useState<ImageItem[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Sync internal items state with form values
  useEffect(() => {
    const formattedItems: ImageItem[] = value.map((item, index) => {
      if (item instanceof File) {
        return {
          id: `file-${index}-${item.name}-${item.lastModified}`,
          source: item,
          previewUrl: URL.createObjectURL(item),
          isNew: true
        }
      } else {
        return {
          id: `url-${index}-${item}`,
          source: item,
          previewUrl: item,
          isNew: false
        }
      }
    })

    setItems(formattedItems)

    // Clean up created object URLs on unmount/re-render
    return () => {
      formattedItems.forEach(item => {
        if (item.isNew && item.previewUrl) {
          URL.revokeObjectURL(item.previewUrl)
        }
      })
    }
  }, [value])

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || [])
    if (selectedFiles.length === 0) return

    // Combine existing items with newly selected files up to maxFiles
    const currentSources = value
    const availableSlots = maxFiles - currentSources.length
    const filesToAdd = selectedFiles.slice(0, availableSlots)

    const updatedSources = [...currentSources, ...filesToAdd]
    onChange(updatedSources)

    // Reset file input value
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleRemove = (indexToRemove: number) => {
    const updatedSources = value.filter((_, index) => index !== indexToRemove)
    onChange(updatedSources)
  }

  const handleUploadBoxClick = () => {
    if (!disabled && items.length < maxFiles && fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  return (
    <div className='flex flex-col gap-3'>
      <div className='flex items-center justify-between'>
        <label className='text-sm font-medium text-slate-700'>{label}</label>
        <span className='font-mono text-xs text-slate-400'>
          ({items.length}/{maxFiles} photos)
        </span>
      </div>

      {/* Hidden Multiple File Input */}
      <input
        type='file'
        ref={fileInputRef}
        name={name}
        multiple
        accept='image/png, image/jpeg, image/jpg, image/webp'
        className='hidden'
        onChange={handleFileSelect}
        disabled={disabled || items.length >= maxFiles}
      />

      {/* Image Grid Container */}
      <div className='flex flex-wrap gap-4 pt-1'>
        {/* Render Preview Cards for each item */}
        {items.map((item, index) => (
          <div
            key={item.id}
            style={{
              width: '160px',
              height: '220px',
              borderRadius: '12px' // Strict 12px border radius
            }}
            className='relative flex select-none flex-col items-center justify-center overflow-hidden border-2 border-slate-200 bg-slate-50 shadow-sm transition-all hover:border-slate-300'
          >
            <img
              src={item.previewUrl}
              alt={`Photo ${index + 1}`}
              style={{ borderRadius: '10px' }}
              className='h-full w-full object-cover p-[2px]'
            />

            {/* Bottom Overlay with Status & Delete Button */}
            <div
              style={{
                borderBottomLeftRadius: '10px',
                borderBottomRightRadius: '10px'
              }}
              className='absolute inset-x-0 bottom-0 flex items-center justify-between bg-slate-900/80 px-2.5 py-1.5 text-xs text-white backdrop-blur-sm'
            >
              <span className='truncate pr-1 text-[11px] text-slate-300'>
                {item.isNew ? 'New file' : 'Saved'}
              </span>

              <button
                type='button'
                onClick={() => handleRemove(index)}
                disabled={disabled}
                className='rounded bg-red-500 px-2 py-0.5 text-[11px] font-medium text-white transition-colors hover:bg-red-600 disabled:opacity-50'
              >
                Remove
              </button>
            </div>
          </div>
        ))}

        {/* Upload Trigger Card (if slots remain) */}
        {items.length < maxFiles && (
          <div
            onClick={handleUploadBoxClick}
            style={{
              width: '160px',
              height: '220px',
              borderRadius: '12px'
            }}
            className={`flex cursor-pointer select-none flex-col items-center justify-center border-2 border-dashed transition-all ${
              disabled
                ? 'cursor-not-allowed border-slate-300 bg-slate-100 opacity-60'
                : 'border-slate-300 bg-slate-50 hover:border-blue-500 hover:bg-slate-100/70'
            }`}
          >
            <div className='flex flex-col items-center p-3 text-center text-slate-500'>
              <div className='mb-2 flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-400 shadow-sm'>
                <svg
                  className='h-5 w-5'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={1.8}
                    d='M12 4v16m8-8H4'
                  />
                </svg>
              </div>
              <p className='text-xs font-semibold text-slate-700'>Add Photos</p>
              <p className='mt-1 text-[10px] text-slate-400'>
                Select multiple
                <br />
                PNG, JPG, WebP
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default MultiImageUploadField
