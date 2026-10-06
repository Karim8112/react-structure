import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'

type DialogButtonType = 'ok' | 'cancel' | 'error'
type ButtonOptions = {
  className?: string
  Icon?: JSX.Element
  text: string
}

export type DialogOptions = {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  content: string
  title: string
  Buttons?: {
    btnText: string
    onClick?: () => void
    loading?: boolean
    type: DialogButtonType
  }[]
}

function getDialogButtonClass(type: DialogButtonType) {
  switch (type) {
    case 'ok':
      return {
        className:
          'flex items-center justify-center gap-2 rounded-md font-light dark:hover:bg-green-500 dark:bg-green-700 bg-zinc-800 text-white dark:text-white px-4 py-2 hover:bg-zinc-600 font-medium '
      }
    case 'cancel':
      return {
        className:
          'flex items-center gap-2 rounded-md bg-blue-200/70 px-4 py-2 font-medium text-blue-800'
      }
    case 'error':
      return {
        className:
          'flex items-center  text-white gap-2 rounded-md bg-red-200/70 px-4 py-2 font-medium bg-red-700 hover:bg-red-500'
      }
    default:
      return {
        className:
          'flex items-center gap-2 rounded-md bg-blue-200/70 px-4 py-2 font-medium text-blue-800'
      }
  }
}

const MainDialog = function ({
  btnOptions,
  dialogOptions
}: {
  btnOptions: ButtonOptions
  dialogOptions: DialogOptions
}) {
  return (
    <Dialog open={dialogOptions.open}>
      <DialogTrigger>
        <button
          //   key={`${btn.type}-${btn.text}-${index}`}
          type='button'
          onClick={() => dialogOptions.setOpen(true)}
          className={btnOptions.className ?? ''}
        >
          {btnOptions.Icon ?? ''}
          <span>{btnOptions.text}</span>
        </button>
      </DialogTrigger>
      <DialogContent onBlur={() => dialogOptions.setOpen(false)}>
        <DialogHeader>
          <DialogTitle>{dialogOptions.title}</DialogTitle>
          <DialogDescription>{dialogOptions.content}</DialogDescription>
        </DialogHeader>
        {dialogOptions.Buttons && (
          <DialogFooter className='bg- sm:justify-end'>
            {dialogOptions.Buttons.map(dBtn => {
              const dBtnClass = getDialogButtonClass(dBtn.type)
              return (
                <button
                  disabled={dBtn.loading}
                  key={`${dBtn.type}-${dBtn.btnText}`}
                  type='button'
                  className={dBtnClass.className}
                  onClick={
                    dBtn.onClick
                      ? () => {
                          dBtn.onClick?.()
                        }
                      : () => {
                          dialogOptions.setOpen(false)
                        }
                  }
                >
                  {dBtn.loading ? <>Loading</> : <span>{dBtn.btnText}</span>}
                </button>
              )
            })}
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default MainDialog
