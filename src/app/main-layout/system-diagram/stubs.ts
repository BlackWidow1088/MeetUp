import { of } from 'rxjs';

export const Orange = {
  nodes: [
    {
      type: 'storage',
      typeKey: 'storage',
      'sub-type': 'storage',
      label: 'storage',
      id: 0,
      model_number: 'FAS8040',
      messages: {
        'pass': 1,
        'fail': 0,
        'warning': 5
      },
      visibility: 'visible'
    }, {
      type: 'storage',
      typeKey: 'storage',
      'sub-type': 'storage',
      label: 'storage',
      id: 1,
      model_number: 'FAS8040',
      messages: {
        'pass': 1,
        'fail': 0,
        'warning': 3
      },
      visibility: 'visible'
    }, {
      type: 'nexus',
      typeKey: 'nexus',
      'sub-type': 'nexus',
      label: 'nexus',
      id: 2,
      model_number: 'Nexus5548',
      messages: {
        'pass': 1,
        'fail': 0,
        'warning': 3
      },
      visibility: 'visible'
    }, {
      type: 'nexus',
      typeKey: 'nexus',
      'sub-type': 'nexus',
      label: 'nexus',
      id: 3,
      model_number: 'Nexus5548',
      messages: {
        'pass': 1,
        'fail': 0,
        'warning': 3
      },
      visibility: 'visible'
    }, {
      type: 'mds',
      typeKey: 'mds',
      'sub-type': 'mds',
      label: 'mds',
      id: 4,
      model_number: 'N5K',
      messages: {
        'pass': 1,
        'fail': 0,
        'warning': 3
      },
      visibility: 'hidden'
    }, {
      type: 'mds',
      typeKey: 'mds',
      'sub-type': 'mds',
      label: 'mds',
      id: 5,
      model_number: 'N5K',
      messages: {
        'pass': 1,
        'fail': 0,
        'warning': 3
      },
      visibility: 'hidden'
    }, {
      type: 'network',
      typeKey: 'network',
      'sub-type': 'network',
      label: 'blade-server',
      id: 6,
      model_number: 'N5K',
      messages: {
        'pass': 1,
        'fail': 0,
        'warning': 3
      },
      visibility: 'visible'
    }, {
      type: 'compute',
      typeKey: 'compute',
      'sub-type': 'compute',
      label: 'fabric-extender',
      id: 7,
      model_number: 'N5K',
      messages: {
        'pass': 1,
        'fail': 0,
        'warning': 3
      },
      visibility: 'visible'
    }, {
      type: 'compute',
      typeKey: 'compute',
      'sub-type': 'compute',
      label: 'fabric-extender',
      id: 8,
      model_number: 'N5K',
      messages: {
        'pass': 1,
        'fail': 0,
        'warning': 3
      },
      visibility: 'visible'
    }, {
      type: 'virtualization',
      typeKey: 'virtualization',
      'sub-type': 'virtualization',
      label: 'fabric-interconnect',
      id: 9,
      model_number: 'N5K',
      messages: {
        'pass': 1,
        'fail': 0,
        'warning': 3
      },
      visibility: 'hidden'
    }],
  links: [{
    source: {
      'id': 0,
      'port': 'Ethernet1/3'
    },
    target: {
      'id': 2,
      'port': 'Ethernet1/3'
    },
    'status': 'Up',
    'protocol': 'Ethernet',
    'messages': {
      'pass': 1,
      'fail': 0,
      'warning': 3
    },
    visibility: 'hidden'
  }, {
    source: {
      'id': 1,
      'port': 'Ethernet1/3'
    },
    target: {
      'id': 3,
      'port': 'Ethernet1/3'
    },
    'status': 'Up',
    'protocol': 'Ethernet',
    'messages': {
      'pass': 1,
      'fail': 0,
      'warning': 3
    },
    visibility: 'hidden'
  }, {
    source: {
      'id': 2,
      'port': 'Ethernet1/3'
    },
    target: {
      'id': 4,
      'port': 'Ethernet1/3'
    },
    'status': 'Up',
    'protocol': 'FC',
    'messages': {
      'pass': 1,
      'fail': 0,
      'warning': 3
    },
    visibility: 'visible'
  }, {
    source: {
      'id': 3,
      'port': 'Ethernet1/3'
    },
    target: {
      'id': 5,
      'port': 'Ethernet1/3'
    },
    'status': 'Up',
    'protocol': 'FC',
    'messages': {
      'pass': 1,
      'fail': 0,
      'warning': 3
    },
    visibility: 'visible'
  }, {
    source: {
      'id': 4,
      'port': 'Ethernet1/3'
    },
    target: {
      'id': 6,
      'port': 'Ethernet1/3'
    },
    'status': 'Up',
    'protocol': 'FCoE',
    'messages': {
      'pass': 1,
      'fail': 0,
      'warning': 3
    },
    visibility: 'hidden'
  }, {
    source: {
      'id': 5,
      'port': 'Ethernet1/3'
    },
    target: {
      'id': 6,
      'port': 'Ethernet1/3'
    },
    'status': 'Up',
    'protocol': 'FCoE',
    'messages': {
      'pass': 1,
      'fail': 0,
      'warning': 3
    },
    visibility: 'hidden'
  }, {
    source: {
      'id': 5,
      'port': 'Ethernet1/3'
    },
    target: {
      'id': 6,
      'port': 'Ethernet1/3'
    },
    'status': 'Up',
    'protocol': 'FCoE',
    'messages': {
      'pass': 1,
      'fail': 0,
      'warning': 3
    },
    visibility: 'hidden'
  }, {
    source: {
      'id': 5,
      'port': 'Ethernet1/3'
    },
    target: {
      'id': 6,
      'port': 'Ethernet1/3'
    },
    'status': 'Up',
    'protocol': 'FCoE',
    'messages': {
      'pass': 1,
      'fail': 0,
      'warning': 3
    },
    visibility: 'hidden'
  }, {
    source: {
      'id': 5,
      'port': 'Ethernet1/3'
    },
    target: {
      'id': 6,
      'port': 'Ethernet1/3'
    },
    'status': 'Up',
    'protocol': 'FCoE',
    'messages': {
      'pass': 1,
      'fail': 0,
      'warning': 3
    },
    visibility: 'hidden'
  }, {
    source: {
      'id': 5,
      'port': 'Ethernet1/3'
    },
    target: {
      'id': 6,
      'port': 'Ethernet1/3'
    },
    'status': 'Up',
    'protocol': 'FCoE',
    'messages': {
      'pass': 1,
      'fail': 0,
      'warning': 3
    },
    visibility: 'hidden'
  }, {
    source: {
      'id': 4,
      'port': 'Ethernet1/3'
    },
    target: {
      'id': 7,
      'port': 'Ethernet1/3'
    },
    'status': 'Up',
    'protocol': 'FC',
    'messages': {
      'pass': 1,
      'fail': 0,
      'warning': 3
    },
    visibility: 'visible'
  }, {
    source: {
      'id': 5,
      'port': 'Ethernet1/3'
    },
    target: {
      'id': 8,
      'port': 'Ethernet1/3'
    },
    'status': 'Up',
    'protocol': 'FC',
    'messages': {
      'pass': 1,
      'fail': 0,
      'warning': 3
    },
    visibility: 'visible'
  }, {
    source: {
      'id': 7,
      'port': 'Ethernet1/3'
    },
    target: {
      'id': 9,
      'port': 'Ethernet1/3'
    },
    'status': 'Down',
    'protocol': 'Ethernet',
    'messages': {
      'pass': 1,
      'fail': 0,
      'warning': 3
    },
    visibility: 'hidden'
  }, {
    source: {
      'id': 8,
      'port': 'Ethernet1/3'
    },
    target: {
      'id': 9,
      'port': 'Ethernet1/3'
    },
    'status': 'Up',
    'protocol': 'Ethernet',
    'messages': {
      'pass': 1,
      'fail': 0,
      'warning': 3
    },
    visibility: 'hidden'
  }]
};

