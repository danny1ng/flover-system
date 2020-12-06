import { useQuery } from 'react-query';
import Link from 'next/link';
import { NexusGenFieldTypes } from 'nexus-typegen';
import { Button } from 'ui';

import { withPageAuth } from 'features/auth';
import { Head, Layout } from 'features/layout';
import { useStore } from 'features/store';

import { getWriteOffsQuery } from '../api';
import { Table } from '../organisms/table';

const WriteOff = () => {
  const { storeId } = useStore();
  const { data } = useQuery<{
    writeOffs: NexusGenFieldTypes['Query']['writeOffs'];
  }>([getWriteOffsQuery, { storeId }]);
  return (
    <>
      <Head title="Списание товара" />
      <Layout pageTitle="Списание товара">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-end">
            <Link href="/write-offs/add" passHref>
              <Button as="a" className="mb-4">
                Добавить списание товара
              </Button>
            </Link>
          </div>
          <div className="flex flex-col">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                  {data?.writeOffs && <Table data={data.writeOffs} />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export const WriteOffPage = withPageAuth({ roles: ['SELLER', 'ADMIN'] })(WriteOff);
