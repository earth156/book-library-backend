const prisma = require('../../config/db');

class AuthorRepository {
    // ดึงข้อมูลผู้แต่งทั้งหมดจากฐานข้อมูล
    findAll = async () => {
        return await prisma.author.findMany();
    };
}

module.exports = new AuthorRepository();