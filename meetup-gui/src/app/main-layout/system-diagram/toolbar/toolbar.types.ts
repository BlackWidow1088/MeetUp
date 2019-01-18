export const ToolTypeStr = {
  reset: 'reset',
  legend: 'legend',
  export: 'export',
  filter: 'filter',
  save: 'save',
  recycle: 'recycle',
  zoomIndicator: 'zoom'
}

export const ToolOptions = [
  {
    linkIcon: 'icon-filter',
    linkText: 'Filter',
    type: ToolTypeStr.filter,
    enabled: false,
    open: false,
    isHidden: false
  },
  {
    linkIcon: 'icon-reload',
    linkText: 'Reset',
    type: ToolTypeStr.reset,
    enabled: false,
    open: false,
    isHidden: false
  },
  {
    linkIcon: 'icon-restore',
    linkText: 'Restore',
    type: ToolTypeStr.recycle,
    enabled: false,
    open: false,
    isHidden: false
  },
  {
    linkIcon: 'icon-save',
    linkText: 'Save Current Layout',
    linkDisabled: 'Saving..',
    type: ToolTypeStr.save,
    enabled: false,
    open: false,
    isHidden: false
  },
  {
    linkIcon: 'icon-export',
    linkText: 'Export',
    type: ToolTypeStr.export,
    enabled: false,
    open: false,
    isHidden: false
  },
  {
    linkIcon: 'icon-legend-show',
    linkIconDisabled: 'icon-legend-hide',
    linkText: 'Legend',
    linkDisabled: 'Legend',
    type: ToolTypeStr.legend,
    enabled: false,
    open: false,
    isHidden: false
  }
];
