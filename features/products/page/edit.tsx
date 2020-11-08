import { useQuery } from 'react-query';
import { useRouter } from 'next/router';
import { NexusGenFieldTypes } from 'nexus-typegen';

import { withPageAuth } from 'features/auth';
import { Head, Layout } from 'features/layout';
import { getProductQuery } from 'features/products/api';

import { EditProductForm } from '../organisms/edit-product-form';

const EditProduct = () => {
  const { query } = useRouter();
  const { data } = useQuery<{ product: NexusGenFieldTypes['Query']['product'] }>(
    [getProductQuery, { productId: Number(query.productId) }],
    { cacheTime: 1 },
  );
  return (
    <>
      <Head title="Редактировать продукт" />
      <Layout pageTitle="Редактировать продукт">
        <div className="px-4 py-6 sm:px-0">
          {data?.product && <EditProductForm productData={data.product} />}
        </div>
      </Layout>
    </>
  );
};

export const EditProductPage = withPageAuth({ roles: ['ADMIN'] })(EditProduct);
