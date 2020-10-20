import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Transition } from '@headlessui/react';

import { useLogout } from 'features/auth';

import { MobileMenu } from './mobile-menu';
import { links } from './nav-links';

export const Header = () => {
  const [isOpenMenu, isOpenMenuSet] = useState(false);
  const { asPath } = useRouter();
  const logout = useLogout();

  return (
    <>
      <nav className="bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Link href="/" passHref>
                  <a>
                    <img
                      className="h-8 w-8"
                      src="https://tailwindui.com/img/logos/workflow-mark-on-dark.svg"
                      alt="Workflow logo"
                    />
                  </a>
                </Link>
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  {links.map(link => (
                    <Link key={link.label} href={link.href} passHref>
                      <a
                        className={`px-3 py-2 rounded-md text-sm font-medium ${
                          asPath === link.href
                            ? 'text-white bg-gray-900'
                            : 'text-gray-300 hover:text-white hover:bg-gray-700'
                        } focus:outline-none focus:text-white focus:bg-gray-700`}
                      >
                        {link.label}
                      </a>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-4 flex items-center md:ml-6">
                <p className="px-3 py-2 rounded-md text-sm font-medium text-gray-300">Имя</p>
                <p className="px-3 py-2 rounded-md text-sm font-medium text-gray-300">|</p>
                <a
                  href="/sign-in"
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
                  onClick={() => logout()}
                >
                  Выйти
                </a>
              </div>
            </div>
            <div className="-mr-2 flex md:hidden">
              <button
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white"
                onClick={() => isOpenMenuSet(prevState => !prevState)}
              >
                <svg
                  className={`${!isOpenMenu ? 'block' : 'hidden'} h-6 w-6`}
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
                <svg
                  className={`${isOpenMenu ? 'block' : 'hidden'} h-6 w-6`}
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <MobileMenu isOpenMenu={isOpenMenu} />
      </nav>
    </>
  );
};
