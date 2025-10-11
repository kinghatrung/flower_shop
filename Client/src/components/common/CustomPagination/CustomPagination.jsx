import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '~/components/ui/pagination'

function CustomPagination({
  currentPage = 1,
  totalPages = 1,
  totalItems = 0,
  onPageChange,
  hasNext = false,
  hasPrev = false,
  label = 'mục'
}) {
  return (
    <div className='flex flex-col sm:flex-row items-center justify-between gap-3 mt-6'>
      <p className='text-sm text-muted-foreground'>
        Trang <span className='font-medium'>{currentPage}</span> / {totalPages} — Tổng:{' '}
        <span className='font-medium'>{totalItems}</span> {label}
      </p>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              className={`cursor-pointer ${!hasPrev ? 'opacity-50 pointer-events-none' : ''}`}
              onClick={() => hasPrev && onPageChange(currentPage - 1)}
            />
          </PaginationItem>

          {[...Array(totalPages)].map((_, i) => (
            <PaginationItem key={i}>
              <PaginationLink
                isActive={currentPage === i + 1}
                onClick={() => onPageChange(i + 1)}
                className='cursor-pointer'
              >
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              className={`cursor-pointer ${!hasNext ? 'opacity-50 pointer-events-none' : ''}`}
              onClick={() => hasNext && onPageChange(currentPage + 1)}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}

export default CustomPagination
