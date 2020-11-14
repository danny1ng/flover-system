import { gql } from 'graphql-request';
import { graphQLClientClient } from 'libs';

export const getIncomingGoodsQuery = gql`
  query Products($storeId: Int!) {
    products(storeId: $storeId) {
      id
      name
      price
      count
    }
  }
`;

export const getIncomingGoodQuery = gql`
  query Products($productId: Int!) {
    product(productId: $productId) {
      id
      name
      price
      count
    }
  }
`;

export const addIncomingGoodReq = values =>
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

export const editIncomingGoodReq = values =>
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
