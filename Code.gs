const CONFIG = {
  UI: {
    TITLE: 'Mesa de control fiscal',
    WIDTH: 1200,
    HEIGHT: 800,
  },
  SHEETS: {
    PARAMETROS: 'Parámetros',
    XML_BRUTOS: 'XML Brutos',
    XML_NORMALIZADOS: 'XML Normalizados',
    IMPUESTOS_DETALLE: 'Impuestos Detalle',
    ASIENTOS: 'Asientos',
    MAYOR: 'Mayor',
    FISCAL: 'Fiscal',
    ESTADOS_FINANCIEROS: 'Estados Financieros',
  },
};

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('Mesa Fiscal')
    .addItem('Abrir mesa de control', 'openDashboard')
    .addItem('Inicializar estructura', 'initializeWorkbook')
    .addToUi();
}

function doGet() {
  return HtmlService.createHtmlOutputFromFile('index')
    .setTitle(CONFIG.UI.TITLE)
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function openDashboard() {
  const html = HtmlService.createHtmlOutputFromFile('index')
    .setWidth(CONFIG.UI.WIDTH)
    .setHeight(CONFIG.UI.HEIGHT);
  SpreadsheetApp.getUi().showModalDialog(html, CONFIG.UI.TITLE);
}

function initializeWorkbook() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  Object.values(CONFIG.SHEETS).forEach((sheetName) => {
    if (!spreadsheet.getSheetByName(sheetName)) {
      spreadsheet.insertSheet(sheetName);
    }
  });
}

function listXmlEntries() {
  const sheet = getSheetOrThrow(CONFIG.SHEETS.XML_BRUTOS);
  const values = sheet.getDataRange().getValues();
  if (values.length <= 1) {
    return [];
  }
  return values.slice(1).map((row) => ({
    uuid: row[0],
    hash: row[1],
    loadedAt: row[2],
    status: row[3],
  }));
}

function validateXmlRecord(record) {
  const errors = [];
  if (!record.uuid) {
    errors.push('Falta UUID.');
  }
  if (!record.hash) {
    errors.push('Falta hash.');
  }
  if (!record.loadedAt) {
    errors.push('Falta fecha de carga.');
  }
  return {
    isValid: errors.length === 0,
    errors,
  };
}

function getSheetOrThrow(sheetName) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  if (!sheet) {
    throw new Error(`Hoja requerida no encontrada: ${sheetName}`);
  }
  return sheet;
}
