import { Button } from '~/components/ui/button'
import { cn } from '~/lib/utils'

export default function ButtonZalo({ phone, size = 60, position = { bottom: 20, right: 20 } }) {
  const zaloLink = `https://zalo.me/${phone}`

  return (
    <Button
      asChild
      size='icon'
      className={cn(
        'fixed z-50 animate-float',
        'rounded-full p-0 border-0',
        'shadow-[0_8px_20px_rgba(0,0,0,0.4),0_12px_40px_rgba(0,0,0,0.3)]',
        'hover:scale-110 hover:shadow-[0_12px_30px_rgba(0,0,0,0.5),0_16px_50px_rgba(0,0,0,0.4)]',
        'transition-transform transition-shadow duration-200'
      )}
      style={{
        bottom: `${position.bottom}px`,
        right: `${position.right}px`,
        width: `${size}px`,
        height: `${size}px`
      }}
    >
      <a href={zaloLink} target='_blank' rel='noopener noreferrer'>
        <img
          src='/image/zalo-pink-update.png'
          alt='Chat Zalo'
          className='w-full h-full rounded-full object-cover'
        />
        <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 2s ease-in-out infinite;
        }
      `}</style>
      </a>
    </Button>
  )
}
