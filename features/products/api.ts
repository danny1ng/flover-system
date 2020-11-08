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

export const getProductQuery = gql`
  query Products($productId: Int!) {
    product(productId: $productId) {
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

export const editProductReq = values =>
  graphQLClientClient.request(
    gql`
      mutation addProduct($name: String!, $productId: Int!, $price: Int!, $count: Int) {
        editProduct(name: $name, productId: $productId, price: $price, count: $count) {
          id
          name
        }
      }
    `,
    values,
  );
