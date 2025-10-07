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

function UserFormDialog({
  open,
  onOpenChange,
  onSubmit,
  title,
  description,
  initialData,
  isEdit = false,
  isAdd = false
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch
  } = useForm({
    defaultValues: {
      name: '',
      lastName: '',
      phone: '',
      email: '',
      password: '',
      rePassword: '',
      is_verified: false,
      is_active: true
    }
  })

  const password = watch('password')

  useEffect(() => {
    if (initialData) {
      setValue('name', initialData.name || '')
      setValue('lastName', initialData.lastName || '')
      setValue('phone', initialData.phone || '')
      setValue('email', initialData.email || '')
      setValue('password', initialData.password || '')
      setValue('rePassword', initialData.password || '')
      setValue('is_verified', initialData.is_verified || false)
      setValue('is_active', initialData.is_active || true)
    } else {
      reset()
    }
  }, [initialData, open, reset, setValue])

  const onSubmitForm = (data) => {
    onSubmit(data)
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
                <Label htmlFor='lastName'>
                  Họ <span className='text-destructive'>*</span>
                </Label>
                <Input
                  id='lastName'
                  {...register('lastName', {
                    required: !isEdit ? 'Họ không được để trống' : false,
                    validate: !isEdit
                      ? (value) => value.trim() !== '' || 'Họ không được để trống'
                      : undefined
                  })}
                  placeholder='Nguyễn'
                />
                {errors.lastName && (
                  <p className='text-sm text-destructive'>{errors.lastName.message}</p>
                )}
              </div>

              <div className='space-y-2'>
                <Label htmlFor='name'>
                  Tên <span className='text-destructive'>*</span>
                </Label>
                <Input
                  id='name'
                  {...register('name', {
                    required: !isEdit ? 'Tên không được để trống' : false,
                    validate: !isEdit
                      ? (value) => value.trim() !== '' || 'Tên không được để trống'
                      : undefined
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
                  required: !isEdit ? 'Email không được để trống' : false,
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'Email không hợp lệ'
                  }
                })}
                placeholder='example@email.com'
              />
              {errors.email && <p className='text-sm text-destructive'>{errors.email.message}</p>}
            </div>

            {/* Password */}
            <div className='space-y-2'>
              <Label htmlFor='password'>
                Mật khẩu <span className='text-destructive'>*</span>
              </Label>
              <Input
                id='password'
                type='password'
                {...register('password', {
                  required: !isEdit ? 'Mật khẩu không được để trống' : false,
                  minLength: !isEdit
                    ? {
                        value: 8,
                        message: 'Mật khẩu phải có ít nhất 8 ký tự'
                      }
                    : undefined
                })}
                placeholder='Nhập mật khẩu'
              />
              {errors.password && (
                <p className='text-sm text-destructive'>{errors.password.message}</p>
              )}
            </div>

            {/* rePassword */}
            <div className='space-y-2'>
              <Label htmlFor='rePassword'>
                Nhập lại mật khẩu <span className='text-destructive'>*</span>
              </Label>
              <Input
                id='rePassword'
                type='password'
                {...register('rePassword', {
                  required: !isEdit ? 'Vui lòng nhập lại mật khẩu' : false,
                  validate: !isEdit
                    ? (value) => value === password || 'Mật khẩu nhập lại không khớp'
                    : undefined
                })}
                placeholder='Nhập lại mật khẩu'
              />
              {errors.rePassword && (
                <p className='text-sm text-destructive'>{errors.rePassword.message}</p>
              )}
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
            {/* <div className='space-y-2'>
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
            </div> */}

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
