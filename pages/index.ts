import { NextPage } from 'next';

import { redirect } from 'libs/redirect';

const HomePage: NextPage = () => null;

HomePage.getInitialProps = async ctx => redirect(ctx, '/sales');

export default HomePage;
