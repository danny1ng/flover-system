export const links = [
  {
    label: 'Продажи',
    href: '/sales',
    role: ['ADMIN', 'SELLER'] as UserRole[],
  },
  {
    label: 'Вычеты',
    href: '/deductions',
    role: ['ADMIN', 'SELLER'] as UserRole[],
  },
  {
    label: 'Приход товара',
    href: '/incoming-goods',
    role: ['ADMIN', 'SELLER'] as UserRole[],
  },
  {
    label: 'Товары',
    href: '/products',
    role: ['ADMIN'] as UserRole[],
  },
];
