import { Link, useNavigate } from 'react-router-dom'
import { Minus, Plus, Trash2, ArrowLeft, ShoppingBag } from 'lucide-react'

import { Button } from '~/components/ui/button'
import { Card, CardContent } from '~/components/ui/card'
import { Separator } from '~/components/ui/separator'
import { useCart } from '~/context'
import { ROUTES } from '~/constants/routesPath'

function Cart() {
  const { state, dispatch } = useCart()

  const navigate = useNavigate()

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price)
  }

  const updateQuantity = (id, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } })
  }

  const removeItem = (id) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id })
  }

  if (state.items.length === 0) {
    return (
      <div className='min-h-screen bg-background'>
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
            Giỏ hàng ({state.itemCount})
          </h1>
        </div>

        <div className='grid lg:grid-cols-3 gap-8'>
          {/* Cart Items */}
          <div className='lg:col-span-2 space-y-4'>
            {state.items.map((item) => (
              <Card key={item.id}>
                <CardContent className='p-6'>
                  <div className='flex gap-4'>
                    <div className='w-24 h-24 rounded-lg overflow-hidden bg-muted flex-shrink-0'>
                      <Link to={ROUTES.PRODUCTS}>
                        <img
                          // src={item.image || '/placeholder.svg'}
                          src='../src/assets/icons/placeholder.svg'
                          alt={item.name}
                          width={96}
                          height={96}
                          className='w-full h-full object-cover'
                        />
                      </Link>
                    </div>

                    <div className='flex-1 space-y-2'>
                      <Link to={`${ROUTES.PRODUCTS}/${item.id}`}>
                        <h3 className='font-semibold text-foreground hover:text-primary transition-colors'>
                          {item.name}
                        </h3>
                      </Link>
                      <p className='text-sm text-muted-foreground line-clamp-2'>
                        {item.description}
                      </p>
                      <div className='flex items-center justify-between'>
                        <span className='font-bold text-foreground'>{formatPrice(item.price)}</span>

                        <div className='flex items-center gap-3'>
                          {/* Quantity Controls */}
                          <div className='flex items-center border border-border rounded-lg'>
                            <Button
                              variant='ghost'
                              size='icon'
                              className='h-8 w-8 cursor-pointer'
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                            >
                              <Minus className='h-3 w-3' />
                            </Button>
                            <span className='px-3 py-1 text-sm min-w-[2rem] text-center'>
                              {item.quantity}
                            </span>
                            <Button
                              variant='ghost'
                              size='icon'
                              className='h-8 w-8 cursor-pointer'
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus className='h-3 w-3' />
                            </Button>
                          </div>

                          {/* Remove Button */}
                          <Button
                            variant='ghost'
                            size='icon'
                            className='h-8 w-8 cursor-pointer text-destructive hover:text-destructive hover:bg-destructive/10'
                            onClick={() => removeItem(item.id)}
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
                    <span>Tạm tính ({state.itemCount} sản phẩm)</span>
                    <span>{formatPrice(state.total)}</span>
                  </div>
                  <div className='flex justify-between text-sm'>
                    <span>Phí vận chuyển</span>
                    <span className='text-primary'>Miễn phí</span>
                  </div>
                </div>

                <Separator />

                <div className='flex justify-between font-bold text-lg'>
                  <span>Tổng cộng</span>
                  <span>{formatPrice(state.total)}</span>
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
