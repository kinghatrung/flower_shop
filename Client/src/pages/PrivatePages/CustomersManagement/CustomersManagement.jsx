import { useState } from 'react'
import { MoreVertical } from 'lucide-react'
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
import { Badge } from '~/components/ui/badge'
import { getUsers, registerUser, deleteUser, updateUser } from '~/api'
import useQueryParams from '~/hooks/useQueryParams'
import useDebounce from '~/hooks/useDebounce'
import UserFormDialog from '~/components/common/UserFormDialog'
import HeaderTable from '~/components/common/HeaderTable'
import DataTable from '~/components/common/DataTable'
import { FilterInput, FilterSelect, FilterContainer } from '~/components/common/Filters'
import CustomPagination from '~/components/common/CustomPagination'

function CustomersManagement() {
  const navigate = useNavigate()

  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [verifiedFilter, setVerifiedFilter] = useState('all')
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)

  const debouncedSearch = useDebounce(search, 500)
  const queryClient = useQueryClient()
  const queryString = useQueryParams()
  const page = queryString.page || 1
  const limit = 5

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

  const columns = [
    {
      title: 'ID',
      render: (item, index) => (page - 1) * limit + index + 1,
      skeletonClassName: 'h-4 w-8'
    },
    {
      title: 'Ảnh',
      render: (item) => (
        <img
          src={item.avatar_url || '/image/Nuvexa.png'}
          className='h-20 min-w-[80px] object-cover rounded-md'
          alt='Ảnh khách hàng'
        />
      ),
      skeletonClassName: 'h-20 min-w-[80px]'
    },
    { title: 'Họ', key: 'lastname' },
    { title: 'Tên', key: 'name' },
    { title: 'Số điện thoại', render: (item) => item.phone || 'Chưa cập nhật' },
    { title: 'Email', key: 'email' },
    {
      title: 'Xác thực Email',
      render: (item) => (
        <Badge variant={item.is_verified ? 'default' : 'destructive'} className='text-white'>
          {item.is_verified ? 'Đã xác thực' : 'Chưa xác thực'}
        </Badge>
      )
    },
    {
      title: 'Trạng thái',
      render: (item) => (
        <Badge variant={item.is_active ? 'default' : 'destructive'} className='text-white'>
          {item.is_active ? 'Đang hoạt động' : 'Tạm khóa'}
        </Badge>
      )
    },
    { title: 'Vai trò', key: 'role' },
    {
      title: 'Ngày tham gia',
      render: (item) => dayjs(item.created_at).format('DD/MM/YYYY HH:mm')
    }
  ]

  const actions = (item) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' size='icon' className='size-8 cursor-pointer'>
          <MoreVertical className='size-4' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuItem className='cursor-pointer' onClick={() => handleEditClick(item)}>
          Sửa thông tin
        </DropdownMenuItem>
        <DropdownMenuItem className='cursor-pointer'>Khóa người dùng</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => handleDeleteUser(item.email)}
          className='text-destructive cursor-pointer'
        >
          Xóa người dùng
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )

  return (
    <div className='container mx-auto py-8 space-y-6'>
      {/* Header */}
      <HeaderTable
        title='Quản lý người dùng'
        description='Thêm, sửa và quản lý thông tin người dùng'
        buttonLabel='Thêm người dùng'
        onSomething={setIsAddDialogOpen}
      />

      {/* Filters */}
      <div className='space-y-4'>
        <FilterContainer>
          <FilterInput placeholder='Tìm kiếm theo tên...' value={search} onChange={setSearch} />

          <FilterSelect
            placeholder='Lọc theo vai trò'
            value={roleFilter}
            onChange={setRoleFilter}
            options={[
              { label: 'Tất cả vai trò', value: 'all' },
              { label: 'Admin', value: 'admin' },
              { label: 'User', value: 'customer' }
            ]}
          />

          <FilterSelect
            placeholder='Lọc theo trạng thái'
            value={statusFilter}
            onChange={setStatusFilter}
            options={[
              { label: 'Tất cả trạng thái', value: 'all' },
              { label: 'Đang hoạt động', value: 'active' },
              { label: 'Tạm khóa', value: 'inactive' }
            ]}
          />

          <FilterSelect
            placeholder='Lọc xác thực email'
            value={verifiedFilter}
            onChange={setVerifiedFilter}
            options={[
              { label: 'Tất cả', value: 'all' },
              { label: 'Đã xác thực', value: 'verified' },
              { label: 'Chưa xác thực', value: 'unverified' }
            ]}
          />
        </FilterContainer>

        <DataTable
          columns={columns}
          data={users}
          isLoading={isLoading}
          limit={5}
          actions={actions}
        />

        {data?.pagination?.totalUsers > 0 && (
          <CustomPagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={data?.pagination.totalUsers}
            onPageChange={handlePageChange}
            hasNext={data?.pagination?.hasNext}
            hasPrev={data?.pagination?.hasPrev}
            label='Người dùng'
          />
        )}
      </div>

      <UserFormDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onSubmit={handleAddUser}
      />

      <UserFormDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        onSubmit={handleEditUser}
        initialData={selectedUser}
      />
    </div>
  )
}

export default CustomersManagement
