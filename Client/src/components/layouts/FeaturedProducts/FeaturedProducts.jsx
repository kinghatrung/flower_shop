import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'

import { Button } from '~/components/ui/button'
import { Badge } from '~/components/ui/badge'
import { ROUTES } from '~/constants/'
import { getProductsAll } from '~/api'
import ProductCard from '~/components/common/products/ProductCard'
import { useScrollAnimation } from '~/hooks/useScrollAnimationOptions'

function FeaturedProducts() {
  const { data } = useQuery({
    queryKey: ['products'],
    queryFn: () => getProductsAll()
  })

  const products = data?.data
    ?.filter((product) => product.is_new && product.is_best_seller)
    .slice(0, 3)

  const { isVisible: productsVisible, ref: productsRef } = useScrollAnimation()
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

        <div ref={productsRef} className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {products?.map((product, index) => (
            <div
              key={product.id}
              className={`transition-all duration-500 ${productsVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
              style={{
                animationDelay: productsVisible ? `${index * 0.1}s` : '0s'
              }}
            >
              <ProductCard product={product} />
            </div>
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
