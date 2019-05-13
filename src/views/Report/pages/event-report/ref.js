module.exports = {
  titlesConf: {
    offer_id: {
      prop: 'offer_id',
      fixed: true,
      isShow: true,
      minWidth: '90',
      maxWidth: '90',
      label: 'Offer Id',
    },
    offer_name: {
      prop: 'offer_name',
      fixed: true,
      isShow: false,
      minWidth: '200',
      maxWidth: '300',
      label: 'Offer Name',
    },
    bd_name: {
      prop: 'bd_name',
      fixed: true,
      isShow: false,
      minWidth: '100',
      maxWidth: '150',
      label: 'Am Name',
    },
    aff_id: {
      prop: 'aff_id',
      fixed: true,
      isShow: true,
      minWidth: '80',
      maxWidth: '80',
      label: 'Pub Id',
    },
    aff_name: {
      prop: 'aff_name',
      fixed: true,
      isShow: false,
      minWidth: '130',
      maxWidth: '180',
      label: 'Pub Name',
    },
    aff_sub: {
      prop: 'aff_sub',
      fixed: true,
      isShow: true,
      minWidth: '100',
      maxWidth: '100',
      label: 'Sub Aff',
    },
    adv_id: {
      prop: 'adv_id',
      fixed: false,
      isShow: false,
      minWidth: '75',
      maxWidth: '75',
      label: 'Adv Id',
    },
    adv_name: {
      fixed: false,
      isShow: false,
      minWidth: '75',
      maxWidth: '100',
      label: 'Adv Name',
    },
    am_name: {
      prop: 'am_name',
      fixed: true,
      isShow: false,
      minWidth: '100',
      maxWidth: '140',
      label: 'Pm Name',
    },
    install: {
      prop: 'install',
      fixed: true,
      isShow: true,
      minWidth: '140',
      maxWidth: '200',
      isSort: 'custom',
      label: 'Install',
    }
  },
  titlesOrderList: [
    'offer_id', 'offer_name', 'aff_id', 'aff_name', 'aff_sub', 'bd_name', 'am_name', 'install'
  ],
  eventRangeList: [
    {
        value: 7,
        label: '7 Days'
    },
    {
        value: 30,
        label: '30 Days'
    },
    // {
    //     value: 3,
    //     label: '3 Days'
    // },
    
    // {
    //     value: 15,
    //     label: '15 Days'
    // },
    // {
    //     value: 'customer',
    //     label: 'Customize Range'
    // },
  ],
}