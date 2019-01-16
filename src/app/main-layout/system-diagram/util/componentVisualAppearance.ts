import {
  AFF_A300, AFF_A700, Blade, DataStore, ESXi, FAS2552, FAS8020, FAS8040, FAS8060, FAS8080, FAS9000, LUNVolum,
  MDS_9148S_16G_48_FC_1_Slot_Chassis, MDS_9396S, MDS_9706, N9K_C9372PX_E, Nexus5548, notFoundImage, PortGroup, ServiceProfileIO,
  SVMLogicalBox, UCS_FI_6248, UCS_FI_6332, UCSB_5108_Front, UCSB_B200_M3, UCSB_B200_M4, UCSC220M4L_Front, UCSC_220_M4S_Front,
  UCSC_C220_M3S, VirtualSwitch, VMkernel, VMs, VmSingle, vNIC, N5K_C5596UP_FA_Front, UCS_6296UP_Front, UCS_6324,
  UCS_B200_M5, UCS_B420_M4, UCSC_C240_M4S, UCSC_C240_M5S, UCSC_C460_M4, FAS2650_Front, Nexus_31108PCV, N9K_C9396PX_Front,
  N9K_C93108TC_EX_Front, N9K_C93120TX_Front, N9K_C93128TX_Front, N9K_C93180YC_EX_Front, N9K_C9336PQ_Front, N9K_C92160YC_X_Front,
  N9K_C92300YC_Front, N9K_C92304QC_Front, N9K_C9332PQ, N9K_9236C, N9K_C9272Q
} from 'src/app/main-layout/system-diagram/util/imageDataUri';

