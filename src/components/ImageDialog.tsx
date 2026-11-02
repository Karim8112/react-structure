import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'

const ImageDialog = function ({
  selectedImage,
  setSelectedImage
}: {
  selectedImage: string | null
  setSelectedImage: React.Dispatch<React.SetStateAction<string | null>>
}) {
  return (
    <AnimatePresence>
      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedImage(null)}
          className='fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md'
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={e => e.stopPropagation()}
            className='relative flex max-h-[90vh] w-full max-w-5xl items-center justify-center overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 shadow-2xl'
          >
            <button
              onClick={() => setSelectedImage(null)}
              className='absolute right-4 top-4 z-10 rounded-full bg-black/60 p-2 text-white transition-colors hover:bg-black'
            >
              <X className='h-5 w-5' />
            </button>

            <img
              src={selectedImage}
              alt='Enlarged project view'
              className='h-full max-h-[85vh] w-full object-contain'
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default ImageDialog
