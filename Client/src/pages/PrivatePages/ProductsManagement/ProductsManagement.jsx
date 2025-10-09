import { useEffect, useState } from 'react'
import { MoreVertical, Plus } from 'lucide-react'
import dayjs from 'dayjs'
import numeral from 'numeral'

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
import HeaderTable from '~/components/common/HeaderTable'
import { getProducts } from '~/api'

function ProductsManagement() {
  const [search, setSearch] = useState('')
  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchDataUsers = async () => {
      const res = await getProducts()
      setProducts(res.data)
    }

    fetchDataUsers()
  }, [])

  return (
    <div className='container mx-auto py-8 space-y-6'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight'>Quản lý sản phẩm</h1>
          <p className='text-muted-foreground mt-1'>Thêm, sửa và quản lý thông tin sản phẩm</p>
        </div>
        <Button
          // onClick={() => setIsAddDialogOpen(true)}
          className='gap-2 text-center cursor-pointer hover:scale-105 transition-all duration-300 text-[#fff]'
        >
          <Plus className='size-4' />
          Thêm sản phẩm
        </Button>
      </div>

      <div className='space-y-4'>
        {/* Filter */}
        <div className='flex sm:f lex-row gap-4'>
          <Input
            placeholder='Tìm kiếm theo tên...'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className='sm:max-w-sm'
          />

          <Select
          // value={roleFilter} onValueChange={setRoleFilter}
          >
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

          <Select
          // value={statusFilter} onValueChange={setStatusFilter}
          >
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

          <Select
          // value={verifiedFilter} onValueChange={setVerifiedFilter}
          >
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
              <TableRow className='border-b border-gray-300'>
                <TableHead className='border-r border-gray-300'>ID</TableHead>
                <TableHead className='border-r border-gray-300'>Ảnh</TableHead>
                <TableHead className='border-r border-gray-300'>Tên</TableHead>
                <TableHead className='border-r border-gray-300'>Giá hiện tại (VNĐ)</TableHead>
                <TableHead className='border-r border-gray-300'>Giá gốc (VNĐ)</TableHead>
                <TableHead className='border-r border-gray-300'>Loại hoa</TableHead>
                <TableHead className='border-r border-gray-300'>Nội dung</TableHead>
                <TableHead className='border-r border-gray-300'>Xếp hạng</TableHead>
                <TableHead className='border-r border-gray-300'>Đánh giá</TableHead>
                <TableHead className='border-r border-gray-300'>Sản phẩm mới</TableHead>
                <TableHead className='border-r border-gray-300'>Sản phẩm bán chạy</TableHead>
                <TableHead className='border-r border-gray-300'>Ngày thêm</TableHead>
                <TableHead className='border-r border-gray-300' />
              </TableRow>
            </TableHeader>

            <TableBody>
              {products.map((product, index) => (
                <TableRow key={product.id} className='border-b border-gray-200'>
                  <TableCell className='border-r border-gray-300'>{index + 1}</TableCell>
                  <TableCell className='border-r border-gray-300'>
                    <img
                      className='h-20 min-w-[80px] object-cover rounded-md'
                      src={product.image}
                      alt='Ảnh sản phẩm'
                    />
                  </TableCell>
                  <TableCell className='border-r border-gray-300'>{product.name}</TableCell>
                  <TableCell className='border-r border-gray-300'>
                    {numeral(product.price).format('0,0') + ' đ'}
                  </TableCell>
                  <TableCell className='border-r border-gray-300'>
                    {numeral(product.original_price).format('0,0') + ' đ'}
                  </TableCell>
                  <TableCell className='border-r border-gray-300'>
                    {product.category_name}
                  </TableCell>
                  <TableCell className='border-r border-gray-300'>{product.description}</TableCell>
                  <TableCell className='border-r border-gray-300'>
                    {product.rating ? product.rating : 'Chưa có đánh giá'}
                  </TableCell>
                  <TableCell className='border-r border-gray-300'>{product.reviews}</TableCell>
                  <TableCell className='border-r border-gray-300'>
                    {product.is_new ? 'Mới' : ''}
                  </TableCell>
                  <TableCell className='border-r border-gray-300'>
                    {product.is_best_seller ? 'Bán chạy' : 'Không chạy'}
                  </TableCell>
                  <TableCell className='border-r border-gray-300'>
                    {dayjs(product.created_at).format('DD/MM/YYYY HH:mm')}
                  </TableCell>
                  <TableCell className='border-r border-gray-300'>
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
                        <DropdownMenuItem className='cursor-pointer'>
                          Sửa thông tin
                        </DropdownMenuItem>
                        <DropdownMenuItem className='cursor-pointer'>
                          Khóa người dùng
                        </DropdownMenuItem>
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
      </div>
    </div>
  )
}

export default ProductsManagement
