const { Router } = require('express');
const { check } = require('express-validator');
const { ValidateFields } = require('../helpers/validate-fields');
const { getNotes, getNote, createNote, updateNote, deleteNote } = require('../controllers/notes');
const router = Router();



router.get('/', getNotes);
router.get('/:id', getNote);
router.post(
    '/', 
    [
        check('title', 'Title is required').not().isEmpty(),
        check('categories', 'Categories is required').not().isEmpty(),
        ValidateFields
    ],
    createNote);
router.patch(
    '/:id', 
    // [
    //     check('title', 'Title is required').not().isEmpty(),
    //     check('categories', 'Categories is required').not().isEmpty(),
    //     ValidateFields
    // ],
    updateNote);
router.delete('/:id', deleteNote);


module.exports = router;