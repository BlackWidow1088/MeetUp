export interface ApplicationMessage {
  type?: MessageType;
  isDismiss?: boolean;
  header?: string;
  class?: string;
  templateValue?: any;
  keepAfterNavigationChange?: boolean;
  template?: string;
  style?: string;
}

export enum MessageType {
  success = 'success',
  error = 'error'
}

export enum MessageStyle {
  single = 'single',
  template = 'template',
  collapsible = 'collapsible'
}
