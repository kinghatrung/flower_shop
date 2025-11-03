import AccordionData from '~/components/common/AccordionData'
import { aboutProduct, aboutDelivery, aboutOrdering } from '~/data'

function Qaa() {
  return (
    <div className='pt-24 pb-16 px-4'>
      <div className='max-w-7xl mx-auto'>
        <AccordionData title='Về giao hàng' items={aboutDelivery} />
        <AccordionData title='Về đặt hàng' items={aboutOrdering} />
        <AccordionData title='Về sản phẩm' items={aboutProduct} />
      </div>
    </div>
  )
}

export default Qaa
