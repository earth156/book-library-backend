const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    // ดึง token จาก header ในรูปแบบ "Bearer <token>"
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Access Denied: No Token Provided' });
    }

    const secret = process.env.JWT_SECRET || 'fallback-secret-key-for-dev-only';

    // ตรวจสอบความถูกต้องของ token
    jwt.verify(token, secret, (err, user) => {
        if (err) {
            // 🛡️ แยกแยะประเภท Token Error ชัดเจน (Expired vs Invalid)
            if (err.name === 'TokenExpiredError') {
                return res.status(401).json({ message: 'Token has expired' });
            }
            return res.status(401).json({ message: 'Invalid or malformed token' });
        }
        req.user = user; // เก็บข้อมูล user ไว้ใช้ต่อใน request
        next(); // ให้ผ่านไปทำงานที่ Controller ต่อได้
    });
};

module.exports = authenticateToken;