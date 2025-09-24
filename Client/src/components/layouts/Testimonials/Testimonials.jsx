import { useState, useEffect } from 'react'
import { Star, Quote } from 'lucide-react'

import { Card, CardContent } from '~/components/ui/card'
import { Badge } from '~/components/ui/badge'
import { testimonials } from '~/data'

function Testimonials() {
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

    const element = document.getElementById('testimonials')
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  return (
    <section id='testimonials' className='py-20 px-4'>
      <div className='max-w-7xl mx-auto'>
        <div className={`text-center mb-16 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <Badge variant='secondary' className='mb-4 bg-secondary/10 text-secondary'>
            Khách hàng nói gì
          </Badge>
          <h2 className='font-serif text-4xl lg:text-5xl font-bold text-foreground mb-4'>
            Những Câu Chuyện Đẹp
          </h2>
          <p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
            Hàng nghìn khách hàng đã tin tưởng và hài lòng với dịch vụ của Nuvexa
          </p>
        </div>

        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {testimonials.map((testimonial, index) => (
            <Card
              key={testimonial.id}
              className={`hover-lift border-0 shadow-lg ${
                isVisible ? `animate-fade-in-up animate-delay-${(index + 1) * 200}` : 'opacity-0'
              }`}
            >
              <CardContent className='p-8'>
                <div className='flex items-center mb-4'>
                  <Quote className='w-8 h-8 text-primary/30 mr-2' />
                  <div className='flex items-center'>
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className='w-4 h-4 text-yellow-400 fill-current' />
                    ))}
                  </div>
                </div>

                <p className='text-muted-foreground leading-relaxed mb-6 italic'>
                  "{testimonial.content}"
                </p>

                <div className='flex items-center'>
                  <img
                    src={testimonial.image || '../src/assets/icons/placeholder.svg'}
                    alt={testimonial.name}
                    className='w-12 h-12 rounded-full object-cover mr-4'
                  />
                  <div>
                    <div className='font-semibold text-foreground'>{testimonial.name}</div>
                    <div className='text-sm text-muted-foreground'>{testimonial.role}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials
