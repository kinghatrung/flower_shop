import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Star, Heart, ShoppingCart, Minus, Plus, Truck, Shield, RotateCcw } from 'lucide-react'

import { Button } from '~/components/ui/button'
import { Badge } from '~/components/ui/badge'
import ProductCard from '~/components/common/products/ProductCard'
import { products } from '~/data'
import { useCart } from '~/context'
import { ROUTES } from '~/constants'

function Product({ params }) {
  const [quantity, setQuantity] = useState(1)
  const [isLiked, setIsLiked] = useState(false)
  const [selectedImage, setSelectedImage] = useState(0)
  const { dispatch: cartDispatch } = useCart()
  const { id } = useParams()

  const product = products.find((p) => p.id === id)

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4)

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price)
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      cartDispatch({ type: 'ADD_ITEM', payload: product })
    }
  }

  // Giả lập hình ảnh bổ sung cho thư viện
  const productImages = [product.image, product.image, product.image]

  return (
    <div className='pt-24 pb-16 px-4'>
      <div className='max-w-7xl mx-auto'>
        {/* Breadcrumb */}
        <div className='flex items-center gap-2 text-sm text-muted-foreground mb-8'>
          <Link to={ROUTES.HOME} className='hover:text-primary'>
            Trang chủ
          </Link>
          <span>/</span>
          <Link to={ROUTES.PRODUCTS} className='hover:text-primary'>
            Sản phẩm
          </Link>
          <span>/</span>
          <span className='text-foreground'>{product.name}</span>
        </div>

        <div className='grid lg:grid-cols-2 gap-12 mb-16'>
          {/* Product Images */}
          <div className='space-y-4'>
            <div className='aspect-square rounded-2xl overflow-hidden bg-muted'>
              <img
                // src={productImages[selectedImage] || '/placeholder.svg'}
                src='../src/assets/icons/placeholder.svg'
                alt={product.name}
                width={600}
                height={600}
                className='w-full h-full object-cover'
              />
            </div>

            {/* Image Thumbnails */}
            <div className='flex gap-2'>
              {productImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 cursor-pointer ${
                    selectedImage === index ? 'border-primary' : 'border-border'
                  }`}
                >
                  <img
                    // src={image || '/placeholder.svg'}
                    src='../src/assets/icons/placeholder.svg'
                    alt={`${product.name} ${index + 1}`}
                    width={80}
                    height={80}
                    className='w-full h-full object-cover'
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className='space-y-6'>
            <div>
              <div className='flex items-center gap-2 mb-2'>
                {product.isNew && (
                  <Badge className='bg-secondary text-secondary-foreground'>Mới</Badge>
                )}
                {product.isBestSeller && (
                  <Badge className='bg-primary text-primary-foreground'>Bán chạy</Badge>
                )}
              </div>
              <h1 className='font-serif text-3xl lg:text-4xl font-bold text-foreground mb-4'>
                {product.name}
              </h1>
              <p className='text-muted-foreground text-lg leading-relaxed'>{product.description}</p>
            </div>

            {/* Rating */}
            <div className='flex items-center gap-4'>
              <div className='flex items-center gap-1'>
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(product.rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-muted-foreground'
                    }`}
                  />
                ))}
              </div>
              <span className='text-foreground font-medium'>{product.rating}</span>
              <span className='text-muted-foreground'>({product.reviews} đánh giá)</span>
            </div>

            {/* Price */}
            <div className='flex items-center gap-4'>
              <span className='font-bold text-3xl text-foreground'>
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className='text-xl text-muted-foreground line-through'>
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>

            {/* Quantity & Add to Cart */}
            <div className='space-y-4'>
              <div className='flex items-center gap-4'>
                <span className='font-medium'>Số lượng:</span>
                <div className='flex items-center border border-border rounded-lg'>
                  <Button
                    className='cursor-pointer'
                    variant='ghost'
                    size='icon'
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    <Minus className='h-4 w-4' />
                  </Button>
                  <span className='px-4 py-2 min-w-[3rem] text-center'>{quantity}</span>
                  <Button
                    className='cursor-pointer'
                    variant='ghost'
                    size='icon'
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Plus className='h-4 w-4' />
                  </Button>
                </div>
              </div>

              <div className='flex gap-4'>
                <Button
                  onClick={handleAddToCart}
                  className='flex-1 bg-secondary hover:bg-secondary/90 text-secondary-foreground cursor-pointer'
                >
                  <ShoppingCart className='h-5 w-5 mr-2' />
                  Thêm vào giỏ hàng
                </Button>
                <Button
                  variant='outline'
                  size='icon'
                  onClick={() => setIsLiked(!isLiked)}
                  className='hover:bg-accent/10 cursor-pointer'
                >
                  <Heart className={`h-5 w-5 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
                </Button>
              </div>
            </div>

            {/* Features */}
            <div className='space-y-3 pt-6 border-t border-border'>
              <div className='flex items-center gap-3'>
                <Truck className='h-5 w-5 text-primary' />
                <span className='text-sm'>Miễn phí giao hàng trong nội thành</span>
              </div>
              <div className='flex items-center gap-3'>
                <Shield className='h-5 w-5 text-primary' />
                <span className='text-sm'>Đảm bảo chất lượng 100%</span>
              </div>
              <div className='flex items-center gap-3'>
                <RotateCcw className='h-5 w-5 text-primary' />
                <span className='text-sm'>Đổi trả trong 24h nếu không hài lòng</span>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className='font-serif text-2xl font-bold text-foreground mb-8'>
              Sản phẩm liên quan
            </h2>
            <div className='grid sm:grid-cols-2 lg:grid-cols-4 gap-6'>
              {relatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Product
