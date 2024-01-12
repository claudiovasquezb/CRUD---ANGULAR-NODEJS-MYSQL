const Note = require("../models/note");



const getNotes = async( req, res) => {
    try {
        const notes = await Note.findAll();
        res.json(notes);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Could not obtain the notes"
        });
    }

}

const getNote = async( req, res) => {
    const { id } = req.params;
    try {
        const note = await Note.findByPk( id );
        res.json(note);
    } catch (error) {
        res.status(404).json({
            msg: `There is no note with id ${id}`
        });
    }
    
}

const createNote = async (req, res) => {
    const note = new Note(req.body);
    try {
        await note.save();
        res.status(201).json(note);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "The note could not be save"
        });
    }
}

const updateNote = async(req, res) => {
    const { id } = req.params;
    const { body } = req;
    try {
        const note = await Note.findByPk( id );
        console.log(note);
        if( !note ) {
            return res.status(404).json({
                msg: `There is no note with id ${id}`
            })
        }
        await note.update( body );
        res.status(201).json(note);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "The note could not be updated"
        });
    }
}

const deleteNote = async(req, res) => {
    const { id } = req.params;
    try {
        const note = await Note.findByPk( id );
        if(!note){
            return res.status(404).json({
                msg: `There is no note with id ${id}`
            });
        }
        await note.destroy();
        res.status(200).json({
            msg: `The note with id ${id} has been deleted`
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "The note could not be deleted"
        });
    }
}

module.exports = {
    getNotes,
    getNote,
    createNote,
    updateNote,
    deleteNote
}