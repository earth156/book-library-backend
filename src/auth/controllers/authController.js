const prisma = require('../../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class AuthController {
    // สมัครสมาชิก (เอาไว้สร้าง User ทดสอบ)
    register = async (req, res) => {
        try {
            const { username, password } = req.body;
            const hashedPassword = await bcrypt.hash(password, 10); // เข้ารหัสผ่าน

            const user = await prisma.user.create({
                data: { username, password: hashedPassword }
            });
            res.status(201).json({ message: 'User created successfully', userId: user.id });
        } catch (error) {
            res.status(500).json({ message: 'Error creating user', error: error.message });
        }
    };

    // เข้าสู่ระบบ (ตามที่โจทย์ต้องการ)
    login = async (req, res) => {
        try {
            const { username, password } = req.body;

            // 1. หา user ในฐานข้อมูล
            const user = await prisma.user.findUnique({ where: { username } });
            if (!user) return res.status(401).json({ message: 'Invalid credentials' });

            // 2. ตรวจสอบรหัสผ่าน
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

            // 3. สร้าง JWT Token (ตั้งให้หมดอายุใน 3 วัน)
            const token = jwt.sign(
                { userId: user.id, username: user.username },
                process.env.JWT_SECRET,
                { expiresIn: '3d' }
            );

            res.status(200).json({ message: 'Login successful', token });
        } catch (error) {
            res.status(500).json({ message: 'Error logging in', error: error.message });
        }
    };
}

module.exports = new AuthController();