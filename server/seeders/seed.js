const db = require('../config/connection');
const { User, Schedule } = require('../models');
const userSeeds = require('./userSeeds.json');
const scheduleSeeds = require('./scheduleSeeds.json');

// Function to clean the database
async function cleanDB(modelName, collectionName) {
  try {
    const model = require(`../models/${modelName}`);
    await model.deleteMany({});
    console.log(`Cleared ${collectionName} collection`);
  } catch (err) {
    console.error(`Failed to clear ${collectionName} collection: ${err.message}`);
  }
}

db.once('open', async () => {
  try {
    // Clean existing collections
    await cleanDB('Schedule', 'schedules');
    await cleanDB('User', 'users');

    // Create users
    const createdUsers = await User.create(userSeeds);
    
    // Create a map of usernames to user IDs
    const userMap = {};
    createdUsers.forEach(user => {
      userMap[user.username] = user._id;
    });

    // Create schedules and link them to users
    for (let i = 0; i < scheduleSeeds.length; i++) {
      const scheduleData = {
        ...scheduleSeeds[i],
        userId: userMap[scheduleSeeds[i].userId] // Replace with actual user ID
      };
      const schedule = await Schedule.create(scheduleData);
      await User.findByIdAndUpdate(scheduleData.userId, {
        $addToSet: { schedules: schedule._id }
      });
    }

    console.log('All done!');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
});
