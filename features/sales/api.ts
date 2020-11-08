import { gql } from 'graphql-request';
import { graphQLClientClient } from 'libs';

export const getSalesQuery = gql`
  query Sales($storeId: Int!) {
    sales(storeId: $storeId) {
      id
      count
      discount
      note
      summary
      createdAt
      product {
        name
        price
      }
      store {
        id
        name
      }
    }
  }
`;

export const addSaleReq = values =>
  graphQLClientClient.request(
    gql`
      mutation addSale($storeId: Int!, $productId: Int!, $count: Int!) {
        addSale(storeId: $storeId, productId: $productId, count: $count) {
          id
          product {
            name
          }
        }
      }
    `,
    values,
  );
