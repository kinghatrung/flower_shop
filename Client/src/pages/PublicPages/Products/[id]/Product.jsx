import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Star, Heart, ShoppingCart, Minus, Plus, Truck, Shield, RotateCcw } from 'lucide-react'
import { useQuery, useQueryClient } from '@tanstack/react-query'

import { Card } from '~/components/ui/card'
import { Button } from '~/components/ui/button'
import { Badge } from '~/components/ui/badge'
import ProductCard from '~/components/common/products/ProductCard'
import { ROUTES } from '~/constants'
import {
  getProduct,
  getProductsByCategoryId,
  createProductCartUser,
  getReviewByProductId,
  createReview
} from '~/api'
import { toast } from 'sonner'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '~/redux/slices/authSlice'
import useTimeoutLoading from '~/hooks/useTimeoutLoading'
import CardReview from '~/components/common/CardReview'
import WriteReviewForm from '~/components/common/WriteReviewForm'
import { queryKeys } from '~/config/queryConfig'

const ratingDistribution = [
  { stars: 5, count: 1240, percentage: 68 },
  { stars: 4, count: 385, percentage: 21 },
  { stars: 3, count: 112, percentage: 6 },
  { stars: 2, count: 35, percentage: 2 },
  { stars: 1, count: 28, percentage: 3 }
]

