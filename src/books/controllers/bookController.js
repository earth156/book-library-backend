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
            const bookId = parseInt(req.params.id, 10);
            if (isNaN(bookId)) {
                return res.status(400).json({ message: 'Invalid book ID format. Must be an integer.' });
            }

            const book = await bookService.getBookById(bookId);
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
            const { title, categoryId, authorId } = req.body;

            // 🛡️ Validation 1: เช็คค่าว่าง
            if (!title || !title.trim() || !categoryId || !authorId) {
                return res.status(400).json({ message: 'Title, categoryId, and authorId are required.' });
            }

            // 🛡️ Validation 2: เช็คว่าเป็นตัวเลขที่ถูกต้องไหม
            const parsedCategory = parseInt(categoryId, 10);
            const parsedAuthor = parseInt(authorId, 10);

            if (isNaN(parsedCategory) || isNaN(parsedAuthor)) {
                return res.status(400).json({ message: 'categoryId and authorId must be valid integers.' });
            }

            const newBook = await bookService.createBook({
                title: title.trim(),
                categoryId: parsedCategory,
                authorId: parsedAuthor
            });
            res.status(201).json(newBook);
        } catch (error) {
            // ดัก Error กรณีส่ง categoryId หรือ authorId ที่ไม่มีในระบบ (Prisma Foreign Key Constraint)
            if (error.code === 'P2003') {
                return res.status(400).json({ message: 'Invalid categoryId or authorId (Foreign key constraint)' });
            }
            res.status(500).json({ message: 'Error creating book', error: error.message });
        }
    };

    deleteBook = async (req, res) => {
        try {
            const bookId = parseInt(req.params.id, 10);
            if (isNaN(bookId)) {
                return res.status(400).json({ message: 'Invalid book ID format. Must be an integer.' });
            }

            await bookService.deleteBook(bookId);
            res.status(200).json({ message: 'Book deleted successfully' });
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