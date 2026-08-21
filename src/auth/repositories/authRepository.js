const prisma = require('../../config/db');

class AuthRepository {
    // หา User จาก Username
    findByUsername = async (username) => {
        return await prisma.user.findUnique({ where: { username } });
    };

    // สร้าง User ใหม่
    createUser = async (username, hashedPassword) => {
        return await prisma.user.create({
            data: { username, password: hashedPassword }
        });
    };
}

module.exports = new AuthRepository();