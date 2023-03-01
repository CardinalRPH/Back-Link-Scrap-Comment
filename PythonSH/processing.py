import undetected_chromedriver.v2 as uc
import re
import sys
from time import sleep
from selenium.webdriver.common.by import By
from selenium.common.exceptions import NoSuchElementException
from selenium.webdriver.support.ui import WebDriverWait
from selenium.common.exceptions import TimeoutException
from selenium.webdriver.support import expected_conditions as EC

username = '' #your email google
password = '' #your password google

primary_comment = 'Good, Thanks for Your Information' #your comment

your_comment = '<a href ="https://www.budiluhur.ac.id/"dofollow>'+primary_comment+'</a>'

driver = uc.Chrome()
driver.delete_all_cookies()
driver.maximize_window()


def comment():
    with open('Result/scraped_link.txt') as f:
        x = 0
        for line in f.readlines():
            # delay=10
            x = x+1
            print(x)
            sys.stdout.flush()
            print(line)
            sys.stdout.flush()
            bol = False
            with open(r'Result/error_web.txt', 'r') as fp:
                lines = fp.readlines()
                for row in lines:
                    if row.strip() in line:
                        bol=True
                        break
                if bol==False:
                    try:
                        driver.set_page_load_timeout(25)
                        driver.get(line)
                        # myElem = WebDriverWait(driver, delay).until(EC.presence_of_element_located((By.CSS_SELECTOR, 'h1')))
                        print("page is load")
                        sys.stdout.flush()
                        try:
                            sleep(1)
                            currURL = driver.current_url
                            try:
                                buttonftr = driver.find_element(
                                    By.XPATH, '//*[@id="FeaturedPost1"]/div/div/article/div[5]/div[1]/div[1]/span/a/span')
                                buttonftr.click()
                            except NoSuchElementException:
                                print("No Comment btn 1")
                                sys.stdout.flush()
                            try:
                                buttonftr2 = driver.find_element(
                                    By.XPATH, '//*[@id="FeaturedPost1"]/div/div/article/div[4]/div[1]/div[1]/span/a/span')
                                buttonftr2.click()
                            except NoSuchElementException:
                                print("No Comment btn 2")
                                sys.stdout.flush()
                            try:
                                buttonftr3 = driver.find_element(
                                    By.XPATH, '//*[@id="Blog1"]/div[1]/div/div/div[1]/div/div[3]/div[1]/span[3]/a')
                                buttonftr3.click()
                            except NoSuchElementException:
                                print("No Comment btn 3")
                                sys.stdout.flush()

                            frame = driver.find_element(
                                By.XPATH, '//*[@id="comment-editor"]')
                            driver.switch_to.frame(frame)

                            textarea = driver.find_element(
                                By.XPATH, '//*[@id="yDmH0d"]/c-wiz/div/div/c-wiz/div/div/div[2]/div[2]/div[1]/div[2]/textarea')
                            button = driver.find_element(
                                By.XPATH, '//*[@id="yDmH0d"]/c-wiz/div/div/c-wiz/div/div/div[2]/div[3]/div[1]/div/span/span')

                            textarea.send_keys(your_comment)
                            button.click()
                            sleep(4)
                            upURL = driver.current_url

                            if upURL == currURL:
                                print("=============>No Publish")
                                sys.stdout.flush()
                                with open("Result/on_acc_log.txt", "a") as f:
                                    f.write(line)
                            else:
                                with open("Result/scs_log.txt", "a") as f:
                                    f.write(line)
                                print("=============>Publish")
                                sys.stdout.flush()

                            sleep(2)

                        except NoSuchElementException:
                            print("No Element Need")
                            sys.stdout.flush()
                            continue
                    except TimeoutException:
                        print("Timeout Exception: Page did not load.")
                        sys.stdout.flush()
                        with open("Result/error_web.txt", "a") as f:
                            resultc = re.search("(?P<url>https?://[^/]+)/", line)
                            if resultc:
                                website = resultc.group("url")
                                f.write(website +"\n")
                        continue
                    finally:
                        print("Timeout Exception: Page did not load.")
                        sys.stdout.flush()
                        continue
            


def login():
    driver.get('https://accounts.google.com/v3/signin/identifier?dsh=S-251256238%3A1675267968046218&continue=https%3A%2F%2Fwww.blogger.com%2Fcomment%2Fredirect%3FblogId%3D5395631265106314762%26po%3D8996120273991954579&hl=en&service=blogger&flowName=GlifWebSignIn&flowEntry=ServiceLogin&ifkv=AWnogHcxP1wmYgrvcTeujitR7hdyTz-gyCW3kJwCkh0aVXCuc_xPRV9P6GU114hlcXqNwrzAZ-_e')
    sleep(2)

    driver.find_element(
        By.XPATH, '//*[@id="identifierId"]').send_keys(username)
    driver.find_element(
        By.XPATH, '//*[@id="identifierNext"]/div/button/span').click()
    sleep(5)

    driver.find_element(
        By.XPATH, '//*[@id="password"]/div[1]/div/div[1]/input').send_keys(password)
    driver.find_element(
        By.XPATH, '//*[@id="passwordNext"]/div/button/span').click()
    sleep(10)
    print("login scss")
    sys.stdout.flush()
    comment()

print("hello " + username)
sys.stdout.flush()
login()
