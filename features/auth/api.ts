import { gql } from 'graphql-request';
import { graphQLClientClient } from 'libs';

export const logout = () => {};

export const loginReq = values =>
  graphQLClientClient.request(
    gql`
      mutation login($name: String!, $password: String!) {
        login(name: $name, password: $password) {
          token
        }
      }
    `,
    values,
  );
