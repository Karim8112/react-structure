import { Delete, Edit, Plus } from 'lucide-react'
import { useNavigate } from 'react-router'
import MainDialog, { DialogOptions } from './MainDialog'

type NavigateOptions = {
  path: string
  withNavigate?: () => void
}

type ActionButtonBehave = NavigateOptions | DialogOptions

type ActionButtonType = 'add' | 'edit' | 'delete'

type ActionProps = {
  text: string
  type: ActionButtonType
  behave: ActionButtonBehave
}

function getButtonClass(type: ActionButtonType) {
  switch (type) {
    case 'add':
      return {
        className:
          'flex items-center gap-2 rounded-md bg-green-200/70 px-4 py-1 font-medium text-green-800',
        Icon: <Plus size={15} />
      }
    case 'edit':
      return {
        className:
          'flex items-center gap-2 rounded-md bg-blue-200/70 px-4 py-1 font-medium text-blue-800',
        Icon: <Edit size={15} />
      }
    case 'delete':
      return {
        className:
          'flex items-center gap-2 rounded-md bg-red-200/70 px-4 py-1 font-medium text-red-800',
        Icon: <Delete size={15} />
      }
    default:
      return {
        className:
          'flex items-center gap-2 rounded-md bg-green-200/70 px-4 py-1 font-medium text-green-800',
        Icon: <Plus size={15} />
      }
  }
}

const ActionHeader = function ({
  buttons,
  dir
}: {
  buttons: ActionProps[]
  dir: 'start' | 'end'
}) {
  const navigate = useNavigate()

  return (
    <div
      className={`border-black/05 dark:border-white/05 mb-8 flex w-full items-center ${dir == 'start' ? `justify-start` : `justify-end`} rounded-lg border bg-gray-100 px-4 py-2 hover:border-black/15 dark:bg-[#191919] dark:hover:border-white/15`}
    >
      <div className='flex w-fit gap-2'>
        {buttons.map((btn, index) => {
          const buttonClass = getButtonClass(btn.type)
          // navigate
          if ('path' in btn.behave) {
            const navigateAction = btn.behave

            return (
              <button
                key={`${btn.type}-${btn.text}-${index}`}
                type='button'
                onClick={() => {
                  navigateAction.withNavigate?.()
                  navigate(navigateAction.path)
                  return
                }}
                className={buttonClass.className}
              >
                {buttonClass.Icon}
                <span>{btn.text}</span>
              </button>
            )
          }
          // //////////////////////////////////
          // /////////////////////////////////
          // Dialog
          if ('title' in btn.behave) {
            return (
              <>
                <MainDialog
                  btnOptions={{
                    text: btn.text,
                    className: buttonClass.className,
                    Icon: buttonClass.Icon
                  }}
                  dialogOptions={{
                    open: btn.behave.open,
                    setOpen: btn.behave.setOpen,
                    content: btn.behave.content,
                    title: btn.behave.title,
                    Buttons: btn.behave.Buttons
                  }}
                />
              </>
            )
          }
        })}
      </div>
    </div>
  )
}

export default ActionHeader