export const banana = {
  nodes: [
    {
      type: 'storage',
      label: 'disk-shelves',
      id: 0,
      messages: {
        'pass': 1,
        'fail': 0,
        'warning': 3
      }
    }, {
      type: 'storage',
      label: 'disk-shelves',
      id: 1,
      messages: {
        'pass': 1,
        'fail': 0,
        'warning': 3
      }
    }, {
      type: 'network',
      label: 'mds',
      id: 2,
      messages: {
        'pass': 1,
        'fail': 0,
        'warning': 3
      }
    }, {
      type: 'network',
      label: 'mds',
      id: 3,
      messages: {
        'pass': 1,
        'fail': 0,
        'warning': 3
      }
    }, {
      type: 'nexus',
      label: 'storage',
      id: 4,
      messages: {
        'pass': 1,
        'fail': 0,
        'warning': 3
      }
    }, {
      type: 'virtualization',
      label: 'blade-server',
      id: 5,
      messages: {
        'pass': 1,
        'fail': 0,
        'warning': 3
      }
    }],
  links: [
    {
      source: {
        'id': 0,
        'port': 'Ethernet1/3'
      },
      target: {
        'id': 1,
        'port': 'Ethernet1/3'
      },
      'status': 'Up',
      'protocol': 'Ethernet',
      'messages': {
        'pass': 1,
        'fail': 0,
        'warning': 3
      }
    }, {
      source: {
        'id': 0,
        'port': 'Ethernet1/3'
      },
      target: {
        'id': 2,
        'port': 'Ethernet1/3'
      },
      'status': 'Up',
      'protocol': 'Ethernet',
      'messages': {
        'pass': 1,
        'fail': 0,
        'warning': 3
      }
    }, {
      source: {
        'id': 1,
        'port': 'Ethernet1/3'
      },
      target: {
        'id': 3,
        'port': 'Ethernet1/3'
      },
      'status': 'Up',
      'protocol': 'FC',
      'messages': {
        'pass': 1,
        'fail': 0,
        'warning': 3
      }
    },
    {
      source: {
        'id': 2,
        'port': 'Ethernet1/3'
      },
      target: {
        'id': 5,
        'port': 'Ethernet1/3'
      },
      'status': 'Up',
      'protocol': 'Ethernet',
      'messages': {
        'pass': 1,
        'fail': 0,
        'warning': 3
      }
    },
    {
      source: {
        'id': 3,
        'port': 'Ethernet1/3'
      },
      target: {
        'id': 5,
        'port': 'Ethernet1/3'
      },
      'status': 'Up',
      'protocol': 'FCoE',
      'messages': {
        'pass': 1,
        'fail': 0,
        'warning': 3
      }
    }, {
      source: {
        'id': 0,
        'port': 'Ethernet1/3'
      },
      target: {
        'id': 4,
        'port': 'Ethernet1/3'
      },
      'status': 'Up',
      'protocol': 'Ethernet',
      'messages': {
        'pass': 1,
        'fail': 0,
        'warning': 3
      }
    }, {
      source: {
        'id': 1,
        'port': 'Ethernet1/3'
      },
      target: {
        'id': 4,
        'port': 'Ethernet1/3'
      },
      'status': 'Up',
      'protocol': 'FCoE',
      'messages': {
        'pass': 1,
        'fail': 0,
        'warning': 3
      }
    }
  ]
};

