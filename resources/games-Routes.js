const router = require('express').Router();
const db = require('./games-Models');

router.get('/', (req, res) => {
    db.find()
    .then(games => {
        games.length >= 1 ? res.status(200).json({success: true, games}):
        // res.status(404).json({success: false, message: 'Sorry, no GAMES atm!'})
        res.status(404).json({games})
    })
    .catch(err => {
        res.status(500).json(errorRef(err))
    })
})

router.post('/', (req, res) => {
    const newGame = req.body
    const { title, genre, releaseYear } = req.body

    title && genre && releaseYear ?
    db.add(newGame)
    .then(count => {
        const unit = count > 1 ? 'games': 'game';
        count ? res.status(201).json({success: true, message: `${newGame.description} ${unit} created`, newGame}):
        res.status(404).json({success: false, message: 'could not add new'})
    })
    .catch(err => {
        res.status(500).json(errorRef(err))
    })
    :
    res.status(422).json({message: 'INCOMPLETE:  Must include title, genre and releaseYear to add to database.'})
})

// error middleware
const errorRef = (error) => {
    const hash = Math.random().toString(36).substring(2);
    console.log(hash, error)
    return { message: `Unknown Error, Ref: ${hash}`, error }
}


module.exports = router;