import { withPageAuth } from 'features/auth';
import { Head, Layout } from 'features/layout';

import { AddIncomingGoodsForm } from '../organisms/add-product-form';

const AddIncomingGoods = () => {
  return (
    <>
      <Head title="Добавить продукт" />
      <Layout pageTitle="Добавить продукт">
        <div className="px-4 py-6 sm:px-0">
          <AddIncomingGoodsForm />
        </div>
      </Layout>
    </>
  );
};

export const AddIncomingGoodsPage = withPageAuth({ roles: ['ADMIN', 'SELLER'] })(AddIncomingGoods);
