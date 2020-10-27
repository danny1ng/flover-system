import { gql } from 'graphql-request';

export const getProductsQuery = gql`
  query Deductions($storeId: Int!) {
    deductions(storeId: $storeId) {
      id
      message
      summary
    }
  }
`;
