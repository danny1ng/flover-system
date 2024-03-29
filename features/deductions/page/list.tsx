import { useQuery } from 'react-query';
import Link from 'next/link';
import { NexusGenFieldTypes } from 'nexus-typegen';
import { Button } from 'ui';

import { withPageAuth } from 'features/auth';
import { Head, Layout } from 'features/layout';
import { useStore } from 'features/store';
import { useCurrentUser } from 'features/user';

import { getDeductionsQuery } from '../api';
import { Table } from '../organisms/table';

const Deductions = () => {
  const { storeId } = useStore();
  const { currentUser } = useCurrentUser();
  const { data } = useQuery<{
    deductions: NexusGenFieldTypes['Query']['deductions'];
  }>([getDeductionsQuery, { storeId }]);
  return (
    <>
      <Head title="Вычеты" />
      <Layout pageTitle="Вычеты">
        <div className="px-4 py-6 sm:px-0">
          {currentUser.role === 'ADMIN' && (
            <div className="flex justify-end">
              <Link href="/deductions/add" passHref>
                <Button as="a" className="mb-4">
                  Добавить вычет
                </Button>
              </Link>
            </div>
          )}
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

export const DeductionsPage = withPageAuth({ roles: ['SELLER', 'ADMIN'] })(Deductions);
