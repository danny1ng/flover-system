import { gql } from 'graphql-request';
import { graphQLClientClient } from 'libs';

export const getIncomingGoodsQuery = gql`
  query Products($storeId: Int!) {
    incomingGoods(storeId: $storeId) {
      id
      name
      price
      count
      createdAt
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
      mutation addIncomingGood(
        $name: String
        $storeId: Int!
        $productId: Int
        $price: Int
        $count: Int!
        $note: String
      ) {
        addIncomingGood(
          name: $name
          storeId: $storeId
          price: $price
          count: $count
          productId: $productId
          note: $note
        ) {
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
