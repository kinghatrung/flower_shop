import { Input } from '~/components/ui/input'

function FilterInput({ value, onChange, placeholder = 'Nhập để tìm kiếm...', className }) {
  return (
    <Input
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={className || 'sm:max-w-sm'}
    />
  )
}

export default FilterInput
