import { useState } from 'react'
import { X, Upload } from 'lucide-react'

import { cn } from '~/lib/utils'

function FormImageField({ maxFiles, maxSize }) {
  const [isDragging, setIsDragging] = useState(false)

  return (
    <div
      //   onDragOver={handleDragOver}
      //   onDragLeave={handleDragLeave}
      //   onDrop={handleDrop}
      className={cn(
        'relative rounded-lg border-2 border-dashed transition-colors',
        isDragging
          ? 'border-primary bg-primary/5'
          : 'border-muted-foreground/25 bg-muted/50 hover:border-muted-foreground/50'
      )}
    >
      <div className='flex flex-col items-center justify-center gap-2 p-8'>
        <Upload className='h-8 w-8 text-muted-foreground' />
        <div className='text-center'>
          <p className='text-sm font-medium text-foreground'>
            Kéo thả ảnh vào đây hoặc click để chọn
          </p>
          <p className='text-xs text-muted-foreground'>
            Tối đa {maxFiles} ảnh, mỗi ảnh không quá {maxSize}MB
          </p>
        </div>
        <Input
          type='file'
          multiple
          accept='image/*'
          //   onChange={handleInputChange}
          className='absolute inset-0 cursor-pointer opacity-0'
          //   aria-label={label}
        />
      </div>
    </div>
  )
}

export default FormImageField
