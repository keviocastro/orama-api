const router = require('express').Router()

router.get('/', (req, res) => {
    res.json({
        healthy: true,
        message: "Hey bro"
    })
})

router.get('/segments', (req, res) => {
    res.json({
     "teste": "testee"   
    })
})

module.exports = router