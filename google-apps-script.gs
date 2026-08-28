// ============================================================
//  PLAYSCHOOL WEBSITE — GOOGLE SHEETS LEAD CAPTURE (Apps Script)
//  ------------------------------------------------------------
//  HOW TO SET UP (3 minutes, free):
//  1. Create a Google Sheet for the school (e.g. "Blossom Leads").
//  2. In the Sheet: Extensions → Apps Script → delete the sample
//     code and paste THIS file → Save.
//  3. Deploy → New deployment → type "Web app":
//       - Execute as:  Me
//       - Who has access:  Anyone
//       - Click "Deploy", copy the Web App URL
//       (first time: authorize access — choose the gmail account
//        that owns the Sheet)
//  4. Paste that URL into the website's JS config:
//       var SHEET_URL = "https://script.google.com/macros/s/XXXX/exec";
//     (in playschool-demo-interactive.html under ★★ LEAD CAPTURE)
//  5. Done. Every form submission writes a new row with date + all
//     details, and the parent's WhatsApp opens pre-filled too.
// ============================================================

function doPost(e) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getSheetByName('Leads') || ss.insertSheet('Leads');

  // Header row on first ever submission
  if (sh.getLastRow() === 0) {
    sh.appendRow([
      'Timestamp', 'Date', 'Time',
      'Parent Name', "Child's Name", 'Mobile',
      'Program', 'City', 'Centre', 'Message', 'Source'
    ]);
  }

  var d = e.parameter || {};
  var now = new Date();

  sh.appendRow([
    now,                                 // Timestamp (full)
    now.toLocaleDateString(),            // Date
    now.toLocaleTimeString(),            // Time
    d.Parent  || '',                     // Parent Name
    d.Child   || '',                     // Child's Name
    d.Mobile  || '',                     // Mobile
    d.Program || '',                     // Program
    d.City    || '',                     // City
    d.Centre  || '',                     // Centre
    d.Message || '',                     // Message
    d.Source  || 'Website Form'          // Source
  ]);

  // Optional: email the owner a copy of each lead (fill in the email)
  // MailApp.sendEmail({to: 'owner@school.com', subject: 'New enquiry from website',
  //   body: 'Parent: ' + d.Parent + '\nChild: ' + d.Child + '\nMobile: ' + d.Mobile +
  //         '\nProgram: ' + d.Program + '\nCity: ' + d.City + '\nCentre: ' + d.Centre +
  //         '\nMessage: ' + d.Message});

  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}

// Optional manual test (run once from the editor):
function testAddSample() {
  doPost({ parameter: {
    Parent: 'Ravi Kumar', Child: 'Aarav', Mobile: '9876543210',
    Program: 'Play Group', City: 'Chennai', Centre: 'Maduravoyal',
    Message: 'Sample entry', Source: 'Manual Test'
  }});
}