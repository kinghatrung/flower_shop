import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'

import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card'
import { ROUTES } from '~/constants'
import { selectCurrentUser } from '~/redux/slices/authSlice'
import { otpSend, resetPasswordUser } from '~/api'
import { toast } from 'sonner'

function ForgotPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm({
    mode: 'onChange'
  })

  const navigate = useNavigate()
  const [countdown, setCountdown] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  const currentUser = useSelector(selectCurrentUser)

  if (currentUser) {
    return <Navigate to={ROUTES.HOME} replace />
  }

  const password = watch('password')

  const handleSendOtp = async (email) => {
    setIsLoading(true)
    await otpSend(email)
    setTimeout(() => {
      setIsLoading(false)
      setCountdown(30)
      const timer = setInterval(() => {
        setCountdown((prev) => (prev <= 1 ? (clearInterval(timer), 0) : prev - 1))
      }, 1000)
    }, 1000)
  }

  const onSubmitForgotPassword = async (data) => {
    const { email, otp, password } = data
    await resetPasswordUser(email, otp, password)
    toast.success('Đổi mật khẩu thành công! Vui lòng đăng nhập lại.')
    navigate(ROUTES.LOGIN)
  }

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
              Nhập email để nhận mã Otp đặt lại mật khẩu
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-6'>
            <form onSubmit={handleSubmit(onSubmitForgotPassword)} className='space-y-4'>
              <div className='space-y-2'>
                <Label htmlFor='email' className='text-sm font-medium text-gray-700'>
                  Email đã đăng ký
                </Label>
                <Input
                  id='email'
                  type='email'
                  placeholder='your@email.com'
                  className='h-11 border-gray-200 focus:border-purple-400 focus:ring-purple-400'
                  {...register('email', {
                    required: 'Vui lòng nhập email',
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: 'Email không đúng định dạng'
                    }
                  })}
                />
                {errors.email && <p className='text-sm text-red-500'>{errors.email.message}</p>}
              </div>

              <div className='space-y-2'>
                <Label htmlFor='otp' className='text-sm font-medium text-gray-700'>
                  Mã OTP
                </Label>
                <div className='flex gap-2'>
                  <Input
                    id='otp'
                    type='text'
                    placeholder='xxxxxx'
                    className='h-11 border-gray-200 focus:border-purple-400 focus:ring-purple-400'
                    {...register('otp', { required: 'Vui lòng nhập mã OTP' })}
                  />
                  <Button
                    type='button'
                    onClick={() => handleSendOtp(watch('email'))}
                    disabled={countdown > 0 || isLoading || errors.email || !watch('email')}
                    className='h-11 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-lg whitespace-nowrap cursor-pointer'
                  >
                    {countdown > 0 ? `Đợi ${countdown}s` : isLoading ? 'Đang gửi...' : 'Nhận mã'}
                  </Button>
                </div>
                {errors.otp && <p className='text-sm text-red-500'>{errors.otp.message}</p>}
              </div>

              <div className='space-y-2'>
                <Label htmlFor='password' className='text-sm font-medium text-gray-700'>
                  Mật khẩu mới
                </Label>
                <Input
                  id='password'
                  type='password'
                  placeholder='••••••••'
                  className='h-11 border-gray-200 focus:border-rose-400 focus:ring-rose-400'
                  {...register('password', {
                    required: 'Vui lòng nhập mật khẩu',
                    minLength: { value: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự' }
                  })}
                />
                {errors.password && (
                  <p className='text-sm text-red-500'>{errors.password.message}</p>
                )}
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
                  {...register('confirmPassword', {
                    required: 'Vui lòng xác nhận mật khẩu',
                    validate: (value) => value === password || 'Mật khẩu không khớp'
                  })}
                />
                {errors.confirmPassword && (
                  <p className='text-sm text-red-500'>{errors.confirmPassword.message}</p>
                )}
              </div>

              <Button
                type='submit'
                className='cursor-pointer w-full h-11 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300'
              >
                Đặt lại mật khẩu
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
