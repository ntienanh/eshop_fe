import { ScrollArea } from '@mantine/core';
import { IconAdjustments, IconCalendarStats, IconFileAnalytics, IconGauge, IconLock, IconNotes, IconPresentationAnalytics } from '@tabler/icons-react';
import React from 'react'
import classes from './style.module.css';
import LinksGroup from '../LinksGroup';

 const mockdata = [
    { label: 'Dashboard', icon: IconGauge },
    {
      label: 'Market news',
      icon: IconNotes,
      initiallyOpened: true,
      links: [
        { label: 'Overview', link: '/' },
        { label: 'Forecasts', link: '/' },
        { label: 'Outlook', link: '/' },
        { label: 'Real time', link: '/' },
      ],
    },
    {
      label: 'Releases',
      icon: IconCalendarStats,
      links: [
        { label: 'Upcoming releases', link: '/' },
        { label: 'Previous releases', link: '/' },
        { label: 'Releases schedule', link: '/' },
      ],
    },
    { label: 'Analytics', icon: IconPresentationAnalytics },
    { label: 'Contracts', icon: IconFileAnalytics },
    { label: 'Settings', icon: IconAdjustments },
    {
      label: 'Security',
      icon: IconLock,
      links: [
        { label: 'Enable 2FA', link: '/user' },
        { label: 'Change password', link: '/' },
        { label: 'Recovery codes', link: '/' },
      ],
    },
  ];

const AdminNavbar = () => {
    const links = mockdata.map((item) => {
      return <LinksGroup {...item} key={item.label} />
    });

    return (
      <nav className={classes.navbar}>
        <ScrollArea className={classes.links}>
          <div className={classes.linksInner}>{links}</div>
        </ScrollArea>
  
       
      </nav>
    );
}

export default AdminNavbar