import { Button } from '@/components/ui/button'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Plus, Trash2 } from 'lucide-react'
import { useFieldArray, UseFormReturn } from 'react-hook-form'
import { TeamFormValues } from '../Model/ITeam'

interface DynamicExperienceListProps {
  form: UseFormReturn<TeamFormValues>
}

export function DynamicExperienceList({ form }: DynamicExperienceListProps) {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'experience'
  })

  const handleAdd = () => {
    append({
      role: '',
      period: '',
      company: '',
      description: ''
    })
  }

  return (
    <div className='space-y-4 border-t pt-4'>
      <div className='flex items-center justify-between'>
        <div>
          <h3 className='text-sm font-semibold'>Work Experience</h3>
          <p className='text-xs text-muted-foreground'>
            Add previous job roles and durations
          </p>
        </div>
        <Button
          type='button'
          variant='outline'
          size='sm'
          onClick={handleAdd}
          className='flex items-center gap-1 text-xs'
        >
          <Plus className='h-3.5 w-3.5' /> Add Experience
        </Button>
      </div>

      {fields.length === 0 && (
        <p className='text-xs italic text-muted-foreground'>
          No work experience added yet.
        </p>
      )}

      <div className='space-y-4'>
        {fields.map((field, index) => (
          <div
            key={field.id}
            className='relative space-y-3 rounded-lg border bg-card p-4 shadow-sm'
          >
            <div className='flex items-center justify-between border-b pb-2'>
              <span className='text-xs font-semibold text-muted-foreground'>
                Experience #{index + 1}
              </span>
              <Button
                type='button'
                variant='ghost'
                size='icon'
                onClick={() => remove(index)}
                className='h-8 w-8 text-destructive hover:bg-destructive/10'
              >
                <Trash2 className='h-4 w-4' />
              </Button>
            </div>

            <div className='grid grid-cols-1 gap-3 md:grid-cols-3'>
              {/* Role */}
              <FormField
                control={form.control}
                name={`experience.${index}.role`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-xs'>Role *</FormLabel>
                    <FormControl>
                      <Input placeholder='e.g. Frontend Engineer' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Company */}
              <FormField
                control={form.control}
                name={`experience.${index}.company`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-xs'>Company *</FormLabel>
                    <FormControl>
                      <Input placeholder='e.g. Acme Corp' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Period */}
              <FormField
                control={form.control}
                name={`experience.${index}.period`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-xs'>Period *</FormLabel>
                    <FormControl>
                      <Input placeholder='e.g. 2022 - Present' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Description */}
            <FormField
              control={form.control}
              name={`experience.${index}.description`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-xs'>Description</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Brief summary of responsibilities'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
