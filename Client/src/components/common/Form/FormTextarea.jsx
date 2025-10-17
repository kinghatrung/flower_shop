import { Label } from '~/components/ui/label'
import { Textarea } from '~/components/ui/textarea'

function FormTextarea({
  id,
  label,
  placeholder,
  register,
  errors,
  required,
  validation,
  rows = 4
}) {
  return (
    <div className='space-y-2'>
      <Label htmlFor={id}>
        {label} {required && <span className='text-destructive'>*</span>}
      </Label>
      <Textarea
        id={id}
        placeholder={placeholder}
        rows={rows}
        {...register(id, { required: required ? `${label} là bắt buộc` : false, ...validation })}
      />
      {errors?.[id] && <p className='text-sm text-destructive'>{errors[id].message}</p>}
    </div>
  )
}

export default FormTextarea
