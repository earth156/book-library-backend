const authorRepository = require('../repositories/authorRepository');

class AuthorService {
    getAllAuthors = async () => {
        return await authorRepository.findAll();
    };
}

module.exports = new AuthorService();