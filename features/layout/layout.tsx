import { FC } from 'react';

import { Header } from './header';

export const Layout: FC<{ pageTitle?: string }> = ({ children, pageTitle }) => {
  return (
    <div className="lg:pb-0 pb-12">
      <Header />
      {pageTitle && (
        <div className="bg-white shadow">
          <div className="py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-lg md:text-3xl font-bold leading-tight text-gray-900">
              {pageTitle}
            </h1>
          </div>
        </div>
      )}
      <main className="py-6 sm:px-6 lg:px-8">{children}</main>
    </div>
  );
};
