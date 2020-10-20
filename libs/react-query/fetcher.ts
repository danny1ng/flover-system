import { NextPageContext } from 'next';

import { apiClient, createApiClient } from '../api';

/** Next.js like url: /user/[id] */
type QueryKeyUrl = string;
type QueryKeyParams = Record<string, any>;

const buildQueryKey = (rawUrl: QueryKeyUrl, paramsKey: QueryKeyParams) => {
  const params = { ...paramsKey };
  let url = rawUrl;

  Object.entries(params).forEach(([key, val]) => {
    const keyRegExp = new RegExp(`\\[${key}\\]`, 'g');

    if (url.search(keyRegExp) >= 0) {
      delete params[key];
      url = url.replace(new RegExp(keyRegExp), val);
    }
  });

  return { url, params };
};

export const createQueryFetcher = (ctx?: NextPageContext) => {
  const client = ctx?.req ? createApiClient(ctx) : apiClient;

  // TODO: add entities param
  return <T>(urlKey: QueryKeyUrl, paramsKey: QueryKeyParams) => {
    const { url, params } = buildQueryKey(urlKey, paramsKey);
    return client
      .get<T>(url, { params })
      .then(res => res.data);
  };
};
