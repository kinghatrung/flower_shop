import { Card, CardContent } from '~/components/ui/card'
import { Skeleton } from '~/components/ui/skeleton'

function CardSkeletonProduct() {
  return (
    <Card className='group overflow-hidden border-border p-0'>
      <div className='relative aspect-square overflow-hidden'>
        {/* Image skeleton */}
        <Skeleton className='h-full w-full' />

        {/* Badges skeleton */}
        <div className='absolute top-3 left-3 flex flex-col gap-2'>
          <Skeleton className='h-6 w-16' />
        </div>

        {/* Wishlist button skeleton */}
        <div className='absolute top-3 right-3'>
          <Skeleton className='h-10 w-10 rounded-md' />
        </div>

        {/* Quick add button skeleton */}
        <div className='absolute inset-x-3 bottom-3'>
          <Skeleton className='h-10 w-full' />
        </div>
      </div>

      <CardContent className='p-4'>
        <div className='space-y-2'>
          {/* Title skeleton */}
          <Skeleton className='h-5 w-3/4' />

          {/* Description skeleton */}
          <Skeleton className='h-4 w-full' />
          <Skeleton className='h-4 w-5/6' />

          {/* Rating skeleton */}
          <div className='flex items-center gap-1'>
            <div className='flex items-center gap-0.5'>
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className='h-3 w-3' />
              ))}
            </div>
            <Skeleton className='h-3 w-16 ml-1' />
          </div>

          {/* Price skeleton */}
          <div className='flex items-center gap-2'>
            <Skeleton className='h-6 w-24' />
            <Skeleton className='h-4 w-20' />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default CardSkeletonProduct
