import { useGoogleLogin } from '@react-oauth/google'
import { FaGoogle } from 'react-icons/fa'

import { Button } from '~/components/ui/button'
import authorizedAxiosInstance from '~/utils/authorizedAxios'

function ButtonGoogle() {
  const handleLoginWithGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log('Google login success:', tokenResponse)

      // Lấy thông tin user từ Google API
      const res = await authorizedAxiosInstance.get(
        'https://www.googleapis.com/oauth2/v3/userinfo',
        {
          headers: {
            Authorization: `Bearer ${tokenResponse.access_token}`
          }
        }
      )

      console.log('User info:', res)
      // Gửi thông tin hoặc access_token này lên backend của bạn
    },
    onError: () => {
      console.log('Đăng nhập Google thất bại')
    }
  })

  return (
    <Button
      onClick={() => handleLoginWithGoogle()}
      className='cursor-pointer text-[#fff] rounded-full h-9 w-9 text-center'
    >
      <FaGoogle />
    </Button>
  )
}

export default ButtonGoogle
