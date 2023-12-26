"use client";
import { NavLink } from "@mantine/core";
import { IconSchool, IconUsers } from "@tabler/icons-react";
import { usePathname, useSelectedLayoutSegment } from "next/navigation";

const Navbar = () => {
  const path = usePathname()
  const nav = [
    { link:"/admin/user", label: "Users", icon: IconUsers },
    { link: "/admin/product", label: "Products", icon: IconSchool },
  ];

  return (
    <>
      {nav.map((item, idx) => {
        const { link, label, icon: ICon } = item || {};

        console.log('path',path);
        console.log('link',link);

        return (
          <NavLink
            key={idx}
            href={link}
            leftSection={<ICon size="1rem" stroke={1.5} />}
            label={label}
            defaultOpened
            active={path === link}
          />
        );
      })}
    </>
  );
};

export default Navbar;
