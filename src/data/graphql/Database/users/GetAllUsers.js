import User from '../../../models/User';

export const schema = [
  `
  # A user stored in the local database
  type DatabaseUser {
    _id: String
    email: String
    emailConfirmed: String
    date: String
  }

  type DatabaseUserLogin {
    _id: String
    name: String
    key: String
    date: String
    user: String
  }

  type DatabaseUserClaim {
    _id: String
    type: String
    value: String
    date: String
    user: String
  }

  type DatabaseUserProfile {
    _id: String
    displayName: String
    picture: String
    gender: String
    location: String
    website: String
    date: String
    user: String
  }
`,
];

export const queries = [
  `
  # Retrieves all users stored in the local database
  databaseGetAllUsers: [DatabaseUser]

  # Retrieves a single user from the local database
  databaseGetUser(
    # The user's email address
    email: String!
  ): DatabaseUser
`,
];

export const resolvers = {
  RootQuery: {
    async databaseGetAllUsers() {
      const users = await User.findAll();
      return users;
    },
    async databaseGetUser(parent, { email }) {
      const user = await User.findOne({ email });
      return user;
    },
  },
};
