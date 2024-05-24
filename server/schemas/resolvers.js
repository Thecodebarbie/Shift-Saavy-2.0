const { User, Schedule } = require('../models');
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
      console.log(schedules)
      return schedules
    },
    schedule: async (parent, { id }) => {
      return Schedule.findById(id).populate('user');
    },
    userSchedules: async (parent, { userId }) => {
      return Schedule.find({ userId });
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
        return Schedule.findByIdAndDelete(id);
      }
      throw new AuthenticationError('Not logged in');
    },
  },
};

module.exports = resolvers;