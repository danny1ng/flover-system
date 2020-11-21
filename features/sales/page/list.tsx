import { useQuery } from 'react-query';
import Link from 'next/link';
import { NexusGenFieldTypes } from 'nexus-typegen';
import { Button } from 'ui';

import { withPageAuth } from 'features/auth';
import { Head, Layout } from 'features/layout';
import { getStoreQuery, useStore } from 'features/store';

import { getSalesQuery } from '../api';
import { SalesTable } from '../organisms/sales-table';
import { SummaryTable } from '../organisms/summary-table';

const SaleList = () => {
  const { storeId } = useStore();
  const { data } = useQuery<{
    sales: NexusGenFieldTypes['Query']['sales'];
  }>([getSalesQuery, { storeId }]);
  const { data: storeData } = useQuery<{ store: NexusGenFieldTypes['Query']['store'] }>([
    getStoreQuery,
    { storeId },
  ]);
  return (
    <>
      <Head title="Продажи за день" />
      <Layout pageTitle="Продажи за день">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-end">
            <Link href="/sales/add" passHref>
              <Button as="a" className="mb-4">
                Добавить продажу
              </Button>
            </Link>
          </div>
          <div className="flex flex-col">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                {data?.sales && storeData?.store && (
                  <SalesTable data={data.sales} storeData={storeData.store} />
                )}
              </div>
            </div>
            {data?.sales && storeData?.store && (
              <SummaryTable salesData={data.sales} storeData={storeData.store} />
            )}
          </div>
        </div>
      </Layout>
    </>
  );
};

export const SaleListPage = withPageAuth({ roles: ['SELLER', 'ADMIN'] })(SaleList);
