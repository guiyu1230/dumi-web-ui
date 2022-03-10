/**
 * docx、xlsx、xls、pdf文件转成blob或者arrayBuffer
 * @param type 文件类型
 * @param file 文件
 * @returns {Blob | ArrayBuffer}`
 */
export function transferFileToBlob(
  type: string,
  file: File,
): Promise<Blob | ArrayBuffer> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (event: any) => {
      if (type === 'xlsx' || type === 'xls') {
        resolve(event.target.result);
      } else {
        const result = new Blob([event.target.result], {
          type: getBlobType(type),
        });
        resolve(result);
      }
    };
    reader.readAsArrayBuffer(file);
  });
}

function getBlobType(type: string) {
  switch (type) {
    case 'docx':
      return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
    case 'xlsx':
      return 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    case 'xls':
      return 'application/vnd.ms-excel';
    case 'pdf':
      return 'application/pdf';
    default:
      return '';
  }
}

export default async function readPreview(
  type: string,
  file: File,
  dom: HTMLElement,
) {
  const data = await transferFileToBlob(type, file);
  if (type === 'docx') {
    readDocPrevew(data as Blob, dom);
  } else if (type === 'xlsx' || type === 'xls') {
    readXlsPrevew(data as ArrayBuffer, dom);
  } else if (type === 'pdf') {
    readPDFPrevew(data as Blob, dom);
  }
}

/**
 * 读取doc文档
 * @param blob blob对象
 * @param dom  挂载DOM
 */
function readDocPrevew(blob: Blob, dom: HTMLElement) {
  import('docx-preview').then((docx) => {
    docx.renderAsync(blob, dom);
  });
}

/**
 * 读取xlsx、xls文档
 * @param buffer buffer对象
 * @param dom    挂载DOM
 */
function readXlsPrevew(buffer: ArrayBuffer, dom: HTMLElement) {
  Promise.all([import('xlsx'), import('x-data-spreadsheet')]).then(
    ([XLSX, { default: Spreadsheet }]: any) => {
      const data = new Uint8Array(buffer);
      const workbook = XLSX.read(data, { type: 'array' });
      const out: any[] = [];
      workbook.SheetNames.forEach((name: string) => {
        const o: any = { name: name, rows: {} };
        const ws = workbook.Sheets[name];
        const aoa = XLSX.utils.sheet_to_json(ws, { raw: false, header: 1 });
        aoa.forEach((r: any[], i: number) => {
          const cells: any = {};
          r.forEach((c, j) => {
            cells[j] = { text: c };
          });
          o.rows[i] = { cells: cells };
        });
        out.push(o);
      });
      dom.innerHTML = '';
      new Spreadsheet(dom, {
        mode: 'read',
        showToolbar: false,
        showGrid: true,
        showContextmenu: false,
        showBottomBar: false,
        view: {
          height: () => dom.offsetHeight,
          width: () => dom.offsetWidth,
        },
      }).loadData(out);
    },
  );
}

/**
 * 读取pdf对象
 * @param blob blob对象
 * @param dom  挂载DOM
 */
function readPDFPrevew(blob: Blob, dom: HTMLElement) {
  import('pdfobject').then((PDFObject) => {
    const fileURL = window.URL.createObjectURL(blob);
    PDFObject.embed(fileURL, dom);
  });
}
