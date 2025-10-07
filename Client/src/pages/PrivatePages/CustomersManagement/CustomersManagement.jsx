import { useEffect, useState } from 'react'
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
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '~/components/ui/pagination'
import { Input } from '~/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '~/components/ui/table'
import { Badge } from '~/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '~/components/ui/select'
import { Skeleton } from '~/components/ui/skeleton'
import UserFormDialog from '~/components/common/UserFormDialog'
import { getUsers, registerUser, deleteUser, updateUser } from '~/api'
import useQueryParams from '~/hooks/useQueryParams'

function CustomersManagement() {
  const navigate = useNavigate()

  const [search, setSearch] = useState('')
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)
  const [debouncedSearch, setDebouncedSearch] = useState(search)

  const [roleFilter, setRoleFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [verifiedFilter, setVerifiedFilter] = useState('all')

  const queryClient = useQueryClient()
  const queryString = useQueryParams()
  const page = queryString.page || 1
  const limit = 10

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search)
    }, 1000)

    return () => clearTimeout(handler)
  }, [search])

  const filters = {
    ...(roleFilter !== 'all' && { role: roleFilter }),
    ...(statusFilter === 'active'
      ? { is_active: true }
      : statusFilter === 'inactive'
        ? { is_active: false }
        : {}),
    ...(verifiedFilter === 'verified'
      ? { is_verified: true }
      : verifiedFilter === 'unverified'
        ? { is_verified: false }
        : {}),
    ...(debouncedSearch?.trim() && { search: debouncedSearch.trim() })
  }

  const { data, isLoading } = useQuery({
    queryKey: ['users', page, filters],
    queryFn: () => getUsers(page, limit, filters),
    keepPreviousData: true
  })

  const currentPage = Number(page)
  const totalPages = data?.pagination?.totalPages || 1
  const users = data?.data || []

  const handleAddUser = async (userData) => {
    await registerUser(userData)
    await queryClient.invalidateQueries(['users'])
    setIsAddDialogOpen(!isAddDialogOpen)
  }

  const handleEditUser = async (userData) => {
    const cleanedData = Object.fromEntries(
      Object.entries(userData).filter(([_, value]) => value !== '' && value !== undefined)
    )
    await updateUser(selectedUser.user_id, cleanedData)
    await queryClient.invalidateQueries(['users'])
    setIsEditDialogOpen(false)
    setSelectedUser(null)
  }

  const handleEditClick = (user) => {
    setSelectedUser(user)
    setIsEditDialogOpen(true)
  }

  const handleDeleteUser = async (email) => {
    await deleteUser(email)
    await queryClient.invalidateQueries(['users'])
  }

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      navigate(`?page=${newPage}`)
    }
  }

  return (
    <div className='container mx-auto py-8 space-y-6'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight'>Quản lý người dùng</h1>
          <p className='text-muted-foreground mt-1'>Thêm, sửa và quản lý thông tin người dùng</p>
        </div>
        <Button
          onClick={() => setIsAddDialogOpen(true)}
          className='gap-2 text-center cursor-pointer hover:scale-105 transition-all duration-300 text-[#fff]'
        >
          <Plus className='size-4' />
          Thêm người dùng
        </Button>
      </div>

      {/* Filters */}
      <div className='space-y-4'>
        <div className='flex flex-col sm:flex-row gap-4'>
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
        </div>
        <div className='border rounded-lg'>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Họ</TableHead>
                <TableHead>Tên</TableHead>
                <TableHead>Số điện thoại</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Xác thực Email</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Vai trò</TableHead>
                <TableHead>Ngày tham gia</TableHead>
                <TableHead className='w-[50px]' />
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array.from({ length: limit }).map((_, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Skeleton className='h-4 w-8' />
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
                      <Skeleton className='h-6 w-24 rounded-full' />
                    </TableCell>
                    <TableCell>
                      <Skeleton className='h-6 w-28 rounded-full' />
                    </TableCell>
                    <TableCell>
                      <Skeleton className='h-4 w-16' />
                    </TableCell>
                    <TableCell>
                      <Skeleton className='h-4 w-32' />
                    </TableCell>
                    <TableCell>
                      <Skeleton className='h-8 w-8 rounded-md' />
                    </TableCell>
                  </TableRow>
                ))
              ) : users.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={10} className='text-center text-muted-foreground'>
                    Không tìm thấy dữ liệu
                  </TableCell>
                </TableRow>
              ) : (
                users.map((item, index) => (
                  <TableRow key={item.user_id}>
                    <TableCell>{(page - 1) * limit + index + 1}</TableCell>
                    <TableCell>{item.lastname}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.phone ? item.phone : 'Chưa cập nhật'}</TableCell>
                    <TableCell>{item.email}</TableCell>
                    <TableCell>
                      <Badge
                        className='text-white'
                        variant={item.is_verified ? 'default' : 'destructive'}
                      >
                        {item.is_verified ? 'Đã xác thực' : 'Chưa xác thực'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        className='text-white'
                        variant={item.is_active ? 'default' : 'destructive'}
                      >
                        {item.is_active ? 'Đang hoạt động' : 'Tạm khóa'}
                      </Badge>
                    </TableCell>
                    <TableCell>{item.role}</TableCell>
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
                          <DropdownMenuItem className='cursor-pointer'>
                            Khóa người dùng
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => handleDeleteUser(item.email)}
                            className='text-destructive cursor-pointer'
                          >
                            Xóa người dùng
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

        {data?.pagination?.totalUsers > 0 && (
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
        )}
      </div>

      <UserFormDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onSubmit={handleAddUser}
        title='Thêm người dùng mới'
        description='Điền thông tin để thêm người dùng mới vào hệ thống'
        isAdd
      />

      <UserFormDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        onSubmit={handleEditUser}
        title='Sửa thông tin người dùng'
        description='Cập nhật thông tin người dùng'
        initialData={selectedUser}
        isEdit
      />
    </div>
  )
}

export default CustomersManagement
