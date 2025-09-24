import { useState } from 'react'
import { MapPin, Phone, Mail, Clock, Send, MessageCircle } from 'lucide-react'

import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { Textarea } from '~/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { useScrollAnimation } from '~/hooks/useScrollAnimationOptions'

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const { isVisible: headerVisible, ref: headerRef } = useScrollAnimation()
  const { isVisible: formVisible, ref: formRef } = useScrollAnimation()
  const { isVisible: contactInfoVisible, ref: contactInfoRef } = useScrollAnimation()

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    // Giả lập API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsLoading(false)
    setIsSubmitted(true)

    // Reset form sau 3 giây
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      })
    }, 3000)
  }

  const isFormValid = formData.name && formData.email && formData.message

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
            <Card>
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
                  <form onSubmit={handleSubmit} className='space-y-6'>
                    <div className='grid sm:grid-cols-2 gap-4'>
                      <div>
                        <Label htmlFor='name'>Họ và tên *</Label>
                        <Input
                          id='name'
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          placeholder='Nhập họ và tên'
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor='phone'>Số điện thoại</Label>
                        <Input
                          id='phone'
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          placeholder='0123456789'
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor='email'>Email *</Label>
                      <Input
                        id='email'
                        type='email'
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder='example@email.com'
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor='subject'>Chủ đề</Label>
                      <Input
                        id='subject'
                        value={formData.subject}
                        onChange={(e) => handleInputChange('subject', e.target.value)}
                        placeholder='Tư vấn hoa cưới, đặt hoa sinh nhật...'
                      />
                    </div>

                    <div>
                      <Label htmlFor='message'>Tin nhắn *</Label>
                      <Textarea
                        id='message'
                        value={formData.message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                        placeholder='Mô tả chi tiết yêu cầu của bạn...'
                        className='min-h-[120px]'
                        required
                      />
                    </div>

                    <Button
                      type='submit'
                      disabled={!isFormValid || isLoading}
                      className='w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground'
                    >
                      <Send className='h-4 w-4 mr-2' />
                      {isLoading ? 'Đang gửi...' : 'Gửi tin nhắn'}
                    </Button>
                  </form>
                )}
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
                    <p className='text-muted-foreground'>Cổ Nhuế, Bắc Từ Liêm, Hà Nội, Việt Nam</p>
                  </div>
                </div>

                <div className='flex items-start gap-4'>
                  <Phone className='h-6 w-6 text-primary flex-shrink-0 mt-1' />
                  <div>
                    <h3 className='font-semibold mb-1'>Hotline</h3>
                    <p className='text-muted-foreground'>0123 456 789</p>
                    <p className='text-sm text-muted-foreground'>Hỗ trợ 24/7</p>
                  </div>
                </div>

                <div className='flex items-start gap-4'>
                  <Mail className='h-6 w-6 text-primary flex-shrink-0 mt-1' />
                  <div>
                    <h3 className='font-semibold mb-1'>Email</h3>
                    <p className='text-muted-foreground'>hello@Nuvexa.vn</p>
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

            {/* Quick Contact */}
            <Card className='bg-primary/5 border-primary/20 hover-scale'>
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
        </div>
      </div>
    </div>
  )
}

export default Contact
