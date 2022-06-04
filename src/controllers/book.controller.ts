import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Book from '../models/book.model';

const book = async (req: Request, res: Response, next: NextFunction) => {
    const { title, author } = req.body;
    const newBook = new Book({ title, author });
    await newBook.save();
    return res.status(201).json({
        message: newBook
    });
};

const getBooks = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const book = await Book.find();
        return res.status(201).json({
            message: book
        });
    } catch (error) {
        return res.status(500).json({
            message: error
        });
    }
};

const getBook = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { _id } = req.headers;
        const book = await Book.findOne({ _id });
        book
            ? res.status(200).json({
                  message: book
              })
            : res.status(201).json({
                  message: 'No Book found...'
              });
    } catch (error) {
        return res.status(500).json({
            message: error
        });
    }
};

const updateBook = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { _id } = req.headers;
        const book = await Book.findOne({ _id });
        if (book) {
            book.set(req.body);
            book.save();
            return res.status(200).json({
                book
            });
        } else {
            return res.status(404).json({
                message: 'Not found'
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: error
        });
    }
};

const deleteBook = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { _id } = req.headers;
        const book = await Book.findByIdAndDelete({ _id });
        book
            ? res.status(200).json({
                  message: 'Book deleted successfully'
              })
            : res.status(404).json({
                  message: 'No book found...'
              });
    } catch (error) {
        return res.status(500).json({
            message: error
        });
    }
};

export default { book, getBook, getBooks, updateBook, deleteBook };
