export const reports = [
  {
    id: 1,
    name: 'Temperatura do solo',
    requestDate: '20/03/2022 12:45',
    availableDate: null,
    expiresIn: 0,
    status: 'generating',
    selectedFilters: {
      initialPeriod: '03/06/2022, 13:20',
      finalPeriod: '03/08/2022, 13:20',
    },
    devices: [
      {
        id: '12345',
        label: 'Dispositivo 1',
        attrs: [
          {
            id: 1,
            label: 'Distance',
            type: 'dynamic',
            valueType: 'float',
          },
          {
            id: 2,
            label: 'Temperature',
            type: 'dynamic',
            valueType: 'float',
          },
        ],
      },
      {
        id: '12125',
        label: 'Dispositivo 2',
        attrs: [
          {
            id: 1,
            label: 'Distance',
            type: 'dynamic',
            valueType: 'float',
          },
          {
            id: 2,
            label: 'Temperature',
            type: 'dynamic',
            valueType: 'float',
          },
        ],
      },
    ],
  },

  {
    id: 2,
    name: 'Relatório de teste - 2',
    requestDate: '20/03/2022 12:45',
    availableDate: '03/08/2022, 13:20',
    expiresIn: 0,
    status: 'available',
    selectedFilters: {
      initialPeriod: '03/06/2022, 13:20',
      finalPeriod: '03/08/2022, 13:20',
    },
    devices: [
      {
        id: '12345',
        label: 'Dispositivo 1',
        attrs: [
          {
            id: 1,
            label: 'Distance',
            type: 'dynamic',
            valueType: 'float',
          },
          {
            id: 2,
            label: 'Temperature',
            type: 'dynamic',
            valueType: 'float',
          },
        ],
      },
      {
        id: '12125',
        label: 'Dispositivo 2',
        attrs: [
          {
            id: 1,
            label: 'Distance',
            type: 'dynamic',
            valueType: 'float',
          },
          {
            id: 2,
            label: 'Temperature',
            type: 'dynamic',
            valueType: 'float',
          },
        ],
      },
    ],
  },

  {
    id: 3,
    name: 'Relatório de teste - 3',
    requestDate: '20/03/2022 12:45',
    availableDate: '03/08/2022, 13:20',
    expiresIn: 0,
    status: 'availableWithErrors',
    selectedFilters: {
      initialPeriod: '03/06/2022, 13:20',
      finalPeriod: '03/08/2022, 13:20',
    },
    devices: [
      {
        id: '12345',
        label: 'Dispositivo 1',
        attrs: [
          {
            id: 1,
            label: 'Distance',
            type: 'dynamic',
            valueType: 'float',
          },
          {
            id: 2,
            label: 'Temperature',
            type: 'dynamic',
            valueType: 'float',
          },
        ],
      },
      {
        id: '12125',
        label: 'Dispositivo 2',
        attrs: [
          {
            id: 1,
            label: 'Distance',
            type: 'dynamic',
            valueType: 'float',
          },
          {
            id: 2,
            label: 'Temperature',
            type: 'dynamic',
            valueType: 'float',
          },
        ],
      },
    ],
  },

  {
    id: 4,
    name: 'Relatório de teste - 4',
    requestDate: '20/03/2022 12:45',
    availableDate: '03/08/2022, 13:20',
    expiresIn: 0,
    status: 'error',
    selectedFilters: {
      initialPeriod: '03/06/2022, 13:20',
      finalPeriod: '03/08/2022, 13:20',
    },
    devices: [
      {
        id: '12345',
        label: 'Dispositivo 1',
        attrs: [
          {
            id: 1,
            label: 'Distance',
            type: 'dynamic',
            valueType: 'float',
          },
          {
            id: 2,
            label: 'Temperature',
            type: 'dynamic',
            valueType: 'float',
          },
        ],
      },
      {
        id: '12125',
        label: 'Dispositivo 2',
        attrs: [
          {
            id: 1,
            label: 'Distance',
            type: 'dynamic',
            valueType: 'float',
          },
          {
            id: 2,
            label: 'Temperature',
            type: 'dynamic',
            valueType: 'float',
          },
        ],
      },
    ],
  },
];
