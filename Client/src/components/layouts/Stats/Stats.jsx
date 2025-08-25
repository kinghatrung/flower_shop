import { useState, useEffect } from 'react'
import { Heart, Star, Clock } from 'lucide-react'
function Stats() {
  const [isVisible, setIsVisible] = useState(false)
  const [customerCount, setCustomerCount] = useState(0)
  const [ratingCount, setRatingCount] = useState(0)
  const [deliveryCount, setDeliveryCount] = useState(0)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          const animateCount = (setter, target, duration) => {
            let start = 0
            const increment = target / (duration / 16)
            const timer = setInterval(() => {
              start += increment
              if (start >= target) {
                setter(target)
                clearInterval(timer)
              } else {
                setter(Math.floor(start))
              }
            }, 16)
          }

          animateCount(setCustomerCount, 5000, 2000)
          animateCount(setRatingCount, 49, 2000)
          animateCount(setDeliveryCount, 1, 1500)
        }
      },
      { threshold: 0.3 }
    )

    const element = document.getElementById('stats-section')
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  const stats = [
    {
      icon: Heart,
      number: `${customerCount.toLocaleString()}+`,
      label: 'Khách hàng yêu thích',
      delay: 'animate-delay-200'
    },
    {
      icon: Star,
      number: `${(ratingCount / 10).toFixed(1)}`,
      label: 'Đánh giá trung bình',
      delay: 'animate-delay-400'
    },
    {
      icon: Clock,
      number: `${deliveryCount}h`,
      label: 'Giao hàng nhanh',
      delay: 'animate-delay-600'
    }
  ]

  return (
    <section id='stats-section' className='py-16 px-4 bg-gradient-to-b from-background to-muted/10'>
      <div className='container mx-auto'>
        <div className='grid md:grid-cols-3 gap-8 max-w-4xl mx-auto'>
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`text-center space-y-4 group ${isVisible ? `animate-fade-in-up` : 'opacity-0'}`}
            >
              <div className='flex justify-center'>
                <div className='w-16 h-16 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 hover-lift'>
                  <stat.icon className='w-8 h-8 text-primary' />
                </div>
              </div>
              <div>
                <h3 className='font-serif text-4xl font-bold text-foreground mb-2'>
                  {stat.number}
                </h3>
                <p className='text-muted-foreground font-medium'>{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Stats
