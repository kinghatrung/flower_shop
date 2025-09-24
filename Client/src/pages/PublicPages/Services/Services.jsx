import { Link } from 'react-router-dom'
import { CheckCircle, ArrowRight } from 'lucide-react'

import { Button } from '~/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Badge } from '~/components/ui/badge'
import { additionalServices, services } from '~/data'
import { useScrollAnimation } from '~/hooks/useScrollAnimationOptions'
import { ROUTES } from '~/constants'

function Services() {
  const { isVisible: headerVisible, ref: headerRef } = useScrollAnimation()
  const { isVisible: servicesVisible, ref: servicesRef } = useScrollAnimation()
  const { isVisible: commitmentVisible, ref: commitmentRef } = useScrollAnimation()
  const { isVisible: ctaVisible, ref: ctaRef } = useScrollAnimation()

  return (
    <div className='pt-24 pb-16 px-4'>
      <div className='max-w-7xl mx-auto'>
        {/* Page Header */}
        <div
          ref={headerRef}
          className={`text-center space-y-4 mb-16 ${headerVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
        >
          <h1 className='font-serif text-4xl lg:text-5xl font-bold text-foreground'>
            Dịch vụ của chúng tôi
          </h1>
          <p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
            Nuvexa cung cấp đa dạng dịch vụ hoa tươi chuyên nghiệp, từ hoa cưới sang trọng đến hoa
            sinh nhật đầy màu sắc, phục vụ mọi nhu cầu của bạn.
          </p>
        </div>

        {/* Services Grid */}
        <div
          ref={servicesRef}
          className={`grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16 stagger-children animate ${servicesVisible ? '' : 'opacity-0'}`}
        >
          {services.map((service, index) => {
            const IconComponent = service.icon
            return (
              <Card
                key={service.id}
                className='relative hover-lift opacity-0'
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                {service.popular && (
                  <Badge className='absolute -top-2 left-4 bg-secondary text-secondary-foreground'>
                    Phổ biến
                  </Badge>
                )}
                <CardHeader>
                  <div className='flex items-center gap-3 mb-2'>
                    <div className='w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center'>
                      <IconComponent className='h-6 w-6 text-primary' />
                    </div>
                    <CardTitle className='text-xl'>{service.title}</CardTitle>
                  </div>
                  <p className='text-muted-foreground'>{service.description}</p>
                </CardHeader>
                <CardContent className='space-y-4'>
                  <ul className='space-y-2'>
                    {service.features.map((feature, index) => (
                      <li key={index} className='flex items-center gap-2 text-sm'>
                        <CheckCircle className='h-4 w-4 text-primary flex-shrink-0' />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className='pt-4 border-t border-border'>
                    <div className='flex items-center justify-between'>
                      <span className='font-bold text-lg text-primary'>{service.price}</span>
                      <Link to={ROUTES.CONTACT}>
                        <Button
                          size='sm'
                          className='bg-secondary hover:bg-secondary/90 text-secondary-foreground cursor-pointer'
                        >
                          Tư vấn
                          <ArrowRight className='h-4 w-4 ml-1' />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Additional Services */}
        <div
          ref={commitmentRef}
          className={`bg-card rounded-2xl p-8 border border-border ${commitmentVisible ? 'animate-slide-in-bottom' : 'opacity-0'}`}
        >
          <div className='text-center mb-8'>
            <h2 className='font-serif text-3xl font-bold text-foreground mb-4'>Cam kết dịch vụ</h2>
            <p className='text-muted-foreground'>
              Chúng tôi cam kết mang đến trải nghiệm dịch vụ tốt nhất cho khách hàng
            </p>
          </div>

          <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-4 stagger-children animate'>
            {additionalServices.map((service, index) => (
              <div
                key={index}
                className='flex items-center gap-3 p-4 bg-primary/5 rounded-lg opacity-0'
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CheckCircle className='h-5 w-5 text-primary flex-shrink-0' />
                <span className='text-sm font-medium'>{service}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div
          ref={ctaRef}
          className={`text-center mt-16 space-y-6 ${ctaVisible ? 'animate-bounce-in' : 'opacity-0'}`}
        >
          <h2 className='font-serif text-3xl font-bold text-foreground'>Sẵn sàng đặt hoa?</h2>
          <p className='text-muted-foreground max-w-xl mx-auto'>
            Liên hệ với chúng tôi ngay hôm nay để được tư vấn miễn phí và nhận ưu đãi đặc biệt cho
            đơn hàng đầu tiên.
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <Link to={ROUTES.PRODUCTS}>
              <Button
                size='lg'
                className='bg-secondary hover:bg-secondary/90 text-secondary-foreground cursor-pointer'
              >
                Xem sản phẩm
              </Button>
            </Link>
            <Link to={ROUTES.CONTACT}>
              <Button size='lg' variant='outline' className='cursor-pointer'>
                Liên hệ tư vấn
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Services
