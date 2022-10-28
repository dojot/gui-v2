import { protectAPI } from '../api';

export const findManyReports = ({ page, pageSize }) => {
  return protectAPI({
    query: `
      query findManyReports($page: Int, $pageSize: Int) {
        findManyReports(page: $page, pageSize: $pageSize) {
          total
          page
          pageSize
          reports {
            id
            name
            format
            singleReportFile
            initialDate
            finalDate
            params {
              id
              label
              attrs {
                id
                label
                type
                valueType
              }
            }
            createdAt
            updatedAt
            file {
              id
              reportId
              path
              mimeType
              filename
              fileSizeKb
              expiresAt
              createdAt
              updatedAt
            }
            attempts {
              id
              error
              failedAt
              canceledAt
              finishedAt
              createdAt
              updatedAt
            }
          }
        }
      }
    `,
    variables: JSON.stringify({
      page,
      pageSize,
    }),
  });
};

export const createReport = ({
  name,
  format,
  singleReportFile,
  initialDate,
  finalDate,
  devices,
}) => {
  return protectAPI({
    query: `
      mutation createReport($name: String!, $format: String!, $singleReportFile: Boolean!, $initialDate: String, $finalDate: String, $devices: [DeviceReportInput]!) {
        createReport(name: $name, format: $format, singleReportFile: $singleReportFile, initialDate: $initialDate, finalDate: $finalDate, devices: $devices) {
          id
        }
      }
    `,
    variables: JSON.stringify({
      name,
      format,
      singleReportFile,
      initialDate,
      finalDate,
      devices,
    }),
  });
};

export const deleteReport = id => {
  return protectAPI({
    query: `
      mutation deleteReport($id: String!) {
        deleteReport(id: $id)
      }
    `,
    variables: JSON.stringify({
      id,
    }),
  });
};

export const downloadReport = path => {
  return protectAPI({
    query: `
      mutation downloadReport($path: String!) {
        downloadReport(path: $path)
      }
    `,
    variables: JSON.stringify({
      path,
    }),
  });
};
