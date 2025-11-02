import HeaderTable from '~/components/common/HeaderTable'

function ContentWebsiteManagement() {
  return (
    <div className='container mx-auto py-8 space-y-6'>
      <HeaderTable
        title='Quản lý nội dung website'
        description='Quản lý các nội dung hiển thị trên website'
        buttonLabel='Thêm sản phẩm'
        isShow={false}
      />
    </div>
  )
}

export default ContentWebsiteManagement
