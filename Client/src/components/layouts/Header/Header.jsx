import { useState, useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Search, ShoppingCart, Menu, X, Heart, User } from 'lucide-react'
import clsx from 'clsx'
import { useSelector, useDispatch } from 'react-redux'
import { useQuery } from '@tanstack/react-query'

import { Button } from '~/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '~/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'
import { getProductCart } from '~/api'
import { ROUTES } from '~/constants'
import { selectCurrentUser, logoutUser } from '~/redux/slices/authSlice'

function Header() {
  const user = useSelector(selectCurrentUser)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { data } = useQuery({
    queryKey: ['cart', user?.user_id],
    queryFn: () => getProductCart(user?.user_id)
  })

  const products = data?.data
  const totalProducts = products?.reduce((total, product) => total + product.quantity, 0)

  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isHeaderVisible, setIsHeaderVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

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
          </nav>

          <div className='flex items-center space-x-2'>
            <Button
              variant='ghost'
              size='icon'
              className='hover:bg-accent/10 hover:text-primary hover:scale-110 transition-all duration-300 cursor-pointer'
              aria-label='Tìm kiếm'
            >
              <Search className='h-5 w-5' />
            </Button>
            <Link to={ROUTES.CART}>
              <Button
                variant='ghost'
                size='icon'
                className='hover:bg-accent/10 hover:text-primary hover:scale-110 transition-all duration-300 relative cursor-pointer'
                aria-label={`Giỏ hàng (${products?.length} sản phẩm)`}
              >
                <ShoppingCart className='h-5 w-5' />
                {totalProducts > 0 && (
                  <span className='absolute -top-1 -right-1 bg-secondary text-secondary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse cursor-pointer'>
                    {totalProducts}
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
