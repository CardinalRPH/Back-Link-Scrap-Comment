// Copyright 2023 Rayhan Febriyan Saputra
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

const fs = require("fs");
const writing = require("./writer");

const { Builder, By, Key, util } = require("selenium-webdriver");

const filename = "scraped_link.txt";

let your_comment = "<a href ='https://www.budiluhur.ac.id/'dofollow>Mantap Terimakasih Ingfonya</a>";

// let your_email = "example3@gmail.com";
// let your_password = "examplepassword";

let driver = new Builder().forBrowser("MicrosoftEdge").build();

// login();
// async function login() {
//     await driver.get(
//         "https://accounts.google.com/v3/signin/identifier?dsh=S-251256238%3A1675267968046218&continue=https%3A%2F%2Fwww.blogger.com%2Fcomment%2Fredirect%3FblogId%3D5395631265106314762%26po%3D8996120273991954579&hl=en&service=blogger&flowName=GlifWebSignIn&flowEntry=ServiceLogin&ifkv=AWnogHcxP1wmYgrvcTeujitR7hdyTz-gyCW3kJwCkh0aVXCuc_xPRV9P6GU114hlcXqNwrzAZ-_e"
//     );
//     const email = await driver.findElement(By.xpath("//*[@id='identifierId']"));
//     const em_btn = await driver.findElement(
//         By.xpath("//*[@id='identifierNext']/div/button/span")
//     );

//     email_acc();
//     async function email_acc() {
//         setTimeout(async () => {
//             await email.sendKeys(your_email);
//             em_btn.click();
//         }, 3000);
//     }

//     function pass_acc() {
//         setTimeout(() => { }, 3000);
//     }
// }

comment();
async function comment() {

    var array = fs.readFileSync(filename).toString().split("\n");
    for (i in array) {

        try {
            await driver.get(array[i]);
            let currurl = driver.getCurrentUrl();
            const myframe = await driver.findElement(
                By.xpath("//*[@id='comment-editor']")
            );
            await driver.switchTo().frame(myframe);
            const textarea = await driver.findElement(
                By.xpath(
                    "//*[@id='yDmH0d']/c-wiz/div/div/c-wiz/div/div/div[2]/div[2]/div[1]/div[2]/textarea"
                )
            );
            const btn = await driver.findElement(
                By.xpath(
                    "//*[@id='yDmH0d']/c-wiz/div/div/c-wiz/div/div/div[2]/div[3]/div/div"
                )
            );

            await textarea.sendKeys(your_comment);
            btn.click().then(function () {
                let updateurl = driver.getCurrentUrl();
                console.log(array[i]);
                if (currurl === updateurl) {
                    console.log("NO Publ");
                } else {
                    writing.scWrite(array[i]);
                }

            });
        } catch (error) {
            console.log("Error Process: Must Login or No El Found");
            continue;
        }


    }

}



// const { Builder, By, Key, until } = require('selenium-webdriver');

// async function automateCommenting(links) {
//   let driver = await new Builder().forBrowser('firefox').build();

//   try {
//     for (let link of links) {
//       await driver.get(link);

//       // Wait for the comment form to load
//       await driver.wait(until.elementLocated(By.id('comment-form')), 5000);

//       // Enter your comment
//       let commentBox = await driver.findElement(By.id('comment'));
//       await commentBox.sendKeys('Great post! Keep it up.');

//       // Submit the comment
//       let submitButton = await driver.findElement(By.css('input[type="submit"]'));
//       await submitButton.click();

//       // Wait for the comment to be posted
//       await driver.wait(until.elementLocated(By.css('#comments > div')), 5000);
//     }
//   } finally {
//     await driver.quit();
//   }
// }

// let links = [
//   'https://www.example1.com/post1',
//   'https://www.example2.com/post2',
//   'https://www.example3.com/post3',
//   'https://www.example4.com/post4',
//   'https://www.example5.com/post5'
// ];

// automateCommenting(links);

