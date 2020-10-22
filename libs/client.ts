import request from 'graphql-request';
import { RequestDocument } from 'graphql-request/dist/types';

export const client = (gql: RequestDocument, vars: any) => request('/api', gql, vars);
