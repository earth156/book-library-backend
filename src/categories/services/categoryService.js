const categoryRepository = require('../repositories/categoryRepository');

class CategoryService {
    getAllCategories = async () => {
        // ในอนาคตถ้ามีเงื่อนไขอะไรเพิ่มเติมก่อนส่งข้อมูล คัดกรองตรงนี้ได้ครับ
        return await categoryRepository.findAll();
    };
}

module.exports = new CategoryService();