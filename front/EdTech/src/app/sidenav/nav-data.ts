import { INavbarData } from './helper';

export const navbarData: INavbarData[] = [
  {
    routeLink: 'dashboard',
    icon: 'fal fa-home',
    label: 'Dashboard',
  },
  {
    routeLink: 'classes',
    icon: 'fal fa-file',
    label: 'Classes',
  },
  {
    routeLink: 'students-network',
    icon: 'fal fa-person-carry',
    label: 'Students Network',
  },
  {
    routeLink: 'newstudents',
    icon: 'fal fa-person-booth',
    label: 'New Students',
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
    routeLink: 'statistics',
    icon: 'fal fa-chart-bar',
    label: 'Statistics',
  },
  {
    routeLink: 'coupens',
    icon: 'fal fa-tags',
    label: 'Coupens',
    items: [
      {
        routeLink: 'coupens/list',
        label: 'List Coupens',
      },
      {
        routeLink: 'coupens/create',
        label: 'Create Coupens',
      },
    ],
  },
  {
    routeLink: 'media',
    icon: 'fal fa-camera',
    label: 'Media',
  },
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
