import { gql } from 'graphql-request';

export const getProductsQuery = gql`
  query Products($storeId: Int!) {
    products(storeId: $storeId) {
      id
      name
      price
      count
    }
  }
`;
