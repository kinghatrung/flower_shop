import AccordionData from '~/components/common/AccordionData'
import { aboutProduct, aboutDelivery, aboutOrdering } from '~/data'
import { useScrollAnimation } from '~/hooks/useScrollAnimationOptions'

function Qaa() {
  const { isVisible: commitmentVisible, ref: commitmentRef } = useScrollAnimation()

  return (
    <div className='pt-24 pb-16 px-4'>
      <div className='max-w-7xl mx-auto'>
        <div
          ref={commitmentRef}
          className={`bg-card rounded-2xl p-8 border border-border ${commitmentVisible ? 'animate-slide-in-bottom' : 'opacity-0'}`}
        >
          <AccordionData title='Về giao hàng' items={aboutDelivery} />
          <AccordionData title='Về đặt hàng' items={aboutOrdering} />
          <AccordionData title='Về sản phẩm' items={aboutProduct} />
        </div>
      </div>
    </div>
  )
}

export default Qaa
