const prisma = require('../../config/db');

class BookRepository {
    // ดึงหนังสือทั้งหมด พร้อมรองรับ Filter
    findAll = async (filters) => {
        const where = {};

        // ตรวจสอบว่ามีการส่ง query อะไรมาบ้าง
        if (filters.categoryId) {
            where.categoryId = parseInt(filters.categoryId);
        }
        if (filters.authorId) {
            where.authorId = parseInt(filters.authorId);
        }

        return await prisma.book.findMany({
            where,
            include: {
                category: true,
                author: true
            }
        });
    };

    // ดึงหนังสือตาม ID
    findById = async (id) => {
        return await prisma.book.findUnique({
            where: { id: parseInt(id) },
            include: { category: true, author: true }
        });
    };

    // สร้างหนังสือใหม่
    create = async (data) => {
        return await prisma.book.create({
            data: {
                title: data.title,
                categoryId: parseInt(data.categoryId),
                authorId: parseInt(data.authorId)
            },
            include: { category: true, author: true }
        });
    };

    // ลบหนังสือ
    delete = async (id) => {
        return await prisma.book.delete({
            where: { id: parseInt(id) }
        });
    };
}

module.exports = new BookRepository();