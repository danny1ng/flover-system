import { withPageAuth } from 'features/auth';
import { Head, Layout } from 'features/layout';

import { AddProductForm } from '../organisms/add-product-form';

const AddProduct = () => {
  return (
    <>
      <Head title="Добавить продукт" />
      <Layout pageTitle="Добавить продукт">
        <div className="px-4 py-6 sm:px-0">
          <AddProductForm />
        </div>
      </Layout>
    </>
  );
};

export const AddProductPage = withPageAuth({ roles: ['ADMIN'] })(AddProduct);
