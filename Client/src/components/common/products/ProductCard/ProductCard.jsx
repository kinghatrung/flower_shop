import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Star, Heart, ShoppingCart } from 'lucide-react'

import { Button } from '~/components/ui/button'
import { Badge } from '~/components/ui/badge'
import { Card, CardContent } from '~/components/ui/card'
import { useCart } from '~/context'
import { ROUTES } from '~/constants/routesPath'

function ProductCard({ product }) {
  const [isLiked, setIsLiked] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { dispatch } = useCart()

  const handleAddToCart = async () => {
    setIsLoading(true)
    dispatch({ type: 'ADD_ITEM', payload: product })
    await new Promise((resolve) => setTimeout(resolve, 500))
    setIsLoading(false)
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price)
  }

  return (
    <Card className='group hover-lift overflow-hidden border-border p-0'>
      <div className='relative aspect-square overflow-hidden'>
        <Link to={`${ROUTES.PRODUCTS}/product/${product.id}`}>
          <img
            // src={product.image || '../src/assets/icons/placeholder.svg'}
            src='../src/assets/icons/placeholder.svg'
            alt={product.name}
            className='object-cover group-hover:scale-105 transition-transform duration-300'
          />
        </Link>

        {/* Badges */}
        <div className='absolute top-3 left-3 flex flex-col gap-2'>
          {product.isNew && <Badge className='bg-secondary text-secondary-foreground'>Mới</Badge>}
          {product.isBestSeller && (
            <Badge className='bg-primary text-primary-foreground'>Bán chạy</Badge>
          )}
        </div>

        {/* Wishlist Button */}
        <Button
          variant='ghost'
          size='icon'
          className='absolute top-3 right-3 bg-background/80 hover:bg-background cursor-pointer'
          onClick={() => setIsLiked(!isLiked)}
        >
          <Heart
            className={`h-4 w-4 ${isLiked ? 'fill-red-500 text-red-500' : 'text-muted-foreground'}`}
          />
        </Button>

        {/* Quick Add to Cart */}
        <div className='absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity'>
          <Button
            onClick={handleAddToCart}
            disabled={isLoading}
            className='w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground cursor-pointer'
          >
            <ShoppingCart className='h-4 w-4 mr-2' />
            {isLoading ? 'Đang thêm...' : 'Thêm vào giỏ'}
          </Button>
        </div>
      </div>

      <CardContent className='p-4'>
        <div className='space-y-2'>
          <Link to={`${ROUTES.PRODUCTS}/product/${product.id}`}>
            <h3 className='font-semibold text-card-foreground hover:text-primary transition-colors line-clamp-2'>
              {product.name}s
            </h3>
          </Link>

          <p className='text-sm text-muted-foreground line-clamp-2'>{product.description}</p>

          {/* Rating */}
          <div className='flex items-center gap-1'>
            <div className='flex items-center'>
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-3 w-3 ${
                    i < Math.floor(product.rating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-muted-foreground'
                  }`}
                />
              ))}
            </div>
            <span className='text-xs text-muted-foreground'>
              {product.rating} ({product.reviews})
            </span>
          </div>

          {/* Price */}
          <div className='flex items-center gap-2'>
            <span className='font-bold text-foreground'>{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <span className='text-sm text-muted-foreground line-through'>
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default ProductCard
