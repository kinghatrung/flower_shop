import { useState } from 'react'
import { MoreVertical, Plus } from 'lucide-react'
import dayjs from 'dayjs'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

import { Button } from '~/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '~/components/ui/table'
import { Skeleton } from '~/components/ui/skeleton'
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

function CategoriesManagement() {
  const queryClient = useQueryClient()

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState(null)

  const { data, isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: () => getCategories()
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
        {/* <div className='flex sm:f lex-row gap-4'>
          <Input
            placeholder='Tìm kiếm theo tên...'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className='sm:max-w-sm'
          />

          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className='sm:w-[180px] cursor-pointer'>
              <SelectValue placeholder='Lọc theo vai trò' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem className='cursor-pointer' value='all'>
                Tất cả vai trò
              </SelectItem>
              <SelectItem className='cursor-pointer' value='admin'>
                Admin
              </SelectItem>
              <SelectItem className='cursor-pointer' value='customer'>
                User
              </SelectItem>
            </SelectContent>
          </Select>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className='sm:w-[180px] cursor-pointer'>
              <SelectValue placeholder='Lọc theo trạng thái' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem className='cursor-pointer' value='all'>
                Tất cả trạng thái
              </SelectItem>
              <SelectItem className='cursor-pointer' value='active'>
                Đang hoạt động
              </SelectItem>
              <SelectItem className='cursor-pointer' value='inactive'>
                Tạm khóa
              </SelectItem>
            </SelectContent>
          </Select>

          <Select value={verifiedFilter} onValueChange={setVerifiedFilter}>
            <SelectTrigger className='sm:w-[200px] cursor-pointer'>
              <SelectValue placeholder='Lọc xác thực email' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem className='cursor-pointer' value='all'>
                Tất cả
              </SelectItem>
              <SelectItem className='cursor-pointer' value='verified'>
                Đã xác thực
              </SelectItem>
              <SelectItem className='cursor-pointer' value='unverified'>
                Chưa xác thực
              </SelectItem>
            </SelectContent>
          </Select>
        </div> */}

        <div className='border rounded-lg'>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Tên</TableHead>
                <TableHead>Kiểu</TableHead>
                <TableHead>Nội dung</TableHead>
                <TableHead>Số sản phẩm</TableHead>
                <TableHead>Ngày tham gia</TableHead>
                <TableHead className='w-[50px]' />
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array.from({ length: categories?.length || 5 }).map((_, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Skeleton className='h-4 w-8' />
                    </TableCell>
                    <TableCell>
                      <Skeleton className='h-4 w-20' />
                    </TableCell>
                    <TableCell>
                      <Skeleton className='h-4 w-20' />
                    </TableCell>
                    <TableCell>
                      <Skeleton className='h-4 w-24' />
                    </TableCell>
                    <TableCell>
                      <Skeleton className='h-4 w-28' />
                    </TableCell>
                    <TableCell>
                      <Skeleton className='h-4 w-40' />
                    </TableCell>
                    <TableCell>
                      <Skeleton className='h-8 w-8 rounded-md' />
                    </TableCell>
                  </TableRow>
                ))
              ) : categories.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={10} className='text-center text-muted-foreground'>
                    Không tìm thấy dữ liệu
                  </TableCell>
                </TableRow>
              ) : (
                categories.map((item, index) => (
                  <TableRow key={item.id}>
                    {/* <TableCell>{(page - 1) * limit + index + 1}</TableCell> */}
                    <TableCell>{item.id}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.type}</TableCell>
                    <TableCell>{item.description || 'Chưa có'}</TableCell>
                    <TableCell>{item.products_count}</TableCell>
                    <TableCell>{dayjs(item.created_at).format('DD/MM/YYYY HH:mm')}</TableCell>
                    <TableCell>
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
                          <DropdownMenuItem
                            className='cursor-pointer'
                            onClick={() => handleEditClick(item)}
                          >
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
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* {data?.pagination?.totalUsers > 0 && (
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  className={`cursor-pointer ${!data?.pagination?.hasPrev ? 'opacity-50 pointer-events-none' : ''}`}
                  onClick={() => data?.pagination?.hasPrev && handlePageChange(currentPage - 1)}
                />
              </PaginationItem>

              {[...Array(totalPages)].map((_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink
                    isActive={currentPage === i + 1}
                    onClick={() => handlePageChange(i + 1)}
                    className='cursor-pointer'
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  className={`cursor-pointer ${!data?.pagination?.hasNext ? 'opacity-50 pointer-events-none' : ''}`}
                  onClick={() => data?.pagination?.hasNext && handlePageChange(currentPage + 1)}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )} */}
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
