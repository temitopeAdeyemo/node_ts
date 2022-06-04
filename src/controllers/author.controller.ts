import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Author from '../models/author.model';

const author = async (req: Request, res: Response, next: NextFunction) => {
    const { name } = req.body;
    const newAuthor = new Author({ name });
    await newAuthor.save();
    return res.status(201).json({
        message: newAuthor
    });
};

const getAuthors = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authors = await Author.find();
        return res.status(201).json({
            message: authors
        });
    } catch (error) {
        return res.status(500).json({
            message: error
        });
    }
};

const getAuthor = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { _id } = req.headers;
        const author = await Author.findOne({ _id });
        author
            ? res.status(200).json({
                  message: author
              })
            : res.status(201).json({
                  message: 'No author found...'
              });
    } catch (error) {
        return res.status(500).json({
            message: error
        });
    }
};

const updateAuthor = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { _id } = req.headers;
        const author = await Author.findOne({ _id });
        if (author) {
            author.set(req.body);
            author.save();
            return res.status(200).json({
                author
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

const deleteAuthor = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { _id } = req.headers;
        const author = await Author.findByIdAndDelete({ _id });
        author
            ? res.status(200).json({
                  message: "Author deleted successfully"
              })
            : res.status(404).json({
                  message: 'No author found...'
              });
    } catch (error) {
        return res.status(500).json({
            message: error
        });
    }
};

export default { author, getAuthors, getAuthor, updateAuthor, deleteAuthor };