const componentVisualAppearance = {
  'FAS8040': {
    height: 85,
    width: 154,
    src: FAS8040
  },
  'UCS-FI-6248UP': {
    height: 14,
    width: 150,
    src: UCS_FI_6248
  },
  'UCSB-B200-M4': {
    height: 16,
    width: 64,
    src: UCSB_B200_M4
  },
  'N9K-C9372PX-E': {
    height: 14,
    width: 150,
    src: N9K_C9372PX_E
  },
  'AFF-A300': {
    height: 50,
    width: 150,
    src: AFF_A300
  },
  'Nexus5548': {
    height: 14,
    width: 150,
    src: Nexus5548
  },
  'MDS 9148S 16G 48 FC (1 Slot) Chassis': {
    height: 14,
    width: 150,
    src: MDS_9148S_16G_48_FC_1_Slot_Chassis
  },
  'MDS 9706': {
    height: 75,
    width: 150,
    src: MDS_9706
  },
  'MDS 9396S': {
    height: 26,
    width: 150,
    src: MDS_9396S
  },
  'FAS8020': {
    height: 75,
    width: 141,
    src: FAS8020
  },
  'FAS2552': {
    height: 26,
    width: 150,
    src: FAS2552
  },
  'FAS8060': {
    height: 75,
    width: 140,
    src: FAS8060
  },
  'FAS9000': {
    height: 75,
    width: 103,
    src: FAS9000
  },
  'UCSB-B200-M3': {
    height: 37,
    width: 150,
    src: UCSB_B200_M3
  },
  'N9K-C9372PX': {
    height: 14,
    width: 150,
    src: N9K_C9372PX_E
  },
  'UCSB-5108-AC2': {
    height: 75,
    width: 150,
    src: UCSB_5108_Front
  },
  'N20-C6508': {
    height: 75,
    width: 150,
    src: UCSB_5108_Front
  },
  'UCSC-C220-M3S': {
    height: 14,
    width: 150,
    src: UCSC_C220_M3S
  },
  'FAS8080': {
    height: 75,
    width: 140,
    src: FAS8080
  },
  'VMs': {
    height: 75,
    width: 75,
    src: VMs
  },
  'blade': {
    height: 75,
    width: 75,
    src: Blade
  },
  'vm': {
    height: 75,
    width: 75,
    src: VmSingle
  },
  'virtual machine': {
    height: 75,
    width: 75,
    src: VmSingle
  },
  'ESXi': {
    height: 75,
    width: 75,
    src: ESXi
  },
  'vmnic': {
    height: 75,
    width: 75,
    src: vNIC
  },
  'vnic': {
    height: 75,
    width: 75,
    src: vNIC
  },
  'vmknic': {
    height: 75,
    width: 75,
    src: VMkernel
  },
  'vswitch': {
    height: 75,
    width: 75,
    src: VirtualSwitch
  },
  'svm_logical_box': {
    height: 75,
    width: 75,
    src: SVMLogicalBox
  },
  'service_profile': {
    height: 75,
    width: 75,
    src: ServiceProfileIO
  },
  'portgroup': {
    height: 75,
    width: 75,
    src: PortGroup
  },
  'volume': {
    height: 75,
    width: 75,
    src: LUNVolum
  },
  'nas datastore': {
    height: 75,
    width: 75,
    src: DataStore
  },
  'UCSC-C220-M4S': {
    height: 14,
    width: 150,
    src: UCSC_220_M4S_Front
  },
  'UCSC-C220-M4L': {
    height: 14,
    width: 150,
    src: UCSC220M4L_Front
  },
  'N5K-C5596UP-FA': {
    height: 28,
    width: 150,
    src: N5K_C5596UP_FA_Front
  },
  'UCS-6296UP': {
    height: 28,
    width: 150,
    src: UCS_6296UP_Front
  },
  'UCS-6324': {
    height: 26,
    width: 150,
    src: UCS_6324
  },
  'UCSB-B200-M5': {
    height: 37,
    width: 150,
    src: UCS_B200_M5
  },
  'UCSB-B420-M4': {
    height: 18,
    width: 150,
    src: UCS_B420_M4
  },
  'UCSC-C240-M4S': {
    height: 27,
    width: 150,
    src: UCSC_C240_M4S
  },
  'UCSC-C240-M5S': {
    height: 28,
    width: 150,
    src: UCSC_C240_M5S
  },
  'UCSC-C460-M4': {
    height: 55,
    width: 150,
    src: UCSC_C460_M4
  },
  'FAS2650': {
    height: 27,
    width: 150,
    src: FAS2650_Front
  },
  'Nexus  31108PCV Chassis': {
    height: 14,
    width: 150,
    src: Nexus_31108PCV
  },
  'N9K-C9396PX': {
    height: 29,
    width: 150,
    src: N9K_C9396PX_Front
  },
  'N9K-C93108TC-EX': {
    height: 29,
    width: 150,
    src: N9K_C93108TC_EX_Front
  },
  'N9K-C93120TX': {
    height: 29,
    width: 150,
    src: N9K_C93120TX_Front
  },
  'N9K-C93128TX': {
    height: 41,
    width: 150,
    src: N9K_C93128TX_Front
  },
  'N9K-C93180YC-EX': {
    height: 29,
    width: 150,
    src: N9K_C93180YC_EX_Front
  },
  'N9K-C9336PQ': {
    height: 29,
    width: 150,
    src: N9K_C9336PQ_Front
  },
  'N9K-C92160YC-X': {
    height: 29,
    width: 150,
    src: N9K_C92160YC_X_Front
  },
  'N9K-C92300YC': {
    height: 29,
    width: 150,
    src: N9K_C92300YC_Front
  },
  'N9K-C92304QC': {
    height: 29,
    width: 150,
    src: N9K_C92304QC_Front
  },
  'N9K-C9332PQ': {
    height: 13,
    width: 150,
    src: N9K_C9332PQ
  },
  'N9K-C9172Q': {
    height: 25,
    width: 150,
    src: N9K_C9272Q
  },
  'N9K-9236C': {
    height: 13,
    width: 150,
    src: N9K_9236C
  },
  'AFF-A700': {
    height: 75,
    width: 150,
    src: AFF_A700
  },
  'not-found': {
    height: 50,
    width: 150,
    src: notFoundImage
  },
  'chassis': {
    height: 75,
    width: 150,
    src: UCSB_5108_Front
  },
  'fi': {
    height: 75,
    width: 150,
    src: UCS_FI_6332
  },
  'ethernet': {
    height: 75,
    width: 150,
    src: N9K_C9332PQ
  },
  'fc': {
    height: 75,
    width: 150,
    src: MDS_9148S_16G_48_FC_1_Slot_Chassis
  },
  'storage controller': {
    height: 75,
    width: 150,
    src: AFF_A300
  }
}

export const componentTypeStr = {
  height: 'height',
  width: 'width',
  image: 'image'
}

export const NodeSubTypeKey: string[] = [
  'vm',
  'blade',
  'blade server',
  'svm_logical_box',
  'server_logical_box',
];

export const NodeDeviceType = {
  'svm_logical_box': 'Storage',
  'Ontap Volume': 'Storage',
  'server_logical_box': 'Compute',
  'VM': 'Virtualization',
  'Virtual Machine': 'Virtualization',
};

export class ComponentVisualAppearanceDetails {
  getNodeDetails(model_number: string, type: string, componentType: string) {
    const component = componentVisualAppearance[model_number] || componentVisualAppearance[componentType] || componentVisualAppearance['not-found'];
    return (type === componentTypeStr.height) ?
      component.height :
      ((type === componentTypeStr.width) ? component.width : component.src);
  }

  updateDimensions(node) {
    node.height = this.getNodeDetails(node.model_number, componentTypeStr.height, node.subTypeKey);
    node.width = this.getNodeDetails(node.model_number, componentTypeStr.width, node.subTypeKey);
  }
}
