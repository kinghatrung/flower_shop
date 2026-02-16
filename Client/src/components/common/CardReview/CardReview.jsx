import { useState } from 'react'
import dayjs from 'dayjs'

import { Star, Heart, ThumbsUp, ThumbsDown } from 'lucide-react'
import { Card } from '~/components/ui/card'
import { Button } from '~/components/ui/button'

const CardReview = ({ review }) => {
  const [helpful, setHelpful] = useState(review.helpful)
  const [unhelpful, setUnhelpful] = useState(review.unhelpful)
  const [userHelpful, setUserHelpful] = useState(null)

  const handleHelpful = (type) => {
    if (type === 'helpful') {
      if (userHelpful === 'helpful') {
        setHelpful(helpful - 1)
        setUserHelpful(null)
      } else {
        if (userHelpful === 'unhelpful') {
          setUnhelpful(unhelpful - 1)
        }
        setHelpful(helpful + 1)
        setUserHelpful('helpful')
      }
    } else {
      if (userHelpful === 'unhelpful') {
        setUnhelpful(unhelpful - 1)
        setUserHelpful(null)
      } else {
        if (userHelpful === 'helpful') {
          setHelpful(helpful - 1)
        }
        setUnhelpful(unhelpful + 1)
        setUserHelpful('unhelpful')
      }
    }
  }

  return (
    <Card className='p-5 border border-border hover-lift transition-shadow gap-3 mb-7 '>
      <div className='flex items-start gap-4'>
        <div className='text-3xl'>
          <img
            className='h-12 w-12 object-cover rounded-full'
            src={review.avatar_url || '/image/no-image.png'}
            alt='Ảnh đại diện'
          />
        </div>
        <div className='flex-1'>
          <div className='flex items-start justify-between gap-4'>
            <div>
              <p className='font-semibold text-foreground'>{`${review.lastname} ${review.user_name}`}</p>
              <p className='text-sm text-muted-foreground'>
                {dayjs(review.created_at).format('DD/MM/YYYY, hh:mm A')}
              </p>
            </div>
            <div className='flex gap-1'>
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={20}
                  className={
                    i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                  }
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className='font-semibold text-foreground mb-2'>{review.title}</h3>
        <p className='text-sm text-muted-foreground leading-relaxed'>{review.comment}</p>
      </div>

      <div className='flex items-center gap-4 pt-2 border-t border-border'>
        <span className='text-xs text-muted-foreground'>Hữu ích?</span>
        <div className='flex gap-2'>
          <Button
            variant='ghost'
            size='sm'
            onClick={() => handleHelpful('helpful')}
            className={`gap-1 cursor-pointer transition-all duration-300 rounded-full px-3 ${
              userHelpful === 'helpful'
                ? 'bg-red-500 text-white hover:bg-red-600 shadow-lg shadow-red-500/50'
                : 'text-gray-400 hover:text-red-500 hover:bg-gray-100'
            }`}
          >
            {userHelpful === 'helpful' ? (
              <Heart fill='currentColor' size={16} />
            ) : (
              <Heart size={16} />
            )}

            <span className='text-xs font-medium'>{helpful}</span>
          </Button>
        </div>
      </div>
    </Card>
  )
}

export default CardReview
