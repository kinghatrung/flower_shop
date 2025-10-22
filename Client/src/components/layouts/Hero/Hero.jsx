import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Star } from 'lucide-react'

import { Button } from '~/components/ui/button'
import { Badge } from '~/components/ui/badge'
import { ROUTES } from '~/constants'

function Hero() {
  const [isVisible, setIsVisible] = useState(false)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    setIsVisible(true)

    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section className='pt-24 pb-16 px-4 relative overflow-hidden'>
      <div className='absolute inset-0 -z-10'>
        <div
          className='absolute top-20 right-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl'
          style={{ transform: `translateY(${scrollY * 0.2}px)` }}
        ></div>
        <div
          className='absolute bottom-20 left-10 w-48 h-48 bg-secondary/5 rounded-full blur-3xl'
          style={{ transform: `translateY(${scrollY * -0.1}px)` }}
        ></div>
      </div>

      <div className='max-w-7xl mx-auto'>
        <div className='grid lg:grid-cols-2 gap-12 items-center'>
          {/* Left Content */}
          <div className={`space-y-8 ${isVisible ? 'animate-slide-in-left' : 'opacity-0'}`}>
            <div className='flex items-center space-x-4'>
              <Badge variant='secondary' className='bg-primary/10 text-primary hover:bg-primary/20'>
                <Star className='w-4 h-4 mr-1 fill-current' />
                Hoa cao cấp #1 Việt Nam
              </Badge>
            </div>

            {/* Main Heading */}
            <div className='space-y-4'>
              <h1 className='font-serif text-5xl lg:text-6xl font-bold text-foreground leading-tight'>
                <span className='inline-block animate-float-in animate-delay-500'>Hoa</span>{' '}
                <span className='inline-block animate-float-in animate-delay-700 text-primary'>
                  Tươi
                </span>
              </h1>
              <p className='text-lg text-muted-foreground leading-relaxed max-w-md animate-fade-in-up animate-delay-800'>
                Khám phá bộ sưu tập hoa tươi cao cấp được tuyển chọn kỹ lưỡng. Mỗi bông hoa đều mang
                trong mình câu chuyện riêng và tình yêu đặc biệt.
              </p>
            </div>

            <div className={`${isVisible ? 'animate-bounce-in animate-delay-1000' : 'opacity-0'}`}>
              <Link to={ROUTES.CONTACT}>
                <Button
                  size='lg'
                  className='cursor-pointer bg-secondary hover:bg-secondary/90 text-secondary-foreground px-8 py-6 text-lg font-medium rounded-full shadow-lg hover:shadow-2xl transition-all duration-500 hover-lift group'
                >
                  <span className='group-hover:scale-110 transition-transform duration-300'>
                    Tư vấn miễn phí
                  </span>
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Content - Flower Image */}
          <div className={`relative ${isVisible ? 'animate-slide-in-right' : 'opacity-0'}`}>
            <div className='relative'>
              <Badge className='absolute top-4 right-4 z-10 bg-secondary text-secondary-foreground'>
                <Star className='w-4 h-4 mr-1 fill-current' />
                Premium
              </Badge>

              <div
                className='aspect-square rounded-3xl overflow-hidden bg-primary/5 p-8'
                style={{ transform: `translateY(${scrollY * -0.1}px)` }}
              >
                <img
                  src='../src/assets/imgs/elegant-pink-rose-bouquet.png'
                  alt='Bó hoa cao cấp'
                  className='w-full h-full object-cover rounded-2xl shadow-2xl hover-scale transition-transform duration-700'
                />
              </div>

              <div className='absolute -bottom-4 left-8 bg-card rounded-2xl p-4 shadow-lg border border-border animate-slide-in-bottom animate-delay-800 hover-lift'>
                <div className='flex items-center space-x-3'>
                  <div className='w-10 h-10 bg-secondary rounded-full flex items-center justify-center'>
                    <svg
                      className='w-5 h-5 text-secondary-foreground'
                      fill='currentColor'
                      viewBox='0 0 20 20'
                    >
                      <path d='M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z' />
                    </svg>
                  </div>
                  <div>
                    <p className='font-semibold text-card-foreground'>Miễn phí giao hàng</p>
                    <p className='text-sm text-muted-foreground'>Trong nội thành</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
