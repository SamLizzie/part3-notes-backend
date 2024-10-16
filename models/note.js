const mongoose = require('mongoose')
const config = require('../utils/config')

mongoose.set('strictQuery', false)

const url = config.MONGODB_URI

console.log('connecting to ' + url)

mongoose.connect(url).then(result => {
  console.log('Connected to MongoDB')
}).catch(error => {
  console.log('Error connecting to MongoDB: ' + error.message)
})

const noteSchema = new mongoose.Schema({
  content: {
    type: String,
    minLength: 5,
    require: true
  },
  important: Boolean,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

noteSchema.set('toJSON', { transform: (document, returnedObject) => {
  returnedObject.id = returnedObject._id.toString()
  delete returnedObject._id
  delete returnedObject.__v
}
})

module.exports = mongoose.model('Note', noteSchema)