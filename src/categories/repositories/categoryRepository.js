const prisma = require('../../config/db');

class CategoryRepository {
    // ดึงข้อมูลหมวดหมู่ทั้งหมดจากฐานข้อมูล
    findAll = async () => {
        return await prisma.category.findMany();
    };
}

module.exports = new CategoryRepository();