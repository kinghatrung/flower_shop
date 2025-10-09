import { useForm } from 'react-hook-form'
import { useEffect } from 'react'

import FormDialog from '~/components/common/Form/FormDialog'
import FormField from '~/components/common/Form/FormField'

function CategoryFormDialog({ open, onOpenChange, initialData, onSubmit }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    defaultValues: initialData || {
      name: '',
      type: '',
      description: ''
    }
  })

  useEffect(() => {
    if (initialData) {
      reset({
        ...initialData
      })
    }
  }, [initialData, reset])

  return (
    <FormDialog
      open={open}
      onOpenChange={onOpenChange}
      title={initialData ? 'Sửa thông tin danh mục' : 'Thêm danh mục mới'}
      description={
        initialData
          ? 'Cập nhật thông tin danh mục'
          : 'Điền thông tin để thêm danh mục mới vào hệ thống'
      }
      onSubmit={handleSubmit(onSubmit)}
      submitLabel={initialData ? 'Cập nhập' : 'Thêm mới'}
    >
      <FormField
        id='name'
        label='Tên danh mục'
        placeholder='Hoa hồng'
        required
        register={register}
        errors={errors}
      />

      <FormField
        id='type'
        label='Kiểu danh mục'
        placeholder='rose'
        required
        register={register}
        errors={errors}
      />

      <FormField
        id='description'
        label='Mô tả danh mục'
        placeholder='Hoa hồng tượng trưng cho tình yêu và vẻ đẹp.'
        required
        register={register}
        errors={errors}
      />
    </FormDialog>
  )
}

export default CategoryFormDialog
