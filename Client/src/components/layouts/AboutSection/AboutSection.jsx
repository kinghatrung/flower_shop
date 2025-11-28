import { useState, useEffect } from 'react'
import { Award, Users, Flower } from 'lucide-react'
import { Link } from 'react-router-dom'

import { Button } from '~/components/ui/button'
import { Badge } from '~/components/ui/badge'
import { ROUTES } from '~/constants'

function AboutSection() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    const element = document.getElementById('about-section')
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  return (
    <section
      id='about-section'
      className='py-20 px-4 bg-gradient-to-r from-primary/5 to-secondary/5'
    >
      <div className='max-w-7xl mx-auto'>
        <div className='grid lg:grid-cols-2 gap-16 items-center'>
          <div className={`${isVisible ? 'animate-fade-in-left' : 'opacity-0'}`}>
            <Badge variant='secondary' className='mb-4 bg-primary/10 text-primary'>
              Về Nuvexa
            </Badge>
            <h2 className='font-serif text-4xl lg:text-5xl font-bold text-foreground mb-6'>
              Câu Chuyện Của Chúng Tôi
            </h2>
            <div className='space-y-4 text-muted-foreground leading-relaxed'>
              <p>
                Nuvexa được thành lập với niềm đam mê mang vẻ đẹp của thiên nhiên đến gần hơn với
                cuộc sống hàng ngày. Chúng tôi tin rằng mỗi bông hoa đều có thể kể một câu chuyện và
                truyền tải những cảm xúc sâu sắc.
              </p>
              <p>
                Với hơn 10 năm kinh nghiệm trong ngành hoa tươi, đội ngũ florist chuyên nghiệp của
                chúng tôi luôn tận tâm tạo ra những tác phẩm nghệ thuật từ hoa, mang đến niềm vui và
                hạnh phúc cho khách hàng.
              </p>
            </div>

            <div className='grid grid-cols-3 gap-6 my-8'>
              <div className='text-center'>
                <div className='w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2'>
                  <Award className='w-6 h-6 text-primary' />
                </div>
                <div className='font-bold text-2xl text-foreground'>10+</div>
                <div className='text-sm text-muted-foreground'>Năm kinh nghiệm</div>
              </div>
              <div className='text-center'>
                <div className='w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-2'>
                  <Users className='w-6 h-6 text-secondary' />
                </div>
                <div className='font-bold text-2xl text-foreground'>5000+</div>
                <div className='text-sm text-muted-foreground'>Khách hàng hài lòng</div>
              </div>
              <div className='text-center'>
                <div className='w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2'>
                  <Flower className='w-6 h-6 text-primary' />
                </div>
                <div className='font-bold text-2xl text-foreground'>100+</div>
                <div className='text-sm text-muted-foreground'>Loại hoa khác nhau</div>
              </div>
            </div>
            <Link to={ROUTES.ABOUTUS}>
              <Button
                size='lg'
                className='cursor-pointer bg-secondary hover:bg-secondary/90 text-secondary-foreground'
              >
                Tìm hiểu thêm về chúng tôi
              </Button>
            </Link>
          </div>

          <div className={`${isVisible ? 'animate-fade-in-right' : 'opacity-0'}`}>
            <div className='relative'>
              <div className='aspect-square rounded-3xl overflow-hidden'>
                <img
                  src='../src/assets/imgs/florist-workshop.png'
                  alt='Florist làm việc'
                  className='w-full h-full object-cover'
                />
              </div>
              <div className='absolute -bottom-6 -left-6 bg-white rounded-2xl p-6 shadow-xl border'>
                <div className='flex items-center space-x-4'>
                  <div className='w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center'>
                    <Flower className='w-6 h-6 text-white' />
                  </div>
                  <div>
                    <div className='font-semibold text-foreground'>Florist chuyên nghiệp</div>
                    <div className='text-sm text-muted-foreground'>Đào tạo quốc tế</div>
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

export default AboutSection