export const invar = {
  'links': [
    {
      'status': 'Up',
      'protocol': 'Ethernet',
      'messages': {
        'warning': [],
        'pass': [
          '924'
        ],
        'fail': []
      },
      'source': {
        'label': 'stack5-9k-2',
        'id': '084dc1d28c784269a61e241c5a06b6be.00002.00001',
        'port': 'Ethernet1/2'
      },
      'target': {
        'label': 'switch-B',
        'id': '084dc1d28c784269a61e241c5a06b6be.00004.00001.00001',
        'port': 'Ethernet1/31'
      }
    },
    {
      'status': 'Up',
      'protocol': 'Ethernet',
      'messages': {
        'warning': [],
        'pass': [
          '924'
        ],
        'fail': []
      },
      'source': {
        'label': 'stack5-9k-2',
        'id': '084dc1d28c784269a61e241c5a06b6be.00002.00001',
        'port': 'Ethernet1/1'
      },
      'target': {
        'label': 'switch-A',
        'id': '084dc1d28c784269a61e241c5a06b6be.00004.00001.00002',
        'port': 'Ethernet1/31'
      }
    },
    {
      'status': 'Up',
      'protocol': 'Ethernet',
      'messages': {
        'warning': [],
        'pass': [],
        'fail': []
      },
      'source': {
        'label': 'stack5-9k-2',
        'id': '084dc1d28c784269a61e241c5a06b6be.00002.00001',
        'port': 'Ethernet1/5'
      },
      'target': {
        'label': 'backup-01',
        'id': '084dc1d28c784269a61e241c5a06b6be.00005.00200.00001.00003',
        'port': 'e0e'
      }
    },
    {
      'status': 'Down',
      'protocol': 'Ethernet',
      'messages': {
        'warning': [],
        'pass': [],
        'fail': [
          '615'
        ]
      },
      'source': {
        'label': 'stack5-9k-2',
        'id': '084dc1d28c784269a61e241c5a06b6be.00002.00001',
        'port': null
      },
      'target': {
        'label': 'backup-02',
        'id': '084dc1d28c784269a61e241c5a06b6be.00005.00200.00001.00004',
        'port': null
      }
    },
    {
      'status': 'Down',
      'protocol': 'Ethernet',
      'messages': {
        'warning': [],
        'pass': [
          '924'
        ],
        'fail': []
      },
      'source': {
        'label': 'stack5-9k-1',
        'id': '084dc1d28c784269a61e241c5a06b6be.00003.00001',
        'port': 'Ethernet1/2'
      },
      'target': {
        'label': 'switch-B',
        'id': '084dc1d28c784269a61e241c5a06b6be.00004.00001.00001',
        'port': 'Ethernet1/32'
      }
    },
    {
      'status': 'Down',
      'protocol': 'Ethernet',
      'messages': {
        'warning': [],
        'pass': [
          '924'
        ],
        'fail': []
      },
      'source': {
        'label': 'stack5-9k-1',
        'id': '084dc1d28c784269a61e241c5a06b6be.00003.00001',
        'port': 'Ethernet1/3'
      },
      'target': {
        'label': 'switch-A',
        'id': '084dc1d28c784269a61e241c5a06b6be.00004.00001.00002',
        'port': 'Ethernet1/32'
      }
    },
    {
      'status': 'Down',
      'protocol': 'Ethernet',
      'messages': {
        'warning': [],
        'pass': [
          '117'
        ],
        'fail': []
      },
      'source': {
        'label': 'stack5-9k-1',
        'id': '084dc1d28c784269a61e241c5a06b6be.00003.00001',
        'port': 'Ethernet1/47'
      },
      'target': {
        'label': 'stack5-9k-2',
        'id': '084dc1d28c784269a61e241c5a06b6be.00002.00001',
        'port': 'Ethernet1/47'
      }
    },
    {
      'status': 'Down',
      'protocol': 'Ethernet',
      'messages': {
        'warning': [],
        'pass': [
          '117'
        ],
        'fail': []
      },
      'source': {
        'label': 'stack5-9k-1',
        'id': '084dc1d28c784269a61e241c5a06b6be.00003.00001',
        'port': 'Ethernet1/48'
      },
      'target': {
        'label': 'stack5-9k-2',
        'id': '084dc1d28c784269a61e241c5a06b6be.00002.00001',
        'port': 'Ethernet1/48'
      }
    },
    {
      'status': 'Down',
      'protocol': 'Ethernet',
      'messages': {
        'warning': [],
        'pass': [],
        'fail': []
      },
      'source': {
        'label': 'stack5-9k-1',
        'id': '084dc1d28c784269a61e241c5a06b6be.00003.00001',
        'port': 'Ethernet1/5'
      },
      'target': {
        'label': 'backup-01',
        'id': '084dc1d28c784269a61e241c5a06b6be.00005.00200.00001.00003',
        'port': 'e0f'
      }
    },
    {
      'status': 'Down',
      'protocol': 'Ethernet',
      'messages': {
        'warning': [],
        'pass': [],
        'fail': [
          '615'
        ]
      },
      'source': {
        'label': 'stack5-9k-1',
        'id': '084dc1d28c784269a61e241c5a06b6be.00003.00001',
        'port': null
      },
      'target': {
        'label': 'backup-02',
        'id': '084dc1d28c784269a61e241c5a06b6be.00005.00200.00001.00004',
        'port': null
      }
    },
    {
      'status': 'Down',
      'protocol': 'FCoE',
      'messages': {
        'warning': [],
        'pass': [
          '925'
        ],
        'fail': []
      },
      'source': {
        'label': 'switch-B',
        'id': '084dc1d28c784269a61e241c5a06b6be.00004.00001.00001',
        'port': 'Ethernet1/2'
      },
      'target': {
        'label': 'stack5-9k-2',
        'id': '084dc1d28c784269a61e241c5a06b6be.00002.00001',
        'port': 'Ethernet1/31'
      }
    },
    {
      'status': 'Down',
      'protocol': 'FCoE',
      'messages': {
        'warning': [],
        'pass': [
          '925'
        ],
        'fail': []
      },
      'source': {
        'label': 'switch-A',
        'id': '084dc1d28c784269a61e241c5a06b6be.00004.00001.00002',
        'port': 'Ethernet1/3'
      },
      'target': {
        'label': 'stack5-9k-1',
        'id': '084dc1d28c784269a61e241c5a06b6be.00003.00001',
        'port': 'Ethernet1/32'
      }
    },
    {
      'status': 'Down',
      'protocol': 'FC',
      'messages': {
        'warning': [],
        'pass': [
          '673'
        ],
        'fail': []
      },
      'source': {
        'label': 'chassis-1',
        'id': '084dc1d28c784269a61e241c5a06b6be.00004.00001.00003',
        'port': 'port-2'
      },
      'target': {
        'label': 'switch-B',
        'id': '084dc1d28c784269a61e241c5a06b6be.00004.00001.00001',
        'port': '12'
      }
    },
    {
      'status': 'Down',
      'protocol': 'FC',
      'messages': {
        'warning': [],
        'pass': [
          '673'
        ],
        'fail': []
      },
      'source': {
        'label': 'chassis-1',
        'id': '084dc1d28c784269a61e241c5a06b6be.00004.00001.00003',
        'port': 'port-1'
      },
      'target': {
        'label': 'switch-B',
        'id': '084dc1d28c784269a61e241c5a06b6be.00004.00001.00001',
        'port': '11'
      }
    },
    {
      'status': 'Down',
      'protocol': 'FC',
      'messages': {
        'warning': [],
        'pass': [
          '673'
        ],
        'fail': []
      },
      'source': {
        'label': 'chassis-1',
        'id': '084dc1d28c784269a61e241c5a06b6be.00004.00001.00003',
        'port': 'port-2'
      },
      'target': {
        'label': 'switch-A',
        'id': '084dc1d28c784269a61e241c5a06b6be.00004.00001.00002',
        'port': '12'
      }
    },
    {
      'status': 'Down',
      'protocol': 'FC',
      'messages': {
        'warning': [],
        'pass': [
          '673'
        ],
        'fail': []
      },
      'source': {
        'label': 'chassis-1',
        'id': '084dc1d28c784269a61e241c5a06b6be.00004.00001.00003',
        'port': 'port-1'
      },
      'target': {
        'label': 'switch-A',
        'id': '084dc1d28c784269a61e241c5a06b6be.00004.00001.00002',
        'port': '11'
      }
    }
  ],
  'nodes': [
    {
      'label': 'stack5-9k-2',
      'name': 'aaron5k-a',
      'ip_address': '10.198.32.54',
      'software': 'software',
      'serial': 'serial_number',
      'messages': {
        'warning': [
          '1100',
          '1100',
          '1100',
          '1100'
        ],
        'pass': [
          '2865',
          '2743',
          '2705',
          '662',
          '2706',
          '1412',
          '161',
          '924',
          '1177',
          '117',
          '3371',
          '664',
          '661',
          '666',
          '1367',
          '2881',
          '2882'
        ],
        'fail': [
          '1232',
          '1178',
          '1100',
          '615',
          '665'
        ]
      },
      'id': '084dc1d28c784269a61e241c5a06b6be.00002.00001',
      'type': 'Network',
      'sub-type': 'Ethernet',
      'model_number': 'N9K-C9372PX-E'
    },
    {
      'label': 'stack5-9k-1',
      'name': 'aaron5k-a',
      'ip_address': '10.198.32.54',
      'software': 'software',
      'serial': 'serial_number',
      'messages': {
        'warning': [
          '1100',
          '1100',
          '1100',
          '1100'
        ],
        'pass': [
          '2865',
          '2743',
          '2705',
          '662',
          '2706',
          '1412',
          '161',
          '924',
          '1177',
          '117',
          '3371',
          '664',
          '661',
          '666',
          '1367',
          '2881',
          '2882'
        ],
        'fail': [
          '1232',
          '1178',
          '1100',
          '615',
          '665'
        ]
      },
      'id': '084dc1d28c784269a61e241c5a06b6be.00003.00001',
      'type': 'Network',
      'sub-type': 'Ethernet',
      'model_number': 'N9K-C9372PX-E'
    },
    {
      'label': 'backup-01',
      'name': 'aaron5k-a',
      'ip_address': '10.198.32.54',
      'software': 'software',
      'serial': 'serial_number',
      'messages': {
        'warning': [],
        'pass': [
          '706',
          '10600',
          '10721',
          '10276',
          '10276',
          '10268',
          '10262',
          '10266',
          '10202',
          '10208',
          '10203',
          '10258',
          '780979',
          '781008',
          '10503',
          '10406',
          '10722',
          '10270',
          '10263',
          '10265',
          '10274',
          '10261',
          '10260',
          '10301',
          '10305',
          '17000',
          '10405',
          '827749',
          '12008',
          '12075',
          '12599',
          '12542',
          '12402',
          '10500',
          '12559',
          '12914',
          '12547',
          '12530',
          '12186',
          '12197',
          '12519',
          '12007',
          '12561',
          '12938',
          '12191',
          '12798',
          '12139',
          '12702',
          '12516',
          '12703'
        ],
        'fail': [
          '1352',
          '2732',
          '2727',
          '12687'
        ]
      },
      'id': '084dc1d28c784269a61e241c5a06b6be.00005.00200.00001.00003',
      'type': 'Storage',
      'sub-type': 'Storage Controller',
      'model_number': 'AFF-A300'
    },
    {
      'label': 'backup-02',
      'name': 'aaron5k-a',
      'ip_address': '10.198.32.54',
      'software': 'software',
      'serial': 'serial_number',
      'messages': {
        'warning': [],
        'pass': [
          '2732',
          '10600',
          '10721',
          '10276',
          '10276',
          '10268',
          '10262',
          '10266',
          '10202',
          '10208',
          '10203',
          '780979',
          '10275',
          '10275',
          '781008',
          '10503',
          '10406',
          '10722',
          '10270',
          '10263',
          '10265',
          '10274',
          '10261',
          '10260',
          '10301',
          '10305',
          '17000',
          '10405',
          '827749',
          '12008',
          '12075',
          '12599',
          '12542',
          '12402',
          '10500',
          '12559',
          '12914',
          '12547',
          '12530',
          '12186',
          '12197',
          '12519',
          '12007',
          '12561',
          '12938',
          '12191',
          '12798',
          '12139',
          '12702',
          '12516',
          '12703'
        ],
        'fail': [
          '1352',
          '706',
          '615',
          '615',
          '2727',
          '10258',
          '12687'
        ]
      },
      'id': '084dc1d28c784269a61e241c5a06b6be.00005.00200.00001.00004',
      'type': 'Storage',
      'sub-type': 'Storage Controller',
      'model_number': 'AFF-A300'
    },
    {
      'label': 'chassis-1',
      'name': 'aaron5k-a',
      'ip_address': '10.198.32.54',
      'software': 'software',
      'serial': 'serial_number',
      'messages': {
        'warning': [],
        'pass': [
          '695'
        ],
        'fail': []
      },
      'id': '084dc1d28c784269a61e241c5a06b6be.00004.00001.00003',
      'type': 'Compute',
      'sub-type': 'Chassis',
      'model_number': 'N20-C6508',
      childrens: [
        {
          'id': '43e679fb51964007951bad9291a7a7c8.00004.00001.00003.00006',
          'type': 'Compute',
          'sub-type': 'Blade server',
          'label': 'blade-8',
          'name': 'aaron5k-a',
          'ip_address': '10.198.32.54',
          'software': 'software',
          'serial': 'serial_number',
          'model_number': 'UCSB-B200-M4',
          'messages': {
            'pass': [],
            'fail': [],
            'warning': []
          },
          'slotId': 0
        },
        {
          'id': '43e679fb51964007951bad9291a7a7c8.00004.00001.00003.00007',
          'type': 'Compute',
          'sub-type': 'Blade server',
          'label': 'blade-7',
          'name': 'aaron5k-a',
          'ip_address': '10.198.32.54',
          'software': 'software',
          'serial': 'serial_number',
          'model_number': 'UCSB-B200-M4',
          'messages': {
            'pass': [],
            'fail': [],
            'warning': []
          },
          'slotId': 2
        },
        {
          'id': '43e679fb51964007951bad9291a7a7c8.00004.00001.00003.00008',
          'type': 'Compute',
          'sub-type': 'Blade server',
          'label': 'blade-6',
          'name': 'aaron5k-a',
          'ip_address': '10.198.32.54',
          'software': 'software',
          'serial': 'serial_number',
          'model_number': 'UCSB-B200-M4',
          'messages': {
            'pass': [],
            'fail': [],
            'warning': []
          },
          'slotId': 4
        },
        {
          'id': '43e679fb51964007951bad9291a7a7c8.00004.00001.00003.00009',
          'type': 'Compute',
          'sub-type': 'Blade server',
          'label': 'blade-5',
          'name': 'aaron5k-a',
          'ip_address': '10.198.32.54',
          'software': 'software',
          'serial': 'serial_number',
          'model_number': 'UCSB-B200-M4',
          'messages': {
            'pass': [],
            'fail': [],
            'warning': []
          },
          'slotId': 9
        }
      ]
    },
    {
      'label': 'switch-B',
      'name': 'aaron5k-a',
      'ip_address': '10.198.32.54',
      'software': 'software',
      'serial': 'serial_number',
      'messages': {
        'warning': [],
        'pass': [
          '2919',
          '693',
          '3105'
        ],
        'fail': [
          '1086'
        ]
      },
      'id': '084dc1d28c784269a61e241c5a06b6be.00004.00001.00001',
      'type': 'Compute',
      'sub-type': 'FI',
      'model_number': 'UCS-FI-6248UP'
    },
    {
      'label': 'switch-A',
      'name': 'aaron5k-a',
      'ip_address': '10.198.32.54',
      'software': 'software',
      'serial': 'serial_number',
      'messages': {
        'warning': [],
        'pass': [
          '2715',
          '2919',
          '693',
          '1086',
          '3105'
        ],
        'fail': []
      },
      'id': '084dc1d28c784269a61e241c5a06b6be.00004.00001.00002',
      'type': 'Compute',
      'sub-type': 'FI',
      'model_number': 'UCS-FI-6248UP'
    }
  ]
}



