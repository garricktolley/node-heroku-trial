const express = require('express');
const router = express.Router();
const Joi = require('Joi');

const genres = [
    {id: 1, name: 'action'},
    {id: 2, name: 'comedy'},
    {id: 3, name: 'horror'},
    {id: 4, name: 'drama'}
];

router.get('/', (req, res)=>{
    res.send(genres);
});
router.get('/:id', (req, res)=>{
    const genre = genres.find(value => value.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send("Genre doesn't Exist");
    res.send(genre);
});

router.post('/', (req, res)=>{
    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = {
        id: genres.length + 1,
        name: req.body.name
    }
    genres.push(genre);
    res.send(genre);
});

router.put('/:id', (req, res)=>{
    const genre = genres.find(value => value.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send("Genre doesn't Exist");

    const {error} = validateGenre(req.body);
    if (error) return res.status(400).send("Genre doesn't exist - can't update");

    genre.name = req.body.name;
    res.send(genre);
    });

router.delete('/:id', (req, res)=>{
    const genre = genres.find(value => value.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send("Genre doesn't Exist");

    const index = genres.indexOf(genre);
    genres.splice(index,1);
    res.send(genre);
});

// create validating function
function validateGenre(genre){
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(genre, schema);
}

module.exports = router;
