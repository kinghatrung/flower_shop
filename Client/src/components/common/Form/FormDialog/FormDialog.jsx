import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '~/components/ui/dialog'
import { Button } from '~/components/ui/button'

function FormDialog({
  open,
  onOpenChange,
  title,
  description,
  onSubmit,
  children,
  submitLabel = 'Lưu'
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[500px]'>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <form onSubmit={onSubmit}>
          <div className='grid gap-4 py-4'>{children}</div>

          <DialogFooter>
            <Button
              className='cursor-pointer'
              type='button'
              variant='outline'
              onClick={() => onOpenChange(false)}
            >
              Hủy
            </Button>
            <Button type='submit' className='cursor-pointer text-white'>
              {submitLabel}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default FormDialog
