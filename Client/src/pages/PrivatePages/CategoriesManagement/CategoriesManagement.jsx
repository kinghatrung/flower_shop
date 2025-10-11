import { useState } from 'react'
import { MoreVertical, Plus } from 'lucide-react'
import dayjs from 'dayjs'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

import { Button } from '~/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '~/components/ui/dropdown-menu'
import HeaderTable from '~/components/common/HeaderTable'
import { getCategories, deleteCategory, createCategory, editCategory } from '~/api'
import CategoryFormDialog from '~/components/common/CategoryFormDialog'
import DataTable from '~/components/common/DataTable'
import { FilterContainer, FilterSelect, FilterInput } from '~/components/common/Filters'
import useDebounce from '~/hooks/useDebounce'

function CategoriesManagement() {
  const queryClient = useQueryClient()

  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState('all')
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState(null)
  const debouncedSearch = useDebounce(search, 500)

  const filters = {
    ...(typeFilter !== 'all' && { type: setTypeFilter }),
    ...(debouncedSearch?.trim() && { search: debouncedSearch.trim() })
  }

  const { data, isLoading } = useQuery({
    queryKey: ['categories', filters],
    queryFn: () => getCategories(filters),
    keepPreviousData: true
  })

  const categories = data?.data || []

  const handleEditClick = (category) => {
    setSelectedCategory(category)
    setIsEditDialogOpen(true)
  }

  const handleAddCategory = async (data) => {
    await createCategory(data)
    await queryClient.invalidateQueries(['categories'])
    setIsAddDialogOpen(!isAddDialogOpen)
  }

  const handleEditCategory = async (data) => {
    const { name, type, description } = data

    await editCategory(selectedCategory.id, { name, type, description })
    await queryClient.invalidateQueries(['categories'])
    setIsEditDialogOpen(!isEditDialogOpen)
    setSelectedCategory(null)
  }

  const handleDeleteCategory = async (type) => {
    await deleteCategory(type)
    await queryClient.invalidateQueries(['categories'])
  }

  const columns = [
    {
      title: 'ID',
      // render: (item, index) => (page - 1) * limit + index + 1,
      render: (item, index) => index + 1,
      skeletonClassName: 'h-4 w-8'
    },
    { title: 'Tên', key: 'name' },
    { title: 'Kiểu', key: 'type' },
    { title: 'Nội dung', render: (item) => item.description || 'Chưa cập nhật' },
    { title: 'Số sản phẩm', key: 'products_count' },
    {
      title: 'Ngày tham gia',
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
          <MoreVertical className='size-4' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuItem className='cursor-pointer' onClick={() => handleEditClick(item)}>
          Sửa thông tin
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => handleDeleteCategory(item.type)}
          className='text-destructive cursor-pointer'
        >
          Xóa danh mục
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )

  return (
    <div className='container mx-auto py-8 space-y-6'>
      {/* Header */}
      <HeaderTable
        title='Quản lý danh mục'
        description='Thêm, sửa và quản lý thông tin danh mục'
        buttonLabel='Thêm danh mục'
        onSomething={setIsAddDialogOpen}
      />

      {/* Filters */}
      <div className='space-y-4'>
        <FilterContainer>
          <FilterInput
            placeholder='Tìm kiếm theo tên danh mục...'
            value={search}
            onChange={setSearch}
          />

          <FilterSelect
            placeholder='Lọc danh mục'
            value={typeFilter}
            onChange={setTypeFilter}
            options={[{ label: 'Tất cả', value: 'all' }]}
          />
        </FilterContainer>

        <DataTable columns={columns} data={categories} isLoading={isLoading} actions={actions} />
      </div>

      <CategoryFormDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onSubmit={handleAddCategory}
      />

      <CategoryFormDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        onSubmit={handleEditCategory}
        initialData={selectedCategory}
      />
    </div>
  )
}

export default CategoriesManagement
