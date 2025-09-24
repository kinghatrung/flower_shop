import { Heart, Gift, Sparkles, Users, Clock } from 'lucide-react'

export const services = [
  {
    id: 'wedding',
    title: 'Hoa cưới',
    icon: Heart,
    description: 'Tạo nên ngày cưới hoàn hảo với những bó hoa cưới tuyệt đẹp',
    features: [
      'Hoa cưới cầm tay cho cô dâu',
      'Hoa cài áo chú rể',
      'Hoa trang trí tiệc cưới',
      'Hoa xe hoa',
      'Tư vấn concept hoa cưới'
    ],
    price: 'Từ 2,000,000đ',
    popular: true
  },
  {
    id: 'birthday',
    title: 'Hoa sinh nhật',
    icon: Gift,
    description: 'Những bó hoa sinh nhật hoàn hảo, đầy màu sắc và mang nhiều ý nghĩa đặc biệt',
    features: [
      'Hoa sinh nhật theo tuổi',
      'Thiết kế theo sở thích',
      'Kèm thiệp chúc mừng',
      'Giao hàng đúng giờ',
      'Bao bì sang trọng'
    ],
    price: 'Từ 500,000đ',
    popular: false
  },
  {
    id: 'grand-opening',
    title: 'Hoa khai trương',
    icon: Sparkles,
    description: 'Hoa chúc mừng khai trương mang lại may mắn và thịnh vượng',
    features: [
      'Lẵng hoa khai trương',
      'Hoa chúc mừng thành công',
      'Thiết kế theo phong thủy',
      'Kèm băng rôn chúc mừng',
      'Giao hàng sớm'
    ],
    price: 'Từ 800,000đ',
    popular: false
  },
  {
    id: 'corporate',
    title: 'Hoa sự kiện',
    icon: Users,
    description: 'Dịch vụ hoa cho các sự kiện doanh nghiệp và hội nghị',
    features: [
      'Hoa trang trí sự kiện',
      'Hoa để bàn VIP',
      'Hoa sân khấu',
      'Tư vấn concept tổng thể',
      'Đội ngũ setup chuyên nghiệp'
    ],
    price: 'Từ 5,000,000đ',
    popular: false
  },
  {
    id: 'subscription',
    title: 'Đặt hoa định kỳ',
    icon: Clock,
    description: 'Dịch vụ giao hoa tươi định kỳ cho văn phòng và gia đình',
    features: [
      'Giao hoa hàng tuần/tháng',
      'Thay đổi loại hoa theo mùa',
      'Giá ưu đãi cho khách VIP',
      'Chăm sóc và thay thế',
      'Linh hoạt thời gian giao'
    ],
    price: 'Từ 300,000đ/tháng',
    popular: true
  }
]

export const additionalServices = [
  'Tư vấn thiết kế hoa miễn phí',
  'Giao hàng nhanh trong 1-2 giờ',
  'Đảm bảo hoa tươi 100%',
  'Hỗ trợ 24/7',
  'Đổi trả nếu không hài lòng',
  'Chăm sóc khách hàng VIP'
]
