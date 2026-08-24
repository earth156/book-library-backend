const prisma = require('../../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class AuthController {
    // สมัครสมาชิก (เอาไว้สร้าง User ทดสอบ)
    register = async (req, res) => {
        try {
            const { username, password } = req.body;

            // 🛡️ Validation: เช็คค่าว่าง
            if (!username || !username.trim() || !password) {
                return res.status(400).json({ message: 'Username and password are required.' });
            }

            // 🛡️ Validation: เช็คความยาวชื่อผู้ใช้ (อย่างน้อย 3 ตัวอักษร)
            if (username.trim().length < 3) {
                return res.status(400).json({ message: 'Username must be at least 3 characters long.' });
            }

            const hashedPassword = await bcrypt.hash(password, 10); // เข้ารหัสผ่าน

            const user = await prisma.user.create({
                data: { username: username.trim(), password: hashedPassword }
            });
            res.status(201).json({ message: 'User created successfully', userId: user.id });
        } catch (error) {
            // 🛡️ ดักจับกรณีชื่อผู้ใช้ซ้ำในระบบ (Prisma Unique Constraint Error)
            if (error.code === 'P2002') {
                return res.status(409).json({ message: 'Username already exists.' });
            }
            res.status(500).json({ message: 'Error creating user', error: error.message });
        }
    };

    // เข้าสู่ระบบ (ตามที่โจทย์ต้องการ)
    login = async (req, res) => {
        try {
            const { username, password } = req.body;

            // 🛡️ Validation: เช็คค่าว่างก่อนส่งยิง DB / Compare
            if (!username || !username.trim() || !password) {
                return res.status(400).json({ message: 'Username and password are required.' });
            }

            const cleanUsername = username.trim();

            // 1. หา user ในฐานข้อมูล
            const user = await prisma.user.findUnique({ where: { username: cleanUsername } });
            if (!user) return res.status(401).json({ message: 'Invalid credentials' });

            // 2. ตรวจสอบรหัสผ่าน
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

            // 3. สร้าง JWT Token (ตั้งให้หมดอายุใน 3 วัน)
            const secret = process.env.JWT_SECRET || 'fallback-secret-key-for-dev-only';
            const token = jwt.sign(
                { userId: user.id, username: user.username },
                secret,
                { expiresIn: '3d' }
            );

            res.status(200).json({ message: 'Login successful', token });
        } catch (error) {
            res.status(500).json({ message: 'Error logging in', error: error.message });
        }
    };
}

module.exports = new AuthController();