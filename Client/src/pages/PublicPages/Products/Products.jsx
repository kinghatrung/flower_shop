import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

import ProductCard from '~/components/common/products/ProductCard'
import ProductFilters from '~/components/common/products/ProductFilters'
import { useScrollAnimation } from '~/hooks/useScrollAnimationOptions'
import { getProducts } from '~/api'
import { useQuery } from '@tanstack/react-query'
import CardSkeletonProduct from '~/components/common/CardSkeletonProduct'
import useDebounce from '~/hooks/useDebounce'
import useQueryParams from '~/hooks/useQueryParams'

function Products() {
  const queryString = useQueryParams()
  const [searchParams, setSearchParams] = useSearchParams()

  const [searchQuery, setSearchQuery] = useState(queryString.search || '')
  const [appliedSearch, setAppliedSearch] = useState(queryString.search || '')
  const [selectedCategory, setSelectedCategory] = useState(queryString.category || 'all')
  const [priceRange, setPriceRange] = useState([
    queryString.minPrice ? Number(queryString.minPrice) : 0,
    queryString.maxPrice ? Number(queryString.maxPrice) : 10000000
  ])

  const { isVisible: headerVisible, ref: headerRef } = useScrollAnimation()
  const { isVisible: filtersVisible, ref: filtersRef } = useScrollAnimation()
  const { isVisible: productsVisible, ref: productsRef } = useScrollAnimation()

  const { data, isLoading } = useQuery({
    queryKey: ['products', appliedSearch, selectedCategory, priceRange],
    queryFn: () =>
      getProducts({
        search: appliedSearch,
        category_type: selectedCategory === 'all' ? '' : selectedCategory,
        priceRange: getPriceRangeParam(priceRange)
      }),
    keepPreviousData: true
  })

  const products = data?.data

  const getPriceRangeParam = (range) => {
    const [min, max] = range
    if (min === 0 && max === 10000000) return ''
    if (max === Infinity) return `${min / 1000}+`
    return `${min / 1000}-${max / 1000}`
  }

  // Cập nhật URL khi filter hoặc appliedSearch thay đổi
  useEffect(() => {
    const params = {}
    if (appliedSearch) params.search = appliedSearch
    if (selectedCategory && selectedCategory !== 'all') params.category = selectedCategory
    if (priceRange[0] !== 0) params.minPrice = priceRange[0]
    if (priceRange[1] !== 10000000) params.maxPrice = priceRange[1]

    setSearchParams(params)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appliedSearch, selectedCategory, priceRange])

  return (
    <div className='pt-24 pb-16 px-4'>
      <div className='max-w-7xl mx-auto'>
        {/* Page Header */}
        <div
          ref={headerRef}
          className={`text-center space-y-4 mb-12 transition-all duration-700 ${
            headerVisible ? 'animate-fade-in-up' : ''
          }`}
        >
          <h1 className='font-serif text-4xl lg:text-5xl font-bold text-foreground'>
            Bộ sưu tập hoa
          </h1>
          <p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
            Khám phá những bó hoa tươi cao cấp được tuyển chọn kỹ lưỡng, mang đến vẻ đẹp hoàn hảo
            cho mọi dịp đặc biệt
          </p>
        </div>

        <div className='grid lg:grid-cols-4 gap-8'>
          {/* Filters Sidebar */}
          <div className='lg:col-span-1'>
            <div
              ref={filtersRef}
              className={`sticky top-24 transition-all duration-700 ${
                filtersVisible ? 'animate-slide-in-left' : ''
              }`}
            >
              <ProductFilters
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                onSearchSubmit={setAppliedSearch}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
                priceRange={priceRange}
                onPriceRangeChange={setPriceRange}
              />
            </div>
          </div>

          {/* Products Grid */}
          <div className='lg:col-span-3'>
            <div
              ref={productsRef}
              className={`transition-all duration-700 ${
                productsVisible ? 'animate-fade-in-up' : ''
              }`}
            >
              <div className='flex items-center justify-between mb-6'>
                <p className='text-muted-foreground'>Hiển thị {products?.length} sản phẩm</p>
              </div>
              {isLoading ? (
                <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                  <CardSkeletonProduct />
                  <CardSkeletonProduct />
                  <CardSkeletonProduct />
                </div>
              ) : products?.length > 0 ? (
                <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                  {products?.map((product, index) => (
                    <div
                      key={product.id}
                      className={`transition-all duration-500 ${
                        productsVisible ? 'animate-fade-in-up' : ''
                      }`}
                      style={{
                        animationDelay: productsVisible ? `${index * 0.1}s` : '0s'
                      }}
                    >
                      <ProductCard product={product} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className='text-center py-12'>
                  <p className='text-muted-foreground text-lg'>
                    Không tìm thấy sản phẩm nào phù hợp
                  </p>
                  <p className='text-sm text-muted-foreground mt-2'>
                    Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Products
