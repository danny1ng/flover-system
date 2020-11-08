import { withPageAuth } from 'features/auth';
import { Head, Layout } from 'features/layout';

import { AddSaleForm } from '../organisms/add-sale-form';

const AddSale = () => {
  return (
    <>
      <Head title="Добавить продажу" />
      <Layout pageTitle="Добавить продажу">
        <div className="px-4 py-6 sm:px-0">
          <AddSaleForm />
        </div>
      </Layout>
    </>
  );
};

export const AddSalePage = withPageAuth({ roles: ['ADMIN', 'SELLER'] })(AddSale);
