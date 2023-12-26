"use client";
import { NavLink } from "@mantine/core";
import {
  IconAdjustments,
  IconCalendarStats,
  IconFileAnalytics,
  IconGauge,
  IconLock,
  IconNotes,
  IconPresentationAnalytics,
} from "@tabler/icons-react";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import React from "react";
const mockdata = [
  { label: "Dashboard", icon: IconGauge, link: "/user" },
  {
    label: "Market news",
    icon: IconNotes,
    initiallyOpened: true,
    links: [
      { label: "Overview", link: "/" },
      { label: "Forecasts", link: "/" },
      { label: "Outlook", link: "/" },
      { label: "Real time", link: "/" },
    ],
  },
  {
    label: "Releases",
    icon: IconCalendarStats,
    links: [
      { label: "Upcoming releases", link: "/" },
      { label: "Previous releases", link: "/" },
      { label: "Releases schedule", link: "/" },
    ],
  },
  { label: "Analytics", icon: IconPresentationAnalytics, link: "/analytics" },
];

const Navbar2 = () => {
  const segment = useSelectedLayoutSegment();

  return (
    <>
      {mockdata.map((item, idx) => {
        const { link, label, icon: ICon, links } = item || {};

        if (!!links) {
          return 123123;
        }

        return (
          <Link
            key={idx}
            href={`/admin/${link}`}
            style={{ textDecoration: "none" }}
          >
            <NavLink
              leftSection={<ICon size="1rem" stroke={1.5} />}
              label={label}
              defaultOpened
              active={segment === link}
            />
          </Link>
        );
      })}
    </>
  );
};

export default Navbar2;
