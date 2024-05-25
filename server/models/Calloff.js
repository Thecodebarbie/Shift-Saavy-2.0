const { Schema, model } = require('mongoose')
//const dateFormat = require('../utils/dateFormat')


const calloffSchema = new Schema({
    schedule: {
        type: Schema.Types.ObjectId,
        ref: 'Schedule',
      },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
      status: {
        type: String,
        required: true,
      },
})

const Calloff = model('Calloff', calloffSchema);

module.exports = Calloff;