const make = (uri: string) => `user_${uri}`;

export const UserMessagePattern = {
  User: {
    Create: {
      CREATE_USER: make('create'),
      USER_CREATED: make('created'),
    },
  },
};
