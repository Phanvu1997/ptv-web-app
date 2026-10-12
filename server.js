const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Thư mục chứa file tĩnh
const staticFolder = path.join(__dirname, 'public');
app.use(express.static(staticFolder));

// API Báo giá
app.post('/api/contact', (req, res) => {
  const { name, phone, email, projectType, budget, note } = req.body;
  if (!name || (!phone && !email)) {
    return res.status(400).json({ success: false, message: 'Vui lòng điền thông tin!' });
  }
  return res.status(200).json({ success: true, message: 'PTV TECH đã tiếp nhận thông tin!' });
});

// Điều hướng SPA Routing (Xử lý tất cả các trang về index.html)
app.use((req, res) => {
  res.sendFile(path.join(staticFolder, 'index.html'));
});

// Khởi chạy Server
app.listen(PORT, () => {
  console.log(`🚀 PTV Web Apps Server đang chạy thành công!`);
  console.log(`🌍 Mở trình duyệt xem tại: http://localhost:${PORT}`);
});