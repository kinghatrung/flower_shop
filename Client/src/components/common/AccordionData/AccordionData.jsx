import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '~/components/ui/accordion'

function AccordionData({ title, items }) {
  return (
    <div className='mb-12'>
      <h1 className='mt-6 mb-4 font-serif text-4xl lg:text-3xl font-bold text-foreground'>
        {title}
      </h1>
      <Accordion type='single' collapsible className='w-full'>
        {items.map((item, index) => (
          <AccordionItem key={index} value={`item-${index + 1}`}>
            <AccordionTrigger className='cursor-pointer text-lg'>{item.question}</AccordionTrigger>
            <AccordionContent className='flex flex-col gap-4 text-lg text-balance opacity-70'>
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}

export default AccordionData
