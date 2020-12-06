import { gql } from 'graphql-request';
import { graphQLClientClient } from 'libs';

export const getWriteOffsQuery = gql`
  query WriteOffs($storeId: Int!) {
    writeOffs(storeId: $storeId) {
      id
      name
      count
      note
      createdAt
    }
  }
`;

export const addWriteOffReq = values =>
  graphQLClientClient.request(
    gql`
      mutation addWriteOff($storeId: Int!, $productId: Int!, $count: Int!, $note: String) {
        addWriteOff(storeId: $storeId, count: $count, productId: $productId, note: $note) {
          id
          name
        }
      }
    `,
    values,
  );
