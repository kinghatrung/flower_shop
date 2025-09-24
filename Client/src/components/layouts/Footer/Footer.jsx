import { Link } from 'react-router-dom'
import { Heart, Phone, Mail, MapPin } from 'lucide-react'

import { ROUTES } from '~/constants'

function Footer() {
  return (
    <footer className='bg-card border-t border-border'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
          {/* Brand */}
          <div className='space-y-4'>
            <div className='flex items-center space-x-2'>
              <Heart className='h-6 w-6 text-primary fill-current' />
              <span className='font-serif text-xl font-bold text-foreground'>Nuvexa</span>
            </div>
            <p className='text-muted-foreground text-sm leading-relaxed'>
              Luxury Flowers - Mang đến những bó hoa tươi cao cấp với tình yêu và sự tận tâm.
            </p>
          </div>

          {/* Quick Links */}
          <div className='space-y-4'>
            <h3 className='font-semibold text-foreground'>Liên kết nhanh</h3>
            <ul className='space-y-2 text-sm'>
              <li>
                <Link
                  to={ROUTES.HOME}
                  className='text-muted-foreground hover:text-primary transition-colors'
                >
                  Trang chủ
                </Link>
              </li>
              <li>
                <Link
                  to={ROUTES.PRODUCTS}
                  className='text-muted-foreground hover:text-primary transition-colors'
                >
                  Sản phẩm
                </Link>
              </li>
              <li>
                <Link
                  to={ROUTES.SERVICES}
                  className='text-muted-foreground hover:text-primary transition-colors'
                >
                  Dịch vụ
                </Link>
              </li>
              <li>
                <Link
                  to={ROUTES.CONTACT}
                  className='text-muted-foreground hover:text-primary transition-colors'
                >
                  Liên hệ
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className='space-y-4'>
            <h3 className='font-semibold text-foreground'>Dịch vụ</h3>
            <ul className='space-y-2 text-sm'>
              <li className='text-muted-foreground'>Hoa sinh nhật</li>
              <li className='text-muted-foreground'>Hoa cưới</li>
              <li className='text-muted-foreground'>Hoa khai trương</li>
              <li className='text-muted-foreground'>Hoa chia buồn</li>
            </ul>
          </div>

          {/* Contact */}
          <div className='space-y-4'>
            <h3 className='font-semibold text-foreground'>Liên hệ</h3>
            <div className='space-y-3 text-sm'>
              <div className='flex items-center space-x-2'>
                <Phone className='h-4 w-4 text-primary' />
                <span className='text-muted-foreground'>0123 456 789</span>
              </div>
              <div className='flex items-center space-x-2'>
                <Mail className='h-4 w-4 text-primary' />
                <span className='text-muted-foreground'>hello@Nuvexa.vn</span>
              </div>
              <div className='flex items-center space-x-2'>
                <MapPin className='h-4 w-4 text-primary' />
                <span className='text-muted-foreground'>123 Đường Hoa, Q.1, TP.HCM</span>
              </div>
            </div>
          </div>
        </div>

        <div className='border-t border-border mt-8 pt-8 text-center'>
          <p className='text-muted-foreground text-sm'>
            © 2024 Nuvexa - Luxury Flowers. Tất cả quyền được bảo lưu.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
