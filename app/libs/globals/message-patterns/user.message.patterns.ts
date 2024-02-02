const make = (uri: string) => `user_${uri}`;

export const UserMessagePattern = {
  User: {
    Create: {
      CREATE_USER: make('create'),
      USER_CREATED: make('created'),
    },
    Get: {
      GET_USER: make('get'),
      USER_FOUNDED: make('found'),
    },
  },
  v1: {
    User: {
      GET_USER: 'students.v1.get',
    },
  },
};
