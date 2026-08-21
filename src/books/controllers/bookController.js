const bookService = require('../services/bookService');

class BookController {
    getBooks = async (req, res) => {
        try {
            const books = await bookService.getBooks(req.query);
            res.status(200).json(books);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching books', error: error.message });
        }
    };

    getBookById = async (req, res) => {
        try {
            const book = await bookService.getBookById(req.params.id);
            if (!book) {
                return res.status(404).json({ message: 'Book not found' });
            }
            res.status(200).json(book);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching book', error: error.message });
        }
    };

    createBook = async (req, res) => {
        try {
            const newBook = await bookService.createBook(req.body);
            res.status(201).json(newBook); // 201 Created
        } catch (error) {
            // ดัก Error กรณีส่ง categoryId หรือ authorId ที่ไม่มีในระบบ (Prisma Foreign Key Constraint)
            if (error.code === 'P2003') {
                return res.status(400).json({ message: 'Invalid categoryId or authorId' });
            }
            res.status(500).json({ message: 'Error creating book', error: error.message });
        }
    };

    deleteBook = async (req, res) => {
        try {
            await bookService.deleteBook(req.params.id);
            res.status(204).send(); // 204 No Content (ลบสำเร็จ ไม่ต้องส่ง Data กลับ)
        } catch (error) {
            // ดัก Error กรณีพยายามลบ ID ที่ไม่มีในฐานข้อมูล (Prisma Record Not Found)
            if (error.code === 'P2025') {
                return res.status(404).json({ message: 'Book not found' });
            }
            res.status(500).json({ message: 'Error deleting book', error: error.message });
        }
    };
}

module.exports = new BookController();