import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '~/components/ui/dialog'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '~/components/ui/select'
import { Switch } from '~/components/ui/switch'

function UserFormDialog({ open, onOpenChange, onSubmit, title, description, initialData }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue
  } = useForm({
    defaultValues: {
      lastname: '',
      name: '',
      phone: '',
      email: '',
      is_verified: false,
      is_active: true,
      role: 'customer'
    }
  })

  useEffect(() => {
    if (initialData) {
      setValue('lastname', initialData.lastname || '')
      setValue('name', initialData.name || '')
      setValue('phone', initialData.phone || '')
      setValue('email', initialData.email || '')
      setValue('is_verified', initialData.is_verified || false)
      setValue('is_active', initialData.is_active || true)
      setValue('role', initialData.role || 'customer')
    } else {
      reset()
    }
  }, [initialData, open, reset, setValue])

  const onSubmitForm = (data) => {
    onSubmit(data)
    console.log(data)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[500px]'>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmitForm)}>
          <div className='grid gap-4 py-4'>
            {/* Họ & Tên */}
            <div className='grid grid-cols-2 gap-4'>
              <div className='space-y-2'>
                <Label htmlFor='lastname'>
                  Họ <span className='text-destructive'>*</span>
                </Label>
                <Input
                  id='lastname'
                  {...register('lastname', {
                    required: 'Họ không được để trống',
                    validate: (value) => value.trim() !== '' || 'Họ không được để trống'
                  })}
                  placeholder='Nguyễn'
                />
                {errors.lastname && (
                  <p className='text-sm text-destructive'>{errors.lastname.message}</p>
                )}
              </div>

              <div className='space-y-2'>
                <Label htmlFor='name'>
                  Tên <span className='text-destructive'>*</span>
                </Label>
                <Input
                  id='name'
                  {...register('name', {
                    required: 'Tên không được để trống',
                    validate: (value) => value.trim() !== '' || 'Tên không được để trống'
                  })}
                  placeholder='Văn A'
                />
                {errors.name && <p className='text-sm text-destructive'>{errors.name.message}</p>}
              </div>
            </div>

            {/* Email */}
            <div className='space-y-2'>
              <Label htmlFor='email'>
                Email <span className='text-destructive'>*</span>
              </Label>
              <Input
                id='email'
                type='email'
                {...register('email', {
                  required: 'Email không được để trống',
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'Email không hợp lệ'
                  }
                })}
                placeholder='example@email.com'
              />
              {errors.email && <p className='text-sm text-destructive'>{errors.email.message}</p>}
            </div>

            {/* Phone */}
            <div className='space-y-2'>
              <Label htmlFor='phone'>Số điện thoại</Label>
              <Input
                id='phone'
                {...register('phone', {
                  pattern: {
                    value: /^[0-9]{10,11}$/,
                    message: 'Số điện thoại phải có 10-11 chữ số'
                  }
                })}
                placeholder='0123456789'
              />
              {errors.phone && <p className='text-sm text-destructive'>{errors.phone.message}</p>}
            </div>

            {/* Role */}
            <div className='space-y-2'>
              <Label htmlFor='role'>Vai trò</Label>
              <Select
                value={register('role').value}
                onValueChange={(value) => setValue('role', value)}
              >
                <SelectTrigger className='cursor-pointer' id='role'>
                  <SelectValue placeholder='Chọn vai trò' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem className='cursor-pointer' value='Admin'>
                    Admin
                  </SelectItem>
                  <SelectItem className='cursor-pointer' value='customer'>
                    User
                  </SelectItem>
                  <SelectItem className='cursor-pointer' value='Manager'>
                    Manager
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Switches */}
            <div className='flex items-center justify-between space-x-2 rounded-lg border p-4'>
              <div className='space-y-0.5'>
                <Label htmlFor='is_verified' className='cursor-pointer'>
                  Xác thực Email
                </Label>
                <p className='text-sm text-muted-foreground'>Đánh dấu email đã được xác thực</p>
              </div>
              <Switch
                className='cursor-pointer'
                id='is_verified'
                checked={register('is_verified').value}
                onCheckedChange={(checked) => setValue('is_verified', checked)}
              />
            </div>

            <div className='flex items-center justify-between space-x-2 rounded-lg border p-4'>
              <div className='space-y-0.5'>
                <Label htmlFor='is_active' className='cursor-pointer'>
                  Trạng thái hoạt động
                </Label>
                <p className='text-sm text-muted-foreground'>Cho phép người dùng đăng nhập</p>
              </div>
              <Switch
                className='cursor-pointer'
                id='is_active'
                checked={register('is_active').value}
                onCheckedChange={(checked) => setValue('is_active', checked)}
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              className='cursor-pointer'
              type='button'
              variant='outline'
              onClick={() => onOpenChange(false)}
            >
              Hủy
            </Button>
            <Button className='cursor-pointer text-white' type='submit'>
              {initialData ? 'Cập nhật' : 'Thêm mới'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default UserFormDialog
