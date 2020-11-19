import { withPageAuth } from 'features/auth';
import { Head, Layout } from 'features/layout';

import { AddDeductionForm } from '../organisms/add-deduction-form';

const AddDeduction = () => {
  return (
    <>
      <Head title="Добавить вычет" />
      <Layout pageTitle="Добавить вычет">
        <div className="px-4 py-6 sm:px-0">
          <AddDeductionForm />
        </div>
      </Layout>
    </>
  );
};

export const AddDeductionPage = withPageAuth({ roles: ['ADMIN', 'SELLER'] })(AddDeduction);
