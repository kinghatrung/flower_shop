import { Link, useNavigate } from 'react-router-dom'
import { Minus, Plus, Trash2, ArrowLeft, ShoppingBag } from 'lucide-react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useSelector } from 'react-redux'

import { Button } from '~/components/ui/button'
import { Card, CardContent } from '~/components/ui/card'
import { Separator } from '~/components/ui/separator'
import { useCart } from '~/context'
import { ROUTES } from '~/constants'
import { getProductCart, deleteProductCartUser, updateProductCartUser } from '~/api'
import { selectCurrentUser } from '~/redux/slices/authSlice'

function Cart() {
  const user = useSelector(selectCurrentUser)
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { state: cartState, dispatch: cartDispatch } = useCart()

  const { data, isLoading } = useQuery({
    queryKey: ['cart', user?.user_id],
    queryFn: () => getProductCart(user?.user_id)
  })

  const products = data?.data

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price)
  }

  // const totalPrice = products.map(product =>)

  const updateQuantity = async (product, quantity) => {
    const payload = {
      userId: user?.user_id,
      productId: product?.product_id,
      quantity: quantity
    }
    await updateProductCartUser(payload)
    await queryClient.invalidateQueries(['cart'])
  }

  const removeItem = async (product) => {
    await deleteProductCartUser(user?.user_id, product?.product_id)
    await queryClient.invalidateQueries(['cart'])
  }

  if (products?.length === 0) {
    return (
      <div className='min-h-screen bg-background flex justify-center items-center'>
        <div className='pt-24 pb-16 px-4'>
          <div className='max-w-4xl mx-auto text-center'>
            <div className='space-y-6'>
              <ShoppingBag className='h-24 w-24 text-muted-foreground mx-auto' />
              <h1 className='font-serif text-3xl font-bold text-foreground'>Giỏ hàng trống</h1>
              <p className='text-muted-foreground'>Bạn chưa có sản phẩm nào trong giỏ hàng</p>
              <Link to={ROUTES.PRODUCTS}>
                <Button className='bg-secondary hover:bg-secondary/90 text-secondary-foreground cursor-pointer'>
                  Tiếp tục mua sắm
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='pt-24 pb-16 px-4'>
      <div className='max-w-6xl mx-auto'>
        {/* Header */}
        <div className='flex items-center gap-4 mb-8'>
          <Link onClick={() => navigate(-1)}>
            <Button variant='ghost' size='icon' className='cursor-pointer'>
              <ArrowLeft className='h-5 w-5' />
            </Button>
          </Link>
          <h1 className='font-serif text-3xl font-bold text-foreground'>
            Giỏ hàng ({products?.length})
          </h1>
        </div>

        <div className='grid lg:grid-cols-3 gap-8'>
          {/* Cart Items */}
          <div className='lg:col-span-2 space-y-4'>
            {products?.map((product) => (
              <Card key={product.id}>
                <CardContent className='p-6'>
                  <div className='flex gap-4'>
                    <div className='w-24 h-24 rounded-lg overflow-hidden bg-muted flex-shrink-0'>
                      <Link
                        to={`${ROUTES.PRODUCTS}/product/${product.slug}-i.${product.product_id}`}
                      >
                        <img
                          src={product?.images?.find((img) => img.is_main === true)?.url}
                          alt={product.name}
                          width={96}
                          height={96}
                          className='w-full h-full object-cover'
                        />
                      </Link>
                    </div>

                    <div className='flex-1 space-y-2'>
                      <Link
                        to={`${ROUTES.PRODUCTS}/product/${product.slug}-i.${product.product_id}`}
                      >
                        <h3 className='font-semibold text-foreground hover:text-primary transition-colors'>
                          {product.name}
                        </h3>
                      </Link>
                      <p className='text-sm text-muted-foreground line-clamp-2'>
                        {product.description}
                      </p>
                      <div className='flex items-center justify-between'>
                        <span className='font-bold text-foreground'>
                          {formatPrice(product.price)}
                        </span>

                        <div className='flex items-center gap-3'>
                          {/* Quantity Controls */}
                          <div className='flex items-center border border-border rounded-lg'>
                            <Button
                              variant='ghost'
                              size='icon'
                              className='h-8 w-8 cursor-pointer'
                              onClick={() => updateQuantity(product, product.quantity - 1)}
                              disabled={product.quantity <= 1}
                            >
                              <Minus className='h-3 w-3' />
                            </Button>
                            <span className='px-3 py-1 text-sm min-w-[2rem] text-center'>
                              {product.quantity}
                            </span>
                            <Button
                              variant='ghost'
                              size='icon'
                              className='h-8 w-8 cursor-pointer'
                              onClick={() => updateQuantity(product, product.quantity + 1)}
                            >
                              <Plus className='h-3 w-3' />
                            </Button>
                          </div>

                          {/* Remove Button */}
                          <Button
                            variant='ghost'
                            size='icon'
                            className='h-8 w-8 cursor-pointer text-destructive hover:text-destructive hover:bg-destructive/10'
                            onClick={() => removeItem(product)}
                          >
                            <Trash2 className='h-4 w-4' />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className='lg:col-span-1'>
            <Card className='sticky top-24'>
              <CardContent className='p-6 space-y-4'>
                <h2 className='font-semibold text-lg'>Tóm tắt đơn hàng</h2>

                <div className='space-y-2'>
                  <div className='flex justify-between text-sm'>
                    <span>Tạm tính ({products?.length} sản phẩm)</span>
                    <span>{formatPrice(products[0].total_amount)}</span>
                  </div>
                  <div className='flex justify-between text-sm'>
                    <span>Phí vận chuyển</span>
                    <span className='text-primary'>Miễn phí</span>
                  </div>
                </div>

                <Separator />

                <div className='flex justify-between font-bold text-lg'>
                  <span>Tổng cộng</span>
                  <span>{formatPrice(products[0].total_amount)}</span>
                </div>

                <Link to={ROUTES.CHECKOUT} className='block'>
                  <Button className='w-full cursor-pointer bg-secondary hover:bg-secondary/90 text-secondary-foreground'>
                    Tiến hành thanh toán
                  </Button>
                </Link>

                <Link to={ROUTES.PRODUCTS}>
                  <Button variant='outline' className='w-full bg-transparent cursor-pointer'>
                    Tiếp tục mua sắm
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
