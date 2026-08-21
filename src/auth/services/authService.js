const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authRepository = require('../repositories/authRepository');

class AuthService {
    // Logic สำหรับสมัครสมาชิก
    registerUser = async (username, password) => {
        // เช็คว่ามี Username นี้ซ้ำในระบบหรือไม่
        const existingUser = await authRepository.findByUsername(username);
        if (existingUser) {
            throw new Error('Username already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        return await authRepository.createUser(username, hashedPassword);
    };

    // Logic สำหรับเข้าสู่ระบบ
    loginUser = async (username, password) => {
        const user = await authRepository.findByUsername(username);

        if (!user) {
            throw new Error('Invalid credentials'); // หา user ไม่พบ
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error('Invalid credentials'); // รหัสผ่านไม่ตรง
        }

        // สร้าง JWT Token
        const token = jwt.sign(
            { userId: user.id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: '1d' } // หมดอายุใน 1 วัน
        );

        return token;
    };
}

module.exports = new AuthService();