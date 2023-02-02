// let array_search = Math.random() * 1000;
// let search_q_by_array = "site:blogspot.com &start=" + array_search;

const writing = require("./writer");
let { PythonShell } = require('python-shell');
let my_q = "semut";
let search_q = "site:blogspot.com " + "'" + my_q + "'";
const { Builder, By, Key, util } = require("selenium-webdriver");

let driver = new Builder().forBrowser("MicrosoftEdge").build();
let skip1 = "webcache.googleusercontent.com";
let skip2 = "translate.google.com";
let skip3 = "www.google.com";

// while (true) {

// }

start();
async function start() {
  try {
    await driver.get("http://google.com");
    await driver.findElement(By.name("q")).sendKeys(search_q, Key.RETURN);

    //timeout 20s for captcha
    setTimeout(async function () {
      while (true) {
        try {
          console.log("jalan");
          let linkElements = await driver.findElements(
            By.xpath("//div[@class='yuRUbf']//a[@href]")
          );
          //get the all link href
          let links = await Promise.all(
            linkElements.map((el) => el.getAttribute("href"))
          );

          //write the link into file sraped_link.txt
          for (let link of links) {
            if (link.includes(skip1) || link.includes(skip2) || link.includes(skip3)) {
              // console.log("yes");
              // writing.writes(link);
            } else {
              // console.log("no");
              writing.writes(link);
            }
          }
          await driver
            .findElement(
              By.xpath("//*[@id='botstuff']/div/div[2]/table/tbody/tr/td[12]")
            )
            .click();
        } catch (error) {
          //when the scrapping done. driver will close
          console.log("Udeh Stop");
          
          // require("child_process").fork("processing.js");
          await driver.close();

          // PythonShell.run("processing.py", null, function (err, result) {
          //   console.log(result)
          //   console.log("Program FInished");
          // }) 
          // console.log(error);
          break;
        }
      }
    }, 20000);
  } catch (error) {
    console.log(error);
  }
}
