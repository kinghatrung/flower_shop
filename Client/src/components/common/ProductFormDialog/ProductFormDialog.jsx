import { useForm } from 'react-hook-form'
import { useEffect } from 'react'

import { FormDialog, FormField } from '~/components/common/Form'

function ProductFormDialog({ open, onOpenChange, initialData, onSubmit }) {
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
      title={initialData ? 'Sửa thông tin sản phẩm' : 'Thêm sản phẩm mới'}
      description={
        initialData
          ? 'Cập nhật thông tin sản phẩm'
          : 'Điền thông tin để thêm sản phẩm mới vào hệ thống'
      }
      onSubmit={handleSubmit(onSubmit)}
      submitLabel={initialData ? 'Cập nhập' : 'Thêm mới'}
    >
      <div className='grid grid-cols-2 gap-4'>
        asdads
        {/* <FormField />
        <FormField /> */}
      </div>
      asdasd
      {/* <FormField /> */}
      <div className='grid grid-cols-2 gap-4'>
        adasd
        {/* <FormField />
        <FormField /> */}
      </div>
    </FormDialog>
  )
}

export default ProductFormDialog
