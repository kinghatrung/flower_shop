import { useState } from 'react'
import { MoreVertical } from 'lucide-react'
import dayjs from 'dayjs'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import numeral from 'numeral'

import { Button } from '~/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '~/components/ui/dropdown-menu'
import HeaderTable from '~/components/common/HeaderTable'
import { getProducts, createProduct, editProduct } from '~/api'
import ProductFormDialog from '~/components/common/ProductFormDialog'
import DataTable from '~/components/common/DataTable'

function ProductsManagement() {
  const queryClient = useQueryClient()

  const [search, setSearch] = useState('')
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)

  const { data, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: () => getProducts()
  })

  const products = data?.data

  const handleEditClick = (product) => {
    setSelectedProduct(product)
    setIsEditDialogOpen(true)
  }

  const handleEditProduct = async (data) => {
    const { name, category_id, description, is_new, is_best_seller, price, original_price } = data
    await editProduct(selectedProduct.id, {
      name,
      category_id,
      description,
      is_new,
      is_best_seller,
      price,
      original_price
    })
    await queryClient.invalidateQueries(['products'])
    setIsEditDialogOpen(!isEditDialogOpen)
    setSelectedProduct(null)
  }

  const handleAddProduct = async (productData) => {
    await createProduct(productData)
    setIsAddDialogOpen(!isAddDialogOpen)
    await queryClient.invalidateQueries(['products'])
  }

  const columns = [
    {
      title: 'ID',
      render: (item, index) => index + 1,
      skeletonClassName: 'h-4 w-8'
    },
    {
      title: 'Ảnh',
      render: (item) => (
        <img
          src={item.image || '/image/Nuvexa.png'}
          className='h-20 min-w-[80px] object-cover rounded-md'
        />
      ),
      skeletonClassName: 'h-20 min-w-[80px]'
    },
    { title: 'Tên', key: 'name' },
    { title: 'Giá hiện tại (VNĐ)', render: (item) => numeral(item.price).format('0,0') + ' đ' },
    {
      title: 'Giá gốc (VNĐ)',
      render: (item) => numeral(item.original_price).format('0,0') + ' đ'
    },
    { title: 'Loại hoa', key: 'category_name' },
    { title: 'Nội dung', key: 'description' },
    { title: 'Xếp hạng', key: 'rating' },
    { title: 'Đánh giá', key: 'reviews' },
    { title: 'Sản phẩm mới', render: (item) => (item.is_new ? 'Mới' : 'Không') },
    { title: 'Sản phẩm bán chạy', render: (item) => (item.is_best_seller ? 'Bán chạy' : 'Không') },
    {
      title: 'Ngày thêm',
      render: (item) => dayjs(item.created_at).format('DD/MM/YYYY HH:mm')
    }
  ]

  const actions = (item) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          size='icon'
          className='size-8 cursor-pointer data-[state=open]:bg-accent/10 hover:scale-110 transition-all duration-300'
        >
          <MoreVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuItem className='cursor-pointer' onClick={() => handleEditClick(item)}>
          Sửa thông tin
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className='text-red-600 cursor-pointer'>Xóa sản phẩm</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )

  return (
    <div className='container mx-auto py-8 space-y-6'>
      {/* Header */}
      <HeaderTable
        title='Quản lý sản phẩm'
        description='Thêm, sửa và quản lý thông tin sản phẩm'
        buttonLabel='Thêm sản phẩm'
        onSomething={setIsAddDialogOpen}
      />

      <div className='space-y-4'>
        <DataTable columns={columns} actions={actions} data={products} isLoading={isLoading} />
      </div>

      <ProductFormDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onSubmit={handleAddProduct}
      />

      <ProductFormDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        onSubmit={handleEditProduct}
        initialData={selectedProduct}
      />
    </div>
  )
}

export default ProductsManagement
