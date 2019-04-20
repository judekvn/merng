import merge from 'lodash.merge';

/** * Queries ** */
import {
  schema as GetAllUsers,
  queries as GetAllUsersQueries,
  resolvers as GetAllUsersResolver,
} from './users/GetAllUsers';
import {
  queries as GetLoggedInUserQueries,
  resolvers as GetLoggedInUserResolver,
} from './users/GetLoggedInUser';

/** * Mutations ** */
import {
  mutation as CreateUser,
  resolvers as CreateUserResolver,
} from './users/CreateUser';

export const schema = [...GetAllUsers];

export const queries = [...GetAllUsersQueries, ...GetLoggedInUserQueries];

export const mutations = [...CreateUser];

export const resolvers = merge(
  GetAllUsersResolver,
  GetLoggedInUserResolver,
  CreateUserResolver,
);
