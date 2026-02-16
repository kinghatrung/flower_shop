import { useState, useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Search, ShoppingCart, Menu, X, Heart, User } from 'lucide-react'
import clsx from 'clsx'

import { useSelector, useDispatch } from 'react-redux'
import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '~/config/queryConfig'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '~/components/ui/dialog'
import { Input } from '~/components/ui/input'
import { Button } from '~/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '~/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'
import { getProductCart, getProducts } from '~/api'
import { ROUTES } from '~/constants'
import { selectCurrentUser, logoutUser } from '~/redux/slices/authSlice'
import { Card } from '~/components/ui/card'
import useDebounce from '~/hooks/useDebounce'

function Header() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [isScrolled, setIsScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isHeaderVisible, setIsHeaderVisible] = useState(true)
  const [search, setSearch] = useState('')
  const [lastScrollY, setLastScrollY] = useState(0)

  const user = useSelector(selectCurrentUser)
  const debouncedSearch = useDebounce(search, 500)
  const page = null
  const limit = null
  const filter = {
    search: debouncedSearch?.trim()
  }

  const { data: productsCardData } = useQuery({
    queryKey: queryKeys.cart.byUser(user?.user_id),
    queryFn: () => getProductCart(user?.user_id)
  })

  const { data: productsData } = useQuery({
    queryKey: queryKeys.products.list({ page, ...filter }),
    queryFn: () => getProducts(page, limit, filter),
    keepPreviousData: true
  })

  const products = productsData?.data
  const productsCard = productsCardData?.data
  const totalProductsCard = productsCard?.reduce((total, product) => total + product.quantity, 0)

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setOpen((prev) => !prev)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      setIsScrolled(currentScrollY > 10)

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsHeaderVisible(false)
      } else {
        setIsHeaderVisible(true)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  const handleLogout = async () => {
    await dispatch(logoutUser(false))
    navigate(ROUTES.LOGIN)
  }

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-background/95 backdrop-blur-md shadow-sm border-b border-border'
          : 'bg-transparent'
      } ${isHeaderVisible ? 'translate-y-0' : '-translate-y-full'}`}
    >
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4'>
        <div className='flex items-center justify-between'>
          <Link to={ROUTES.HOME} className='flex items-center space-x-2 group'>
            <Heart className='h-8 w-8 text-primary fill-current group-hover:scale-110 group-hover:rotate-12 transition-all duration-300' />
            <div>
              <h1 className='font-serif text-2xl font-bold text-foreground group-hover:text-primary transition-colors duration-300'>
                Nuvexa
              </h1>
              <p className='text-xs text-muted-foreground -mt-1'>Luxury Flowers</p>
            </div>
          </Link>

          <nav className='hidden md:flex items-center space-x-8'>
            <NavLink
              className={({ isActive }) =>
                clsx(
                  'hover:text-primary transition-all duration-300 relative group',
                  isActive ? ' text-primary' : ' text-muted-foreground'
                )
              }
              to={ROUTES.HOME}
            >
              Trang chủ
              <span className='absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full group-focus-within:w-full'></span>
            </NavLink>
            <NavLink
              to={ROUTES.PRODUCTS}
              className={({ isActive }) =>
                clsx(
                  'hover:text-primary transition-all duration-300 relative group',
                  isActive ? ' text-primary' : ' text-muted-foreground'
                )
              }
            >
              Bộ sưu tập
              <span className='absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full group-focus-within:w-full'></span>
            </NavLink>
            <NavLink
              to={ROUTES.SERVICES}
              className={({ isActive }) =>
                clsx(
                  'hover:text-primary transition-all duration-300 relative group',
                  isActive ? ' text-primary' : ' text-muted-foreground'
                )
              }
            >
              Dịch vụ
              <span className='absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full group-focus-within:w-full'></span>
            </NavLink>
            <NavLink
              to={ROUTES.CONTACT}
              className={({ isActive }) =>
                clsx(
                  'hover:text-primary transition-all duration-300 relative group',
                  isActive ? ' text-primary' : ' text-muted-foreground'
                )
              }
            >
              Liên hệ
              <span className='absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full group-focus-within:w-full'></span>
            </NavLink>
            <NavLink
              to={ROUTES.QAA}
              className={({ isActive }) =>
                clsx(
                  'hover:text-primary transition-all duration-300 relative group',
                  isActive ? ' text-primary' : ' text-muted-foreground'
                )
              }
            >
              Hỏi đáp
              <span className='absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full group-focus-within:w-full'></span>
            </NavLink>
            <NavLink
              to={ROUTES.ABOUTUS}
              className={({ isActive }) =>
                clsx(
                  'hover:text-primary transition-all duration-300 relative group',
                  isActive ? ' text-primary' : ' text-muted-foreground'
                )
              }
            >
              Về chúng tôi
              <span className='absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full group-focus-within:w-full'></span>
            </NavLink>
          </nav>

          <div className='flex items-center space-x-2'>
            <Dialog
              open={open}
              onOpenChange={() => {
                setOpen(!open)
                setSearch('')
              }}
            >
              <DialogTrigger asChild>
                <Button
                  variant='ghost'
                  size='icon'
                  className='hover:bg-accent/10 hover:text-primary hover:scale-110 transition-all duration-300 relative cursor-pointer'
                  aria-label='Tìm kiếm'
                >
                  <Search className='h-5 w-5' />
                </Button>
              </DialogTrigger>

              <DialogContent className='sm:max-w-[600px] top-[20%] translate-y-[-20%]'>
                <DialogHeader>
                  <DialogTitle className='flex gap-2 items-center text-lg font-bold'>
                    <Search className='h-5 w-5 text-primary' />
                    Tìm kiếm sản phẩm
                    <span className='flex gap-1 items-center text-xs text-muted-foreground border border-gray-200 bg-gray-50 px-2 py-0.5 rounded-md'>
                      <kbd>Ctrl</kbd> + <kbd>K</kbd>
                    </span>
                  </DialogTitle>
                  <DialogDescription className='text-sm mt-1'>
                    Nhập tên sản phẩm bạn muốn tìm.
                  </DialogDescription>
                </DialogHeader>

                <div>
                  <div className='relative w-full max-w-full'>
                    <Search className='absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4' />
                    <Input
                      type='text'
                      className='pl-9 pr-4 py-5 text-base rounded-lg border-2 border-gray-200 focus:border-primary focus-visible:ring-0 focus-visible:ring-offset-0 transition-all duration-300'
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder='Tên loài hoa bạn muốn tìm...'
                      autoFocus
                    />
                  </div>

                  <div className='mt-4'>
                    <Card className='overflow-y-auto overflow-x-hidden max-h-[350px] border-none shadow-none p-0 gap-0'>
                      {search && products?.length > 0 ? (
                        products.map((product) => (
                          <Link
                            to={`${ROUTES.PRODUCTS}/product/${product.slug}-i.${product.id}`}
                            key={product.id}
                            onClick={() => {
                              setOpen(false)
                              setSearch('')
                            }}
                            className='flex gap-3 items-center p-4 border-b hover:bg-gray-50 transition-colors duration-200 last:border-b-0'
                          >
                            <div className='flex-shrink-0'>
                              <img
                                className='w-14 h-14 object-cover rounded-md'
                                src={
                                  product.images.find((image) => image.is_main).url ||
                                  '/image/no-image.png'
                                }
                                alt={product.name}
                              />
                            </div>
                            <div className='flex-grow'>
                              <h1 className='text-sm font-semibold text-gray-800 line-clamp-1'>
                                {product.name}
                              </h1>

                              <p className='text-xs text-primary font-bold mt-0.5'>
                                {new Intl.NumberFormat('vi-VN', {
                                  style: 'currency',
                                  currency: 'VND'
                                }).format(product.price)}
                              </p>
                            </div>

                            <Search className='h-4 w-4 text-muted-foreground flex-shrink-0' />
                          </Link>
                        ))
                      ) : search ? (
                        <div className='text-center p-8 text-muted-foreground'>
                          Không tìm thấy sản phẩm nào khớp với **"{search}"**.
                        </div>
                      ) : (
                        <div className='text-center p-8 text-muted-foreground'>
                          Bắt đầu nhập để xem các kết quả tìm kiếm!
                        </div>
                      )}
                    </Card>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <Link to={ROUTES.CART}>
              <Button
                variant='ghost'
                size='icon'
                className='hover:bg-accent/10 hover:text-primary hover:scale-110 transition-all duration-300 relative cursor-pointer'
                aria-label={`Giỏ hàng (${productsCard?.length} sản phẩm)`}
              >
                <ShoppingCart className='h-5 w-5' />
                {totalProductsCard > 0 && (
                  <span className='absolute -top-1 -right-1 bg-secondary text-secondary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse cursor-pointer'>
                    {totalProductsCard}
                  </span>
                )}
              </Button>
            </Link>

            <div className='hidden sm:block'>
              <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant='ghost'
                    size='icon'
                    className='hover:bg-accent/10 hover:text-primary hover:scale-110 transition-all duration-300 cursor-pointer'
                    aria-label='Tài khoản'
                  >
                    {user?.isauth ? (
                      <Avatar>
                        <AvatarImage src={user.avatar_url} />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                    ) : (
                      <User className='h-5 w-5' />
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end' className='w-48'>
                  {!user?.isauth && (
                    <>
                      <DropdownMenuItem asChild>
                        <Link to={ROUTES.LOGIN} className='cursor-pointer'>
                          Đăng nhập
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to={ROUTES.REGISTER} className='cursor-pointer'>
                          Đăng ký
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                    </>
                  )}
                  <DropdownMenuItem asChild>
                    <Link to={ROUTES.PROFILE} className='cursor-pointer'>
                      Hồ sơ cá nhân
                    </Link>
                  </DropdownMenuItem>
                  {user?.role === 'admin' && (
                    <DropdownMenuItem asChild>
                      <Link to={ROUTES.ADMIN_DASHBOARD} className='cursor-pointer'>
                        Quản lí hệ thống
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem asChild>
                    <Link href='/orders' className='cursor-pointer'>
                      Đơn hàng của tôi
                    </Link>
                  </DropdownMenuItem>
                  {user?.isauth && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link
                          onClick={() => {
                            handleLogout()
                          }}
                          className='cursor-pointer'
                        >
                          Đăng xuất
                        </Link>
                      </DropdownMenuItem>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <Button
              variant='ghost'
              size='icon'
              className='md:hidden hover:bg-accent/10 hover:scale-110 transition-all duration-300'
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label='Menu'
            >
              {isMobileMenuOpen ? <X className='h-5 w-5' /> : <Menu className='h-5 w-5' />}
            </Button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className='md:hidden mt-4 pb-4 border-t border-border animate-fade-in-up bg-accent-foreground'>
            <nav className='flex flex-col space-y-4 pt-4'>
              <NavLink
                to={ROUTES.HOME}
                className={({ isActive }) =>
                  clsx(
                    'hover:text-primary transition-colors hover:translate-x-2 transition-transform duration-300',
                    isActive ? ' text-primary' : ' text-muted-foreground'
                  )
                }
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Trang chủ
              </NavLink>
              <NavLink
                to={ROUTES.PRODUCTS}
                className={({ isActive }) =>
                  clsx(
                    'hover:text-primary transition-colors hover:translate-x-2 transition-transform duration-300',
                    isActive ? ' text-primary' : ' text-muted-foreground'
                  )
                }
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Bộ sưu tập
              </NavLink>
              <NavLink
                to={ROUTES.SERVICES}
                className={({ isActive }) =>
                  clsx(
                    'hover:text-primary transition-colors hover:translate-x-2 transition-transform duration-300',
                    isActive ? ' text-primary' : ' text-muted-foreground'
                  )
                }
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Dịch vụ
              </NavLink>
              <NavLink
                to={ROUTES.CONTACT}
                className={({ isActive }) =>
                  clsx(
                    'hover:text-primary transition-colors hover:translate-x-2 transition-transform duration-300',
                    isActive ? ' text-primary' : ' text-muted-foreground'
                  )
                }
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Liên hệ
              </NavLink>
              <NavLink
                to={ROUTES.QAA}
                className={({ isActive }) =>
                  clsx(
                    'hover:text-primary transition-colors hover:translate-x-2 transition-transform duration-300',
                    isActive ? ' text-primary' : ' text-muted-foreground'
                  )
                }
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Hỏi đáp
              </NavLink>
              <NavLink
                to={ROUTES.ABOUTUS}
                className={({ isActive }) =>
                  clsx(
                    'hover:text-primary transition-colors hover:translate-x-2 transition-transform duration-300',
                    isActive ? ' text-primary' : ' text-muted-foreground'
                  )
                }
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Về chúng tôi
              </NavLink>
              <div className='border-t border-border pt-4 mt-4'>
                {!user?.isauth ? (
                  <>
                    <Link
                      to={ROUTES.LOGIN}
                      className='text-muted-foreground hover:text-primary transition-all duration-300 hover:translate-x-2 block'
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Đăng nhập
                    </Link>
                    <Link
                      to={ROUTES.REGISTER}
                      className='text-muted-foreground hover:text-primary transition-all duration-300 hover:translate-x-2 block mt-4'
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Đăng ký
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      className='text-muted-foreground hover:text-primary transition-all duration-300 hover:translate-x-2 block mt-4'
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Hồ sơ cá nhân
                    </Link>
                    <Link
                      className='text-muted-foreground hover:text-primary transition-all duration-300 hover:translate-x-2 block mt-4'
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Đơn hàng của tôi
                    </Link>
                    <Link
                      className='text-muted-foreground hover:text-primary transition-all duration-300 hover:translate-x-2 block mt-4'
                      onClick={() => {
                        setIsMobileMenuOpen(false)
                        handleLogout()
                      }}
                    >
                      Đăng xuất
                    </Link>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
