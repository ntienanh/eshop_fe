export interface MenuItem {
  path: string;
  label: string;
}

export const headerMenu: MenuItem[] = [
  { path: '/shop', label: 'Shop' },
  { path: '/offers', label: 'Shop' },
  { path: '/warranty', label: 'Order' },
  { path: '/info', label: 'Info' },
  { path: '/contact', label: 'Contact' },
  // Add more items as needed
];

export interface MenuLogin {
  path: string;
  label: string;
}
export const headerLogin: MenuLogin[] = [

  { path: '/signin', label: 'Signin' },
  { path: '/login', label: 'Login' },
  // Add more items as needed
];
