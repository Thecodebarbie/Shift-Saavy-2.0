
const { User, Schedule, Calloff } = require('../models');

const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      console.log('User in context:', context.user);
      if (context.user) {
        const user = await User.findById(context.user._id);
        if (!user) {
          throw AuthenticationError;
        }
        return user;
      }
      throw  AuthenticationError;
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
    getSchedulesByDate: async (parent, { date }) => {
      try {
        return await Schedule.find({ date }).populate('user');
      } catch (error) {
        throw new Error('Error fetching schedules');
      }
    },
    userCalloffs: async (parent, { userId }) => {
    
      // Fetch Calloffs by userId
      return Calloff.find({ userId });
    },
  },

  Mutation: {
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw AuthenticationError;
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw AuthenticationError;
      }
      const token = signToken(user);
      return { token, user };
    },

    addUser: async (parent, { firstname, lastname, username, email, password }) => {
      const user = await User.create({ firstname, lastname, username, email, password });
      const token = signToken(user);
      return { token, user };
    },


    addSchedule: async (parent, { user, date, startTime, endTime, status}, context) => {
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
          endTime,
          status: 'Active'
        });

        // Populate the user field
        const populatedSchedule = await Schedule.findById(newSchedule._id).populate('user');

        return populatedSchedule;

      }
      throw AuthenticationError;
    },

    updateScheduleStatus: async (parent, { id, status }, context) => {
      
      if (context.user) {
      try {
        // Find the schedule by ID
        const schedule = await Schedule.findByIdAndUpdate(id, { status: status }, { new: true }).populate('user');;
        return schedule;
      } catch (error) {
        // Handle error if any
        throw new Error('Failed to update schedule status');
      }
    }
    throw AuthenticationError;
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
      throw AuthenticationError;
    },

    addCalloff: async (parent, { userId, scheduleId, firstname, lastname, scheduleDate, startTime, endTime }, context) => {
        if (context.user) {
          // Create a new calloff
          const newCalloff = await Calloff.create({
            userId,
            scheduleId,
            firstname,
            lastname,
            scheduleDate,
            startTime,
            endTime
          });

          // Find and populate the related schedule
          //const populatedCalloff = await Calloff.findById(newCalloff._id);

          return newCalloff;
        }
      throw AuthenticationError;
    },
    removeCalloff: async (_, { id }, { user }) => {
      // Check if the user is authenticated
      if (!user) {
        throw new Error('Authentication required');
      }

      try {
        // Find and delete the calloff by its ID
        const deletedCalloff = await Calloff.findByIdAndDelete(id);

        if (!deletedCalloff) {
          throw new Error('Calloff not found');
        }

        return true; // Deletion successful
      } catch (error) {
        console.error('Failed to delete calloff:', error);
        throw new Error('Failed to delete calloff');
      }
    }
  },
  

};

module.exports = resolvers;