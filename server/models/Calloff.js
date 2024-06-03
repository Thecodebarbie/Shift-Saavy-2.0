const { Schema, model } = require('mongoose')
//const dateFormat = require('../utils/dateFormat')


const calloffSchema = new Schema({
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User', // Reference to the User model
      required: true
    },
    scheduleId: {
      type: Schema.Types.ObjectId,
      ref: 'Schedule', // Reference to the Schedule model
      required: true
      },
    firstname: {
      type: String,
      required:true
    },
    lastname: {
      type: String,
      required:true
    },
    scheduleDate: {
        type: String,
        required:true
      },
      startTime: {
        type: String,
        required:true
      },
      endTime: {
        type: String,
        required:true
      },

})

const Calloff = model('Calloff', calloffSchema);

module.exports = Calloff;