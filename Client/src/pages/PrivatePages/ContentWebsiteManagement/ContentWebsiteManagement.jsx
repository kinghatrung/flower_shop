import { useState } from 'react'
import { Save, Edit3, Flower, Mail, Users, Globe } from 'lucide-react'
import { toast } from 'sonner'

import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { Separator } from '~/components/ui/separator'
import HeaderTable from '~/components/common/HeaderTable'

const INITIAL_CONTENT = {
  hero: {
    title: 'Mang Vẻ Đẹp Tự Nhiên Đến Cuộc Sống',
    subtitle: 'Nuvexa - Hoa tươi cao cấp, giao hàng tận nơi trong 2 giờ',
    ctaText: 'Khám phá ngay'
  },
  about: {
    title: 'Về Nuvexa',
    description:
      'Nuvexa ra đời từ tình yêu thuần túy dành cho hoa và nghệ thuật. Hơn 8 năm qua, chúng tôi không ngừng nỗ lực để mang đến những bó hoa tươi đẹp nhất.',
    founded: '2016',
    location: 'TP. Hồ Chí Minh'
  },
  contact: {
    phone: '1800-NUVEXA',
    email: 'hello@nuvexa.vn',
    address: '123 Đường Hoa Hồng, Quận 1, TP.HCM',
    workingHours: '7:00 - 21:00 hàng ngày'
  },
  newsletter: {
    title: 'Đăng ký nhận ưu đãi',
    subtitle: 'Nhận thông tin về hoa mới và khuyến mãi đặc biệt'
  }
}

function EditableSection({ icon: Icon, title, fields, data, onChange }) {
  const [editing, setEditing] = useState(false)
  const [local, setLocal] = useState(data)

  const handleSave = () => {
    onChange(local)
    setEditing(false)
    toast.success(`Đã lưu "${title}"`)
  }

  const handleCancel = () => {
    setLocal(data)
    setEditing(false)
  }

  return (
    <Card>
      <CardHeader>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <Icon className='w-5 h-5 text-primary' />
            <CardTitle className='text-base'>{title}</CardTitle>
          </div>
          {!editing ? (
            <Button size='sm' variant='outline' onClick={() => setEditing(true)}>
              <Edit3 className='w-4 h-4 mr-1' /> Chỉnh sửa
            </Button>
          ) : (
            <div className='flex gap-2'>
              <Button size='sm' variant='outline' onClick={handleCancel}>
                Hủy
              </Button>
              <Button
                size='sm'
                className='bg-secondary hover:bg-secondary/90 text-secondary-foreground'
                onClick={handleSave}
              >
                <Save className='w-4 h-4 mr-1' /> Lưu
              </Button>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className='space-y-4'>
        {fields.map((field) => (
          <div key={field.key} className='space-y-1'>
            <Label className='text-xs text-muted-foreground'>{field.label}</Label>
            {editing ? (
              field.type === 'textarea' ? (
                <textarea
                  value={local[field.key] || ''}
                  onChange={(e) => setLocal({ ...local, [field.key]: e.target.value })}
                  className='w-full min-h-[80px] rounded-md border border-input bg-background px-3 py-2 text-sm resize-none focus:outline-none focus:ring-1 focus:ring-ring'
                />
              ) : (
                <Input
                  value={local[field.key] || ''}
                  onChange={(e) => setLocal({ ...local, [field.key]: e.target.value })}
                />
              )
            ) : (
              <p className='text-sm text-foreground bg-muted/40 rounded-md px-3 py-2'>
                {data[field.key] || '—'}
              </p>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

function ContentWebsiteManagement() {
  const [content, setContent] = useState(INITIAL_CONTENT)

  const update = (section) => (newData) => {
    setContent((prev) => ({ ...prev, [section]: newData }))
  }

  return (
    <div className='container mx-auto py-8 space-y-6'>
      <HeaderTable
        title='Quản lý nội dung website'
        description='Chỉnh sửa các nội dung hiển thị trên giao diện người dùng'
        isShow={false}
      />

      <div className='grid lg:grid-cols-2 gap-6'>
        <EditableSection
          icon={Globe}
          title='Trang chủ — Hero'
          data={content.hero}
          onChange={update('hero')}
          fields={[
            { key: 'title', label: 'Tiêu đề chính', type: 'text' },
            { key: 'subtitle', label: 'Mô tả phụ', type: 'textarea' },
            { key: 'ctaText', label: 'Nút kêu gọi hành động', type: 'text' }
          ]}
        />

        <EditableSection
          icon={Flower}
          title='Giới thiệu — About'
          data={content.about}
          onChange={update('about')}
          fields={[
            { key: 'title', label: 'Tiêu đề', type: 'text' },
            { key: 'description', label: 'Mô tả', type: 'textarea' },
            { key: 'founded', label: 'Năm thành lập', type: 'text' },
            { key: 'location', label: 'Địa điểm', type: 'text' }
          ]}
        />

        <EditableSection
          icon={Mail}
          title='Thông tin liên hệ'
          data={content.contact}
          onChange={update('contact')}
          fields={[
            { key: 'phone', label: 'Số điện thoại', type: 'text' },
            { key: 'email', label: 'Email', type: 'text' },
            { key: 'address', label: 'Địa chỉ', type: 'text' },
            { key: 'workingHours', label: 'Giờ làm việc', type: 'text' }
          ]}
        />

        <EditableSection
          icon={Users}
          title='Newsletter — Đăng ký nhận tin'
          data={content.newsletter}
          onChange={update('newsletter')}
          fields={[
            { key: 'title', label: 'Tiêu đề', type: 'text' },
            { key: 'subtitle', label: 'Mô tả', type: 'textarea' }
          ]}
        />
      </div>
    </div>
  )
}

export default ContentWebsiteManagement
