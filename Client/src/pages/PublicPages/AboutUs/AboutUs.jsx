import { useState, useEffect } from 'react'
import { Truck, Clock, Palette, HeartHandshake } from 'lucide-react'
import { useScrollAnimation } from '~/hooks/useScrollAnimationOptions'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'

function AboutUs() {
  const { isVisible: headerVisible, ref: headerRef } = useScrollAnimation()
  const { isVisible: formVisible, ref: formRef } = useScrollAnimation()
  const { isVisible: contactInfoVisible, ref: contactInfoRef } = useScrollAnimation()

  return (
    <div className='pt-24 pb-16 px-8 lg:px-20'>
      <div className='max-w-7xl mx-auto'>
        <div
          ref={headerRef}
          className={`text-center space-y-4 mb-16 ${
            headerVisible ? 'animate-fade-in-up' : 'opacity-0'
          }`}
        >
          <h1 className='font-serif text-4xl lg:text-5xl font-bold text-foreground'>
            Về chúng tôi
          </h1>
          <p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
            Chúng tôi tin rằng những giá trị tốt đẹp được tạo ra từ sự sẻ chia và đồng hành. Mục
            tiêu của chúng tôi là góp phần lan tỏa năng lượng tích cực đến cộng đồng.
          </p>
        </div>
      </div>

      <div className='grid lg:grid-cols-2 gap-12 items-center'>
        <div ref={formRef} className={formVisible ? 'animate-slide-in-left' : 'opacity-0'}>
          <div className='relative group overflow-hidden rounded-2xl shadow-xl'>
            <img
              src='/image/anhbanner.jpg'
              alt='Nuvexa flower arrangements showcase'
              className='w-full h-auto aspect-square object-cover group-hover:scale-105 transition-transform duration-500'
            />
            <div className='absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
          </div>
        </div>

        <div
          ref={contactInfoRef}
          className={`space-y-6 ${contactInfoVisible ? 'animate-slide-in-right' : 'opacity-0'}`}
        >
          <div className='space-y-8'>
            <Card className='border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-card/80 backdrop-blur-sm'>
              <CardContent className='p-8 md:p-10 space-y-6'>
                <div className='space-y-4'>
                  <h2 className='font-serif text-3xl font-bold text-foreground'>
                    Thế Giới Hoa Tươi Rực Rỡ
                  </h2>
                  <p className='text-base md:text-lg text-muted-foreground leading-relaxed'>
                    Nuvexa – thiên đường của những bó hoa tươi rực rỡ! Với niềm đam mê và sự tinh
                    tế, Nuvexa mang đến những mẫu hoa được thiết kế độc đáo, từ bó hoa đáng yêu dành
                    cho những dịp đặc biệt đến những lẵng hoa sang trọng cho sự kiện quan trọng.
                  </p>
                </div>
                <div className='border-t border-border pt-6'>
                  <p className='text-base text-muted-foreground leading-relaxed'>
                    Mỗi tác phẩm hoa tại Nuvexa đều được chăm chút tỉ mỉ từ những bông hoa tươi
                    nhất, gửi gắm thông điệp yêu thương và cảm xúc chân thành đến người nhận.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutUs
