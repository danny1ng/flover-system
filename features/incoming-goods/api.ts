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
      note
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
