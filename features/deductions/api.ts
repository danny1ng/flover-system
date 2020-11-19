import { gql } from 'graphql-request';
import { graphQLClientClient } from 'libs';

export const getDeductionsQuery = gql`
  query Deductions($storeId: Int!) {
    deductions(storeId: $storeId) {
      id
      message
      summary
    }
  }
`;

export const addDeductionReq = values =>
  graphQLClientClient.request(
    gql`
      mutation addDeduction($message: String!, $storeId: Int!, $summary: Int!) {
        addDeduction(message: $message, storeId: $storeId, summary: $summary) {
          id
          message
          summary
        }
      }
    `,
    values,
  );
