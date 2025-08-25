import { Link } from 'react-router-dom'

import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card'
import { ROUTES } from '~/constants/routesPath'

function ForgotPassword() {
  return (
    <div className='min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 flex items-center justify-center p-4'>
      <div className='w-full max-w-md animate-fade-in-up mt-[80px]'>
        <Card className='shadow-xl border-0 bg-white/95 backdrop-blur-sm'>
          <CardHeader className='text-center space-y-2'>
            <div className='mx-auto w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center mb-4'>
              <svg
                className='w-8 h-8 text-white'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z'
                />
              </svg>
            </div>
            <CardTitle className='text-2xl font-serif text-gray-800'>Quên mật khẩu?</CardTitle>
            <CardDescription className='text-gray-600'>
              Nhập email để nhận liên kết đặt lại mật khẩu
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-6'>
            <form className='space-y-4'>
              <div className='space-y-2'>
                <Label htmlFor='email' className='text-sm font-medium text-gray-700'>
                  Email đã đăng ký
                </Label>
                <Input
                  id='email'
                  type='email'
                  placeholder='your@email.com'
                  className='h-11 border-gray-200 focus:border-purple-400 focus:ring-purple-400'
                  required
                />
              </div>
              <Button
                type='submit'
                className='w-full h-11 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300'
              >
                Gửi liên kết đặt lại
              </Button>
            </form>
            <div className='text-center space-y-4'>
              <div className='relative'>
                <div className='absolute inset-0 flex items-center'>
                  <span className='w-full border-t border-gray-200' />
                </div>
                <div className='relative flex justify-center text-xs uppercase'>
                  <span className='bg-white px-2 text-gray-500'>Hoặc</span>
                </div>
              </div>
              <div className='space-y-2'>
                <Link
                  to={ROUTES.LOGIN}
                  className='block text-sm text-purple-600 hover:text-purple-700 font-medium'
                >
                  Quay lại đăng nhập
                </Link>
                <Link
                  to={ROUTES.REGISTER}
                  className='block text-sm text-gray-600 hover:text-gray-800'
                >
                  Chưa có tài khoản? Đăng ký ngay
                </Link>
              </div>
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

export default ForgotPassword
