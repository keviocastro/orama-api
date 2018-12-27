const mongoose = require('mongoose')

const schema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        require: false
    }
})