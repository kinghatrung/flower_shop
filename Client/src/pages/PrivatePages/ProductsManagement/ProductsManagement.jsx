import { useState } from 'react'
import { MoreVertical } from 'lucide-react'
import dayjs from 'dayjs'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import numeral from 'numeral'
import { useNavigate } from 'react-router-dom'

import { Button } from '~/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '~/components/ui/dropdown-menu'
import useQueryParams from '~/hooks/useQueryParams'
import HeaderTable from '~/components/common/HeaderTable'
import { getProducts, createProduct, editProduct, deleteProductById } from '~/api'
import ProductFormDialog from '~/components/common/ProductFormDialog'
import DataTable from '~/components/common/DataTable'
import { FilterContainer, FilterInput, FilterSelect } from '~/components/common/Filters'
import useDebounce from '~/hooks/useDebounce'
import CustomPagination from '~/components/common/CustomPagination'

function ProductsManagement() {
  const [search, setSearch] = useState('')
  const [productStatusFilter, setProductStatusFilter] = useState('all')
  const [productPriceFilter, setProductPriceFilter] = useState('0-10000000')
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)

  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const debouncedSearch = useDebounce(search, 500)
  const queryString = useQueryParams()

  const page = queryString.page || 1
  const limit = 5

  const getPriceRangeParam = (range) => {
    const [minStr, maxStr] = range.split('-')
    const min = Number(minStr)
    const max = Number(maxStr)
    if (min === 0 && max === 10000000) return ''
    if (max === Infinity) return `${min / 1000}+`
    return `${min / 1000}-${max / 1000}`
  }

  const filter = {
    search: debouncedSearch?.trim(),
    status: productStatusFilter,
    priceRange: getPriceRangeParam(productPriceFilter)
  }

  const { data, isLoading } = useQuery({
    queryKey: ['products', page, filter],
    queryFn: () => getProducts(page, limit, filter),
    keepPreviousData: true
  })

  const currentPage = Number(page)
  const totalPages = data?.pagination?.totalPages || 1
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

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      navigate(`?page=${newPage}`)
    }
  }

  const handleDeleteProductById = async (productId) => {
    await deleteProductById(productId)
    await queryClient.invalidateQueries(['products'])
  }

  const columns = [
    {
      title: 'ID',
      render: (item, index) => (page - 1) * limit + index + 1,
      skeletonClassName: 'h-4 w-8'
    },
    {
      title: 'Ảnh',
      render: (item) => {
        const mainImage = item?.images?.find((img) => img.is_main === true)?.url

        return (
          <img
            src={mainImage || '/image/Nuvexa.png'}
            className='h-20 min-w-[80px] object-cover rounded-md'
          />
        )
      },
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
        <DropdownMenuItem
          onClick={() => handleDeleteProductById(item.id)}
          className='text-red-600 cursor-pointer'
        >
          Xóa sản phẩm
        </DropdownMenuItem>
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
        <FilterContainer>
          <FilterInput placeholder='Tìm kiếm theo tên...' value={search} onChange={setSearch} />

          <FilterSelect
            getKey
            placeholder='Lọc theo giá...'
            value={productPriceFilter}
            onChange={setProductPriceFilter}
            options={[
              { label: 'Lọc theo giá...', value: '0-10000000' },
              { label: 'Dưới 500k', value: '0-500000' },
              { label: '500k - 1tr', value: '500000-1000000' },
              { label: '1tr - 2tr', value: '1000000-2000000' },
              { label: 'Trên 2tr', value: '2000000-Infinity' }
            ]}
          />

          <FilterSelect
            placeholder='Lọc theo trạng thái...'
            value={productStatusFilter}
            onChange={setProductStatusFilter}
            options={[
              { label: 'Lọc trạng thái...', value: 'all' },
              { label: 'Bán chạy', value: 'is_best_seller' },
              { label: 'Sản phẩm mới', value: 'is_new' }
            ]}
          />
        </FilterContainer>

        <DataTable
          columns={columns}
          actions={actions}
          data={products}
          isLoading={isLoading}
          limit={5}
        />

        {data?.pagination?.totalProducts && (
          <CustomPagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={data?.pagination?.totalProducts}
            onPageChange={handlePageChange}
            hasNext={data?.pagination?.hasNext}
            hasPrev={data?.pagination?.hasPrev}
            label='Sản phẩm'
          />
        )}
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
