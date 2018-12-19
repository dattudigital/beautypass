export const navItems = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'icon-speedometer'    
  },
  {
    name: 'Users',
    url: '/users',
    icon: 'icon-speedometer'    
  },  
  {
    name: 'coupons',
    url: '/mindbody-coupons',
    icon: 'icon-speedometer'    
  },  
  {
    name: 'Employees',
    url: '/employees',
    icon: 'icon-speedometer'    
  },
  {
    name: 'Faqs',
    url: '/faqs',
    icon: 'icon-speedometer'    
  },
  {
    name: 'Beauty Tips',
    url: '/beauty-tips',
    icon: 'icon-speedometer'    
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
  {
    name: 'Colors',
    url: '/theme/colors',
    icon: 'icon-drop'
  },
  {
    name: 'Typography',
    url: '/theme/typography',
    icon: 'icon-pencil'
  },
  {
    title: true,
    name: 'Components'
  },
  {
    name: 'Buttons',
    url: '/buttons',
    icon: 'icon-cursor',
    children: [
      {
        name: 'Buttons',
        url: '/buttons/buttons',
        icon: 'icon-cursor'
      },
      {
        name: 'Dropdowns',
        url: '/buttons/dropdowns',
        icon: 'icon-cursor'
      },
      {
        name: 'Brand Buttons',
        url: '/buttons/brand-buttons',
        icon: 'icon-cursor'
      }
    ]
  },
  {
    name: 'Charts',
    url: '/charts',
    icon: 'icon-pie-chart'
  },
  {
    name: 'Icons',
    url: '/icons',
    icon: 'icon-star',
    children: [
      {
        name: 'CoreUI Icons',
        url: '/icons/coreui-icons',
        icon: 'icon-star',
        badge: {
          variant: 'success',
          text: 'NEW'
        }
      },
      {
        name: 'Flags',
        url: '/icons/flags',
        icon: 'icon-star'
      },
      {
        name: 'Font Awesome',
        url: '/icons/font-awesome',
        icon: 'icon-star',
        badge: {
          variant: 'secondary',
          text: '4.7'
        }
      },
      {
        name: 'Simple Line Icons',
        url: '/icons/simple-line-icons',
        icon: 'icon-star'
      }
    ]
  },
  {
    name: 'Notifications',
    url: '/notifications',
    icon: 'icon-bell',
    children: [
      {
        name: 'Alerts',
        url: '/notifications/alerts',
        icon: 'icon-bell'
      },
      {
        name: 'Badges',
        url: '/notifications/badges',
        icon: 'icon-bell'
      },
      {
        name: 'Modals',
        url: '/notifications/modals',
        icon: 'icon-bell'
      }
    ]
  },
  {
    name: 'Widgets',
    url: '/widgets',
    icon: 'icon-calculator',
    badge: {
      variant: 'info',
      text: 'NEW'
    }
  },
  {
    divider: true
  },
  {
    title: true,
    name: 'Extras',
  },
  {
    name: 'Pages',
    url: '/pages',
    icon: 'icon-star',
    children: [
      {
        name: 'Login',
        url: '/login',
        icon: 'icon-star'
      },
      {
        name: 'Register',
        url: '/register',
        icon: 'icon-star'
      },
      {
        name: 'Error 404',
        url: '/404',
        icon: 'icon-star'
      },
      {
        name: 'Error 500',
        url: '/500',
        icon: 'icon-star'
      }
    ]
  },
  {
    name: 'Disabled',
    url: '/dashboard',
    icon: 'icon-ban',
    badge: {
      variant: 'secondary',
      text: 'NEW'
    },
    attributes: { disabled: true },
  },
  {
    name: 'Download CoreUI',
    url: 'http://coreui.io/angular/',
    icon: 'icon-cloud-download',
    class: 'mt-auto',
    variant: 'success',
    attributes: { target: '_blank', rel: 'noopener' }
  },
  {
    name: 'Try CoreUI PRO',
    url: 'http://coreui.io/pro/angular/',
    icon: 'icon-layers',
    variant: 'danger',
    attributes: { target: '_blank', rel: 'noopener' }
  }
];
