# Back-Link-Scrap-Comment
## Only for blogspot.com
### Use Google Chrome
###  Make sure have Node Js and Python
### With Selenium Node Js and Python

# How To Use

Place your google email and password in "PythonSH\processing.py"
<br>
the code is (in line 11-12)
```
username = '' #your email google 
password = '' #your password google
```

## Before Start
Make sure the file in 
<li>Result\on_acc_log.txt</li>
<li>Result\scraped_link.txt</li>
<li> Result\scs_log.txt</li>
<b>is Empty</b>
<br>
or if you want throw away a lot of keywords with command:

``npm run link-cm`` 

first 
than you do "put a comment" with command :

``npm run link-sc``

<br>

## To start program

Run this command in terminal

```npm start```
<br>
Start program (Scraping and Give Comment)
<br> <br>
```npm run link-cm```
<br>
Start program (Give Comment Only)
<br><br>
```npm run link-sc```
<br>
Start program (Scraping Only)

## Scrapping
While running Scraping, you need to fill in "keyword" in the command line.
<br><br>
the "keyword" is what you want to search in the google.

## Result
Result File is in the folder "Result"
<li>error_web.txt
<ol>This is the error web text</ol></li>
<li>on_acc_log.txt
<ol>This is the result of comment but waiting list or need to be approved</ol></li>
<li>scraped_link.txt
<ol>This is the result after scraping link</ol></li>
<li>scs_log.txt
<ol>This is the result of success comment</ol></li>