function Product() {
  const { slug } = useParams()
  const user = useSelector(selectCurrentUser)
  const queryClient = useQueryClient()
  const [pureSlug, idPart] = slug.split(/-i\./)
  const [isLoading, startLoading] = useTimeoutLoading(1000)
  const [showWriteReview, setShowWriteReview] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const [isLiked, setIsLiked] = useState(false)

  const { data } = useQuery({
    queryKey: queryKeys.products.detail(idPart),
    queryFn: () => getProduct(idPart)
  })

  const product = data?.data

  const { data: products } = useQuery({
    queryKey: queryKeys.products.list({ category: product?.category_id }),
    queryFn: () => getProductsByCategoryId(product?.category_id),
    enabled: !!product?.category_id
  })

  const { data: reviewsData } = useQuery({
    queryKey: queryKeys.reviews.byProduct(product?.id),
    queryFn: () => getReviewByProductId(product?.id)
  })

  const reviews = reviewsData?.data || []

  const productItems = products?.data
  const allImages = product?.images || []
  const mainIndex = allImages.findIndex((img) => img.is_main) ?? 0
  const [selectedImage, setSelectedImage] = useState(mainIndex >= 0 ? mainIndex : 0)
  const mainProductImage = allImages[selectedImage]?.url

  const relatedProducts = productItems?.filter((p) => p.id !== product.id)

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price)
  }

  const handleAddToCart = async () => {
    startLoading()
    const payload = {
      userId: user?.user_id,
      productId: product?.id,
      quantity: quantity
    }
    setQuantity(1)
    await createProductCartUser(payload)
    await queryClient.invalidateQueries({ queryKey: queryKeys.cart.byUser(user?.user_id) })
  }

  const handleReviewSubmit = async ({ rating, title, content }) => {
    if (!user) {
      toast.error('Bạn cần đăng nhập để viết đánh giá')
      return
    }
    try {
      await createReview({
        userId: user.user_id,
        productId: product?.id,
        rating,
        title,
        comment: content
      })
      await queryClient.invalidateQueries({ queryKey: queryKeys.reviews.byProduct(product?.id) })
      toast.success('Đánh giá của bạn đã được gửi!')
      setShowWriteReview(false)
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Có lỗi xảy ra khi gửi đánh giá')
    }
  }

  return (
    <div className='pt-24 pb-16 px-4'>
      <div className='max-w-7xl mx-auto'>
        <div className='flex items-center gap-2 text-sm text-muted-foreground mb-8'>
          <Link to={ROUTES.HOME} className='hover:text-primary'>
            Trang chủ
          </Link>
          <span>/</span>
          <Link to={ROUTES.PRODUCTS} className='hover:text-primary'>
            Sản phẩm
          </Link>
          <span>/</span>
          <span className='text-foreground'>{product?.name}</span>
        </div>

        <div className='grid lg:grid-cols-2 gap-12 mb-16'>
          {/* Product Images */}
          <div className='space-y-4'>
            <div className='aspect-square rounded-2xl overflow-hidden bg-muted'>
              <img
                src={mainProductImage}
                alt={product?.name}
                width={600}
                height={600}
                className='w-full h-full object-cover'
              />
            </div>

            {/* Image Thumbnails */}
            <div className='flex gap-2'>
              {allImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 cursor-pointer ${
                    selectedImage === index ? 'border-primary' : 'border-border'
                  }`}
                >
                  <img
                    src={image.url || '/placeholder.svg'}
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
                {product?.is_new && (
                  <Badge className='bg-secondary text-secondary-foreground'>Mới</Badge>
                )}
                {product?.is_best_seller && (
                  <Badge className='bg-primary text-primary-foreground'>Bán chạy</Badge>
                )}
              </div>
              <h1 className='font-serif text-3xl lg:text-4xl font-bold text-foreground mb-4'>
                {product?.name}
              </h1>
              <p className='text-muted-foreground text-lg leading-relaxed'>
                {product?.description}
              </p>
            </div>

            {/* Rating */}
            <div className='flex items-center gap-4'>
              <div className='flex items-center gap-1'>
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(product?.rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-muted-foreground'
                    }`}
                  />
                ))}
              </div>
              <span className='text-foreground font-medium'>{product?.rating}</span>
              <span className='text-muted-foreground'>({product?.reviews} đánh giá)</span>
            </div>

            {/* Price */}
            <div className='flex items-center gap-4'>
              <span className='font-bold text-3xl text-foreground'>
                {formatPrice(product?.price)}
              </span>
              {product?.original_price && (
                <span className='text-xl text-muted-foreground line-through'>
                  {formatPrice(product?.original_price)}
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
                  disabled={isLoading}
                  className='flex-1 bg-secondary hover:bg-secondary/90 text-secondary-foreground cursor-pointer'
                >
                  <ShoppingCart className='h-5 w-5 mr-2' />
                  {isLoading ? 'Đang thêm...' : 'Thêm vào giỏ hàng'}
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

        {/* Product Reviews */}
        <div className='mt-16'>
          <h2 className='font-serif text-2xl font-bold text-foreground mb-8'>Đánh giá sản phẩm</h2>

          {showWriteReview && (
            <div className='mb-12'>
              <WriteReviewForm
                onClose={() => setShowWriteReview(false)}
                onSubmit={handleReviewSubmit}
              />
            </div>
          )}

          <div className='grid lg:grid-cols-3 gap-8'>
            <div className='lg:col-span-1'>
              <Card className='p-8 sticky top-24'>
                <div className='text-center mb-2'>
                  <div className='flex justify-center'>
                    <div className='text-5xl font-bold'>{product?.rating}</div>
                    <div className='flex flex-col justify-center ml-2'>
                      <div className='flex gap-1'>
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={20}
                            className={
                              i < Math.round(product?.rating)
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-gray-300'
                            }
                          />
                        ))}
                      </div>

                      <p className='text-xs text-muted-foreground mt-2'>
                        {product?.reviews.toLocaleString()} đánh giá
                      </p>
                    </div>
                  </div>
                </div>

                <div className='space-y-3 mb-2'>
                  {ratingDistribution.map((rating) => (
                    <div key={rating.stars} className='flex items-center gap-3'>
                      <button className='flex items-center gap-1 hover:text-primary transition-colors'>
                        <span className='text-sm font-medium'>{rating.stars}</span>
                        <Star size={16} className='fill-yellow-400 text-yellow-400' />
                      </button>
                      <div className='flex-1 h-2 bg-muted rounded-full overflow-hidden'>
                        <div
                          className='h-full bg-yellow-400 rounded-full'
                          style={{ width: `${rating.percentage}%` }}
                        />
                      </div>
                      <span className='text-sm text-muted-foreground w-12 text-right'>
                        {rating.percentage}%
                      </span>
                    </div>
                  ))}
                </div>

                <Button
                  onClick={() => setShowWriteReview(!showWriteReview)}
                  className='w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground cursor-pointer'
                >
                  {showWriteReview ? 'Ẩn form' : 'Viết đánh giá'}
                </Button>
              </Card>
            </div>

            <div className='lg:col-span-2 space-y-4'>
              {reviews.length > 0
                ? reviews.map((review) => <CardReview key={review.id} review={review} />)
                : 'Không có đánh giá nào cho sản phẩm này.'}

              <Button className='w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground cursor-pointer'>
                Xem thêm đánh giá
              </Button>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className='mt-16'>
          <h2 className='font-serif text-2xl font-bold text-foreground mb-8'>Sản phẩm liên quan</h2>
          {relatedProducts?.length > 0 ? (
            <div className='grid sm:grid-cols-2 lg:grid-cols-4 gap-6'>
              {relatedProducts?.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          ) : (
            <div>'Không có sản phẩm nào'</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Product
