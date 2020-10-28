import { useQuery } from 'react-query';
import { NexusGenFieldTypes } from 'nexus-typegen';

import { withPageAuth } from 'features/auth';
import { Head, Layout } from 'features/layout';

import { getProductsQuery } from '../api';
import { Table } from '../organisms/table';

const SaleList = () => {
  const { data } = useQuery<{
    products: NexusGenFieldTypes['Query']['products'];
  }>([getProductsQuery, { storeId: 1 }]);
  return (
    <>
      <Head title="Продажи за день" />
      <Layout pageTitle="Продажи за день">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex flex-col">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                  {data?.products && <Table data={data.products} />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export const SaleListPage = withPageAuth(
  { pageType: 'privateOnly', roles: ['SELLER'] },
  () => '/sign-in',
)(SaleList);