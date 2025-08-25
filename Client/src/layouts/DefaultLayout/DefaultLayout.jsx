import Footer from '~/components/layouts/Footer'
import Header from '~/components/layouts/Header'

function DefaultLayout({ children }) {
  return (
    <div className='min-h-screen bg-background'>
      <Header />
      <div className='min-h-screen bg-background'>{children}</div>
      <Footer />
    </div>
  )
}

export default DefaultLayout
