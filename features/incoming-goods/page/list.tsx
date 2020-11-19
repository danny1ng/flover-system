import { useQuery } from 'react-query';
import Link from 'next/link';
import { NexusGenFieldTypes } from 'nexus-typegen';
import { Button } from 'ui';

import { withPageAuth } from 'features/auth';
import { Head, Layout } from 'features/layout';
import { useStore } from 'features/store';

import { getIncomingGoodsQuery } from '../api';
import { Table } from '../organisms/table';

const IncomingGoods = () => {
  const { storeId } = useStore();
  const { data } = useQuery<{
    incomingGoods: NexusGenFieldTypes['Query']['incomingGoods'];
  }>([getIncomingGoodsQuery, { storeId }]);
  return (
    <>
      <Head title="Приход товара" />
      <Layout pageTitle="Приход товара">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-end">
            <Link href="/incoming-goods/add" passHref>
              <Button as="a" className="mb-4">
                Добавить приход товара
              </Button>
            </Link>
          </div>
          <div className="flex flex-col">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                  {data?.incomingGoods && <Table data={data.incomingGoods} />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export const IncomingGoodsPage = withPageAuth({ roles: ['SELLER', 'ADMIN'] })(IncomingGoods);
