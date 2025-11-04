import { useState, useRef } from 'react'
import { X, Upload } from 'lucide-react'
import { Input } from '~/components/ui/input'

import { Label } from '~/components/ui/label'
import { uploadImage } from '~/api'

function FormImageField({ id, label, errors, register, required, maxImages = 5, onImagesChange }) {
  const [images, setImages] = useState([])
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef(null)

  const isMaxReached = images.length >= maxImages

  const handleFiles = async (files) => {
    if (isMaxReached) return

    const fileArray = Array.from(files).filter((file) => file.type.startsWith('image/'))

    if (fileArray.length === 0) return

    const remainingSlots = maxImages - images.length
    const filesToAdd = fileArray.slice(0, remainingSlots)

    const newImages = filesToAdd.map((file) => ({
      id: Math.random(),
      file,
      preview: URL.createObjectURL(file),
      uploading: true
    }))
    setImages((prev) => [...prev, ...newImages])

    // upload từng ảnh lên Cloudinary
    const uploadedResults = await Promise.all(
      filesToAdd.map(async (file) => {
        const formData = new FormData()
        formData.append('images', file)
        const res = await uploadImage(formData)
        return res.data.data[0]
      })
    )

    // cập nhật lại ảnh sau khi upload thành công
    setImages((prev) => {
      const updated = prev.map((img) => {
        if (img.uploading) {
          // lấy kết quả upload tương ứng theo thứ tự
          const uploaded = uploadedResults.shift()
          return {
            ...img,
            uploading: false,
            preview: uploaded.image_url,
            publicId: uploaded.public_id,
            url: uploaded.image_url
          }
        }
        return img
      })
      if (onImagesChange) onImagesChange(updated)
      return updated
    })
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    if (isMaxReached) return
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    if (isMaxReached) return
    handleFiles(e.dataTransfer.files)
  }

  const handleInputChange = (e) => {
    if (isMaxReached) return
    handleFiles(e.target.files)
  }

  const handleRemoveImage = (imageId) => {
    const updatedImages = images.filter((img) => img.id !== imageId)
    setImages(updatedImages)
    if (onImagesChange) onImagesChange(updatedImages)
  }

  return (
    <div className='space-y-2'>
      <Label htmlFor={id}>
        {label} {required && <span className='text-destructive'>*</span>}
      </Label>

      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => {
          if (!isMaxReached && fileInputRef.current) fileInputRef.current.click()
        }}
        className={`relative border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
          isDragging
            ? 'border-primary bg-primary/5'
            : isMaxReached
              ? 'border-muted-foreground/50 bg-muted cursor-not-allowed opacity-70'
              : 'border-border hover:border-primary/50'
        }`}
      >
        <Input
          ref={fileInputRef}
          id={id}
          type='file'
          multiple
          accept='image/*'
          onChange={handleInputChange}
          disabled={isMaxReached}
          className='hidden'
          {...(register
            ? register(id, { required: required ? `${label} là bắt buộc` : false })
            : {})}
        />
        <Upload
          className={`mx-auto h-8 w-8 mb-2 ${
            isMaxReached ? 'text-muted-foreground/50' : 'text-muted-foreground'
          }`}
        />
        <p className='text-sm font-medium'>
          {isMaxReached ? 'Đã đạt số lượng ảnh tối đa' : 'Kéo thả ảnh hoặc nhấp để chọn'}
        </p>
        <p className='text-xs text-muted-foreground mt-1'>
          Tối đa {maxImages} ảnh ({images.length}/{maxImages})
        </p>
      </div>

      {images.length > 0 && (
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4'>
          {images.map((image) => (
            <div key={image.id} className='relative group'>
              <img
                src={image.preview || '/placeholder.svg'}
                alt='Preview'
                className='w-full h-24 object-cover rounded-lg border border-border'
              />
              <button
                type='button'
                onClick={() => handleRemoveImage(image.id)}
                className='absolute top-1 right-1 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity'
              >
                <X className='h-4 w-4' />
              </button>
            </div>
          ))}
        </div>
      )}

      {errors && errors[id] && <p className='text-sm text-destructive'>{errors[id].message}</p>}
    </div>
  )
}

export default FormImageField
