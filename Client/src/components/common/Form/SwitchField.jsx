import { Switch } from '~/components/ui/switch'
import { Label } from '~/components/ui/label'

function SwitchField({ id, label, description, value, onChange }) {
  return (
    <div className='flex items-center justify-between space-x-2 rounded-lg border p-4'>
      <div className='space-y-0.5'>
        <Label htmlFor={id}>{label}</Label>
        {description && <p className='text-sm text-muted-foreground'>{description}</p>}
      </div>
      <Switch id={id} checked={value} onCheckedChange={onChange} className='cursor-pointer' />
    </div>
  )
}

export default SwitchField
