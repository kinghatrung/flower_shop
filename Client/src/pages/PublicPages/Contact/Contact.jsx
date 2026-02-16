import { useState } from 'react'
import { MapPin, Phone, Mail, Clock, Send, MessageCircle } from 'lucide-react'
import { useForm } from 'react-hook-form'

import { Button } from '~/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { useScrollAnimation } from '~/hooks/useScrollAnimationOptions'
import { FormBase, FormField, FormTextarea } from '~/components/common/Form'
import { sendEmail } from '~/api'

function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false)

  const { isVisible: headerVisible, ref: headerRef } = useScrollAnimation()
  const { isVisible: formVisible, ref: formRef } = useScrollAnimation()
  const { isVisible: contactInfoVisible, ref: contactInfoRef } = useScrollAnimation()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      subject: '',
      message: ''
    }
  })

  const handleSubmits = async (data) => {
    await sendEmail(data)
    setIsSubmitted(!isSubmitted)
  }

  return (
    <div className='pt-24 pb-16 px-4'>
      <div className='max-w-7xl mx-auto'>
        {/* Page Header */}
        <div
          ref={headerRef}
          className={`text-center space-y-4 mb-16 ${
            headerVisible ? 'animate-fade-in-up' : 'opacity-0'
          }`}
        >
          <h1 className='font-serif text-4xl lg:text-5xl font-bold text-foreground'>
            Liên hệ với chúng tôi
          </h1>
          <p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
            Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn. Hãy liên hệ với Nuvexa để được tư vấn
            về những bó hoa tuyệt đẹp nhất.
          </p>
        </div>

        <div className='grid lg:grid-cols-2 gap-12'>
          {/* Contact Form */}
          <div ref={formRef} className={formVisible ? 'animate-slide-in-left' : 'opacity-0'}>
            <Card className='hover-lift mb-6'>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                  <MessageCircle className='h-5 w-5' />
                  Gửi tin nhắn cho chúng tôi
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isSubmitted ? (
                  <div className='text-center py-8 space-y-4'>
                    <div className='w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto'>
                      <Send className='h-8 w-8 text-green-600' />
                    </div>
                    <h3 className='font-semibold text-lg'>Cảm ơn bạn đã liên hệ!</h3>
                    <p className='text-muted-foreground'>
                      Chúng tôi đã nhận được tin nhắn và sẽ phản hồi trong vòng 24 giờ.
                    </p>
                  </div>
                ) : (
                  <FormBase
                    onSubmit={handleSubmit(handleSubmits)}
                    className='space-y-6'
                    submitLabel={
                      <>
                        <Send className='h-4 w-4 mr-2' />
                        Gửi tin nhắn
                      </>
                    }
                  >
                    <div className='grid sm:grid-cols-2 gap-4'>
                      <FormField
                        id='name'
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

                    <FormField
                      id='subject'
                      label='Chủ đề'
                      placeholder='Tư vấn hoa cưới, đặt hoa sinh nhật...'
                      required
                      register={register}
                      errors={errors}
                    />

                    <FormTextarea
                      id='message'
                      label='Tin nhắn'
                      placeholder='Mô tả chi tiết yêu cầu của bạn...'
                      required
                      register={register}
                      errors={errors}
                    />
                  </FormBase>
                )}
              </CardContent>
            </Card>

            {/* Quick Contact */}
            <Card className='hover-lift'>
              <CardContent className='p-6'>
                <div className='text-center space-y-4'>
                  <h3 className='font-semibold text-lg'>Cần tư vấn ngay?</h3>
                  <p className='text-muted-foreground'>Gọi hotline để được hỗ trợ trực tiếp</p>
                  <Button
                    onClick={() => (window.location.href = 'tel:0123456789')}
                    className='bg-secondary hover:bg-secondary/90 text-secondary-foreground cursor-pointer'
                  >
                    <Phone className='h-4 w-4 mr-2' />
                    Gọi ngay: 0123 456 789
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div
            ref={contactInfoRef}
            className={`space-y-6 ${contactInfoVisible ? 'animate-slide-in-right' : 'opacity-0'}`}
          >
            {/* Info */}
            <Card className='hover-lift'>
              <CardHeader>
                <CardTitle>Thông tin liên hệ</CardTitle>
              </CardHeader>
              <CardContent className='space-y-6'>
                <div className='flex items-start gap-4'>
                  <MapPin className='h-6 w-6 text-primary flex-shrink-0 mt-1' />
                  <div>
                    <h3 className='font-semibold mb-1'>Địa chỉ cửa hàng</h3>
                    <p className='text-muted-foreground'>Mễ Trì Thượng, Quận Từ Liêm, Hà Nội</p>
                  </div>
                </div>

                <div className='flex items-start gap-4'>
                  <Phone className='h-6 w-6 text-primary flex-shrink-0 mt-1' />
                  <div>
                    <h3 className='font-semibold mb-1'>Hotline</h3>
                    <p className='text-muted-foreground'>0123 242 558</p>
                    <p className='text-sm text-muted-foreground'>Hỗ trợ 24/7</p>
                  </div>
                </div>

                <div className='flex items-start gap-4'>
                  <Mail className='h-6 w-6 text-primary flex-shrink-0 mt-1' />
                  <div>
                    <h3 className='font-semibold mb-1'>Email</h3>
                    <p className='text-muted-foreground'>myzlucky2706@gmail.com</p>
                    <p className='text-muted-foreground'>support@Nuvexa.vn</p>
                  </div>
                </div>

                <div className='flex items-start gap-4'>
                  <Clock className='h-6 w-6 text-primary flex-shrink-0 mt-1' />
                  <div>
                    <h3 className='font-semibold mb-1'>Giờ làm việc</h3>
                    <div className='text-muted-foreground space-y-1'>
                      <p>Thứ 2 - Thứ 6: 8:00 - 20:00</p>
                      <p>Thứ 7 - Chủ nhật: 8:00 - 22:00</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Map */}
            <Card className='hover-lift'>
              <CardHeader>
                <CardTitle>Vị trí cửa hàng</CardTitle>
              </CardHeader>
              <CardContent>
                <div className='aspect-video bg-muted rounded-lg'>
                  <div className='size-full rounded-lg overflow-hidden bg-muted'>
                    <iframe
                      src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.5480634679684!2d105.7743210457505!3d21.05076168905049!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab50c984ecdd%3A0x77d10bdffe7a625d!2zQ8O0bmcgVmnDqm4gSOG7kyBBbiBCw6xuaCBUUCBHaWFvIEzGsHU!5e0!3m2!1svi!2s!4v1756095504535!5m2!1svi!2s'
                      width='100%'
                      height='100%'
                      style={{ border: 0 }}
                      allowFullScreen
                      loading='lazy'
                      referrerPolicy='no-referrer-when-downgrade'
                    ></iframe>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
