'use client';
import { NavLink } from '@mantine/core';
import {
  IconBuilding,
  IconChartArrowsVertical,
  IconFileTypography,
  IconInbox,
  IconMapPin,
  IconSquareRoundedLetterS,
} from '@tabler/icons-react';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const path = usePathname();
  const nav = [
    { link: '/admin/skill', label: 'Skills', icon: IconSquareRoundedLetterS },
    { link: '/admin/jobtype', label: 'Types', icon: IconFileTypography },
    { link: '/admin/level', label: 'Levels', icon: IconChartArrowsVertical },
    { link: '/admin/location', label: 'Locations', icon: IconMapPin },
    { link: '/admin/company', label: 'Company', icon: IconBuilding },
    { link: '/admin/post', label: 'Post', icon: IconInbox },
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
