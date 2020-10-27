import { useQuery } from 'react-query';
import { NexusGenFieldTypes } from 'nexus-typegen';

import { Head, Layout } from 'features/layout';

import { getProductsQuery } from '../api';
import { Table } from '../organisms/table';

export const DeductionsPage = () => {
  const { data } = useQuery<{
    deductions: NexusGenFieldTypes['Query']['deductions'];
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
                  {data?.deductions && <Table data={data.deductions} />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};
