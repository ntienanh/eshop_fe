import { IconHome, IconLogout2, IconMessage2, IconSettings, IconUsers } from '@tabler/icons-react';
import { signOut } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';
import useConversation from './useConversation';

const useRoutes = () => {
  const pathname = usePathname();
  const { conversationId } = useConversation();

  const routes = useMemo(
    () => [
      {
        label: 'Messenger',
        toolTip: 'Messenger',
        href: '/conversations',
        icon: IconMessage2,
        active: pathname === '/conversations' || !!conversationId,
      },
      {
        label: 'Friends',
        toolTip: 'Friends',
        href: '/users',
        icon: IconUsers,
        active: pathname === '/users',
      },
      {
        label: 'Settings',
        toolTip: 'Settings',
        href: '/',
        icon: IconSettings,
        active: pathname === '/',
      },
      {
        label: 'Home',
        toolTip: 'Go home',
        href: '/',
        icon: IconHome,
        active: '',
      },
      {
        label: 'Logout',
        toolTip: 'Logout',
        onClick: () => signOut(),
        href: '#',
        icon: IconLogout2,
        active: '',
      },
    ],
    [pathname, conversationId],
  );

  return routes;
};

export default useRoutes;
