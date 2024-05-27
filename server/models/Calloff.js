const { Schema, model } = require('mongoose')
//const dateFormat = require('../utils/dateFormat')


const calloffSchema = new Schema({
    schedule: {
        type: Schema.Types.ObjectId,
        ref: 'Schedule',
      },
      status: {
        type: String,
        required: true,
      },
})

const Calloff = model('Calloff', calloffSchema);

module.exports = Calloff;