import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import FacebookLogin from '@greatsumini/react-facebook-login'
import { toast } from 'sonner'
import { GoogleLogin } from '@react-oauth/google'
import { Heart } from 'lucide-react'

import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card'
import { ROUTES } from '~/constants'
import {
  selectCurrentUser,
  loginUser,
  loginUserByGoogle,
  loginUserByFacebook
} from '~/redux/slices/authSlice'

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

  const handleLoginWithGoogle = async (tokenId) => {
    await dispatch(loginUserByGoogle(tokenId)).unwrap()
    navigate(ROUTES.HOME)
  }

  const handleLoginWithFacebook = async (accessToken) => {
    await dispatch(loginUserByFacebook(accessToken)).unwrap()
    navigate(ROUTES.HOME)
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-pink-50 to-rose-100 flex items-center justify-center p-4'>
      <div className='w-full max-w-md animate-fade-in-up mt-[80px]'>
        <Card className='shadow-xl border-0 bg-white/95 backdrop-blur-sm'>
          <CardHeader className='text-center space-y-2'>
            <div className='mx-auto w-16 h-16 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full flex items-center justify-center mb-4'>
              <Heart className='h-8 w-8 text-primary fill-current group-hover:scale-110 group-hover:rotate-12 transition-all duration-300' />
            </div>

            <CardTitle className='text-2xl font-serif text-gray-800'>Chào mừng trở lại</CardTitle>
            <CardDescription className='text-gray-600'>
              Đăng nhập vào tài khoản Nuvexa của bạn
            </CardDescription>
          </CardHeader>
          <div className='px-6 opacity-70'>
            <p>Tài khoản admin</p>
            <p>Email: admin@gmail.com</p>
            <p>Password: 123412341234</p>
          </div>
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

            <div className='relative'>
              <div className='absolute inset-0 flex items-center'>
                <span className='w-full border-t border-gray-200' />
              </div>
              <div className='relative flex justify-center text-xs uppercase'>
                <span className='bg-white px-2 text-gray-500'>Hoặc</span>
              </div>
            </div>

            <div className='flex flex-col items-center justify-center gap-2'>
              <FacebookLogin
                appId={import.meta.env.VITE_FACEBOOK_ID}
                onSuccess={(response) => handleLoginWithFacebook(response.accessToken)}
                onFail={(error) => {
                  toast.error('Đăng nhập không thành công')
                }}
                style={{
                  backgroundColor: '#4267b2',
                  color: '#fff',
                  fontSize: '16px',
                  padding: '7px 31px',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
                scope='public_profile,email'
                fields='id,name,email,picture'
              />

              <GoogleLogin
                size='large'
                text='signin_with'
                ux_mode='popup'
                width={36}
                onSuccess={(credentialResponse) =>
                  handleLoginWithGoogle(credentialResponse.credential)
                }
                onError={() => {
                  toast.message('Đăng nhập không thành công')
                }}
              />
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
