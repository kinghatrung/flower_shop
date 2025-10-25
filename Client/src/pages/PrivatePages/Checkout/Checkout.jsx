import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { ArrowLeft, CreditCard, Truck, MapPin, User, Check } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
import numeral from 'numeral'
import { useForm } from 'react-hook-form'

import { Button } from '~/components/ui/button'
import { Label } from '~/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Separator } from '~/components/ui/separator'
import { RadioGroup, RadioGroupItem } from '~/components/ui/radio-group'
import { ROUTES } from '~/constants'
import { selectCurrentUser } from '~/redux/slices/authSlice'
import { getProductCart, createOrder } from '~/api'
import { FormBase, FormField, FormTextarea } from '~/components/common/Form'
import StepIndicator from '~/components/common/StepIndicator'

function Checkout() {
  const navigate = useNavigate()
  const user = useSelector(selectCurrentUser)
  const { data } = useQuery({
    queryKey: ['cart', user?.user_id],
    queryFn: () => getProductCart(user?.user_id)
  })

  const products = data?.data
  const totalProducts = products?.reduce((total, product) => total + product.quantity, 0)

  const [isLoading, setIsLoading] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const steps = ['Thông tin', 'Địa chỉ', 'Thanh toán']

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    getValues
  } = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      address: '',
      ward: '',
      district: '',
      city: '',
      note: '',
      payment_method: 'cod'
    }
  })

  const validateStep = (step) => {
    const values = watch()

    switch (step) {
      case 1:
        return (
          values.fullName &&
          values.email &&
          values.phone &&
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email) &&
          /^[0-9]{10,11}$/.test(values.phone)
        )
      case 2:
        return values.address && values.ward && values.district && values.city
      case 3:
        return values.payment_method
      default:
        return false
    }
  }

  console.log(products)

  const handleSubmitOrder = async () => {
    const values = getValues()
    // Lấy các trường cần thiết của sản phẩm trong giỏ hàng
    const items = products.map((p) => ({
      product_id: p.product_id,
      quantity: p.quantity,
      price: p.price,
      name: p.name,
      image: p.images?.find((img) => img.is_main === true)?.url
    }))
    const payload = { order: { ...values, user_id: user?.user_id }, items }

    if (!validateStep(3)) return
    setIsLoading(true)
    const res = await createOrder(payload)
    const orderId = res.order_code
    navigate(`/checkout/success?orderId=${orderId}`)
  }

  if (totalProducts === 0) {
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
          <StepIndicator currentStep={currentStep} totalSteps={steps.length} steps={steps} />
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
                  <FormBase
                    onSubmit={handleSubmit(() => setCurrentStep(2))}
                    isActive={currentStep === 1}
                  >
                    <div className='grid sm:grid-cols-2 gap-4'>
                      <FormField
                        id='fullName'
                        label='Họ và tên'
                        placeholder='Nhập họ và tên'
                        required
                        register={register}
                        errors={errors}
                      />
                      <FormField
                        id='phone'
                        label='Số điện thoại'
                        placeholder='0123456789'
                        required
                        register={register}
                        errors={errors}
                      />
                    </div>

                    <FormField
                      id='email'
                      label='Email'
                      placeholder='example@email.com'
                      required
                      register={register}
                      errors={errors}
                    />
                  </FormBase>
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
                  <FormBase
                    onSubmit={handleSubmit(() => setCurrentStep(3))}
                    isActive={currentStep === 2}
                  >
                    <FormField
                      id='address'
                      label='Địa chỉ cụ thể'
                      placeholder='Số nhà, tên đường'
                      required
                      register={register}
                      errors={errors}
                    />

                    <div className='grid sm:grid-cols-3 gap-4'>
                      <FormField
                        id='ward'
                        label='Phường/Xã'
                        required
                        register={register}
                        errors={errors}
                      />
                      <FormField
                        id='district'
                        label='Quận/Huyện'
                        required
                        register={register}
                        errors={errors}
                      />
                      <FormField
                        id='city'
                        label='Tỉnh/Thành phố'
                        required
                        register={register}
                        errors={errors}
                      />
                    </div>

                    <FormTextarea
                      id='note'
                      label='Ghi chú (tùy chọn)'
                      placeholder='Ghi chú thêm cho đơn hàng...'
                      register={register}
                      errors={errors}
                    />
                  </FormBase>
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
                    value={watch('payment_method')}
                    onValueChange={(value) => setValue('payment_method', value)}
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
                    <Button
                      variant='outline'
                      onClick={() => setCurrentStep(2)}
                      className='flex-1 cursor-pointer'
                    >
                      Quay lại
                    </Button>
                    <Button
                      onClick={handleSubmitOrder}
                      disabled={!validateStep(3) || isLoading}
                      className='flex-1 bg-secondary hover:bg-secondary/90 text-secondary-foreground cursor-pointer'
                    >
                      {isLoading ? 'Đang xử lý...' : 'Đặt hàng'}
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
                  {products?.map((product) => (
                    <div key={product.id} className='flex gap-3'>
                      <div className='w-16 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0'>
                        <img
                          src={product?.images?.find((img) => img.is_main === true)?.url}
                          alt={product.name}
                          width={64}
                          height={64}
                          className='w-full h-full object-cover'
                        />
                      </div>
                      <div className='flex-1 min-w-0'>
                        <h4 className='font-medium text-sm line-clamp-2'>{product.name}</h4>
                        <p className='text-sm text-muted-foreground'>
                          Số lượng: {product.quantity}
                        </p>
                        <p className='font-medium text-sm'>
                          {numeral(product.price * product.quantity).format('0,0') + ' đ'}
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
                    <span>{numeral(products?.[0]?.total_amount).format('0,0') + ' đ'}</span>
                  </div>
                  <div className='flex justify-between text-sm'>
                    <span>Phí vận chuyển</span>
                    <span className='text-primary'>Miễn phí</span>
                  </div>
                </div>

                <Separator />

                <div className='flex justify-between font-bold text-lg'>
                  <span>Tổng cộng</span>
                  <span>{numeral(products?.[0]?.total_amount).format('0,0') + ' đ'}</span>
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
