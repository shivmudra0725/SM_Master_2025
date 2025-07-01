function onFormSubmit(e) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const formSheet = ss.getSheetByName("Form Responses 1");
  const date = Utilities.formatDate(new Date(), "Asia/Kolkata", "yyyy-MM-dd");
  const targetSheet = ss.getSheetByName(date) || ss.insertSheet(date);

  const headers = formSheet.getRange(1, 1, 1, formSheet.getLastColumn()).getValues()[0];
  const lastRow = formSheet.getLastRow();
  const row = formSheet.getRange(lastRow, 1, 1, formSheet.getLastColumn()).getValues()[0];

  // Find the two roll number columns
  const juniorIndex = headers.indexOf("Roll No (Junior)") !== -1 ? headers.indexOf("Roll No (Junior)") : headers.indexOf("Roll No");
  const seniorIndex = headers.indexOf("Roll No (Senior)");

  const rollValue = row[juniorIndex] || row[seniorIndex]; // Use whichever is filled

  // Build a new row: copy all except junior/senior Roll No, and add a combined one at the end
  const cleanRow = row.filter((_, i) => i !== juniorIndex && i !== seniorIndex);
  const cleanHeaders = headers.filter((_, i) => i !== juniorIndex && i !== seniorIndex);

  cleanHeaders.push("Roll No"); // Add combined column
  cleanRow.push(rollValue);     // Add value from either Junior or Senior

  // Write headers if new sheet
  if (targetSheet.getLastRow() === 0) {
    targetSheet.appendRow(cleanHeaders);
  }

  // Write combined row
  targetSheet.appendRow(cleanRow);
}
