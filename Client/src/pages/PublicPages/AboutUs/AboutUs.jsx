import { useScrollAnimation, useCountUp } from '~/hooks/useScrollAnimationOptions'
import { Link } from 'react-router-dom'
import {
  BadgeCheck,
  Users,
  Flower2,
  ThumbsUp,
  Leaf,
  Wand2,
  Heart,
  Truck,
  TreePine,
  Gift,
  MessageCircle,
  Pencil,
  ShoppingBasket,
  Scissors,
  PackageCheck,
  Phone,
  MapPin,
  Mail,
  Clock,
  ChevronRight,
  Sparkles
} from 'lucide-react'

// ─── Stats Counter ─────────────────────────────────────────────────────────────
function StatCard({ value, label, suffix = '', icon: Icon, visible }) {
  const count = useCountUp(value, 2000, visible)
  return (
    <div className='flex flex-col items-center gap-3 p-6 rounded-2xl bg-card border border-border shadow-lg hover-lift'>
      <div className='w-14 h-14 rounded-full bg-primary flex items-center justify-center shadow-md'>
        <Icon className='w-7 h-7 text-white' />
      </div>
      <p className='font-serif text-4xl font-bold text-secondary'>
        {count}
        {suffix}
      </p>
      <p className='text-sm text-muted-foreground font-medium text-center'>{label}</p>
    </div>
  )
}

// ─── Team Member ───────────────────────────────────────────────────────────────
function TeamCard({ name, role, bio, emoji }) {
  return (
    <div className='group relative rounded-3xl overflow-hidden bg-card border border-border shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2'>
      <div className='h-48 bg-muted flex items-center justify-center'>
        <span className='text-8xl drop-shadow-md group-hover:scale-110 transition-transform duration-500'>
          {emoji}
        </span>
      </div>
      <div className='p-6 space-y-2'>
        <h3 className='font-serif text-xl font-bold text-foreground'>{name}</h3>
        <p className='text-sm font-semibold text-secondary uppercase tracking-wide'>{role}</p>
        <p className='text-sm text-muted-foreground leading-relaxed'>{bio}</p>
      </div>
    </div>
  )
}

// ─── Process Step ──────────────────────────────────────────────────────────────
function ProcessStep({ step, title, description, icon: Icon, isLast }) {
  return (
    <div className='flex gap-6 group'>
      <div className='flex flex-col items-center'>
        <div className='w-14 h-14 rounded-full bg-secondary flex items-center justify-center shadow-lg shrink-0 group-hover:scale-110 transition-transform duration-300'>
          <Icon className='w-6 h-6 text-white' />
        </div>
        {!isLast && <div className='w-0.5 flex-1 bg-linear-to-b from-border to-transparent my-2' />}
      </div>
      <div className='pb-10'>
        <span className='text-xs font-bold text-secondary uppercase tracking-widest'>
          Bước {step}
        </span>
        <h4 className='font-serif text-xl font-bold text-foreground mt-1 mb-2'>{title}</h4>
        <p className='text-muted-foreground leading-relaxed'>{description}</p>
      </div>
    </div>
  )
}

// ─── Value Card ────────────────────────────────────────────────────────────────
function ValueCard({ icon: Icon, title, description, accentClass }) {
  return (
    <div
      className={`group p-8 rounded-3xl border-2 border-border bg-card hover:border-primary hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${accentClass}`}
    >
      <div className='w-12 h-12 rounded-2xl bg-primary flex items-center justify-center mb-5 shadow-sm group-hover:scale-110 transition-transform duration-300'>
        <Icon className='w-6 h-6 text-white' />
      </div>
      <h3 className='font-serif text-xl font-bold text-foreground mb-3'>{title}</h3>
      <p className='text-muted-foreground leading-relaxed text-sm'>{description}</p>
    </div>
  )
}

