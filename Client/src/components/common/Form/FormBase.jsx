import { Button } from '~/components/ui/button'

function FormBase({ onSubmit, children, submitLabel = 'Lưu', className }) {
  return (
    <form onSubmit={onSubmit} className={className}>
      <div className='grid gap-4'>{children}</div>

      <Button
        type='submit'
        // disabled={!isFormValid || isLoading}
        className='cursor-pointer w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground'
      >
        {submitLabel}
      </Button>
    </form>
  )
}

export default FormBase
