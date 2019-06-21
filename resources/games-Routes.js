const router = require('express').Router();
const db = require('./games-Models');

router.get('/', (req, res) => {
    db.find()
    .then(games => {
        games.length >= 1 ? res.status(200).json({success: true, games}):
        res.status(404).json({success: false, message: 'Sorry, no GAMES atm!'})
    })
    .catch(err => {
        res.status(500).json(errorRef(err))
    })
})

router.post('/', (req, res) => {
    return null
})

// error middleware
const errorRef = (error) => {
    const hash = Math.random().toString(36).substring(2);
    console.log(hash, error)
    return { message: `Unknown Error, Ref: ${hash}`, error }
}


module.exports = router;