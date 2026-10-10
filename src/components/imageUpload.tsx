import React, { useEffect, useRef, useState } from 'react'

export interface ImageUploadFieldProps {
  /** The field name sent to the API (e.g. 'imageLeft', 'imageRight') */
  name: string
  /** Label displayed above the field */
  label: string
  /** Existing Cloudinary image URL from the database */
  currentImageUrl?: string | null
  /** Current file value or string URL from form state */
  value?: File | string | null
  /** Callback to update form state with the chosen File or null */
  onChange: (file: File | null) => void
  /** Optional disabled state (e.g., while submitting) */
  disabled?: boolean
}

export const ImageUploadField: React.FC<ImageUploadFieldProps> = ({
  name,
  label,
  currentImageUrl,
  value,
  onChange,
  disabled = false
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(
    value instanceof File ? value : null
  )
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Sync internal state if form resets or value changes from parent
  useEffect(() => {
    if (value instanceof File) {
      setSelectedFile(value)
    } else if (!value) {
      setSelectedFile(null)
      setPreviewUrl(null)
    }
  }, [value])

  // Generate an instant object URL preview when a new file is picked
  useEffect(() => {
    if (selectedFile) {
      const objectUrl = URL.createObjectURL(selectedFile)
      setPreviewUrl(objectUrl)
      return () => URL.revokeObjectURL(objectUrl)
    } else {
      setPreviewUrl(null)
    }
  }, [selectedFile])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setSelectedFile(file)
    onChange(file)
  }

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation()
    setSelectedFile(null)
    setPreviewUrl(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
    onChange(null)
  }

  const handleBoxClick = () => {
    if (!disabled && fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  // Precedence: newly selected local file preview > existing Cloudinary database URL
  const displayedImage =
    previewUrl || (typeof value === 'string' && value ? value : currentImageUrl)

  return (
    <div className='flex flex-col gap-2'>
      <div className='flex items-center justify-between'>
        <label className='text-sm font-medium text-slate-700'>{label}</label>
        <span className='font-mono text-xs text-slate-400'>({name})</span>
      </div>

      {/* Hidden file input */}
      <input
        type='file'
        ref={fileInputRef}
        name={name}
        accept='image/png, image/jpeg, image/jpg, image/webp'
        className='hidden'
        onChange={handleFileChange}
        disabled={disabled}
      />

      {/* Vertical Container: Taller than wide (190px x 260px), max 12px border-radius */}
      <div
        onClick={handleBoxClick}
        style={{
          width: '190px',
          height: '260px',
          borderRadius: '12px' // STRICT constraint: maximum 12px, not rounded-full
        }}
        className={`relative flex cursor-pointer select-none flex-col items-center justify-center overflow-hidden border-2 border-dashed transition-all ${
          disabled
            ? 'cursor-not-allowed border-slate-300 bg-slate-100 opacity-60'
            : 'border-slate-300 bg-slate-50 hover:border-blue-500 hover:bg-slate-100/70'
        }`}
      >
        {displayedImage ? (
          <>
            {/* The Image (Covering the vertical area, with 10px radius inside 12px container) */}
            <img
              src={displayedImage}
              alt={label}
              style={{
                borderRadius: '10px'
              }}
              className='h-full w-full object-cover p-[2px]'
            />

            {/* Bottom action banner */}
            <div
              style={{
                borderBottomLeftRadius: '10px',
                borderBottomRightRadius: '10px'
              }}
              className='absolute inset-x-0 bottom-0 flex items-center justify-between bg-slate-900/80 px-2.5 py-1.5 text-xs text-white backdrop-blur-sm'
            >
              <span className='truncate pr-1'>
                {selectedFile ? 'Replace image' : 'Change photo'}
              </span>

              {selectedFile && (
                <button
                  type='button'
                  onClick={handleRemove}
                  className='rounded bg-red-500 px-1.5 py-0.5 text-[11px] font-medium text-white transition-colors hover:bg-red-600'
                >
                  Clear
                </button>
              )}
            </div>
          </>
        ) : (
          /* Empty Placeholder (Portrait layout prompt) */
          <div className='flex flex-col items-center p-4 text-center text-slate-500'>
            <div className='mb-2 flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-400 shadow-sm'>
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
                  d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'
                />
              </svg>
            </div>
            <p className='text-xs font-semibold text-slate-700'>
              Click to Upload
            </p>
            <p className='mt-1 text-[11px] text-slate-400'>
              Vertical Portrait
              <br />
              PNG, JPG up to 5MB
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ImageUploadField
