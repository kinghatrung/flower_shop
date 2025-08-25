import { useState, useEffect } from 'react'
import { Truck, Clock, Palette, HeartHandshake } from 'lucide-react'

import { Card, CardContent } from '~/components/ui/card'
import { Badge } from '~/components/ui/badge'

const services = [
  {
    icon: Truck,
    title: 'Giao Hàng Nhanh',
    description: 'Giao hàng trong 2-4 giờ tại nội thành, đảm bảo hoa tươi nguyên vẹn',
    features: ['Miễn phí giao hàng', 'Đóng gói chuyên nghiệp', 'Theo dõi đơn hàng']
  },
  {
    icon: Clock,
    title: 'Đặt Hàng 24/7',
    description: 'Hệ thống đặt hàng trực tuyến hoạt động 24/7, phục vụ mọi lúc mọi nơi',
    features: ['Đặt hàng online', 'Tư vấn qua điện thoại', 'Hỗ trợ khẩn cấp']
  },
  {
    icon: Palette,
    title: 'Thiết Kế Theo Yêu Cầu',
    description: 'Đội ngũ florist chuyên nghiệp thiết kế theo ý tưởng riêng của bạn',
    features: ['Tư vấn miễn phí', 'Thiết kế độc quyền', 'Chỉnh sửa không giới hạn']
  },
  {
    icon: HeartHandshake,
    title: 'Cam Kết Chất Lượng',
    description: 'Đổi trả trong 24h nếu không hài lòng, bảo hành chất lượng hoa tươi',
    features: ['Bảo hành 7 ngày', 'Đổi trả miễn phí', 'Hỗ trợ sau bán hàng']
  }
]

function Services() {
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

    const element = document.getElementById('services')
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  return (
    <section id='services' className='py-20 px-4'>
      <div className='max-w-7xl mx-auto'>
        <div className={`text-center mb-16 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <Badge variant='secondary' className='mb-4 bg-secondary/10 text-secondary'>
            Dịch vụ của chúng tôi
          </Badge>
          <h2 className='font-serif text-4xl lg:text-5xl font-bold text-foreground mb-4'>
            Tại Sao Chọn Nuvexa?
          </h2>
          <p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
            Chúng tôi cam kết mang đến trải nghiệm mua hoa tuyệt vời nhất với dịch vụ chuyên nghiệp
          </p>
        </div>

        <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-8'>
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <Card
                key={index}
                className={`group hover-lift border-0 shadow-lg text-center ${
                  isVisible ? `animate-fade-in-up animate-delay-${(index + 1) * 200}` : 'opacity-0'
                }`}
              >
                <CardContent className='p-8'>
                  <div className='w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300'>
                    <Icon className='w-8 h-8 text-white' />
                  </div>

                  <h3 className='font-serif text-xl font-semibold text-foreground mb-4'>
                    {service.title}
                  </h3>

                  <p className='text-muted-foreground mb-6 leading-relaxed'>
                    {service.description}
                  </p>

                  <ul className='space-y-2'>
                    {service.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className='text-sm text-muted-foreground flex items-center justify-center'
                      >
                        <div className='w-1.5 h-1.5 bg-primary rounded-full mr-2'></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Services
