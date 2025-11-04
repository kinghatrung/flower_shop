# 🌸 Nuvexa - Website Đặt Hoa Online

## Giới thiệu

**Nuvexa** là website cho phép người dùng đặt hoa trực tuyến một cách dễ dàng và tiện lợi.
Hỗ trợ đa dạng loại hoa, quản lý giỏ hàng, thanh toán online và giao hàng tận nơi.

---

## Tính năng

* **Giao hàng**

  * Theo dõi trạng thái đơn hàng.
  * Giao nhanh trong ngày (tùy khu vực).
* **Đặt hàng**

  * Chọn sản phẩm từ danh mục.
  * Thêm vào giỏ hàng và thanh toán trực tuyến.
* **Sản phẩm**

  * Xem chi tiết sản phẩm, giá, mô tả.
  * Tìm kiếm và lọc theo loại và giá.
* **Quản lý người dùng**

  * Tài khoản người dùng.
  * Lịch sử đơn hàng và thông tin cá nhân.

---

## Công nghệ sử dụng

* **Frontend:** React, Tailwind CSS, shadcn/ui, Redux Toolkit, 
* **Backend:** Node.js, Express
* **Database:** MongoDB / PostgreSQL
* **Upload ảnh:** Cloudinary
* **Authentication:** JWT, httpOnly cookies

---

## Cấu trúc dự án

```
nuvexa/
├─ Server/        # Server, API
├─ Client/       # Giao diện người dùng
├─ README.md       # Hướng dẫn dự án
├─ .gitignore      
└─ package.json
```

---

## Cài đặt & chạy dự án

### 1. Clone dự án

```bash
git clone <repository-url>
cd <file>
```

### 2. Cài đặt dependencies

```bash
# Frontend
cd Client
npm install

# Backend
cd Server
npm install
```

### 3. Cấu hình biến môi trường

Tạo file `.env` trong thư mục `backend`:

```
PORT=5000
DB_URI=<database-uri>
JWT_SECRET=<your-jwt-secret>
CLOUDINARY_CLOUD_NAME=<cloud-name>
CLOUDINARY_API_KEY=<api-key>
CLOUDINARY_API_SECRET=<api-secret>
```

### 4. Chạy dự án

```bash
# Backend
cd Server
npm run dev

# Frontend
cd Client
npm run dev
```

Truy cập: [http://localhost:5173](http://localhost:5173)

---

