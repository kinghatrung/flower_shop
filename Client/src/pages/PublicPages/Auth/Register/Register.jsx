import { Link } from 'react-router-dom'

import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card'
import { ROUTES } from '~/constants/routesPath'

function Register() {
  return (
    <div className='min-h-screen bg-gradient-to-br from-rose-50 to-pink-100 flex items-center justify-center p-4'>
      <div className='w-full max-w-md animate-fade-in-up mt-[80px]'>
        <Card className='shadow-xl border-0 bg-white/95 backdrop-blur-sm'>
          <CardHeader className='text-center space-y-2'>
            <div className='mx-auto w-16 h-16 bg-gradient-to-br from-rose-400 to-pink-500 rounded-full flex items-center justify-center mb-4'>
              <svg className='w-8 h-8 text-white' fill='currentColor' viewBox='0 0 24 24'>
                <path d='M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.9 1 3 1.9 3 3V21C3 22.1 3.9 23 5 23H19C20.1 23 21 22.1 21 21V9H21ZM19 21H5V3H13V9H19V21Z' />
              </svg>
            </div>
            <CardTitle className='text-2xl font-serif text-gray-800'>Tạo tài khoản mới</CardTitle>
            <CardDescription className='text-gray-600'>
              Tham gia cộng đồng yêu hoa của Nuvexa
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-6'>
            <form className='space-y-4'>
              <div className='grid grid-cols-2 gap-4'>
                <div className='space-y-2'>
                  <Label htmlFor='firstName' className='text-sm font-medium text-gray-700'>
                    Tên
                  </Label>
                  <Input
                    id='firstName'
                    type='text'
                    placeholder='Tên của bạn'
                    className='h-11 border-gray-200 focus:border-rose-400 focus:ring-rose-400'
                    required
                  />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='lastName' className='text-sm font-medium text-gray-700'>
                    Họ
                  </Label>
                  <Input
                    id='lastName'
                    type='text'
                    placeholder='Họ của bạn'
                    className='h-11 border-gray-200 focus:border-rose-400 focus:ring-rose-400'
                    required
                  />
                </div>
              </div>
              <div className='space-y-2'>
                <Label htmlFor='email' className='text-sm font-medium text-gray-700'>
                  Email
                </Label>
                <Input
                  id='email'
                  type='email'
                  placeholder='your@email.com'
                  className='h-11 border-gray-200 focus:border-rose-400 focus:ring-rose-400'
                  required
                />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='phone' className='text-sm font-medium text-gray-700'>
                  Số điện thoại
                </Label>
                <Input
                  id='phone'
                  type='tel'
                  placeholder='0123 456 789'
                  className='h-11 border-gray-200 focus:border-rose-400 focus:ring-rose-400'
                  required
                />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='password' className='text-sm font-medium text-gray-700'>
                  Mật khẩu
                </Label>
                <Input
                  id='password'
                  type='password'
                  placeholder='••••••••'
                  className='h-11 border-gray-200 focus:border-rose-400 focus:ring-rose-400'
                  required
                />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='confirmPassword' className='text-sm font-medium text-gray-700'>
                  Xác nhận mật khẩu
                </Label>
                <Input
                  id='confirmPassword'
                  type='password'
                  placeholder='••••••••'
                  className='h-11 border-gray-200 focus:border-rose-400 focus:ring-rose-400'
                  required
                />
              </div>
              <div className='flex items-center space-x-2'>
                <input
                  id='terms'
                  type='checkbox'
                  className='w-4 h-4 text-rose-600 border-gray-300 rounded focus:ring-rose-500'
                  required
                />
                <Label htmlFor='terms' className='text-sm text-gray-600'>
                  Tôi đồng ý với{' '}
                  <Link href='/terms' className='text-rose-600 hover:text-rose-700 font-medium'>
                    Điều khoản dịch vụ
                  </Link>{' '}
                  và{' '}
                  <Link href='/privacy' className='text-rose-600 hover:text-rose-700 font-medium'>
                    Chính sách bảo mật
                  </Link>
                </Label>
              </div>
              <Button
                type='submit'
                className='w-full h-11 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300'
              >
                Tạo tài khoản
              </Button>
            </form>
            <div className='text-center'>
              <p className='text-sm text-gray-600'>
                Đã có tài khoản?{' '}
                <Link to={ROUTES.LOGIN} className='text-rose-600 hover:text-rose-700 font-medium'>
                  Đăng nhập ngay
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
        <div className='text-center mt-6'>
          <Link to={ROUTES.HOME} className='text-sm text-gray-600 hover:text-gray-800 font-medium'>
            ← Về trang chủ
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Register