export const GridLayoutServiceStub = {
  sort: () => { },
  plotGrid: (nodes) => { },
  positionNodes: () => { },
  calculateX: () => { },
  calculateY: () => { },
  buildComponentTypeMap: () => { },
  initializeNodes: () => { },
  getInnerWidth: () => 1000
};

export const SystemDiagramDataServiceStub = {
  setData: () => { },
  getData: () => of(apple),
  setProtocol: () => { },
  getProtocol: () => of([]),
  setLegends: () => { },
  getLegends: () => of([]),
  resetDiagram: () => of(true),
  resetFilter: () => filterStub,
  getAppliedFilter: () => filterStub,
  filterDiagramComponents: ({ }) => of(true),
  updateComponent: () => of(true),
  updateComponentsNode: () => of(true),
  subscribeComponents: () => of([]),
  saveDiagram: () => of(true),
  systemDiagramAPICall: () => apple,
  setDeviceDetailsRoute: () => { },
  getDeviceDetailsRoute: () => { },
}

export const filterStub = {
  'Devices': [
    { label: 'virtualization', checked: true },
    { label: 'compute', checked: true },
    { label: 'network', checked: true },
    { label: 'mds', checked: true },
    { label: 'nexus', checked: true },
    { label: 'storage', checked: true }
  ],
  'Connections': [
    { label: 'Ethernet', checked: true },
    { label: 'FC', checked: true },
    { label: 'FCoE', checked: true }
  ],
}

export const DeviceRouteTypeStub = {
  'Storage': [
    {
      'name': 'backup',
      'route': 'csa/ci/storage/cluster/clusterlanding/eb2d30b7534b4bd4bf7412cecd8d62cc.00001.00200',
      'id': 'eb2d30b7534b4bd4bf7412cecd8d62cc.00001.00200',
    }
  ],
  'Compute': [
    {
      'name': 'switch-B',
      'route': 'csa/ci/compute/fabricinterconnect/eb2d30b7534b4bd4bf7412cecd8d62cc.00002.00001.00001',
      'id': 'eb2d30b7534b4bd4bf7412cecd8d62cc.00002.00001.00001',
    },
    {
      'name': 'switch-A',
      'route': 'csa/ci/compute/fabricinterconnect/eb2d30b7534b4bd4bf7412cecd8d62cc.00002.00001.00002',
      'id': 'eb2d30b7534b4bd4bf7412cecd8d62cc.00002.00001.00002',
    },
    {
      'name': 'Chassis 1',
      'route': 'csa/ci/compute/chassis/chassislanding/eb2d30b7534b4bd4bf7412cecd8d62cc.00002.00001.00003',
      'id': 'eb2d30b7534b4bd4bf7412cecd8d62cc.00002.00001.00003',
    }
  ],
  'Network': [
    {
      'name': 'stack5-9k-1',
      'route': 'csa/ci/network/switch/eb2d30b7534b4bd4bf7412cecd8d62cc.00003.00001',
      'id': 'eb2d30b7534b4bd4bf7412cecd8d62cc.00003.00001',
    },
    {
      'name': 'stack5-9k-2',
      'route': 'csa/ci/network/switch/eb2d30b7534b4bd4bf7412cecd8d62cc.00005.00001',
      'id': 'eb2d30b7534b4bd4bf7412cecd8d62cc.00005.00001',
    }
  ]
}


