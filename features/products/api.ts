import { gql } from 'graphql-request';
import { graphQLClientClient } from 'libs';

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

export const addProductReq = values =>
  graphQLClientClient.request(
    gql`
      mutation addProduct($name: String!, $storeId: Int!, $price: Int!, $count: Int) {
        addProduct(name: $name, storeId: $storeId, price: $price, count: $count) {
          id
          name
        }
      }
    `,
    values,
  );
