import * as XLSX from 'xlsx';

export const downloadExcelFile = (
  data: any[],
  sheetName: string,
  fileName: string
) => {
  const fileType =
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  const fileExtension = '.xlsx';

  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, sheetName);
  const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  const blobData = new Blob([excelBuffer], { type: fileType });
  const url = window.URL.createObjectURL(blobData);

  const link = document.createElement('a');
  link.href = url;
  link.download = `${fileName}${fileExtension}`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};