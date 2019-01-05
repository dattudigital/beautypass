export const navItems = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'icon-home'
  },
  {
    name: 'Users',
    url: '/users',
    icon: 'icon-people'
  },
  {
    name: 'coupons',
    url: '/mindbody-coupons',
    icon: 'icon-envelope-open'
  },
  {
    name: 'Employees',
    url: '/employees',
    icon: 'icon-speedometer'
  },
  {
    name: 'Faqs',
    url: '/faqs',
    icon: 'icon-plus'
  },
  {
    name: 'Beauty Tips',
    url: '/beauty-tips',
    icon: 'icon-user-female'
  },
  {
    name: 'Testmonials',
    url: '/testmonials',
    icon: 'icon-note',
    children: [
      {
        name: 'Written Testmonials',
        url: '/testmonials/written',
        icon: 'icon-note'
      },
      {
        name: 'Video Testmonials',
        url: '/testmonials/video',
        icon: 'icon-note'
      },
    ]
  },
  {
    name: 'Broadcast',
    url: '/admin',
    icon: 'icon-people',
    children: [
      {
        name: 'Sms To All',
        url: '/admin/broadcast-all',
        icon: 'icon-note'
      },
      {
        name: 'Broadcast Memberships',
        url: '/admin/broadcast-packages',
        icon: 'icon-note'
      }]
  },
  {
    name: 'Refferal Rewards',
    url: '/refferal-rewards',
    icon: 'icon-cursor',
    children: [
      {
        name: 'User Activities',
        url: '/refferal-rewards/user-activities',
        icon: 'icon-cursor'
      },
      {
        name: 'User History',
        url: '/refferal-rewards/user-history',
        icon: 'icon-cursor'
      },
      {
        name: 'User Points',
        url: '/refferal-rewards/user-points',
        icon: 'icon-cursor'
      },
      {
        name: 'Perks',
        url: '/refferal-rewards/perks',
        icon: 'icon-cursor'
      }
    ]
  },
  {
    name: 'Reports',
    url: '/reports',
    icon: 'icon-note',
    children: [
      {
        name: 'Voucher Reports',
        url: '/reports/voucher',
        icon: 'icon-note'
      },
      {
        name: 'Perks Reports',
        url: '/reports/perks',
        icon: 'icon-note'
      },
      {
        name: 'Points Reports',
        url: '/reports/points',
        icon: 'icon-note'
      }
      // ,
      // {
      //   name: 'User Activity Reports',
      //   url: '/reports/user-activity',
      //   icon: 'icon-note'
      // },
      // {
      //   name: 'Pearks and Rewards',
      //   url: '/reports/perks',
      //   icon: 'icon-note'
      // },
      // {
      //   name: 'Employee Log History',
      //   url: '/reports/logs',
      //   icon: 'icon-note'
      // }
    ]
  },
  // {
  //   name: 'Log History ',
  //   url: '/employee-history',
  //   icon: 'icon-cursor'    
  // },
];