export const apple = {
  nodes: [
    {
      type: 'storage',
      typeKey: 'storage',
      'sub-type': 'storage',
      label: 'storage',
      id: 0,
      model_number: 'FAS8040',
      messages: {
        'pass': 1,
        'fail': 0,
        'warning': 5
      },
      visibility: 'visible'
    }, {
      type: 'storage',
      typeKey: 'storage',
      'sub-type': 'storage',
      label: 'storage',
      id: 1,
      model_number: 'FAS8040',
      messages: {
        'pass': 1,
        'fail': 0,
        'warning': 3
      },
      visibility: 'visible'
    }, {
      type: 'nexus',
      typeKey: 'nexus',
      'sub-type': 'nexus',
      label: 'nexus',
      id: 2,
      model_number: 'Nexus5548',
      messages: {
        'pass': 1,
        'fail': 0,
        'warning': 3
      },
      visibility: 'visible'
    }, {
      type: 'nexus',
      typeKey: 'nexus',
      'sub-type': 'nexus',
      label: 'nexus',
      id: 3,
      model_number: 'Nexus5548',
      messages: {
        'pass': 1,
        'fail': 0,
        'warning': 3
      },
      visibility: 'visible'
    }, {
      type: 'mds',
      typeKey: 'mds',
      'sub-type': 'mds',
      label: 'mds',
      id: 4,
      model_number: 'N5K',
      messages: {
        'pass': 1,
        'fail': 0,
        'warning': 3
      },
      visibility: 'visible'
    }, {
      type: 'mds',
      typeKey: 'mds',
      'sub-type': 'mds',
      label: 'mds',
      id: 5,
      model_number: 'N5K',
      messages: {
        'pass': 1,
        'fail': 0,
        'warning': 3
      },
      visibility: 'visible'
    }, {
      type: 'network',
      typeKey: 'network',
      'sub-type': 'network',
      label: 'blade-server',
      id: 6,
      model_number: 'N5K',
      messages: {
        'pass': 1,
        'fail': 0,
        'warning': 3
      },
      visibility: 'visible'
    }, {
      type: 'compute',
      typeKey: 'compute',
      'sub-type': 'compute',
      label: 'fabric-extender',
      id: 7,
      model_number: 'N5K',
      messages: {
        'pass': 1,
        'fail': 0,
        'warning': 3
      },
      visibility: 'visible'
    }, {
      type: 'compute',
      typeKey: 'compute',
      'sub-type': 'compute',
      label: 'fabric-extender',
      id: 8,
      model_number: 'N5K',
      messages: {
        'pass': 1,
        'fail': 0,
        'warning': 3
      },
      visibility: 'visible'
    }, {
      type: 'virtualization',
      typeKey: 'virtualization',
      'sub-type': 'virtualization',
      label: 'fabric-interconnect',
      id: 9,
      model_number: 'N5K',
      messages: {
        'pass': 1,
        'fail': 0,
        'warning': 3
      },
      visibility: 'visible'
    }],
  links: [{
    source: {
      'id': 0,
      'port': 'Ethernet1/3'
    },
    target: {
      'id': 2,
      'port': 'Ethernet1/3'
    },
    'status': 'Up',
    'protocol': 'Ethernet',
    'messages': {
      'pass': 1,
      'fail': 0,
      'warning': 3
    },
    visibility: 'visible'
  }, {
    source: {
      'id': 1,
      'port': 'Ethernet1/3'
    },
    target: {
      'id': 3,
      'port': 'Ethernet1/3'
    },
    'status': 'Up',
    'protocol': 'Ethernet',
    'messages': {
      'pass': 1,
      'fail': 0,
      'warning': 3
    },
    visibility: 'visible'
  }, {
    source: {
      'id': 2,
      'port': 'Ethernet1/3'
    },
    target: {
      'id': 4,
      'port': 'Ethernet1/3'
    },
    'status': 'Up',
    'protocol': 'FC',
    'messages': {
      'pass': 1,
      'fail': 0,
      'warning': 3
    },
    visibility: 'visible'
  }, {
    source: {
      'id': 3,
      'port': 'Ethernet1/3'
    },
    target: {
      'id': 5,
      'port': 'Ethernet1/3'
    },
    'status': 'Up',
    'protocol': 'FC',
    'messages': {
      'pass': 1,
      'fail': 0,
      'warning': 3
    },
    visibility: 'visible'
  }, {
    source: {
      'id': 4,
      'port': 'Ethernet1/3'
    },
    target: {
      'id': 6,
      'port': 'Ethernet1/3'
    },
    'status': 'Up',
    'protocol': 'FCoE',
    'messages': {
      'pass': 1,
      'fail': 0,
      'warning': 3
    },
    visibility: 'visible'
  }, {
    source: {
      'id': 5,
      'port': 'Ethernet1/3'
    },
    target: {
      'id': 6,
      'port': 'Ethernet1/3'
    },
    'status': 'Up',
    'protocol': 'FCoE',
    'messages': {
      'pass': 1,
      'fail': 0,
      'warning': 3
    },
    visibility: 'visible'
  }, {
    source: {
      'id': 5,
      'port': 'Ethernet1/3'
    },
    target: {
      'id': 6,
      'port': 'Ethernet1/3'
    },
    'status': 'Up',
    'protocol': 'FCoE',
    'messages': {
      'pass': 1,
      'fail': 0,
      'warning': 3
    },
    visibility: 'visible'
  }, {
    source: {
      'id': 5,
      'port': 'Ethernet1/3'
    },
    target: {
      'id': 6,
      'port': 'Ethernet1/3'
    },
    'status': 'Up',
    'protocol': 'FCoE',
    'messages': {
      'pass': 1,
      'fail': 0,
      'warning': 3
    },
    visibility: 'visible'
  }, {
    source: {
      'id': 5,
      'port': 'Ethernet1/3'
    },
    target: {
      'id': 6,
      'port': 'Ethernet1/3'
    },
    'status': 'Up',
    'protocol': 'FCoE',
    'messages': {
      'pass': 1,
      'fail': 0,
      'warning': 3
    },
    visibility: 'visible'
  }, {
    source: {
      'id': 5,
      'port': 'Ethernet1/3'
    },
    target: {
      'id': 6,
      'port': 'Ethernet1/3'
    },
    'status': 'Up',
    'protocol': 'FCoE',
    'messages': {
      'pass': 1,
      'fail': 0,
      'warning': 3
    },
    visibility: 'visible'
  }, {
    source: {
      'id': 4,
      'port': 'Ethernet1/3'
    },
    target: {
      'id': 7,
      'port': 'Ethernet1/3'
    },
    'status': 'Up',
    'protocol': 'FC',
    'messages': {
      'pass': 1,
      'fail': 0,
      'warning': 3
    },
    visibility: 'visible'
  }, {
    source: {
      'id': 5,
      'port': 'Ethernet1/3'
    },
    target: {
      'id': 8,
      'port': 'Ethernet1/3'
    },
    'status': 'Up',
    'protocol': 'FC',
    'messages': {
      'pass': 1,
      'fail': 0,
      'warning': 3
    },
    visibility: 'visible'
  }, {
    source: {
      'id': 7,
      'port': 'Ethernet1/3'
    },
    target: {
      'id': 9,
      'port': 'Ethernet1/3'
    },
    'status': 'Down',
    'protocol': 'Ethernet',
    'messages': {
      'pass': 1,
      'fail': 0,
      'warning': 3
    },
    visibility: 'visible'
  }, {
    source: {
      'id': 8,
      'port': 'Ethernet1/3'
    },
    target: {
      'id': 9,
      'port': 'Ethernet1/3'
    },
    'status': 'Up',
    'protocol': 'Ethernet',
    'messages': {
      'pass': 1,
      'fail': 0,
      'warning': 3
    },
    visibility: 'visible'
  }
  ]
};

export const custardApple = {
  nodes: [
    {
      type: 'storage',
      typeKey: 'storage',
      'sub-type': 'storage',
      label: 'storage',
      id: 0,
      model_number: 'FAS8040',
      messages: {
        'pass': 1,
        'fail': 0,
        'warning': 5
      },
      visibility: 'visible'
    }, {
      type: 'storage',
      typeKey: 'storage',
      'sub-type': 'storage',
      label: 'storage',
      id: 1,
      model_number: 'FAS8040',
      messages: {
        'pass': 1,
        'fail': 0,
        'warning': 3
      },
      visibility: 'visible'
    }, {
      type: 'nexus',
      typeKey: 'nexus',
      'sub-type': 'nexus',
      label: 'nexus',
      id: 2,
      model_number: 'Nexus5548',
      messages: {
        'pass': 1,
        'fail': 0,
        'warning': 3
      },
      visibility: 'visible'
    }, {
      type: 'nexus',
      typeKey: 'nexus',
      'sub-type': 'nexus',
      label: 'nexus',
      id: 3,
      model_number: 'Nexus5548',
      messages: {
        'pass': 1,
        'fail': 0,
        'warning': 3
      },
      visibility: 'visible'
    }, {
      type: 'mds',
      typeKey: 'mds',
      'sub-type': 'mds',
      label: 'mds',
      id: 4,
      model_number: 'N5K',
      messages: {
        'pass': 1,
        'fail': 0,
        'warning': 3
      },
      visibility: 'visible'
    }, {
      type: 'mds',
      typeKey: 'mds',
      'sub-type': 'mds',
      label: 'mds',
      id: 5,
      model_number: 'N5K',
      messages: {
        'pass': 1,
        'fail': 0,
        'warning': 3
      },
      visibility: 'visible'
    }, {
      type: 'network',
      typeKey: 'network',
      'sub-type': 'network',
      label: 'blade-server',
      id: 6,
      model_number: 'N5K',
      messages: {
        'pass': 1,
        'fail': 0,
        'warning': 3
      },
      visibility: 'visible'
    }, {
      type: 'compute',
      typeKey: 'compute',
      'sub-type': 'compute',
      label: 'fabric-extender',
      id: 7,
      model_number: 'N5K',
      messages: {
        'pass': 1,
        'fail': 0,
        'warning': 3
      },
      visibility: 'visible'
    }, {
      type: 'compute',
      typeKey: 'compute',
      'sub-type': 'compute',
      label: 'fabric-extender',
      id: 8,
      model_number: 'N5K',
      messages: {
        'pass': 1,
        'fail': 0,
        'warning': 3
      },
      visibility: 'visible'
    }, {
      type: 'virtualization',
      typeKey: 'virtualization',
      'sub-type': 'virtualization',
      label: 'fabric-interconnect',
      id: 9,
      model_number: 'N5K',
      messages: {
        'pass': 1,
        'fail': 0,
        'warning': 3
      },
      visibility: 'visible'
    }],
  links: [{
    source: {
      'id': 0,
      'port': 'Ethernet1/3'
    },
    target: {
      'id': 2,
      'port': 'Ethernet1/3'
    },
    'status': 'Up',
    'protocol': 'Ethernet',
    'messages': {
      'pass': 1,
      'fail': 0,
      'warning': 3
    },
    visibility: 'visible'
  }, {
    source: {
      'id': 1,
      'port': 'Ethernet1/3'
    },
    target: {
      'id': 3,
      'port': 'Ethernet1/3'
    },
    'status': 'Up',
    'protocol': 'Ethernet',
    'messages': {
      'pass': 1,
      'fail': 0,
      'warning': 3
    },
    visibility: 'visible'
  }, {
    source: {
      'id': 2,
      'port': 'Ethernet1/3'
    },
    target: {
      'id': 4,
      'port': 'Ethernet1/3'
    },
    'status': 'Up',
    'protocol': 'FC',
    'messages': {
      'pass': 1,
      'fail': 0,
      'warning': 3
    },
    visibility: 'visible'
  }, {
    source: {
      'id': 3,
      'port': 'Ethernet1/3'
    },
    target: {
      'id': 5,
      'port': 'Ethernet1/3'
    },
    'status': 'Up',
    'protocol': 'FC',
    'messages': {
      'pass': 1,
      'fail': 0,
      'warning': 3
    },
    visibility: 'visible'
  }, {
    source: {
      'id': 4,
      'port': 'Ethernet1/3'
    },
    target: {
      'id': 6,
      'port': 'Ethernet1/3'
    },
    'status': 'Up',
    'protocol': 'FCoE',
    'messages': {
      'pass': 1,
      'fail': 0,
      'warning': 3
    },
    visibility: 'visible'
  }, {
    source: {
      'id': 5,
      'port': 'Ethernet1/3'
    },
    target: {
      'id': 6,
      'port': 'Ethernet1/3'
    },
    'status': 'Up',
    'protocol': 'FCoE',
    'messages': {
      'pass': 1,
      'fail': 0,
      'warning': 3
    },
    visibility: 'visible'
  }, {
    source: {
      'id': 5,
      'port': 'Ethernet1/3'
    },
    target: {
      'id': 6,
      'port': 'Ethernet1/3'
    },
    'status': 'Up',
    'protocol': 'FCoE',
    'messages': {
      'pass': 1,
      'fail': 0,
      'warning': 3
    },
    visibility: 'visible'
  }, {
    source: {
      'id': 5,
      'port': 'Ethernet1/3'
    },
    target: {
      'id': 6,
      'port': 'Ethernet1/3'
    },
    'status': 'Up',
    'protocol': 'FCoE',
    'messages': {
      'pass': 1,
      'fail': 0,
      'warning': 3
    },
    visibility: 'visible'
  }, {
    source: {
      'id': 5,
      'port': 'Ethernet1/3'
    },
    target: {
      'id': 6,
      'port': 'Ethernet1/3'
    },
    'status': 'Up',
    'protocol': 'FCoE',
    'messages': {
      'pass': 1,
      'fail': 0,
      'warning': 3
    },
    visibility: 'visible'
  }, {
    source: {
      'id': 5,
      'port': 'Ethernet1/3'
    },
    target: {
      'id': 6,
      'port': 'Ethernet1/3'
    },
    'status': 'Up',
    'protocol': 'FCoE',
    'messages': {
      'pass': 1,
      'fail': 0,
      'warning': 3
    },
    visibility: 'visible'
  }, {
    source: {
      'id': 4,
      'port': 'Ethernet1/3'
    },
    target: {
      'id': 7,
      'port': 'Ethernet1/3'
    },
    'status': 'Up',
    'protocol': 'FC',
    'messages': {
      'pass': 1,
      'fail': 0,
      'warning': 3
    },
    visibility: 'visible'
  }, {
    source: {
      'id': 5,
      'port': 'Ethernet1/3'
    },
    target: {
      'id': 8,
      'port': 'Ethernet1/3'
    },
    'status': 'Up',
    'protocol': 'FC',
    'messages': {
      'pass': 1,
      'fail': 0,
      'warning': 3
    },
    visibility: 'visible'
  }, {
    source: {
      'id': 7,
      'port': 'Ethernet1/3'
    },
    target: {
      'id': 9,
      'port': 'Ethernet1/3'
    },
    'status': 'Down',
    'protocol': 'Ethernet',
    'messages': {
      'pass': 1,
      'fail': 0,
      'warning': 3
    },
    visibility: 'visible'
  }, {
    source: {
      'id': 8,
      'port': 'Ethernet1/3'
    },
    target: {
      'id': 9,
      'port': 'Ethernet1/3'
    },
    'status': 'Up',
    'protocol': 'Ethernet',
    'messages': {
      'pass': 1,
      'fail': 0,
      'warning': 3
    },
    visibility: 'visible'
  }
  ]
}

