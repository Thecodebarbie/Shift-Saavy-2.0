const { Schema, model } = require('mongoose')
//const dateFormat = require('../utils/dateFormat')


const calloffSchema = new Schema({
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