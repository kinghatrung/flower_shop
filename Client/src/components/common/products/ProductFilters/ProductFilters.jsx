import { useState } from 'react'
import { Search, Filter, X } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'

import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Badge } from '~/components/ui/badge'
import { priceRanges } from '~/data'
import { getCategories } from '~/api'

function ProductFilters({
  searchQuery,
  onSearchChange,
  onSearchSubmit,
  selectedCategory,
  onCategoryChange,
  priceRange,
  onPriceRangeChange,
  sortBy,
  onSortChange
}) {
  const [showFilters, setShowFilters] = useState(false)

  const { data, isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: () => getCategories()
  })

  const categories = data?.data

  const clearFilters = () => {
    onSearchChange('')
    onCategoryChange('all')
    onPriceRangeChange([0, 10000000])
  }

  const hasActiveFilters =
    searchQuery || selectedCategory !== 'all' || priceRange[0] > 0 || priceRange[1] < 10000000

  return (
    <div className='space-y-4'>
      {/* Search Bar */}
      <div className='relative'>
        <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground' />
        <Input
          placeholder='Tìm kiếm hoa...'
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') onSearchSubmit(searchQuery)
          }}
          className='pl-10'
        />
      </div>

      {/* Filter Toggle */}
      <div className='flex items-center justify-between'>
        <Button
          variant='outline'
          onClick={() => setShowFilters(!showFilters)}
          className='flex items-center gap-2 cursor-pointer'
        >
          <Filter className='h-4 w-4' />
          Bộ lọc
        </Button>

        {hasActiveFilters && (
          <Button variant='ghost' onClick={clearFilters} className='text-sm cursor-pointer'>
            <X className='h-4 w-4 mr-1' />
            Xóa bộ lọc
          </Button>
        )}
      </div>

      {/* Filters */}
      {showFilters && (
        <div className='space-y-4 p-4 border border-border rounded-lg bg-card'>
          {/* Categories */}
          <div>
            <h3 className='font-semibold mb-3'>Danh mục</h3>
            <div className='flex flex-wrap gap-2'>
              {categories.map((category) => (
                <Badge
                  key={category.id}
                  variant={selectedCategory === category.type ? 'default' : 'outline'}
                  className='cursor-pointer hover:bg-primary/10'
                  onClick={() => onCategoryChange(category.type)}
                >
                  {category.name} ({category.products_count})
                </Badge>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <h3 className='font-semibold mb-3'>Khoảng giá</h3>
            <div className='flex flex-wrap gap-2'>
              {priceRanges.map((range) => (
                <Badge
                  key={range.label}
                  variant={
                    priceRange[0] === range.min && priceRange[1] === range.max
                      ? 'default'
                      : 'outline'
                  }
                  className='cursor-pointer hover:bg-primary/10'
                  onClick={() => onPriceRangeChange([range.min, range.max])}
                >
                  {range.label}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductFilters
