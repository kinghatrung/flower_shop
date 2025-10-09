import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'

function FormField({
  id,
  label,
  type = 'text',
  placeholder,
  register,
  errors,
  required,
  validation
}) {
  return (
    <div className='space-y-2'>
      <Label htmlFor={id}>
        {label} {required && <span className='text-destructive'>*</span>}
      </Label>
      <Input
        id={id}
        type={type}
        placeholder={placeholder}
        {...register(id, { required: required ? `${label} là bắt buộc` : false, ...validation })}
      />
      {errors?.[id] && <p className='text-sm text-destructive'>{errors[id].message}</p>}
    </div>
  )
}

export default FormField
