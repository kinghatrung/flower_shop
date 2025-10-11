import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '~/components/ui/select'

function FilterSelect({ value, onChange, placeholder = 'Chọn...', options = [], className }) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className={className || 'sm:w-[180px] cursor-pointer'}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((opt) => (
          <SelectItem key={opt.value} className='cursor-pointer' value={opt.value}>
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export default FilterSelect
