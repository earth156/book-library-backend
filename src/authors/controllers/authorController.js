const authorService = require('../services/authorService');

class AuthorController {
    getAuthors = async (req, res) => {
        try {
            const authors = await authorService.getAllAuthors();
            res.status(200).json(authors);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    };
}

module.exports = new AuthorController();