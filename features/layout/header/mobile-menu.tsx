import Link from 'next/link';
import { useRouter } from 'next/router';

import { useLogout } from 'features/auth';
import { useCurrentUser } from 'features/user';

import { links } from './nav-links';

export const MobileMenu = ({ isOpenMenu }: { isOpenMenu: boolean }) => {
  const { currentUser } = useCurrentUser();
  const { asPath } = useRouter();
  const logout = useLogout();

  return (
    <div className={`${isOpenMenu ? 'block' : 'hidden'} md:hidden`}>
      <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
        {links.map(link => (
          <Link key={link.label} href={link.href} passHref>
            <a
              className={`block px-3 py-2 rounded-md text-base font-medium ${
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
      <div className="pt-4 pb-3 border-t border-gray-700">
        <div className="flex items-center px-5 space-x-3">
          <div className="space-y-1">
            <div className="text-base font-medium leading-none text-white">{currentUser.name}</div>
          </div>
          <div className="space-y-1">
            <div className="text-base font-medium leading-none text-white">{currentUser.name}</div>
          </div>
        </div>
        <div className="mt-3 px-2 space-y-1">
          <a
            href="/sign-in"
            onClick={logout}
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
          >
            Выйти
          </a>
        </div>
      </div>
    </div>
  );
};
