import { useForm } from 'react-hook-form'
import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'

import {
  FormDialog,
  FormField,
  SwitchField,
  SelectField,
  FormImageField
} from '~/components/common/Form'
import { getCategories } from '~/api'

function ProductFormDialog({ open, onOpenChange, initialData, onSubmit }) {
  const { data } = useQuery({
    queryKey: ['categories'],
    queryFn: () => getCategories()
  })

  const categories = data?.data

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
    setValue,
    watch
  } = useForm({
    defaultValues: initialData || {
      name: '',
      category_id: '',
      description: '',
      price: '',
      original_price: '',
      is_new: false,
      images: [],
      is_best_seller: false
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
        <FormField
          id='name'
          label='Tên'
          placeholder='Bó hoa hồng...'
          required={!initialData}
          register={register}
          errors={errors}
        />
        <SelectField
          id='category_id'
          label='Loại hoa'
          placeholder='Chọn loại hoa'
          required
          errors={errors}
          control={control}
          options={categories?.map((category) => ({
            value: String(category.id),
            label: category.name
          }))}
        />
      </div>
      <FormField
        id='description'
        label='Nội dung'
        placeholder='Hoa sim là loài hoa đẹp...'
        required={!initialData}
        register={register}
        errors={errors}
      />
      <div className='grid grid-cols-2 gap-4'>
        <FormField
          id='price'
          label='Giá hiện tại (VNĐ)'
          placeholder='Giá hiện tại'
          required
          register={register}
          errors={errors}
        />

        <FormField
          id='original_price'
          label='Giá gốc (VNĐ)'
          placeholder='Giá gốc'
          register={register}
          errors={errors}
        />
      </div>
      <SwitchField
        id='is_new'
        label='Sản phẩm mới'
        description='Đánh dấu sản phẩm này là sản phẩm mới'
        value={watch('is_new')}
        onChange={(val) => setValue('is_new', val)}
      />
      <SwitchField
        id='is_best_seller'
        label='Sản bán chạy'
        description='Đánh dấu sản phẩm này là sản phẩm bán chạy'
        value={watch('is_best_seller')}
        onChange={(val) => setValue('is_best_seller', val)}
      />

      <FormImageField
        id='images'
        label='Ảnh'
        errors={errors}
        required
        maxImages={4}
        value={watch('images')}
        onImagesChange={(images) =>
          setValue(
            'images',
            images.map((img) => img.url)
          )
        }
      />
    </FormDialog>
  )
}

export default ProductFormDialog
