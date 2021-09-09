import { WIDGET } from 'Constants';
import { formatDate } from 'Utils';

const parseType = (type, config) => {
  switch (type) {
    case WIDGET.LINE:
      return config.line;
    case WIDGET.MAP:
      return config.map;
    case WIDGET.AREA:
      return config.areaProps;
    case WIDGET.BAR:
      return config.bar;
    case WIDGET.TABLE:
      return config.table;
    default:
      return {};
  }
};

const generateColumns = config => {
  const columns = [];
  config.forEach(item => {
    columns.push({
      id: item.dataKey,
      displayName: item.name,
    });
  });
  return columns;
};

const generateCSV = (rows, columns) => {
  let csvContent = 'data:text/csv;charset=utf-8,timestamp,';

  columns.forEach((column, index, array) => {
    csvContent += `${column.displayName}`;
    if (index !== array.length - 1) {
      csvContent += ',';
    }
  });
  csvContent += `\r\n`;
  if (Array.isArray(rows)) {
    rows.forEach(row => {
      csvContent += `${formatDate(row.timestamp, 'DD/MM/YYYY HH:mm:ss')},`;
      columns.forEach((column, index, array) => {
        csvContent += row[column.id] ? `${row[column.id]}` : '-';
        if (index !== array.length - 1) {
          csvContent += ',';
        }
      });
      csvContent += `\r\n`;
    });
  } else {
    csvContent += `${formatDate(rows.timestamp, 'DD/MM/YYYY HH:mm:ss')},`;
    columns.forEach((column, index, array) => {
      csvContent += rows[column.id] ? `"${rows[column.id].value}"` : '-';
      if (index !== array.length - 1) {
        csvContent += ',';
      }
    });
    csvContent += `\r\n`;
  }

  return csvContent;
};

export const widgetToCSV = (data, config, widgetID) => {
  const [type] = widgetID.split('/');
  const headerContent = parseType(parseInt(type, 10), config);
  const columns = generateColumns(headerContent);
  const csvContent = generateCSV(data, columns);

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute(
    'download',
    `${config.meta.title} (${formatDate(new Date(), 'DDMMYYYYHHmmss')}).csv`,
  );
  document.body.appendChild(link);

  link.click();
};
