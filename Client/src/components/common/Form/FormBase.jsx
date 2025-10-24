import clsx from 'clsx'

import { Button } from '~/components/ui/button'

function FormBase({ onSubmit, children, submitLabel = 'Lưu', className, isActive = true }) {
  return (
    <form
      onSubmit={onSubmit}
      className={clsx(className, 'relative transition-all duration-300', {
        'opacity-100 pointer-events-auto': isActive,
        'opacity-50 pointer-events-none': !isActive
      })}
    >
      <div className='grid gap-4'>{children}</div>

      {isActive && (
        <Button
          type='submit'
          className='mt-5  cursor-pointer w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground'
        >
          {submitLabel}
        </Button>
      )}
    </form>
  )
}

export default FormBase
