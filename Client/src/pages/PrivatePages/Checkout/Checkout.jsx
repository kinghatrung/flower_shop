import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { ArrowLeft, CreditCard, Truck, MapPin, User, Check } from 'lucide-react'

import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { Textarea } from '~/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Separator } from '~/components/ui/separator'
import { RadioGroup, RadioGroupItem } from '~/components/ui/radio-group'
import { useCart } from '~/context'
import { ROUTES } from '~/constants'

function Checkout() {
  const router = useNavigate()
  const { state: cartState, dispatch: cartDispatch } = useCart()
  const [isLoading, setIsLoading] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    customerInfo: {
      fullName: '',
      email: '',
      phone: ''
    },
    shippingAddress: {
      address: '',
      ward: '',
      district: '',
      city: 'TP. Hồ Chí Minh',
      note: ''
    },
    paymentMethod: 'cod'
  })

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price)
  }

  const handleInputChange = (section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }))
  }

  const validateStep = (step) => {
    switch (step) {
      case 1:
        return (
          formData.customerInfo.fullName &&
          formData.customerInfo.email &&
          formData.customerInfo.phone &&
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.customerInfo.email) &&
          /^[0-9]{10,11}$/.test(formData.customerInfo.phone)
        )
      case 2:
        return (
          formData.shippingAddress.address &&
          formData.shippingAddress.ward &&
          formData.shippingAddress.district &&
          formData.shippingAddress.city
        )
      case 3:
        return formData.paymentMethod
      default:
        return false
    }
  }

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleSubmitOrder = async () => {
    if (!validateStep(3)) return

    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Generate order ID
    const orderId = `BL${Date.now().toString().slice(-6)}`

    // Clear cart
    cartDispatch({ type: 'CLEAR_CART' })

    // Redirect to success page
    router.push(`/checkout/success?orderId=${orderId}`)
  }

  if (cartState.items.length === 0) {
    return (
      <div className='pt-24 pb-16 px-4'>
        <div className='max-w-4xl mx-auto text-center'>
          <h1 className='font-serif text-3xl font-bold text-foreground mb-4'>Giỏ hàng trống</h1>
          <p className='text-muted-foreground mb-6'>
            Bạn cần thêm sản phẩm vào giỏ hàng trước khi thanh toán
          </p>
          <Link to={ROUTES.PRODUCTS}>
            <Button className='bg-secondary hover:bg-secondary/90 text-secondary-foreground'>
              Tiếp tục mua sắm
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className='pt-24 pb-16 px-4'>
      <div className='max-w-6xl mx-auto'>
        {/* Header */}
        <div className='flex items-center gap-4 mb-8'>
          <Link to={ROUTES.CART}>
            <Button variant='ghost' size='icon'>
              <ArrowLeft className='h-5 w-5' />
            </Button>
          </Link>
          <h1 className='font-serif text-3xl font-bold text-foreground'>Thanh toán</h1>
        </div>

        {/* Progress Steps */}
        <div className='flex items-center justify-center mb-8'>
          <div className='flex items-center space-x-4'>
            {[1, 2, 3].map((step) => (
              <div key={step} className='flex items-center'>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step <= currentStep
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {step < currentStep ? <Check className='h-4 w-4' /> : step}
                </div>
                {step < 3 && (
                  <div
                    className={`w-12 h-0.5 mx-2 ${step < currentStep ? 'bg-primary' : 'bg-muted'}`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className='grid lg:grid-cols-3 gap-8'>
          {/* Checkout Form */}
          <div className='lg:col-span-2 space-y-6'>
            {/* Step 1: Customer Information */}
            {currentStep >= 1 && (
              <Card>
                <CardHeader>
                  <CardTitle className='flex items-center gap-2'>
                    <User className='h-5 w-5' />
                    Thông tin khách hàng
                  </CardTitle>
                </CardHeader>
                <CardContent className='space-y-4'>
                  <div>
                    <Label htmlFor='fullName'>Họ và tên *</Label>
                    <Input
                      id='fullName'
                      value={formData.customerInfo.fullName}
                      onChange={(e) =>
                        handleInputChange('customerInfo', 'fullName', e.target.value)
                      }
                      placeholder='Nhập họ và tên'
                      disabled={currentStep > 1}
                    />
                  </div>
                  <div className='grid sm:grid-cols-2 gap-4'>
                    <div>
                      <Label htmlFor='email'>Email *</Label>
                      <Input
                        id='email'
                        type='email'
                        value={formData.customerInfo.email}
                        onChange={(e) => handleInputChange('customerInfo', 'email', e.target.value)}
                        placeholder='example@email.com'
                        disabled={currentStep > 1}
                      />
                    </div>
                    <div>
                      <Label htmlFor='phone'>Số điện thoại *</Label>
                      <Input
                        id='phone'
                        value={formData.customerInfo.phone}
                        onChange={(e) => handleInputChange('customerInfo', 'phone', e.target.value)}
                        placeholder='0123456789'
                        disabled={currentStep > 1}
                      />
                    </div>
                  </div>
                  {currentStep === 1 && (
                    <Button
                      onClick={handleNextStep}
                      disabled={!validateStep(1)}
                      className='w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground'
                    >
                      Tiếp tục
                    </Button>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Step 2: Shipping Address */}
            {currentStep >= 2 && (
              <Card>
                <CardHeader>
                  <CardTitle className='flex items-center gap-2'>
                    <MapPin className='h-5 w-5' />
                    Địa chỉ giao hàng
                  </CardTitle>
                </CardHeader>
                <CardContent className='space-y-4'>
                  <div>
                    <Label htmlFor='address'>Địa chỉ cụ thể *</Label>
                    <Input
                      id='address'
                      value={formData.shippingAddress.address}
                      onChange={(e) =>
                        handleInputChange('shippingAddress', 'address', e.target.value)
                      }
                      placeholder='Số nhà, tên đường'
                      disabled={currentStep > 2}
                    />
                  </div>
                  <div className='grid sm:grid-cols-3 gap-4'>
                    <div>
                      <Label htmlFor='ward'>Phường/Xã *</Label>
                      <Input
                        id='ward'
                        value={formData.shippingAddress.ward}
                        onChange={(e) =>
                          handleInputChange('shippingAddress', 'ward', e.target.value)
                        }
                        placeholder='Phường/Xã'
                        disabled={currentStep > 2}
                      />
                    </div>
                    <div>
                      <Label htmlFor='district'>Quận/Huyện *</Label>
                      <Input
                        id='district'
                        value={formData.shippingAddress.district}
                        onChange={(e) =>
                          handleInputChange('shippingAddress', 'district', e.target.value)
                        }
                        placeholder='Quận/Huyện'
                        disabled={currentStep > 2}
                      />
                    </div>
                    <div>
                      <Label htmlFor='city'>Tỉnh/Thành phố *</Label>
                      <Input
                        id='city'
                        value={formData.shippingAddress.city}
                        onChange={(e) =>
                          handleInputChange('shippingAddress', 'city', e.target.value)
                        }
                        disabled={currentStep > 2}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor='note'>Ghi chú (tùy chọn)</Label>
                    <Textarea
                      id='note'
                      value={formData.shippingAddress.note}
                      onChange={(e) => handleInputChange('shippingAddress', 'note', e.target.value)}
                      placeholder='Ghi chú thêm cho đơn hàng...'
                      disabled={currentStep > 2}
                    />
                  </div>
                  {currentStep === 2 && (
                    <div className='flex gap-4'>
                      <Button
                        variant='outline'
                        onClick={() => setCurrentStep(1)}
                        className='flex-1'
                      >
                        Quay lại
                      </Button>
                      <Button
                        onClick={handleNextStep}
                        disabled={!validateStep(2)}
                        className='flex-1 bg-secondary hover:bg-secondary/90 text-secondary-foreground'
                      >
                        Tiếp tục
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Step 3: Payment Method */}
            {currentStep >= 3 && (
              <Card>
                <CardHeader>
                  <CardTitle className='flex items-center gap-2'>
                    <CreditCard className='h-5 w-5' />
                    Phương thức thanh toán
                  </CardTitle>
                </CardHeader>
                <CardContent className='space-y-4'>
                  <RadioGroup
                    value={formData.paymentMethod}
                    onValueChange={(value) => handleInputChange('paymentMethod', '', value)}
                  >
                    <div className='flex items-center space-x-2 p-4 border border-border rounded-lg'>
                      <RadioGroupItem value='cod' id='cod' />
                      <Label htmlFor='cod' className='flex-1 cursor-pointer'>
                        <div className='flex items-center gap-3'>
                          <Truck className='h-5 w-5 text-primary' />
                          <div>
                            <p className='font-medium'>Thanh toán khi nhận hàng (COD)</p>
                            <p className='text-sm text-muted-foreground'>
                              Thanh toán bằng tiền mặt khi nhận hàng
                            </p>
                          </div>
                        </div>
                      </Label>
                    </div>
                    <div className='flex items-center space-x-2 p-4 border border-border rounded-lg opacity-50'>
                      <RadioGroupItem value='bank' id='bank' disabled />
                      <Label htmlFor='bank' className='flex-1 cursor-not-allowed'>
                        <div className='flex items-center gap-3'>
                          <CreditCard className='h-5 w-5 text-muted-foreground' />
                          <div>
                            <p className='font-medium'>Chuyển khoản ngân hàng</p>
                            <p className='text-sm text-muted-foreground'>Sắp ra mắt</p>
                          </div>
                        </div>
                      </Label>
                    </div>
                  </RadioGroup>

                  <div className='flex gap-4'>
                    <Button variant='outline' onClick={() => setCurrentStep(2)} className='flex-1'>
                      Quay lại
                    </Button>
                    <Button
                      onClick={handleSubmitOrder}
                      disabled={!validateStep(3) || isLoading}
                      className='flex-1 bg-secondary hover:bg-secondary/90 text-secondary-foreground'
                    >
                      {isLoading ? 'Đang xử lý...' : 'Đặt hàng'}]
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Order Summary */}
          <div className='lg:col-span-1'>
            <Card className='sticky top-24'>
              <CardHeader>
                <CardTitle>Đơn hàng của bạn</CardTitle>
              </CardHeader>
              <CardContent className='space-y-4'>
                {/* Order Items */}
                <div className='space-y-3'>
                  {cartState.items.map((item) => (
                    <div key={item.id} className='flex gap-3'>
                      <div className='w-16 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0'>
                        <img
                          // src={item.image || '/placeholder.svg'}
                          src='../src/assets/icons/placeholder.svg'
                          alt={item.name}
                          width={64}
                          height={64}
                          className='w-full h-full object-cover'
                        />
                      </div>
                      <div className='flex-1 min-w-0'>
                        <h4 className='font-medium text-sm line-clamp-2'>{item.name}</h4>
                        <p className='text-sm text-muted-foreground'>Số lượng: {item.quantity}</p>
                        <p className='font-medium text-sm'>
                          {formatPrice(item.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator />

                {/* Order Total */}
                <div className='space-y-2'>
                  <div className='flex justify-between text-sm'>
                    <span>Tạm tính</span>
                    <span>{formatPrice(cartState.total)}</span>
                  </div>
                  <div className='flex justify-between text-sm'>
                    <span>Phí vận chuyển</span>
                    <span className='text-primary'>Miễn phí</span>
                  </div>
                </div>

                <Separator />

                <div className='flex justify-between font-bold text-lg'>
                  <span>Tổng cộng</span>
                  <span>{formatPrice(cartState.total)}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout
