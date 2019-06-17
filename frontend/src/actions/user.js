export const GET_VENDOR_LIST = 'GET_VENDOR_LIST';
export const actionGetVendorList = value => {
  return { type: GET_VENDOR_LIST, payload: value  };
};

export const GET_HR_LIST = 'GET_HR_LIST'
export const actionGetHRList = value => {
  return { type: GET_HR_LIST, payload: value }
}