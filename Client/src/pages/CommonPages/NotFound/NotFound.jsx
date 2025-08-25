import { Link, useNavigate } from 'react-router-dom'
import { Home, ArrowLeft } from 'lucide-react'

import { Button } from '~/components/ui/button'
import { ROUTES } from '~/constants/routesPath'

function NotFound() {
  const navigate = useNavigate()
  return (
    <div className='min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 flex items-center justify-center p-4'>
      <div className='text-center max-w-md mx-auto animate-fade-in-up'>
        <div className='mb-8'>
          <div className='w-64 h-64 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce-in'>
            <span className='text-8xl font-bold text-white'>404</span>
          </div>
          <h1 className='font-serif text-3xl font-bold text-foreground mb-4'>
            Trang không tồn tại
          </h1>
          <p className='text-muted-foreground mb-8'>
            Xin lỗi, trang bạn đang tìm kiếm không tồn tại hoặc đã được di chuyển.
          </p>
        </div>

        <div className='space-y-4'>
          <Button
            asChild
            size='lg'
            className='w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground'
          >
            <Link to={ROUTES.HOME}>
              <Home className='w-4 h-4 mr-2' />
              Về trang chủ
            </Link>
          </Button>
          <Button asChild variant='outline' size='lg' className='w-full bg-transparent'>
            <Link onClick={() => navigate(-1)}>
              <ArrowLeft className='w-4 h-4 mr-2' />
              Quay lại
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default NotFound
