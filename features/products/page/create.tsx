import { withPageAuth } from 'features/auth';
import { Head, Layout } from 'features/layout';

const CreateProduct = () => {
  return (
    <>
      <Head title="Продажи за день" />
      <Layout pageTitle="Добавить продукт">
        <div className="px-4 py-6 sm:px-0">asda</div>
      </Layout>
    </>
  );
};

export const CreateProductPage = withPageAuth({ pageType: 'privateOnly', roles: ['ADMIN'] })(
  CreateProduct,
);
