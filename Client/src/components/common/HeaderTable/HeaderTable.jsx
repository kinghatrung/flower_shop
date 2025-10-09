import { Plus } from 'lucide-react'

import { Button } from '~/components/ui/button'

function HeaderTable({ title, description, buttonLabel, onSomething }) {
  return (
    <div className='flex items-center justify-between'>
      <div>
        <h1 className='text-3xl font-bold tracking-tight'>{title}</h1>
        <p className='text-muted-foreground mt-1'>{description}</p>
      </div>
      <Button
        onClick={() => onSomething(true)}
        className='gap-2 text-center cursor-pointer hover:scale-105 transition-all duration-300 text-[#fff]'
      >
        <Plus className='size-4' />
        {buttonLabel}
      </Button>
    </div>
  )
}

export default HeaderTable
