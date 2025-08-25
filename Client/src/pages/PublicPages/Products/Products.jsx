import { useState, useMemo } from 'react'

import ProductCard from '~/components/common/products/ProductCard'
import ProductFilters from '~/components/common/products/ProductFilters'
import { products } from '~/data'
import { useScrollAnimation } from '~/hooks/useScrollAnimationOptions'

function Products() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [priceRange, setPriceRange] = useState([0, 10000000])

  const { isVisible: headerVisible, ref: headerRef } = useScrollAnimation()
  const { isVisible: filtersVisible, ref: filtersRef } = useScrollAnimation()
  const { isVisible: productsVisible, ref: productsRef } = useScrollAnimation()

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1]

      return matchesSearch && matchesCategory && matchesPrice
    })
  }, [searchQuery, selectedCategory, priceRange])

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
              className={`sticky top-24 transition-all duration-700 ${filtersVisible ? 'animate-slide-in-left' : ''}`}
            >
              <ProductFilters
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
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
              className={`transition-all duration-700 ${productsVisible ? 'animate-fade-in-up' : ''}`}
            >
              <div className='flex items-center justify-between mb-6'>
                <p className='text-muted-foreground'>Hiển thị {filteredProducts.length} sản phẩm</p>
              </div>

              {filteredProducts.length > 0 ? (
                <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                  {filteredProducts.map((product, index) => (
                    <div
                      key={product.id}
                      className={`transition-all duration-500 ${productsVisible ? 'animate-fade-in-up' : ''}`}
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
