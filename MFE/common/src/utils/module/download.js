export const downloadTextFile = (filenameWithExtension, fileContent) => {
  const element = document.createElement('a');
  element.setAttribute('href', `data:text/plain;charset=utf-8,${encodeURIComponent(fileContent)}`);
  element.setAttribute('download', filenameWithExtension);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
};

export const downloadFile = (url, filename) => {
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
};

export const downloadCSV = (csv, filename) => {
  downloadFile(`data:text/csv;base64,${csv}`, filename);
};

export const downloadPDF = (pdf, filename) => {
  const href = 'data:application/pdf;base64,' + pdf;
  downloadFile(href, filename);
};

export const downloadZIP = (zip, filename) => {
  const href = 'data:application/zip;base64,' + zip;
  downloadFile(href, filename);
};
