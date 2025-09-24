import { useState, useEffect } from 'react'
import { Star, Heart, ShoppingCart, IceCreamBowl } from 'lucide-react'
import { Link } from 'react-router-dom'

import { Button } from '~/components/ui/button'
import { Card, CardContent } from '~/components/ui/card'
import { Badge } from '~/components/ui/badge'
import { ROUTES } from '~/constants/'
import { featuredProducts } from '~/data'

function FeaturedProducts() {
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

    const element = document.getElementById('featured-products')
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  return (
    <section
      id='featured-products'
      className='py-20 px-4 bg-gradient-to-b from-background to-muted/20'
    >
      <div className='max-w-7xl mx-auto'>
        <div className={`text-center mb-16 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <Badge variant='secondary' className='mb-4 bg-primary/10 text-primary'>
            Sản phẩm nổi bật
          </Badge>
          <h2 className='font-serif text-4xl lg:text-5xl font-bold text-foreground mb-4'>
            Bộ Sưu Tập Đặc Biệt
          </h2>
          <p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
            Những bó hoa được yêu thích nhất, được tuyển chọn kỹ lưỡng từ những loài hoa tươi nhất
          </p>
        </div>

        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {featuredProducts.map((product, index) => (
            <Card
              key={product.id}
              className={`group hover-lift border-0 shadow-lg overflow-hidden p-0 opacity-0 ${
                isVisible ? `animate-fade-in-up` : 'opacity-0'
              }`}
            >
              <CardContent className='p-0'>
                <div className='relative overflow-hidden'>
                  <Link to={`${ROUTES.PRODUCTS}/product/${product.id}`}>
                    <img
                      src={product.image || '../src/assets/icons/placeholder.svg'}
                      alt={product.name}
                      className='w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500'
                    />
                  </Link>
                  <Badge className='absolute top-4 left-4 bg-secondary text-secondary-foreground'>
                    {product.badge}
                  </Badge>
                  <button className='absolute top-4 right-4 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                    <Heart className='w-5 h-5 text-gray-600' />
                  </button>
                </div>

                <div className='p-6'>
                  <div className='flex items-center mb-2'>
                    <div className='flex items-center'>
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(product.rating)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className='text-sm text-muted-foreground ml-2'>
                      {product.rating} ({product.reviews} đánh giá)
                    </span>
                  </div>

                  <h3 className='font-serif text-xl font-semibold text-foreground mb-3'>
                    <Link to={`${ROUTES.PRODUCTS}/product/${product.id}`}>{product.name}</Link>
                  </h3>

                  <div className='flex items-center justify-between mb-4'>
                    <div className='flex items-center space-x-2'>
                      <span className='text-2xl font-bold text-secondary'>{product.price}đ</span>
                      {product.originalPrice && (
                        <span className='text-sm text-muted-foreground line-through'>
                          {product.originalPrice}đ
                        </span>
                      )}
                    </div>
                  </div>

                  <Button className='w-full cursor-pointer bg-primary hover:bg-primary/90 text-secondary-foreground'>
                    <ShoppingCart className='w-4 h-4 mr-2' />
                    Thêm vào giỏ
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className={`text-center mt-12 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <Link to={ROUTES.PRODUCTS}>
            <Button variant='outline' size='lg' className='px-8 bg-transparent cursor-pointer'>
              Xem tất cả sản phẩm
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default FeaturedProducts
