import { useEffect, useState } from 'react'
import { MoreVertical } from 'lucide-react'

import { Button } from '~/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '~/components/ui/dropdown-menu'
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
import { getUsers } from '~/api'

function CustomersManagement() {
  const [search, setSearch] = useState('')
  const [users, setUsers] = useState([])

  useEffect(() => {
    const fetchDataUsers = async () => {
      const res = await getUsers()
      setUsers(res.data.reverse())
    }

    fetchDataUsers()
  }, [])

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className='space-y-4'>
      <Input
        placeholder='Tìm kiếm theo tên...'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
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
            <TableHead />
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredUsers.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.id}</TableCell>
              <TableCell>{item.lastname}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.phone}</TableCell>
              <TableCell>{item.email}</TableCell>
              <TableCell>
                <Badge className='text-white' variant={item.verified ? 'default' : 'destructive'}>
                  {item.verified ? 'Đã xác thực' : 'Chưa xác thực'}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge className='text-white' variant={item.status ? 'default' : 'destructive'}>
                  {item.status ? 'Đang hoạt động' : 'Tạm khóa'}
                </Badge>
              </TableCell>
              <TableCell>{item.role}</TableCell>
              <TableCell>{item.created}</TableCell>
              <TableCell>
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
                    <DropdownMenuItem className='cursor-pointer'>Sửa thông tin</DropdownMenuItem>
                    <DropdownMenuItem className='cursor-pointer'>Khóa người dùng</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className='text-red-600 cursor-pointer'>
                      Xóa người dùng
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default CustomersManagement
