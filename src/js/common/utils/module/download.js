export const downloadTextFile = (filenameWithExtension, fileContent) => {
  const element = document.createElement('a');
  element.setAttribute('href', `data:text/plain;charset=utf-8,${encodeURIComponent(fileContent)}`);
  element.setAttribute('download', filenameWithExtension);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
};
