export const NodeTypes = {
  svm_logical_box: {
    label: { display: 'SVM Name' },
    state: { display: 'Operational Status' }
  },
  volume: {
    label: { display: 'SVM Name' },
    state: { display: 'Operational Status' }
  },
  'Blade Server': {
    label: { display: 'Server Name' },
    model_number: { display: 'Model number' },
    serial_number: { display: 'Serial Number' },
  },
  ESXi: {
    label: { display: 'Host Name' },
    model_number: { display: 'Model number' },
    uptime: { display: 'Uptime' },
    state: { display: 'State' }
  },
  VM: {
    count: { display: 'VM (count)' }
  },
  'Virtual Machine': {
    cpu: { display: 'CPU (count)' }
  },
  vSwitch: {
    label: { display: 'Name' },
    mtu: { display: 'MTU' },
    total_ports: { display: 'Total Ports' },
    total_available_ports: { display: 'Total Available Ports' },
  },
  vmnic: {
    label: { display: 'Name' },
    mac_address: { display: 'Mac Address' },
    speed: { display: 'Speed', unit: 'Mbps' }
  },
  vmknic: {
    label: { display: 'Name' }
  },
  portgroup: {
    label: { display: 'Name' },
    vlan_id: { display: 'Vlan Id' },
    is_vmotion_portgroup: { display: 'Is Vmotion Portgroup' },
    is_nfs_portgroup: { display: 'Is NFS Portgroup' },
    is_iscsi_portgroup: { display: 'Is ISCSI Portgroup' },
  },
  'NAS Datastore': {
    label: { display: 'Name' },
    type: { display: 'Type' },
    size_available: { display: 'Free/ Available size', isSizeConvertible: true },
    size: { display: 'Total Size', isSizeConvertible: true },
    size_used: { display: 'Used Size', isSizeConvertible: true },
  }
}
