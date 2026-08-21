// server.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

const categoryRoutes = require('./src/categories/routes/categoryRoutes');
const authorRoutes = require('./src/authors/routes/authorRoutes');
// Middlewares พื้นฐาน
app.use(cors()); // อนุญาตให้ Frontend เรียก API ข้ามพอร์ตได้
app.use(express.json()); // อนุญาตให้รับข้อมูลแบบ JSON


// ใช้งาน Routes
app.use('/api/categories', categoryRoutes);
app.use('/api/authors', authorRoutes);



// Route พื้นฐานสำหรับทดสอบว่า Server ทำงานปกติ
app.get('/', (req, res) => {
    res.send('Book library server is up and ready to roll');
});

// กำหนดให้ Server เริ่มทำงาน
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});