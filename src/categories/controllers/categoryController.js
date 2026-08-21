const categoryService = require('../services/categoryService');

class CategoryController {
    getCategories = async (req, res) => {
        try {
            const categories = await categoryService.getAllCategories();
            res.status(200).json(categories);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    };
}

module.exports = new CategoryController();