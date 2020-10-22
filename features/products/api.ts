import { gql } from 'graphql-request';

export const getProductsQuery = gql`
  {
    products(storeId: 1) {
      id
      name
      price
      count
    }
  }
`;
