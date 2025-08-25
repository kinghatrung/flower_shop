import Hero from '~/components/layouts/Hero'
import Stats from '~/components/layouts/Stats'
import FeaturedProducts from '~/components/layouts/FeaturedProducts'
import Services from '~/components/layouts/Services'
import AboutSection from '~/components/layouts/AboutSection'
import Testimonials from '~/components/layouts/Testimonials'
import Newsletter from '~/components/layouts/Newsletter'

function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <FeaturedProducts />
      <Services />
      <AboutSection />
      <Testimonials />
      <Newsletter />
    </>
  )
}

export default Home
