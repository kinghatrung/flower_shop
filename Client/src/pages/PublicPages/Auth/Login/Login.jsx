import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card'
import { ROUTES } from '~/constants'
import { selectCurrentUser, loginUser } from '~/redux/slices/authSlice'

function Login() {
  const currentUser = useSelector(selectCurrentUser)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  if (currentUser) {
    return <Navigate to={ROUTES.HOME} replace />
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const user = {
      email,
      password
    }
    await dispatch(loginUser(user)).unwrap()
    navigate(ROUTES.HOME)
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-pink-50 to-rose-100 flex items-center justify-center p-4'>
      <div className='w-full max-w-md animate-fade-in-up mt-[80px]'>
        <Card className='shadow-xl border-0 bg-white/95 backdrop-blur-sm'>
          <CardHeader className='text-center space-y-2'>
            <div className='mx-auto w-16 h-16 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full flex items-center justify-center mb-4'>
              <svg className='w-8 h-8 text-white' fill='currentColor' viewBox='0 0 24 24'>
                <path d='M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.9 1 3 1.9 3 3V21C3 22.1 3.9 23 5 23H19C20.1 23 21 22.1 21 21V9H21ZM19 21H5V3H13V9H19V21Z' />
              </svg>
            </div>
            <CardTitle className='text-2xl font-serif text-gray-800'>Chào mừng trở lại</CardTitle>
            <CardDescription className='text-gray-600'>
              Đăng nhập vào tài khoản Nuvexa của bạn
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-6'>
            <form className='space-y-4' onSubmit={(e) => handleSubmit(e)}>
              <div className='space-y-2'>
                <Label htmlFor='email' className='text-sm font-medium text-gray-700'>
                  Email
                </Label>
                <Input
                  onChange={(e) => setEmail(e.target.value)}
                  id='email'
                  type='email'
                  placeholder='your@email.com'
                  className='h-11 border-gray-200 focus:border-pink-400 focus:ring-pink-400'
                  required
                />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='password' className='text-sm font-medium text-gray-700'>
                  Mật khẩu
                </Label>
                <Input
                  onChange={(e) => setPassword(e.target.value)}
                  id='password'
                  type='password'
                  placeholder='••••••••'
                  className='h-11 border-gray-200 focus:border-pink-400 focus:ring-pink-400'
                  required
                />
              </div>
              <div className='flex items-center justify-end'>
                <Link
                  to={ROUTES.FORGOT_PASSWORD}
                  className='text-sm text-pink-600 hover:text-pink-700 font-medium'
                >
                  Quên mật khẩu?
                </Link>
              </div>
              <Button
                type='submit'
                className='cursor-pointer w-full h-11 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300'
              >
                Đăng nhập
              </Button>
            </form>
            <div className='text-center'>
              <p className='text-sm text-gray-600'>
                Chưa có tài khoản?{' '}
                <Link
                  to={ROUTES.REGISTER}
                  className='text-pink-600 hover:text-pink-700 font-medium'
                >
                  Đăng ký ngay
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

export default Login
