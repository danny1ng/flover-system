import { gql } from 'graphql-request';

export const getStoreQuery = gql`
  query Sales($storeId: Int!) {
    store(storeId: $storeId) {
      id
      balance
      name
    }
  }
`;
