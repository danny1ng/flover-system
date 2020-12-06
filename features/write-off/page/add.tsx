import { withPageAuth } from 'features/auth';
import { Head, Layout } from 'features/layout';

import { AddWriteOffForm } from '../organisms/add-write-off-form';

const AddWriteOff = () => {
  return (
    <>
      <Head title="Добавить продукт" />
      <Layout pageTitle="Добавить продукт">
        <div className="px-4 py-6 sm:px-0">
          <AddWriteOffForm />
        </div>
      </Layout>
    </>
  );
};

export const AddWriteOffPage = withPageAuth({ roles: ['ADMIN', 'SELLER'] })(AddWriteOff);
