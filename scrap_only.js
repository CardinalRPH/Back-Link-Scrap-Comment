const writing = require("./writer");
const prompt = require("prompt-sync")({ sigint: true });
const { Builder, By, Key, util } = require("selenium-webdriver");

let driver = new Builder().forBrowser("chrome").build(); //change "MicrosoftEdge" or "chrome" for choose browser
let skip1 = "webcache.googleusercontent.com";
let skip2 = "translate.google.com";
let skip3 = "www.google.com";


let qkey = prompt("Keyword: ");
let page = 1;
start(qkey);

async function start(my_q) {
    let search_q = "site:blogspot.com " + "'" + my_q + "'";
    try {
        await driver.get("http://google.com");
        await driver.findElement(By.name("q")).sendKeys(search_q, Key.RETURN);
        
        console.log("Wait 20 Second for Capthca");

        //timeout 20s for captcha
        setTimeout(async function () {
            while (true) {
                try {
                    console.log("Page " + page);
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

                    page++;
                } catch (error) {
                    //when the scrapping done. driver will close
                    console.log("Stop");


                    await driver.close();
                    // require("child_process").fork("PythonSH/processing.py");
                    break;
                }
            }
        }, 20000);
    } catch (error) {
        console.log(error);
    }
}