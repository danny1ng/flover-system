import { gql } from 'graphql-request';

export const getDeductionsQuery = gql`
  query Deductions($storeId: Int!) {
    deductions(storeId: $storeId) {
      id
      message
      summary
    }
  }
`;
