import { useForm } from 'react-hook-form'
import { useEffect } from 'react'

import { FormDialog, FormField, SwitchField } from '~/components/common/Form'

function UserFormDialog({ open, onOpenChange, initialData, onSubmit }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch
  } = useForm({
    defaultValues: initialData || {
      name: '',
      lastname: '',
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
      reset({
        ...initialData,
        password: '',
        password_hash: '',
        rePassword: ''
      })
    }
  }, [initialData, reset])

  return (
    <FormDialog
      open={open}
      onOpenChange={onOpenChange}
      title={initialData ? 'Sửa thông tin người dùng' : 'Thêm người dùng mới'}
      description={
        initialData
          ? 'Cập nhật thông tin người dùng'
          : 'Điền thông tin để thêm người dùng mới vào hệ thống'
      }
      onSubmit={handleSubmit(onSubmit)}
      submitLabel={initialData ? 'Cập nhập' : 'Thêm mới'}
    >
      <div className='grid grid-cols-2 gap-4'>
        <FormField
          id='lastname'
          label='Họ'
          placeholder='Nguyễn'
          required={!initialData}
          register={register}
          errors={errors}
        />
        <FormField
          id='name'
          label='Tên'
          placeholder='Văn A'
          required={!initialData}
          register={register}
          errors={errors}
        />
      </div>
      <FormField
        id='email'
        label='Email'
        type='email'
        placeholder='nguyenvana@gmail.com'
        required={!initialData}
        register={register}
        errors={errors}
        validation={{
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Email không hợp lệ'
          }
        }}
      />
      <FormField
        id='phone'
        label='Phone'
        type='tel'
        required={!initialData}
        placeholder='0123456789'
        register={register}
        errors={errors}
        validation={{
          pattern: {
            value: /^[0-9]{10,11}$/,
            message: 'Số điện thoại phải có 10-11 chữ số'
          }
        }}
      />

      <FormField
        id='password'
        label='Mật khẩu'
        type='password'
        required={!initialData}
        placeholder='Nhập mật khẩu'
        register={register}
        errors={errors}
        validation={{
          minLength: { value: 8, message: 'Mật khẩu tối thiểu 8 ký tự' }
        }}
      />

      <FormField
        id='rePassword'
        label='Nhập lại mật khẩu'
        type='password'
        required={!initialData}
        placeholder='Nhập lại mật khẩu'
        register={register}
        errors={errors}
        validation={{
          validate: (value) => value === password || 'Mật khẩu không khớp'
        }}
      />

      <SwitchField
        id='is_verified'
        label='Xác thực Email'
        description='Đánh dấu email đã được xác thực'
        value={watch('is_verified')}
        onChange={(val) => setValue('is_verified', val)}
      />

      <SwitchField
        id='is_active'
        label='Trạng thái hoạt động'
        description='Cho phép người dùng đăng nhập'
        value={watch('is_active')}
        onChange={(val) => setValue('is_active', val)}
      />
    </FormDialog>
  )
}

export default UserFormDialog