// ─── Main ──────────────────────────────────────────────────────────────────────
function AboutUs() {
  const { isVisible: heroVisible, ref: heroRef } = useScrollAnimation({ threshold: 0.1 })
  const { isVisible: storyVisible, ref: storyRef } = useScrollAnimation({ threshold: 0.1 })
  const { isVisible: statsVisible, ref: statsRef } = useScrollAnimation({ threshold: 0.2 })
  const { isVisible: valuesVisible, ref: valuesRef } = useScrollAnimation({ threshold: 0.1 })
  const { isVisible: teamVisible, ref: teamRef } = useScrollAnimation({ threshold: 0.1 })
  const { isVisible: processVisible, ref: processRef } = useScrollAnimation({ threshold: 0.1 })
  const { isVisible: ctaVisible, ref: ctaRef } = useScrollAnimation({ threshold: 0.2 })

  const stats = [
    { value: 8, suffix: '+', label: 'Năm Kinh Nghiệm', icon: BadgeCheck },
    { value: 12000, suffix: '+', label: 'Khách Hàng Hài Lòng', icon: Users },
    { value: 350, suffix: '+', label: 'Mẫu Hoa Độc Đáo', icon: Flower2 },
    { value: 98, suffix: '%', label: 'Tỷ Lệ Hài Lòng', icon: ThumbsUp }
  ]

  const values = [
    {
      icon: Leaf,
      title: 'Thiên Nhiên & Tươi Mới',
      description:
        'Chúng tôi cam kết chỉ sử dụng những bông hoa tươi nhất, được tuyển chọn kỹ càng từ các vườn hoa uy tín trong nước và nhập khẩu cao cấp. Mỗi bông hoa phải đạt tiêu chuẩn chất lượng khắt khe trước khi đến tay khách hàng.',
      accentClass: ''
    },
    {
      icon: Wand2,
      title: 'Sáng Tạo & Tinh Tế',
      description:
        'Đội ngũ nghệ nhân của chúng tôi không ngừng sáng tạo, kết hợp màu sắc và hình dạng để tạo nên những tác phẩm nghệ thuật độc đáo. Mỗi bó hoa là một câu chuyện được kể qua ngôn ngữ của hoa.',
      accentClass: ''
    },
    {
      icon: Heart,
      title: 'Tận Tâm & Yêu Thương',
      description:
        'Chúng tôi hiểu rằng mỗi bó hoa mang theo một thông điệp đặc biệt. Vì vậy, chúng tôi luôn tận tâm lắng nghe và thấu hiểu để tạo ra những tác phẩm chứa đựng đúng cảm xúc bạn muốn gửi gắm.',
      accentClass: ''
    },
    {
      icon: Truck,
      title: 'Nhanh Chóng & Đáng Tin',
      description:
        'Với hệ thống giao hàng chuyên nghiệp, hoa của bạn sẽ được bảo quản cẩn thận và giao đến tay người nhận trong tình trạng tươi nhất, đúng giờ, đúng địa điểm. Cam kết giao hàng trong vòng 2 giờ nội thành.',
      accentClass: ''
    },
    {
      icon: TreePine,
      title: 'Trách Nhiệm Cộng Đồng',
      description:
        'Nuvexa tham gia các chương trình trồng cây xanh, hỗ trợ nông dân địa phương và đóng góp 2% doanh thu cho các tổ chức từ thiện. Chúng tôi kinh doanh không chỉ vì lợi nhuận mà còn vì một tương lai xanh hơn.',
      accentClass: ''
    },
    {
      icon: Gift,
      title: 'Trải Nghiệm Đẳng Cấp',
      description:
        'Từ lúc bạn đặt hàng đến khi nhận được sản phẩm, mọi bước đều được chăm chút tinh tế. Bao bì cao cấp, thiệp viết tay, hương thơm nhẹ nhàng – tất cả tạo nên một trải nghiệm quà tặng thật sự đáng nhớ.',
      accentClass: ''
    }
  ]

  const team = [
    {
      name: 'Phương Linh',
      role: 'Nhà Sáng Lập & Giám Đốc Sáng Tạo',
      bio: 'Với hơn 10 năm kinh nghiệm trong lĩnh vực cắm hoa nghệ thuật và kinh doanh hoa, Phương Linh đã xây dựng Nuvexa trở thành thương hiệu hoa uy tín hàng đầu thành phố.',
      emoji: '👩‍🌾'
    },
    {
      name: 'Minh Tuấn',
      role: 'Trưởng Nghệ Nhân Cắm Hoa',
      bio: 'Tốt nghiệp khóa đào tạo nghệ thuật hoa tại Nhật Bản, Minh Tuấn mang phong cách Ikebana tinh tế kết hợp với sự phóng khoáng của phương Tây vào từng tác phẩm.',
      emoji: '👨‍🎨'
    },
    {
      name: 'Ngọc Hân',
      role: 'Chuyên Gia Tư Vấn Khách Hàng',
      bio: 'Ngọc Hân có khả năng thấu hiểu tâm lý khách hàng đặc biệt. Cô ấy giúp hàng nghìn khách hàng tìm được bó hoa hoàn hảo để truyền đạt đúng cảm xúc trong mỗi dịp đặc biệt.',
      emoji: '👩‍💼'
    },
    {
      name: 'Đức Huy',
      role: 'Quản Lý Chuỗi Cung Ứng',
      bio: 'Đức Huy quản lý mối quan hệ với hơn 50 vườn hoa đối tác, đảm bảo mỗi ngày Nuvexa luôn có nguồn hoa tươi nhất, đa dạng nhất với giá cả hợp lý nhất.',
      emoji: '👨‍🌿'
    }
  ]

  const process = [
    {
      icon: MessageCircle,
      title: 'Tư Vấn & Đặt Hàng',
      description:
        'Liên hệ với chúng tôi qua điện thoại, Zalo, Facebook hoặc website. Đội ngũ tư vấn sẽ lắng nghe nhu cầu, dịp sử dụng và ngân sách của bạn để đề xuất mẫu hoa phù hợp nhất.'
    },
    {
      icon: Pencil,
      title: 'Thiết Kế & Tùy Chỉnh',
      description:
        'Nghệ nhân của chúng tôi sẽ phác thảo concept dựa trên yêu cầu. Bạn có thể yêu cầu chỉnh sửa màu sắc, loài hoa, bố cục cho đến khi hoàn toàn ưng ý trước khi tiến hành thực hiện.'
    },
    {
      icon: ShoppingBasket,
      title: 'Tuyển Chọn Hoa Tươi',
      description:
        'Chúng tôi chỉ sử dụng hoa được nhập về trong ngày, qua kiểm tra chất lượng nghiêm ngặt. Hoa được bảo quản trong kho lạnh chuyên dụng để giữ độ tươi và hương thơm tự nhiên.'
    },
    {
      icon: Scissors,
      title: 'Cắm Hoa Nghệ Thuật',
      description:
        'Mỗi tác phẩm được thực hiện bởi nghệ nhân có trình độ cao, chú trọng từng chi tiết nhỏ nhất. Bao bì cao cấp, ruy băng thủ công và thiệp tay viết được chuẩn bị chu đáo.'
    },
    {
      icon: PackageCheck,
      title: 'Giao Hàng Tận Nơi',
      description:
        'Đội ngũ giao hàng chuyên nghiệp, có xe bảo ôn đảm bảo hoa đến tay người nhận trong tình trạng hoàn hảo. Thời gian giao hàng linh động, kể cả ngoài giờ hành chính và ngày lễ.'
    }
  ]

  return (
    <div className='bg-background overflow-hidden'>
      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className='relative pt-28 pb-20 overflow-hidden'>
        {/* Soft background blobs dùng màu primary/muted của dự án */}
        <div className='absolute inset-0 pointer-events-none'>
          <div className='absolute top-10 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl' />
          <div className='absolute top-20 right-10 w-96 h-96 bg-muted/40 rounded-full blur-3xl' />
          <div className='absolute bottom-0 left-1/3 w-64 h-64 bg-primary/10 rounded-full blur-2xl' />
        </div>

        <div
          ref={heroRef}
          className={`max-w-7xl mx-auto px-6 lg:px-20 grid lg:grid-cols-2 gap-16 items-center transition-all duration-700 ${
            heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {/* Left */}
          <div className='space-y-8'>
            <div className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/30 text-foreground text-sm font-semibold border border-primary'>
              <Sparkles className='w-4 h-4 text-secondary' />
              <p className='text-secondary'> Câu chuyện của chúng tôi</p>
            </div>

            <h1 className='font-serif text-5xl lg:text-6xl font-bold text-foreground leading-tight'>
              Mang Vẻ Đẹp <span className='text-secondary'>Thiên Nhiên</span> Đến Cuộc Sống
            </h1>

            <p className='text-lg text-muted-foreground leading-relaxed'>
              Nuvexa ra đời từ tình yêu thuần túy dành cho hoa và nghệ thuật. Hơn 8 năm qua, chúng
              tôi không ngừng nỗ lực để mang đến những tác phẩm hoa tươi đẹp nhất, chứa đựng tâm
              huyết và cảm xúc chân thành – vì chúng tôi tin rằng mỗi bó hoa là một cầu nối của yêu
              thương.
            </p>

            <div className='flex flex-wrap gap-4'>
              <Link
                to='/products'
                className='inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-secondary text-secondary-foreground font-semibold shadow-lg hover:opacity-90 hover:-translate-y-0.5 transition-all duration-300'
              >
                Khám Phá Hoa Của Chúng Tôi
                <ChevronRight className='w-4 h-4' />
              </Link>
              <Link
                to='/contact'
                className='inline-flex items-center gap-2 px-7 py-3.5 rounded-full border-2 border-secondary text-secondary font-semibold hover:bg-secondary/10 transition-all duration-300'
              >
                Liên Hệ Ngay
              </Link>
            </div>
          </div>

          {/* Right – image */}
          <div className='relative'>
            <div className='relative group overflow-hidden rounded-3xl shadow-2xl'>
              <img
                src='/image/anhbanner.jpg'
                alt='Nuvexa flower arrangements'
                className='w-full h-[500px] object-cover group-hover:scale-105 transition-transform duration-700'
              />
              <div className='absolute inset-0 bg-linear-to-t from-foreground/30 via-transparent to-transparent' />
              {/* Floating badge */}
              <div className='absolute bottom-6 left-6 bg-card/95 backdrop-blur-sm rounded-2xl p-4 shadow-xl border border-border'>
                <p className='text-xs text-muted-foreground font-medium'>Được tin dùng bởi</p>
                <p className='font-serif text-2xl font-bold text-secondary'>12,000+</p>
                <p className='text-xs text-muted-foreground'>khách hàng hài lòng</p>
              </div>
            </div>
            <div className='absolute -top-6 -right-6 w-36 h-36 bg-primary/40 rounded-full -z-10 blur-sm' />
            <div className='absolute -bottom-6 -left-6 w-24 h-24 bg-muted rounded-full -z-10 blur-sm' />
          </div>
        </div>
      </section>

      {/* ── STORY / MILESTONE ─────────────────────────────────────────────── */}
      <section className='py-20 bg-muted/30'>
        <div className='max-w-7xl mx-auto px-6 lg:px-20'>
          <div
            ref={storyRef}
            className={`transition-all duration-700 ${storyVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            <div className='text-center mb-16'>
              <span className='text-secondary font-semibold uppercase tracking-widest text-sm'>
                Lịch Sử Hình Thành
              </span>
              <h2 className='font-serif text-4xl lg:text-5xl font-bold text-foreground mt-3 mb-6'>
                Hành Trình Của Nuvexa
              </h2>
              <p className='text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed'>
                Từ một cửa hàng hoa nhỏ tại Quận 1, Nuvexa đã vươn lên trở thành thương hiệu hoa uy
                tín được hàng nghìn khách hàng tin yêu trên khắp thành phố.
              </p>
            </div>

            <div className='grid md:grid-cols-3 gap-8'>
              {[
                {
                  year: '2016',
                  title: 'Khởi Đầu Khiêm Tốn',
                  desc: 'Nuvexa ra đời trong một căn nhà nhỏ với những bó hoa đầu tiên được cắm bằng đôi tay đầy nhiệt huyết. Chúng tôi bắt đầu nhận đơn qua mạng xã hội và giao hàng bằng xe máy.',
                  emoji: '🌱'
                },
                {
                  year: '2019',
                  title: 'Mở Cửa Hàng Đầu Tiên',
                  desc: 'Sau 3 năm tích lũy, Nuvexa khai trương cửa hàng hoa đầu tiên tại Quận 1. Đây là bước ngoặt lớn, định hình phong cách thiết kế không gian mua sắm hoa sang trọng và tinh tế.',
                  emoji: '🏪'
                },
                {
                  year: '2024',
                  title: 'Thương Hiệu Đáng Tin Cậy',
                  desc: 'Nuvexa hiện có 3 cửa hàng, đội ngũ 30+ nhân viên, phục vụ hơn 12.000 khách hàng. Hệ thống đặt hàng online và giao hàng nhanh giúp chúng tôi phục vụ toàn thành phố.',
                  emoji: '🚀'
                }
              ].map((item) => (
                <div
                  key={item.year}
                  className='bg-card rounded-3xl p-8 shadow-lg border border-border hover:shadow-xl transition-shadow duration-300'
                >
                  <span className='text-5xl mb-4 block'>{item.emoji}</span>
                  <div className='inline-block px-3 py-1 rounded-full bg-primary text-[#fff] text-xs font-bold uppercase tracking-wider mb-3'>
                    {item.year}
                  </div>
                  <h3 className='font-serif text-xl font-bold text-foreground mb-3'>
                    {item.title}
                  </h3>
                  <p className='text-muted-foreground text-sm leading-relaxed'>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ─────────────────────────────────────────────────────────── */}
      <section className='py-20 bg-background'>
        <div className='max-w-7xl mx-auto px-6 lg:px-20'>
          <div ref={statsRef} className='grid grid-cols-2 lg:grid-cols-4 gap-6'>
            {stats.map((stat) => (
              <StatCard key={stat.label} {...stat} visible={statsVisible} />
            ))}
          </div>
        </div>
      </section>

      {/* ── VALUES ────────────────────────────────────────────────────────── */}
      <section className='py-20 bg-muted/20'>
        <div className='max-w-7xl mx-auto px-6 lg:px-20'>
          <div
            ref={valuesRef}
            className={`transition-all duration-700 ${valuesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            <div className='text-center mb-16'>
              <span className='text-secondary font-semibold uppercase tracking-widest text-sm'>
                Giá Trị Cốt Lõi
              </span>
              <h2 className='font-serif text-4xl lg:text-5xl font-bold text-foreground mt-3 mb-5'>
                Những Điều Chúng Tôi Trân Trọng
              </h2>
              <p className='text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed'>
                Sáu giá trị cốt lõi định hình mọi quyết định và hành động của đội ngũ Nuvexa, từ
                cách chọn hoa đến cách chúng tôi phục vụ từng khách hàng.
              </p>
            </div>
            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {values.map((v) => (
                <ValueCard key={v.title} {...v} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TEAM ──────────────────────────────────────────────────────────── */}
      {/* <section className='py-20 bg-background'>
        <div className='max-w-7xl mx-auto px-6 lg:px-20'>
          <div
            ref={teamRef}
            className={`transition-all duration-700 ${teamVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            <div className='text-center mb-16'>
              <span className='text-secondary font-semibold uppercase tracking-widest text-sm'>
                Đội Ngũ Của Chúng Tôi
              </span>
              <h2 className='font-serif text-4xl lg:text-5xl font-bold text-foreground mt-3 mb-5'>
                Những Con Người Đằng Sau Nuvexa
              </h2>
              <p className='text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed'>
                Mỗi thành viên trong đội ngũ Nuvexa đều mang trong mình tình yêu sâu sắc với hoa và
                nghệ thuật, cùng cam kết mang đến trải nghiệm tốt nhất cho khách hàng.
              </p>
            </div>
            <div className='grid sm:grid-cols-2 lg:grid-cols-4 gap-8'>
              {team.map((member) => (
                <TeamCard key={member.name} {...member} />
              ))}
            </div>
          </div>
        </div>
      </section> */}

      {/* ── PROCESS ───────────────────────────────────────────────────────── */}
      <section className='py-20 bg-muted/30'>
        <div className='max-w-7xl mx-auto px-6 lg:px-20'>
          <div
            ref={processRef}
            className={`transition-all duration-700 ${processVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            <div className='grid lg:grid-cols-2 gap-16 items-start'>
              {/* Left info */}
              <div>
                <span className='text-secondary font-semibold uppercase tracking-widest text-sm'>
                  Quy Trình Làm Việc
                </span>
                <h2 className='font-serif text-4xl lg:text-5xl font-bold text-foreground mt-3 mb-6'>
                  Từ Ý Tưởng Đến Tác Phẩm
                </h2>
                <p className='text-muted-foreground text-lg leading-relaxed mb-10'>
                  Quy trình 5 bước khép kín của Nuvexa đảm bảo mỗi đơn hàng đều được thực hiện với
                  sự chăm chút tối đa và giao đến khách hàng trong trạng thái hoàn hảo nhất.
                </p>

                <div className='grid grid-cols-2 gap-4'>
                  {[
                    { icon: Clock, label: 'Giao hàng trong 2h', sub: 'Nội thành TP.HCM' },
                    { icon: MapPin, label: '3 Cửa Hàng', sub: 'Q.1, Q.3, Bình Thạnh' },
                    { icon: Phone, label: '1800 - NUVEXA', sub: 'Hotline miễn phí' },
                    { icon: Mail, label: 'hello@nuvexa.vn', sub: 'Hỗ trợ 24/7' }
                  ].map((item) => (
                    <div
                      key={item.label}
                      className='flex items-start gap-3 p-4 rounded-2xl bg-card border border-border'
                    >
                      <div className='w-9 h-9 rounded-xl bg-primary flex items-center justify-center shrink-0'>
                        <item.icon className='w-4 h-4 text-white' />
                      </div>
                      <div>
                        <p className='text-sm font-bold text-foreground'>{item.label}</p>
                        <p className='text-xs text-muted-foreground'>{item.sub}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right steps */}
              <div className='pt-4'>
                {process.map((step, index) => (
                  <ProcessStep
                    key={step.title}
                    step={index + 1}
                    {...step}
                    isLast={index === process.length - 1}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <section className='py-24 relative overflow-hidden'>
        {/* Dùng màu secondary (coral) của dự án cho CTA */}
        <div className='absolute inset-0 bg-secondary' />
        <div className='absolute inset-0 pointer-events-none'>
          <div className='absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2' />
          <div className='absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3' />
          <div className='absolute top-1/2 left-1/2 w-48 h-48 bg-primary/20 rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2' />
        </div>

        <div
          ref={ctaRef}
          className={`relative max-w-4xl mx-auto px-6 lg:px-20 text-center transition-all duration-700 ${
            ctaVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <span className='inline-block mb-4 text-3xl'>💐</span>
          <h2 className='font-serif text-4xl lg:text-5xl font-bold text-secondary-foreground mb-6 leading-tight'>
            Hãy Để Chúng Tôi Tạo Nên Khoảnh Khắc Đặc Biệt Của Bạn
          </h2>
          <p className='text-secondary-foreground/85 text-lg leading-relaxed mb-10 max-w-2xl mx-auto'>
            Dù là ngày sinh nhật, kỷ niệm, sự kiện doanh nghiệp hay chỉ đơn giản là muốn làm người
            thân bất ngờ – Nuvexa luôn có giải pháp hoa hoàn hảo dành cho bạn.
          </p>
          <div className='flex flex-wrap justify-center gap-4'>
            <Link
              to='/products'
              className='inline-flex items-center gap-2 px-8 py-4 rounded-full bg-card text-secondary font-bold shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300'
            >
              <Sparkles className='w-5 h-5' />
              Đặt Hoa Ngay
            </Link>
            <Link
              to='/contact'
              className='inline-flex items-center gap-2 px-8 py-4 rounded-full border-2 border-secondary-foreground text-secondary-foreground font-bold hover:bg-white/10 transition-all duration-300'
            >
              <Phone className='w-5 h-5' />
              Tư Vấn Miễn Phí
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default AboutUs
