const map = {
  manager: {
    component: [
      {
        className: 'wrap-pm-top',
        component: [
          {
            componentName: 'chart-total-adv',
            className: 'chart-total-adv',
          },
          {
            componentName: 'chart-my-goal',
            className: 'chart-my-global',
            title: 'Total Goal'
          },
        ]
      },
      {
        className: 'wrap-team-goals',
        componentName: 'chart-team-goals',
        title: 'Team Goals'
      },
      {
        className: 'chart-top-adv-m',
        componentName: 'chart-top-adv',
      },
      {
        className: 'chart-top-pub-m',
        componentName: 'chart-top-pub',
      },
      {
        componentName: 'chart-source',
        className: 'chart-source',
      },
      {
        componentName: 'chart-top-geo',
        className: 'chart-top-geo',
      },
      {
        className: 'wrap-os-brands',
        component: [
          {
            componentName: 'chart-os',
            className: 'chart-os',
          },
          {
            componentName: 'chart-brands',
            className: 'chart-brands',
          },
        ]
      }
    ]
  },
  amLeader: {
    component: [
      {
        className: 'wrap-pm-top',
        component: [
          {
            componentName: 'chart-total-adv',
            className: 'chart-total-adv',
          },
          {
            componentName: 'chart-my-goal',
            className: 'chart-my-global',
            title: 'Team Goal'
          },
        ]
      },
      {
        className: 'wrap-team-goals',
        componentName: 'chart-team-goals',
        title: 'Member Goals'
      },
      {
        className: 'chart-top-adv',
        componentName: 'chart-top-adv',
      },
      {
        className: 'chart-top-offer',
        componentName: 'chart-top-offer',
      },
      {
        componentName: 'new-message',
        className: 'new-message',
      },
    ]
  },
  pmLeader: {
    component: [
      {
        className: 'wrap-pm-top',
        component: [
          {
            componentName: 'chart-total-adv',
            className: 'chart-total-adv',
          },
          {
            componentName: 'chart-my-goal',
            className: 'chart-my-global',
            title: 'Team Goal'
          },
        ]
      },
      {
        className: 'wrap-team-goals',
        componentName: 'chart-team-goals',
        title: 'Member Goals'
      },
      {
        className: 'chart-top-pub',
        componentName: 'chart-top-pub',
      },
      {
        className: 'chart-top-offer',
        componentName: 'chart-top-offer',
      },
      {
        componentName: 'new-message',
        className: 'new-message',
      },
    ]
  },
  am: {
    component: [
      {
        className: 'wrap-pm-top',
        component: [
          {
            componentName: 'chart-total-adv',
            className: 'chart-total-adv',
          },
          {
            componentName: 'chart-my-goal',
            className: 'chart-my-global',
            title: 'My Goal'
          },
        ]
      },
      {
        className: 'chart-top-adv',
        componentName: 'chart-top-adv',
      },
      {
        className: 'chart-top-offer',
        componentName: 'chart-top-offer',
      },
      {
        componentName: 'new-message',
        className: 'new-message',
      },
    ]
  },
  pm: {
    component: [
      {
        className: 'wrap-pm-top',
        component: [
          {
            componentName: 'chart-total-adv',
            className: 'chart-total-adv',
          },
          {
            componentName: 'chart-my-goal',
            className: 'chart-my-global',
            title: 'My Goal'
          },
        ]
      },
      {
        className: 'chart-top-pub',
        componentName: 'chart-top-pub',
      },
      {
        className: 'chart-top-offer',
        componentName: 'chart-top-offer',
      },
      {
        componentName: 'new-message',
        className: 'new-message',
      },
    ]
  },
  others: {
    componentName: 'chart-admin-report',
  }
}

export default (roleName, accessCmpn = []) => {
  if(map.hasOwnProperty(roleName)) {
    return accessCmpn.concat(map[roleName])
  } 
  return accessCmpn
}