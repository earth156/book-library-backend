const bookRepository = require('../repositories/bookRepository');

class BookService {
    getBooks = async (filters) => {
        return await bookRepository.findAll(filters);
    };

    getBookById = async (id) => {
        return await bookRepository.findById(id);
    };

    createBook = async (data) => {
        return await bookRepository.create(data);
    };

    deleteBook = async (id) => {
        return await bookRepository.delete(id);
    };
}

module.exports = new BookService();