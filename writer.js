const fs = require("fs");

module.exports = {
  writes: function (link) {
    let mylink = link + "\n";
    fs.appendFile("Result/scraped_link.txt", mylink, (err) => {
      if (err) {
        console.error(err);
      }
      // file written successfully
    });
  },
  scWrite: function (link) {
    let mylink = link + "\n";
    fs.appendFile("Result/scs_log.txt", mylink, (err) => {
      if (err) {
        console.error(err);
      }
      // file written successfully
    });
  }
}


