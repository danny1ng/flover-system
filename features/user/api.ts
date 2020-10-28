// export const getCurrentUserQueryKey = () => ['/sessions'];

import { gql } from 'graphql-request';

export const getCurrentUserQuery = gql`
  {
    me {
      id
      role
    }
  }
`;
