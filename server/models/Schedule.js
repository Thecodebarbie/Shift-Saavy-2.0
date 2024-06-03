const { Schema, model } = require('mongoose')
//const dateFormat = require('../utils/dateFormat')


const scheduleSchema = new Schema({
      user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        
      },
      date: {
        type: String,
        required: true,
      },
      startTime: {
        type: String,
        required: true,
      },
      endTime: {
        type: String,
        required: true,
      },
      status: {
        type: String,
        required: true,
      },
})

const Schedule = model('Schedule', scheduleSchema);

module.exports =Schedule;