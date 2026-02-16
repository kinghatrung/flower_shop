import { useState } from 'react'
import { Star, X } from 'lucide-react'
import { Card } from '~/components/ui/card'
import { Button } from '~/components/ui/button'

function WriteReviewForm({ onClose, onSubmit }) {
  const [rating, setRating] = useState(5)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    setTimeout(() => {
      onSubmit?.({ name, email, rating, title, content })
      setName('')
      setEmail('')
      setTitle('')
      setContent('')
      setRating(5)
      setIsSubmitting(false)
    }, 500)
  }

  return (
    <Card className='p-8 border border-border'>
      <div className='flex items-center justify-between mb-6'>
        <h3 className='text-2xl font-bold text-foreground'>Viết đánh giá của bạn</h3>
        {onClose && (
          <button
            onClick={onClose}
            className='text-muted-foreground hover:text-foreground transition-colors'
          >
            <X size={24} />
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className='space-y-6'>
        <div>
          <label className='block text-sm font-medium text-foreground mb-3'>Xếp hạng</label>
          <div className='flex gap-2'>
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type='button'
                onClick={() => setRating(star)}
                className='transition-transform hover:scale-110'
              >
                <Star
                  size={32}
                  className={`cursor-pointer ${
                    star <= rating
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300 hover:text-yellow-400'
                  }`}
                />
              </button>
            ))}
          </div>
          <p className='text-xs text-muted-foreground mt-2'>
            {rating === 1 && 'Rất không hài lòng'}
            {rating === 2 && 'Không hài lòng'}
            {rating === 3 && 'Bình thường'}
            {rating === 4 && 'Tốt'}
            {rating === 5 && 'Rất tốt'}
          </p>
        </div>

        <div>
          <label className='block text-sm font-medium text-foreground mb-2'>Tên của bạn</label>
          <input
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder='Nhập tên của bạn'
            className='w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all'
            required
          />
        </div>

        <div>
          <label className='block text-sm font-medium text-foreground mb-2'>Email</label>
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Nhập email của bạn'
            className='w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all'
            required
          />
        </div>

        <div>
          <label className='block text-sm font-medium text-foreground mb-2'>Tiêu đề đánh giá</label>
          <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder='Ví dụ: Sản phẩm tuyệt vời!'
            className='w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all'
            required
          />
        </div>

        <div>
          <label className='block text-sm font-medium text-foreground mb-2'>
            Nội dung đánh giá
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder='Hãy chia sẻ trải nghiệm của bạn với sản phẩm này...'
            rows={6}
            className='w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none'
            required
          />
          <p className='text-xs text-muted-foreground mt-2'>{content.length}/500 ký tự</p>
        </div>

        <div className='flex gap-3 pt-4'>
          <Button
            type='submit'
            disabled={isSubmitting || !name || !email || !title || !content}
            className='flex-1 bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed'
          >
            {isSubmitting ? 'Đang gửi...' : 'Gửi đánh giá'}
          </Button>

          {onClose && (
            <Button
              type='button'
              variant='outline'
              onClick={onClose}
              className='px-6 border-border text-foreground hover:bg-muted bg-transparent'
            >
              Hủy
            </Button>
          )}
        </div>
      </form>

      <p className='text-xs text-muted-foreground mt-6 text-center'>
        Đánh giá của bạn sẽ được kiểm duyệt trước khi xuất bản
      </p>
    </Card>
  )
}

export default WriteReviewForm
