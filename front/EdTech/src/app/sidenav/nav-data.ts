import { INavbarData } from './helper';

export const navbarData: INavbarData[] = [
  {
    routeLink: 'dashboard',
    icon: 'fal fa-home',
    label: 'Dashboard',
  },
  {
    routeLink: 'classes',
    icon: 'fal fa-users-class',
    label: 'Classes',
  },
  {
    routeLink: 'students',
    icon: 'fal fa-user-graduate',
    label: 'Students',
  },
  {
    routeLink: 'newstudents',
    icon: 'fal fa-user',
    label: 'New Students',
  },
  {
    routeLink: 'certificat',
    icon: 'far fa-file-certificate',
    label: 'Certificates',
  },
  {
    routeLink: 'clubs',
    icon: 'far fa-club',
    label: 'Clubs',
  },
  {
    routeLink: 'events',
    icon: 'far fa-calendar-star',
    label: 'Events',
  },
  {
    routeLink: 'livres',
    icon: 'fas fa-book-open',
    label: 'Books',
  },
  {
    routeLink: 'documents',
    icon: 'fas fa-file-alt',
    label: 'Documents',
  },
  // {
  //   routeLink: 'products',
  //   icon: 'fal fa-box-open',
  //   label: 'Classes',
  //   items: [
  //     {
  //       routeLink: 'products/level1.1',
  //       label: 'Level 1.1',
  //       items: [
  //         {
  //           routeLink: 'products/level2.1',
  //           label: 'Level 2.1',
  //         },
  //         {
  //           routeLink: 'products/level2.2',
  //           label: 'Level 2.2',
  //           items: [
  //             {
  //               routeLink: 'products/level3.1',
  //               label: 'Level 3.1',
  //             },
  //             {
  //               routeLink: 'products/level3.2',
  //               label: 'Level 3.2',
  //             },
  //           ],
  //         },
  //       ],
  //     },
  //     {
  //       routeLink: 'products/level1.2',
  //       label: 'Level 1.2',
  //     },
  //   ],
  // },
  {
    routeLink: 'settings',
    icon: 'fal fa-cog',
    label: 'Settings',
    expanded: true,
    items: [
      {
        routeLink: 'settings/profile',
        label: 'Profile',
      },
      {
        routeLink: 'settings/customize',
        label: 'Customize',
      },
    ],
  },
];
