import { useQuery } from 'react-query';
import Link from 'next/link';
import { NexusGenFieldTypes } from 'nexus-typegen';
import { Button } from 'ui';

import { withPageAuth } from 'features/auth';
import { Head, Layout } from 'features/layout';

import { getProductsQuery } from '../api';
import { Table } from '../organisms/table';

const Products = () => {
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
                <div className="flex justify-end">
                  <Link href="/products/add" passHref>
                    <Button as="a" className="mb-4">
                      Добавить товар
                    </Button>
                  </Link>
                </div>
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

export const ProductsPage = withPageAuth({ roles: ['SELLER', 'ADMIN'] })(Products);
