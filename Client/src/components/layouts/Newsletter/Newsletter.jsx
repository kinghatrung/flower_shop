import { useState, useEffect } from 'react'
import { Mail, Gift, CheckCircle } from 'lucide-react'

import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Badge } from '~/components/ui/badge'

function Newsletter() {
  const [isVisible, setIsVisible] = useState(false)
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    const element = document.getElementById('newsletter')
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email) return

    setIsSubmitting(true)

    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitted(true)
    setIsSubmitting(false)
    setEmail('')

    setTimeout(() => setIsSubmitted(false), 3000)
  }

  return (
    <section
      id='newsletter'
      className='py-20 px-4 bg-gradient-to-r from-primary/10 to-secondary/10'
    >
      <div className='max-w-4xl mx-auto text-center'>
        <div className={`${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <Badge variant='secondary' className='mb-4 bg-secondary/20 text-secondary'>
            <Gift className='w-4 h-4 mr-1' />
            Ưu đãi đặc biệt
          </Badge>

          <h2 className='font-serif text-4xl lg:text-5xl font-bold text-foreground mb-4'>
            Nhận Ưu Đãi Đặc Biệt
          </h2>

          <p className='text-lg text-muted-foreground mb-8 max-w-2xl mx-auto'>
            Đăng ký nhận bản tin để được thông báo về các sản phẩm mới, ưu đãi đặc biệt và mẹo chăm
            sóc hoa tươi từ các chuyên gia
          </p>

          <div className={`max-w-md mx-auto ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
            {isSubmitted ? (
              <div className='flex items-center justify-center space-x-2 text-green-600 animate-bounce-in'>
                <CheckCircle className='w-6 h-6' />
                <span className='font-medium'>Cảm ơn bạn đã đăng ký!</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className='flex gap-3'>
                <div className='flex-1 relative'>
                  <Mail className='absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground' />
                  <Input
                    type='email'
                    placeholder='Nhập email của bạn'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className='pl-10 h-12 border-gray-200 focus:border-primary focus:ring-primary'
                    required
                    disabled={isSubmitting}
                    aria-label='Email address'
                  />
                </div>
                <Button
                  type='submit'
                  size='lg'
                  className='h-12 px-6 cursor-pointer bg-secondary hover:bg-secondary/90 text-secondary-foreground disabled:opacity-50'
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Đang xử lý...' : 'Đăng ký'}
                </Button>
              </form>
            )}

            <p className='text-xs text-muted-foreground mt-3'>
              Bằng cách đăng ký, bạn đồng ý với{' '}
              <a href='/privacy' className='text-primary hover:underline'>
                Chính sách bảo mật
              </a>{' '}
              của chúng tôi
            </p>
          </div>

          <div
            className={`grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
          >
            <div className='text-center'>
              <div className='text-2xl font-bold text-secondary'>20%</div>
              <div className='text-sm text-muted-foreground'>Giảm giá lần đầu</div>
            </div>
            <div className='text-center'>
              <div className='text-2xl font-bold text-secondary'>Miễn phí</div>
              <div className='text-sm text-muted-foreground'>Giao hàng nhanh</div>
            </div>
            <div className='text-center'>
              <div className='text-2xl font-bold text-secondary'>24/7</div>
              <div className='text-sm text-muted-foreground'>Hỗ trợ khách hàng</div>
            </div>
            <div className='text-center'>
              <div className='text-2xl font-bold text-secondary'>VIP</div>
              <div className='text-sm text-muted-foreground'>Ưu đãi độc quyền</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Newsletter
