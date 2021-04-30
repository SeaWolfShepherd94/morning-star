// load the things we need
var jsforce = require('jsforce');
var fs = require('fs');
var path = require('path');
const Filter = require("bad-words");

// Create async function
exports.donors = async function(req, res) {
  // Assign credentials
  let creds = JSON.parse(fs.readFileSync(path.resolve(__dirname, './external-creds.json')).toString());
  // Assign Salesforce login
  let conn = new jsforce.Connection({
    loginUrl: creds.url
  });
  // Assign filter
  const filter = new Filter();
  // Initialize array for data
  var records = [];
  // Login using credentials
  await conn.login(creds.username, creds.password);
  // now you can use conn to read/write data...
  conn.query('SELECT Contact_Name__c, CreatedDate FROM Opportunity WHERE Amount > 0 ORDER BY CreatedDate DESC', function(err, res) {
    if (err) { return console.error(err); }
    for (var i = 0; i < res.records.length; i++) {
      var record = res.records[i].Contact_Name__c;
      // Check for null values, anonymous donors, and profanity then insert record
      if (record && !record.includes("Anonymous") && !filter.isProfane(record) && !records.includes(record)) {
        records.push(record);
      }
    }
    generate(records);
  });
  // Generate EJS template while passing data
  function generate(records) {
    res.render('pages/index', {records: records});
  }
  await conn.logout();
}