export const infraStub = {
  'groups': [
    {
      'id': '596883aff84b47f3b3504bacda96f651.00002.00195.00005',
      'type': 'svm_logical_box',
      'sub-type': 'svm_logical_box',
      'label': 'Infra-SVM',
      'state': 'running',
      'messages': {
        'pass': [
          '1686',
          '5152',
          '5152',
          '1530'
        ],
        'fail': [],
        'warning': []
      },
      'typeKey': 'svm_logical_box',
      'subTypeKey': 'svm_logical_box',
      'model_number': 'svm_logical_box'
    },
    {
      'id': '596883aff84b47f3b3504bacda96f651.00001.00001.00007.00001.00001',
      'type': 'host_logical_box',
      'sub-type': 'ESXi',
      'label': '172.18.10.178',
      'model_number': 'UCSB-B200-M3',
      'vm_count': 1,
      'uptime': 4031294,
      'state': 'connected',
      'messages': {
        'pass': [
          '1686',
          '5152',
          '5152',
          '1530'
        ],
        'fail': [],
        'warning': []
      },
      'typeKey': 'host_logical_box',
      'subTypeKey': 'esxi'
    },
    {
      'id': '596883aff84b47f3b3504bacda96f651.00003.00001.00003.00009',
      'type': 'server_logical_box',
      'label': 'blade-1',
      'sub-type': 'Blade Server',
      'model_number': 'UCSB-B200-M3',
      'messages': {
        'pass': [
          '692'
        ],
        'fail': [],
        'warning': []
      },
      'typeKey': 'server_logical_box',
      'subTypeKey': 'blade server'
    }
  ],
  'nodes': [
    {
      'label': 'vms',
      'group': 'host_logical_box',
      'id': '12345',
      'type': 'VM',
      'sub-type': 'VM',
      'count': 1,
      'messages': {
        'pass': [],
        'fail': [],
        'warning': []
      },
      'typeKey': 'vm',
      'subTypeKey': 'vm',
      'model_number': 'vm',
      'visibility': 'visible',
      'height': 75,
      'width': 75,
      'x': 200,
      'y': 150
    },
    {
      'id': '596883aff84b47f3b3504bacda96f651.00001.00001.00007.00001.00001.00011.00001',
      'label': 'iScsiBootvSwitch',
      'group': 'host_logical_box',
      'messages': {
        'pass': [
          '5152'
        ],
        'fail': [],
        'warning': []
      },
      'type': 'Switch',
      'sub-type': 'vSwitch',
      'mtu': 9000,
      'total_ports': 5632,
      'total_available_ports': 5611,
      'typeKey': 'switch',
      'subTypeKey': 'vswitch',
      'model_number': 'vswitch',
      'visibility': 'visible',
      'height': 75,
      'width': 75,
      'x': 200,
      'y': 265
    },
    {
      'id': '596883aff84b47f3b3504bacda96f651.00001.00001.00007.00001.00001.00011.00002',
      'label': 'iScsciBootvSwitch-B',
      'group': 'host_logical_box',
      'messages': {
        'pass': [
          '5152'
        ],
        'fail': [],
        'warning': []
      },
      'type': 'Switch',
      'sub-type': 'vSwitch',
      'mtu': 9000,
      'total_ports': 5632,
      'total_available_ports': 5611,
      'typeKey': 'switch',
      'subTypeKey': 'vswitch',
      'model_number': 'vswitch',
      'visibility': 'visible',
      'height': 75,
      'width': 75,
      'x': 400,
      'y': 265
    },
    {
      'id': '596883aff84b47f3b3504bacda96f651.00001.00001.00007.00001.00001.00002',
      'label': 'vmnic0',
      'group': 'host_logical_box',
      'messages': {
        'pass': [],
        'fail': [],
        'warning': []
      },
      'type': 'physical_adapter',
      'sub-type': 'vmnic',
      'mac_address': '00:25:b5:00:00:0c',
      'speed': 10000,
      'typeKey': 'physical_adapter',
      'subTypeKey': 'vmnic',
      'model_number': 'vmnic',
      'visibility': 'visible',
      'height': 75,
      'width': 75,
      'x': 200,
      'y': 380
    },
    {
      'id': '596883aff84b47f3b3504bacda96f651.00001.00001.00007.00001.00001.00003',
      'label': 'vmnic1',
      'group': 'host_logical_box',
      'messages': {
        'pass': [],
        'fail': [],
        'warning': []
      },
      'type': 'physical_adapter',
      'sub-type': 'vmnic',
      'mac_address': '00:25:b5:00:00:0d',
      'speed': 10000,
      'typeKey': 'physical_adapter',
      'subTypeKey': 'vmnic',
      'model_number': 'vmnic',
      'visibility': 'visible',
      'height': 75,
      'width': 75,
      'x': 400,
      'y': 380
    },
    {
      'id': '596883aff84b47f3b3504bacda96f651.00001.00001.00007.00001.00001.00004',
      'label': 'vmnic2',
      'group': 'host_logical_box',
      'messages': {
        'pass': [],
        'fail': [],
        'warning': []
      },
      'type': 'physical_adapter',
      'sub-type': 'vmnic',
      'mac_address': '00:25:b5:00:00:0e',
      'speed': 10000,
      'typeKey': 'physical_adapter',
      'subTypeKey': 'vmnic',
      'model_number': 'vmnic',
      'visibility': 'visible',
      'height': 75,
      'width': 75,
      'x': 600,
      'y': 380
    },
    {
      'id': '596883aff84b47f3b3504bacda96f651.00001.00001.00007.00001.00001.00005',
      'label': 'vmnic3',
      'group': 'host_logical_box',
      'messages': {
        'pass': [],
        'fail': [],
        'warning': []
      },
      'type': 'physical_adapter',
      'sub-type': 'vmnic',
      'mac_address': '00:25:b5:00:00:0f',
      'speed': 10000,
      'typeKey': 'physical_adapter',
      'subTypeKey': 'vmnic',
      'model_number': 'vmnic',
      'visibility': 'visible',
      'height': 75,
      'width': 75,
      'x': 800,
      'y': 380
    },
    {
      'id': '596883aff84b47f3b3504bacda96f651.00001.00001.00007.00001.00001.00017',
      'label': 'vmk0',
      'group': 'host_logical_box',
      'messages': {
        'pass': [],
        'fail': [],
        'warning': []
      },
      'type': 'vmkernel_adapter',
      'sub-type': 'vmknic',
      'ip_address': '172.18.10.178',
      'typeKey': 'vmkernel_adapter',
      'subTypeKey': 'vmknic',
      'model_number': 'vmknic',
      'visibility': 'visible',
      'height': 75,
      'width': 75,
      'x': 200,
      'y': 495
    },
    {
      'id': '596883aff84b47f3b3504bacda96f651.00001.00001.00007.00001.00001.00018',
      'label': 'vmk1',
      'group': 'host_logical_box',
      'messages': {
        'pass': [],
        'fail': [],
        'warning': []
      },
      'type': 'vmkernel_adapter',
      'sub-type': 'vmknic',
      'ip_address': '192.168.51.178',
      'typeKey': 'vmkernel_adapter',
      'subTypeKey': 'vmknic',
      'model_number': 'vmknic',
      'visibility': 'visible',
      'height': 75,
      'width': 75,
      'x': 400,
      'y': 495
    },
    {
      'id': '596883aff84b47f3b3504bacda96f651.00001.00001.00007.00001.00001.00019',
      'label': 'vmk2',
      'group': 'host_logical_box',
      'messages': {
        'pass': [],
        'fail': [],
        'warning': []
      },
      'type': 'vmkernel_adapter',
      'sub-type': 'vmknic',
      'ip_address': '192.168.52.178',
      'typeKey': 'vmkernel_adapter',
      'subTypeKey': 'vmknic',
      'model_number': 'vmknic',
      'visibility': 'visible',
      'height': 75,
      'width': 75,
      'x': 600,
      'y': 495
    },
    {
      'id': '596883aff84b47f3b3504bacda96f651.00001.00001.00007.00001.00001.00020',
      'label': 'vmk4',
      'group': 'host_logical_box',
      'messages': {
        'pass': [],
        'fail': [],
        'warning': []
      },
      'type': 'vmkernel_adapter',
      'sub-type': 'vmknic',
      'ip_address': '192.168.40.178',
      'typeKey': 'vmkernel_adapter',
      'subTypeKey': 'vmknic',
      'model_number': 'vmknic',
      'visibility': 'visible',
      'height': 75,
      'width': 75,
      'x': 800,
      'y': 495
    },
    {
      'id': '596883aff84b47f3b3504bacda96f651.00001.00001.00007.00001.00001.00021',
      'label': 'vmk3',
      'group': 'host_logical_box',
      'messages': {
        'pass': [],
        'fail': [],
        'warning': []
      },
      'type': 'vmkernel_adapter',
      'sub-type': 'vmknic',
      'ip_address': '192.168.60.178',
      'typeKey': 'vmkernel_adapter',
      'subTypeKey': 'vmknic',
      'model_number': 'vmknic',
      'visibility': 'visible',
      'height': 75,
      'width': 75,
      'x': 1000,
      'y': 495
    },
    {
      'id': '596883aff84b47f3b3504bacda96f651.00001.00001.00007.00001.00001.00011.00001.00002',
      'label': 'iScsiBootPG',
      'group': 'host_logical_box',
      'messages': {
        'pass': [
          '5152'
        ],
        'fail': [],
        'warning': []
      },
      'type': 'portgroup',
      'sub-type': 'portgroup',
      'vlan_id': null,
      'typeKey': 'portgroup',
      'subTypeKey': 'portgroup',
      'model_number': 'portgroup',
      'visibility': 'visible',
      'height': 75,
      'width': 75,
      'x': 200,
      'y': 610
    },
    {
      'id': '596883aff84b47f3b3504bacda96f651.00001.00001.00007.00001.00001.00011.00002.00002',
      'label': 'iScsiBootPG-B',
      'group': 'host_logical_box',
      'messages': {
        'pass': [
          '5152'
        ],
        'fail': [],
        'warning': []
      },
      'type': 'portgroup',
      'sub-type': 'portgroup',
      'vlan_id': null,
      'typeKey': 'portgroup',
      'subTypeKey': 'portgroup',
      'model_number': 'portgroup',
      'visibility': 'visible',
      'height': 75,
      'width': 75,
      'x': 400,
      'y': 610
    },
    {
      'sub-type': 'NAS Datastore',
      'group': 'host_logical_box',
      'id': '596883aff84b47f3b3504bacda96f651.00001.00001.00007.00001.00005',
      'label': 'infra_datastore_1',
      'type': 'NFS',
      'path': '/infra_datastore_1',
      'messages': {
        'pass': [],
        'fail': [],
        'warning': []
      },
      'typeKey': 'nfs',
      'subTypeKey': 'nas datastore',
      'model_number': 'nas datastore',
      'visibility': 'visible',
      'height': 75,
      'width': 75,
      'x': 200,
      'y': 725
    },
    {
      'sub-type': 'NAS Datastore',
      'group': 'host_logical_box',
      'id': '596883aff84b47f3b3504bacda96f651.00001.00001.00007.00001.00006',
      'label': 'infra_swap',
      'type': 'NFS',
      'path': '/infra_swap',
      'messages': {
        'pass': [],
        'fail': [],
        'warning': []
      },
      'typeKey': 'nfs',
      'subTypeKey': 'nas datastore',
      'model_number': 'nas datastore',
      'visibility': 'visible',
      'height': 75,
      'width': 75,
      'x': 400,
      'y': 725
    },
    {
      'id': '596883aff84b47f3b3504bacda96f651.00003.00001.00021',
      'label': 'stack1-esx4',
      'type': 'Service Profile',
      'sub-type': 'service_profile',
      'group': 'server_logical_box',
      'messages': {
        'pass': [
          '675',
          '680',
          '677'
        ],
        'fail': [],
        'warning': []
      },
      'children': [
        {
          'id': '596883aff84b47f3b3504bacda96f651.00003.00001.00021.00001',
          'label': '03-iSCSI-B',
          'type': 'Ethernet Adapter',
          'sub-type': 'VNIC',
          'mac_address': '00:25:B5:00:00:0F',
          'messages': {
            'pass': [],
            'fail': [],
            'warning': []
          },
          'typeKey': 'ethernet adapter',
          'subTypeKey': 'vnic1',
          'model_number': 'vnic',
          'height': 75,
          'width': 75,
          'x': 1435,
          'y': 305
        },
        {
          'id': '596883aff84b47f3b3504bacda96f651.00003.00001.00021.00002',
          'label': '01-Infra-B',
          'type': 'Ethernet Adapter',
          'sub-type': 'VNIC',
          'mac_address': '00:25:B5:00:00:0D',
          'messages': {
            'pass': [],
            'fail': [],
            'warning': []
          },
          'typeKey': 'ethernet adapter',
          'subTypeKey': 'vnic2',
          'model_number': 'vnic',
          'height': 75,
          'width': 75,
          'x': 1435,
          'y': 420
        },
        {
          'id': '596883aff84b47f3b3504bacda96f651.00003.00001.00021.00003',
          'label': '02-iSCSI-A',
          'type': 'Ethernet Adapter',
          'sub-type': 'VNIC',
          'mac_address': '00:25:B5:00:00:0E',
          'messages': {
            'pass': [],
            'fail': [],
            'warning': []
          },
          'typeKey': 'ethernet adapter',
          'subTypeKey': 'vnic3',
          'model_number': 'vnic',
          'height': 75,
          'width': 75,
          'x': 1435,
          'y': 535
        },
        {
          'id': '596883aff84b47f3b3504bacda96f651.00003.00001.00021.00004',
          'label': '00-Infra-A',
          'type': 'Ethernet Adapter',
          'sub-type': 'VNIC',
          'mac_address': '00:25:B5:00:00:0C',
          'messages': {
            'pass': [],
            'fail': [],
            'warning': []
          },
          'typeKey': 'ethernet adapter',
          'subTypeKey': 'vnic4',
          'model_number': 'vnic',
          'height': 75,
          'width': 75,
          'x': 1435,
          'y': 650
        }
      ],
      'typeKey': 'service profile',
      'subTypeKey': 'service_profile',
      'model_number': 'service_profile',
      'visibility': 'visible',
      'height': 615,
      'width': 195,
      'x': 1375,
      'y': 150
    },
    {
      'id': '596883aff84b47f3b3504bacda96f651.00002.00195.00005.00008',
      'label': 'infra_datastore_1',
      'type': 'Ontap Volume',
      'sub-type': 'volume',
      'total_size': 536870912000,
      'used_size': 106879520768,
      'group': 'svm_logical_box',
      'junction_path': '/infra_datastore_1',
      'messages': {
        'pass': [],
        'fail': [],
        'warning': []
      },
      'typeKey': 'ontap volume',
      'subTypeKey': 'volume',
      'model_number': 'volume',
      'visibility': 'visible',
      'height': 75,
      'width': 75,
      'x': 200,
      'y': 1000
    },
    {
      'id': '596883aff84b47f3b3504bacda96f651.00002.00195.00005.00009',
      'label': 'infra_swap',
      'type': 'Ontap Volume',
      'sub-type': 'volume',
      'total_size': 107374182400,
      'used_size': 4415488,
      'group': 'svm_logical_box',
      'junction_path': '/infra_swap',
      'messages': {
        'pass': [],
        'fail': [],
        'warning': []
      },
      'typeKey': 'ontap volume',
      'subTypeKey': 'volume',
      'model_number': 'volume',
      'visibility': 'visible',
      'height': 75,
      'width': 75,
      'x': 400,
      'y': 1000
    }
  ],
  'links': [
    {
      'source': {
        'id': '596883aff84b47f3b3504bacda96f651.00001.00001.00007.00001.00001.00011.00001',
        'label': 'iScsiBootvSwitch'
      },
      'target': {
        'label': 'vms',
        'id': '12345'
      },
      'visibility': 'visible'
    },
    {
      'source': {
        'id': '596883aff84b47f3b3504bacda96f651.00001.00001.00007.00001.00001.00011.00002',
        'label': 'iScsciBootvSwitch-B'
      },
      'target': {
        'label': 'vms',
        'id': '12345'
      },
      'visibility': 'visible'
    },
    {
      'source': {
        'id': '596883aff84b47f3b3504bacda96f651.00001.00001.00007.00001.00005',
        'label': 'infra_datastore_1'
      },
      'target': {
        'id': '596883aff84b47f3b3504bacda96f651.00002.00195.00005.00008',
        'label': 'infra_datastore_1'
      },
      'visibility': 'visible'
    },
    {
      'source': {
        'id': '596883aff84b47f3b3504bacda96f651.00001.00001.00007.00001.00006',
        'label': 'infra_swap'
      },
      'target': {
        'id': '596883aff84b47f3b3504bacda96f651.00002.00195.00005.00009',
        'label': 'infra_swap'
      },
      'visibility': 'visible'
    },
    {
      'source': {
        'id': '596883aff84b47f3b3504bacda96f651.00001.00001.00007.00001.00001.00005',
        'label': 'vmnic3'
      },
      'target': {
        'id': '596883aff84b47f3b3504bacda96f651.00003.00001.00021.00001',
        'label': '03-iSCSI-B'
      },
      'visibility': 'visible'
    },
    {
      'source': {
        'id': '596883aff84b47f3b3504bacda96f651.00001.00001.00007.00001.00001.00011.00001',
        'label': 'iScsiBootvSwitch'
      },
      'target': {
        'id': '596883aff84b47f3b3504bacda96f651.00001.00001.00007.00001.00001.00004',
        'label': 'vmnic2'
      },
      'visibility': 'visible'
    },
    {
      'source': {
        'id': '596883aff84b47f3b3504bacda96f651.00001.00001.00007.00001.00001.00011.00002',
        'label': 'iScsciBootvSwitch-B'
      },
      'target': {
        'id': '596883aff84b47f3b3504bacda96f651.00001.00001.00007.00001.00001.00005',
        'label': 'vmnic3'
      },
      'visibility': 'visible'
    },
    {
      'source': {
        'id': '596883aff84b47f3b3504bacda96f651.00001.00001.00007.00001.00001.00018',
        'label': 'vmk1'
      },
      'target': {
        'id': '596883aff84b47f3b3504bacda96f651.00001.00001.00007.00001.00001.00011.00001.00002',
        'label': 'iScsiBootPG'
      },
      'visibility': 'visible'
    },
    {
      'source': {
        'id': '596883aff84b47f3b3504bacda96f651.00001.00001.00007.00001.00001.00018',
        'label': 'vmk1'
      },
      'target': {
        'id': '596883aff84b47f3b3504bacda96f651.00001.00001.00007.00001.00001.00004',
        'label': 'vmnic2'
      },
      'visibility': 'visible'
    },
    {
      'source': {
        'id': '596883aff84b47f3b3504bacda96f651.00001.00001.00007.00001.00001.00019',
        'label': 'vmk2'
      },
      'target': {
        'id': '596883aff84b47f3b3504bacda96f651.00001.00001.00007.00001.00001.00011.00002.00002',
        'label': 'iScsiBootPG-B'
      },
      'visibility': 'visible'
    },
    {
      'source': {
        'id': '596883aff84b47f3b3504bacda96f651.00001.00001.00007.00001.00001.00019',
        'label': 'vmk2'
      },
      'target': {
        'id': '596883aff84b47f3b3504bacda96f651.00001.00001.00007.00001.00001.00005',
        'label': 'vmnic3'
      },
      'visibility': 'visible'
    },
    {
      'source': {
        'id': '596883aff84b47f3b3504bacda96f651.00001.00001.00007.00001.00001.00018',
        'label': 'vmk1'
      },
      'target': {
        'id': '596883aff84b47f3b3504bacda96f651.00001.00001.00007.00001.00001.00004',
        'label': 'vmnic2'
      },
      'visibility': 'visible'
    },
    {
      'source': {
        'id': '596883aff84b47f3b3504bacda96f651.00001.00001.00007.00001.00001.00019',
        'label': 'vmk2'
      },
      'target': {
        'id': '596883aff84b47f3b3504bacda96f651.00001.00001.00007.00001.00001.00005',
        'label': 'vmnic3'
      },
      'visibility': 'visible'
    },
    {
      'source': {
        'id': '596883aff84b47f3b3504bacda96f651.00001.00001.00007.00001.00001.00018',
        'label': 'vmk1'
      },
      'target': {
        'id': '596883aff84b47f3b3504bacda96f651.00001.00001.00007.00001.00001.00004',
        'label': 'vmnic2'
      },
      'visibility': 'visible'
    },
    {
      'source': {
        'id': '596883aff84b47f3b3504bacda96f651.00001.00001.00007.00001.00001.00019',
        'label': 'vmk2'
      },
      'target': {
        'id': '596883aff84b47f3b3504bacda96f651.00001.00001.00007.00001.00001.00005',
        'label': 'vmnic3'
      },
      'visibility': 'visible'
    },
    {
      'source': {
        'id': '596883aff84b47f3b3504bacda96f651.00001.00001.00007.00001.00001.00002',
        'label': 'vmnic0'
      },
      'target': {
        'id': '596883aff84b47f3b3504bacda96f651.00003.00001.00021.00004',
        'label': '00-Infra-A'
      },
      'visibility': 'visible'
    },
    {
      'source': {
        'id': '596883aff84b47f3b3504bacda96f651.00001.00001.00007.00001.00001.00003',
        'label': 'vmnic1'
      },
      'target': {
        'id': '596883aff84b47f3b3504bacda96f651.00003.00001.00021.00002',
        'label': '01-Infra-B'
      },
      'visibility': 'visible'
    },
    {
      'source': {
        'id': '596883aff84b47f3b3504bacda96f651.00001.00001.00007.00001.00001.00004',
        'label': 'vmnic2'
      },
      'target': {
        'id': '596883aff84b47f3b3504bacda96f651.00003.00001.00021.00003',
        'label': '02-iSCSI-A'
      },
      'visibility': 'visible'
    }
  ]
}
