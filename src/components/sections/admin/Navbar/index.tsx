'use client';
import { NavLink } from '@mantine/core';
import { IconUsers } from '@tabler/icons-react';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const path = usePathname();
  const nav = [
    { link: '/admin/skill', label: 'Skills', icon: IconUsers },
    { link: '/admin/jobtype', label: 'Types', icon: IconUsers },
    { link: '/admin/level', label: 'Levels', icon: IconUsers },
    { link: '/admin/location', label: 'Locations', icon: IconUsers },
    // { link: '/admin/product', label: 'Products', icon: IconSchool },
    // { link: '/admin/media', label: 'Media Library', icon: IconPhoto },
  ];

  return (
    <>
      {nav.map((item, idx) => {
        const { link, label, icon: ICon } = item || {};
        return (
          <NavLink
            key={idx}
            href={link}
            leftSection={<ICon size='1rem' stroke={1.5} />}
            label={label}
            defaultOpened
            active={path?.includes(link)}
          />
        );
      })}
    </>
  );
};

export default Navbar;
