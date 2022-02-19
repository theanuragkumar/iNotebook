const express= require('express');
const fetchuser = require('../middlerware/fetchuser');
const router= express.Router();
const Notes= require('../models/Notes');
const {validationResult, body}= require('express-validator');


//Route:1 Get loggedin User details using: Get "/api/notes/fetchallnotes". Login required.
router.get('/fetchallnotes',fetchuser,async (req, res)=>{
    
    try {
        const notes = await Notes.find({user: req.user.id});
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }


})

//Route:2 Add a new notes using: Post "/api/notes/addnote". Login required.

router.post('/addnote',fetchuser,[
    body('title', 'Enter a Valid title').isLength({min : 3}),
    body('description','description must be atleast 5 character').isLength({min : 5}),
    ],async (req, res)=>{

    try {

        const{title,description, tag} = req.body;

        // If there are Validation errors,return Bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
        }
        
        const note=new Notes({
            title, description, tag, user: req.user.id
        })
        console.log(note);
        const saveNote = await note.save();
        res.json(saveNote);
    } catch (error) {
        
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }

    

})

//Route:3 Update a existing notes using: PUT "/api/notes/updatenote". Login required.
router.put('/updatenote/:id',fetchuser,async (req, res)=>{
    
    try {
        const{title,description, tag} = req.body;

        // create a new note Object
        const newNote = {}
        if(title){newNote.title=title};
        if(description){newNote.description=description};
        if(tag){newNote.tag=tag};

        // Find the note to be updated and update it.
        let note =await Notes.findById(req.params.id);
        if(!note){return res.status(404).send("Not Found")}

        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Not Allowed");
        }
        note = await Notes.findByIdAndUpdate(req.params.id,{$set: newNote}, {new:true})
        res.json({note});

        
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
    
    })



//Route:3 Delete a existing notes using: Delete "/api/notes/deletenote". Login required.
router.delete('/deletenote/:id',fetchuser,async (req, res)=>{
    
    try {
        // Find the note to be delete and delete it.
        let note =await Notes.findById(req.params.id);
        if(!note){return res.status(404).send("Not Found")}

        // Allow Deletion only if user owns this notes
        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Not Allowed");
        }
        note = await Notes.findByIdAndDelete(req.params.id)
        res.json({"Success":"Note has deleted",note: note});
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }

    

    })

module.exports = router