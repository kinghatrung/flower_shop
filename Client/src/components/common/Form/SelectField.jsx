import { Controller } from 'react-hook-form'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '~/components/ui/select'
import { Label } from '~/components/ui/label'

function SelectField({
  id,
  label,
  control,
  placeholder = 'Chọn một mục',
  options = [],
  errors,
  required
}) {
  return (
    <div className='space-y-2'>
      <Label htmlFor={id}>
        {label} {required && <span className='text-destructive'>*</span>}
      </Label>
      <Controller
        name={id}
        control={control}
        rules={{
          required: required ? `${label} là bắt buộc` : false
        }}
        render={({ field }) => (
          <Select onValueChange={field.onChange} value={field.value || ''}>
            <SelectTrigger id={id} className='w-full cursor-pointer'>
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value} className='cursor-pointer'>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />

      {errors?.[id] && <p className='text-sm text-destructive'>{errors[id].message}</p>}
    </div>
  )
}

export default SelectField
