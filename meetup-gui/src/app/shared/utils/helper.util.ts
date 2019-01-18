import { messages } from './messages';

export function getMemoryUnit(bytes) {
  if (!bytes) {
    return messages.na;
  }
  if (isNumber(bytes)) {
    bytes = parseFloat(bytes);
  } else {
    return bytes;
  }
  const units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];
  let unit = 0;
  while (bytes >= unitDivisor.memory) {
    bytes /= unitDivisor.memory;
    unit++;
  }
  return `${bytes.toFixed(2)} ${units[unit]}`;
}

export const unitDivisor = {
  speed: 1000,
  memory: 1024
};

export function isValidEmail(email) {
  const filter = /^[^<>()[\]\\,;*:\%#^\s@\"$&!@]+@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z0-9]+\.)+[a-zA-Z]{2,}))$/;
  return filter.test(email);
}

export function isNumber(bytes) {
  if (typeof (bytes) === 'string') {
    if (isNaN(+bytes.replace(/\s|\$/g, ''))) {
      return false;
    } else {
      return true;
    }
  } else if (typeof (bytes) === 'number') {
    return true;
  }
  return false;
}

export function chipEmailValidation(emails) {
  if (emails.value) {
    for (let i = 0; i < emails.value.length; i++) {
      if (!isValidEmail(emails.value[i].trim())) {
        return true;
      }
    }
  }
  return false;
}

export function removeSpecialCharacters(inputText: String) {
  return inputText.replace(/[^A-Za-z0-9-_]/, '');
}

export function removeAllSpecialCharacters(inputText: String) {
  return inputText.replace(/[^A-Za-z0-9]/, '');
}

export const deviceTypeName = {
  mds: 'MDS',
  mock: 'Mock',
  nexus: 'Nexus',
  ontap: 'Ontap',
  ucs: 'UCS',
  vmware: 'VMWare'
}
export const deviceTypeOptions = [
  { label: deviceTypeName.mds, value: deviceTypeName.mds },
  { label: deviceTypeName.nexus, value: deviceTypeName.nexus },
  { label: deviceTypeName.ontap, value: deviceTypeName.ontap },
  { label: deviceTypeName.ucs, value: deviceTypeName.ucs },
  { label: deviceTypeName.vmware, value: deviceTypeName.vmware }
];
// Function returns the color code in hex format for input string
export function mapStringToColor(str) {
  let hash = 0, i, letter;
  for (letter of str) {
    hash = letter.charCodeAt(0) + ((hash << 5) - hash);
  }
  let colour = '#';
  for (i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xFF;
    colour += ('00' + value.toString(16)).substr(-2);
  }
  return colour;
}

export function isValidNumber(field) {
  // pattern for only integers without decimal points
  return RegExp('^[0-9]*$').test(field);
}

export function calculateSpeedUnit(bytes) {
  if (!bytes) {
    return messages.NA;
  }
  if (isNumber(bytes)) {
    bytes = parseFloat(bytes);
  } else {
    return bytes;
  }
  const units = ['bps', 'Kbps', 'Mbps', 'Gbps', 'Tbps', 'Pbps'];
  let unit = 0;
  while (bytes >= unitDivisor.speed) {
    bytes /= unitDivisor.speed;
    unit++;
  }
  return `${bytes.toFixed(2)} ${units[unit]}`;
}

export function mapExpiryStatus(date) {
  let status = 'Expired';
  if (new Date(date).valueOf() > new Date().getTime()) {
    status = 'Active';
  }
  return status;
}
