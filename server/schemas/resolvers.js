
const { User, Schedule, Calloff } = require('../models');

const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      console.log('User in context:', context.user);
      if (context.user) {
        const user = await User.findById(context.user._id);
        if (!user) {
          throw new AuthenticationError('User not found');
        }
        return user;
      }
      throw new AuthenticationError('Not logged in');
    },
    users: async () => {
      try {
        const users = await User.find({});
        return users;
      } catch (error) {
        console.error('Error fetching users:', error);
        throw new Error('Failed to fetch users');
      }
    },
    schedules: async () => {

      const schedules = await Schedule.find({}).populate('user');
      return schedules
    },
    schedule: async (parent, { id }) => {
      return Schedule.findById(id).populate('user');
    },
    userSchedules: async (parent, { user }) => {
      return Schedule.find({ user }).populate('user');
    },
    userCalloffs: async (parent, { user }) => {
      return Calloff.find({ user}).populate({
        path: 'schedule',
        populate: { path: 'user' }
      });

    },
  },

  Mutation: {
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }
      const token = signToken(user);
      return { token, user };
    },

    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },


    addSchedule: async (parent, { user, date, startTime, endTime }, context) => {
      if (context.user) {
        // Find the user by user ID
        const userData = await User.findById(user);

        // Ensure the user exists
        if (!userData) {
          throw new Error('User not found');
        }

        // Create a new schedule with the user ID
        const newSchedule = await Schedule.create({
          user: userData._id,
          date,
          startTime,
          endTime
        });

        // Populate the user field
        const populatedSchedule = await Schedule.findById(newSchedule._id).populate('user');

        return populatedSchedule;

      }
      throw new AuthenticationError('Not logged in');
    },

    removeSchedule: async (parent, { id }, context) => {
      if (context.user) {
        try {
          const deletedSchedule = await Schedule.findByIdAndDelete(id).populate('user');
          if (!deletedSchedule) {
            throw new Error('Schedule not found');
          }
          return deletedSchedule;
        } catch (error) {
          console.error('Error deleting schedule:', error);
          throw new Error('Error deleting schedule: ' + error.message);
        }
      }
      throw new AuthenticationError('Not logged in');
    },

    addCalloff: async (parent, { schedule, status }, context) => {
      if (context.user) {
        const scheduleData = await Schedule.findById(schedule).populate('user');
        if (!scheduleData) {
          throw new Error('Schedule not found');
        }

        const newCalloff = await Calloff.create({
          schedule: scheduleData._id,
          user: scheduleData.user, // Assign the user from the populated schedule
          status,
        });

        return Calloff.findById(newCalloff._id).populate({
          path: 'schedule',
          populate: {
            path: 'user'
          }
        });
      }
      throw new AuthenticationError('Not logged in');
    },
    updateCalloffStatus: async (parent, { id, status }, context) => {
      if (context.user) {
        try {
          const updatedCalloff = await Calloff.findByIdAndUpdate(
            id,
            { status },
            { new: true }
          ).populate('schedule').populate('user');
          if (!updatedCalloff) {
            throw new Error('Calloff not found');
          }
          return updatedCalloff;
        } catch (error) {
          throw new Error('Error updating calloff status: ' + error.message);
        }
      }
      throw new AuthenticationError('Not logged in');
    },
  

  },
  

};

module.exports = resolvers;