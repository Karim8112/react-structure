import { motion } from 'framer-motion'
import { Maximize2 } from 'lucide-react'
import { useState } from 'react'
import ImageDialog from './ImageDialog'

const ImagesContainer = function ({
  images,
  cols = 2,
  colorString = 'gray',
  title = 'Images'
}: {
  images: string[]
  cols?: number
  colorString?: string
  title?: string
}) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  return (
    <>
      <div
        className={`rounded-xl border border-${colorString}-500/30 bg-${colorString}-500/5 p-6 backdrop-blur-sm dark:border-${colorString}-500/20 dark:bg-${colorString}-950/10`}
      >
        <div className='mb-4 flex items-center justify-between'>
          <h4
            className={`text-sm font-bold uppercase tracking-wider text-${colorString}-600 dark:text-${colorString}-400`}
          >
            {title}
          </h4>
          <span
            className={`rounded-full border border-${colorString}-500/30 bg-${colorString}-500/10 px-3 py-0.5 font-mono text-xs font-medium text-${colorString}-600 dark:text-${colorString}-400`}
          >
            {images.length} Image(s)
          </span>
        </div>
        <div className={`grid grid-cols-1 gap-3 sm:grid-cols-${cols}`}>
          {images.map((imgUrl, index) => (
            <motion.div
              key={`after-${index}`}
              whileHover={{ scale: 1.03 }}
              className='group relative aspect-video cursor-pointer overflow-hidden rounded-xl border border-gray-200 bg-gray-100 shadow-sm dark:border-zinc-800 dark:bg-zinc-900'
              onClick={() => setSelectedImage(imgUrl)}
            >
              <img
                src={imgUrl}
                alt={`After stage ${index + 1}`}
                className='h-full w-full object-cover transition-transform duration-500 group-hover:scale-105'
              />
              <div className='absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100'>
                <Maximize2 className='h-5 w-5 text-white' />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <ImageDialog
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
      />
    </>
  )
}

export default ImagesContainer
