import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Save, Settings, Store, Truck, CreditCard, Share2 } from 'lucide-react'
import { toast } from 'sonner'

import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { Switch } from '~/components/ui/switch'
import { Separator } from '~/components/ui/separator'
import HeaderTable from '~/components/common/HeaderTable'

function SettingSection({ icon: Icon, title, children }) {
  return (
    <Card>
      <CardHeader>
        <div className='flex items-center gap-2'>
          <Icon className='w-5 h-5 text-primary' />
          <CardTitle className='text-base'>{title}</CardTitle>
        </div>
      </CardHeader>
      <Separator />
      <CardContent className='pt-5 space-y-4'>{children}</CardContent>
    </Card>
  )
}

function FormRow({ label, id, type = 'text', placeholder, register, defaultValue }) {
  return (
    <div className='space-y-1.5'>
      <Label htmlFor={id} className='text-sm font-medium'>
        {label}
      </Label>
      <Input
        id={id}
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue}
        {...(register ? register(id) : {})}
      />
    </div>
  )
}

function SystemSettings() {
  const [freeShipping, setFreeShipping] = useState(true)
  const [maintenanceMode, setMaintenanceMode] = useState(false)
  const [codEnabled, setCodEnabled] = useState(true)
  const [bankEnabled, setBankEnabled] = useState(false)

  const { register, handleSubmit } = useForm({
    defaultValues: {
      shop_name: 'Nuvexa Flower',
      shop_phone: '1800-NUVEXA',
      shop_email: 'hello@nuvexa.vn',
      shop_address: '123 Đường Hoa Hồng, Quận 1, TP.HCM',
      facebook_url: 'https://facebook.com/nuvexa',
      instagram_url: 'https://instagram.com/nuvexa',
      zalo_phone: '0901234567',
      shipping_fee: '30000',
      free_shipping_threshold: '500000'
    }
  })

  const onSubmit = (data) => {
    console.log('Settings saved:', {
      ...data,
      freeShipping,
      codEnabled,
      bankEnabled,
      maintenanceMode
    })
    toast.success('Đã lưu cấu hình hệ thống')
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='container mx-auto py-8 space-y-6'>
        <div className='flex items-center justify-between'>
          <div>
            <h1 className='text-2xl font-bold text-foreground'>Cài đặt hệ thống</h1>
            <p className='text-sm text-muted-foreground mt-1'>
              Cấu hình thông tin cửa hàng và các tùy chọn hệ thống
            </p>
          </div>
          <Button
            type='submit'
            className='bg-secondary hover:bg-secondary/90 text-secondary-foreground gap-2'
          >
            <Save className='w-4 h-4' /> Lưu cài đặt
          </Button>
        </div>

        <div className='grid lg:grid-cols-2 gap-6'>
          {/* Shop Info */}
          <SettingSection icon={Store} title='Thông tin cửa hàng'>
            <FormRow
              label='Tên cửa hàng'
              id='shop_name'
              placeholder='Nuvexa Flower'
              register={register}
            />
            <FormRow
              label='Số điện thoại'
              id='shop_phone'
              placeholder='1800...'
              register={register}
            />
            <FormRow
              label='Email liên hệ'
              id='shop_email'
              type='email'
              placeholder='hello@nuvexa.vn'
              register={register}
            />
            <FormRow
              label='Địa chỉ'
              id='shop_address'
              placeholder='Số nhà, đường, quận, thành phố'
              register={register}
            />
          </SettingSection>

          {/* Social Links */}
          <SettingSection icon={Share2} title='Mạng xã hội'>
            <FormRow
              label='Facebook URL'
              id='facebook_url'
              placeholder='https://facebook.com/...'
              register={register}
            />
            <FormRow
              label='Instagram URL'
              id='instagram_url'
              placeholder='https://instagram.com/...'
              register={register}
            />
            <FormRow label='Số Zalo' id='zalo_phone' placeholder='0901234567' register={register} />
          </SettingSection>

          {/* Shipping */}
          <SettingSection icon={Truck} title='Vận chuyển & Giao hàng'>
            <FormRow
              label='Phí giao hàng (đ)'
              id='shipping_fee'
              type='number'
              placeholder='30000'
              register={register}
            />
            <FormRow
              label='Miễn phí từ (đ)'
              id='free_shipping_threshold'
              type='number'
              placeholder='500000'
              register={register}
            />
            <div className='flex items-center justify-between pt-1'>
              <div>
                <p className='text-sm font-medium'>Miễn phí giao hàng</p>
                <p className='text-xs text-muted-foreground'>Tự động miễn phí khi đặt đủ ngưỡng</p>
              </div>
              <Switch checked={freeShipping} onCheckedChange={setFreeShipping} />
            </div>
          </SettingSection>

          {/* Payment */}
          <SettingSection icon={CreditCard} title='Thanh toán'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm font-medium'>Thanh toán khi nhận hàng (COD)</p>
                <p className='text-xs text-muted-foreground'>Cho phép thanh toán tiền mặt</p>
              </div>
              <Switch checked={codEnabled} onCheckedChange={setCodEnabled} />
            </div>
            <Separator />
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm font-medium'>Chuyển khoản ngân hàng</p>
                <p className='text-xs text-muted-foreground'>
                  Yêu cầu thông tin tài khoản ngân hàng
                </p>
              </div>
              <Switch checked={bankEnabled} onCheckedChange={setBankEnabled} />
            </div>
            <Separator />
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm font-medium text-red-600'>Chế độ bảo trì</p>
                <p className='text-xs text-muted-foreground'>Tạm thời đóng cửa hàng</p>
              </div>
              <Switch checked={maintenanceMode} onCheckedChange={setMaintenanceMode} />
            </div>
          </SettingSection>
        </div>
      </div>
    </form>
  )
}

export default SystemSettings
