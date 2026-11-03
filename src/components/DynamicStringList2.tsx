import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Plus, Trash2 } from 'lucide-react'
import { FieldValues, Path, PathValue, UseFormReturn } from 'react-hook-form'

// Generic type to extract keys of TFieldValues whose values are string[]
type StringListFieldName<TFieldValues extends FieldValues> = Extract<
  {
    [K in keyof TFieldValues]: TFieldValues[K] extends string[] ? K : never
  }[keyof TFieldValues],
  Path<TFieldValues>
>

interface DynamicStringListProps<TFieldValues extends FieldValues> {
  form: UseFormReturn<TFieldValues>
  name: StringListFieldName<TFieldValues>
  label: string
  placeholder?: string
}

export function DynamicStringList2<TFieldValues extends FieldValues>({
  form,
  name,
  label,
  placeholder = 'Add new...'
}: DynamicStringListProps<TFieldValues>) {
  const values = (form.watch(name) as string[]) || []

  const handleAdd = () => {
    form.setValue(
      name,
      [...values, ''] as PathValue<TFieldValues, typeof name>,
      {
        shouldValidate: true
      }
    )
  }

  const handleRemove = (index: number) => {
    const updated = values.filter((_, i) => i !== index)
    form.setValue(name, updated as PathValue<TFieldValues, typeof name>, {
      shouldValidate: true
    })
  }

  const handleChange = (index: number, value: string) => {
    const updated = [...values]
    updated[index] = value
    form.setValue(name, updated as PathValue<TFieldValues, typeof name>, {
      shouldValidate: true
    })
  }

  return (
    <div className='space-y-2'>
      <div className='flex items-center justify-between'>
        <label className='text-sm font-medium'>{label}</label>
        <Button
          type='button'
          variant='outline'
          size='sm'
          onClick={handleAdd}
          className='flex items-center gap-1 text-xs'
        >
          <Plus className='h-3.5 w-3.5' /> Add
        </Button>
      </div>

      {values.length === 0 && (
        <p className='text-xs italic text-muted-foreground'>
          No {label.toLowerCase()} added yet.
        </p>
      )}

      <div className='space-y-2'>
        {values.map((item, index) => (
          <div key={index} className='flex items-center gap-2'>
            <Input
              value={item}
              placeholder={placeholder}
              onChange={e => handleChange(index, e.target.value)}
            />
            <Button
              type='button'
              variant='ghost'
              size='icon'
              onClick={() => handleRemove(index)}
              className='text-destructive hover:bg-destructive/10'
            >
              <Trash2 className='h-4 w-4' />
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}
