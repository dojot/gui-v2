// input HistoryInput {
//   devices: [HistoryDeviceInput]!
//   dateFrom: String # unix time
//   dateTo: String
//   lastN: Int
// }

// input HistoryDeviceInput{
//   deviceID: String!
//   attrs: [String]
// }

// type History{
//   deviceID: String!
//   label: String!
//   attrs: [HistoryAttr]
// }

// type HistoryAttr {
//   label: String!
//   valueType: ValueType!
//   value: String!
//   timestamp: String!
// }

export const GQL_WIDGET_HISTORIC = `
query getDeviceHistory($filter: HistoryInput!) {
  getDeviceHistory(filter: $filter) {
    deviceID
    label
    attrs {
      label
      valueType
      value
      timestamp
    }
  }
}
`;

export const GQL_DEVICES_LIST = `
query getDevices($page: PageInput, $filter: FilterDeviceInput) {
  getDevices(page: $page, filter: $filter) {
    devices {
      id
      label
      attrs{
        label
        valueType
      }
    }
  }
}
`;

export const GQL_USER_TOKEN = `
  mutation login($username: String, $passwd: String) {
  login(username: $username , passwd: $passwd) {
    jwt
    user {
      username
      profile
    }
  }
}
`;
