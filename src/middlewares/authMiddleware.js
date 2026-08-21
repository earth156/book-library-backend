const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    // ดึง token จาก header ในรูปแบบ "Bearer <token>"
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Access Denied: No Token Provided' });
    }

    // ตรวจสอบความถูกต้องของ token
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid or Expired Token' });
        }
        req.user = user; // เก็บข้อมูล user ไว้ใช้ต่อใน request
        next(); // ให้ผ่านไปทำงานที่ Controller ต่อได้
    });
};

module.exports = authenticateToken;