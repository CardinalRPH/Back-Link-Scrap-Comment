import undetected_chromedriver.v2 as uc
from time import sleep
from selenium.webdriver.common.by import By
from selenium.common.exceptions import NoSuchElementException
from selenium.webdriver.support.ui import WebDriverWait
from selenium.common.exceptions import TimeoutException
from selenium.webdriver.support import expected_conditions as EC

username = 'email@gmail.com'
password = 'password'

your_comment = '<a href ="https://www.budiluhur.ac.id/"dofollow>Mantap Terimakasih Ingfonya hehe</a>'

driver = uc.Chrome()
driver.delete_all_cookies()
driver.maximize_window()


def comment():
    with open('scraped_link.txt') as f:
        for line in f.readlines():
            print(line)
            driver.set_page_load_timeout(15)
            # delay=10
            try:
                driver.get(line)
                # myElem = WebDriverWait(driver, delay).until(EC.presence_of_element_located((By.CSS_SELECTOR, 'h1')))
                print("page is load")
                try:
                    sleep(1)
                    currURL = driver.current_url

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
                        with open("on_acc_log.txt", "a") as f:
                            f.write(line)
                            f.write("\n")
                    else:
                        with open("scs_log.txt", "a") as f:
                            f.write(line)
                            f.write("\n")
                        print("=============>Publish")

                    sleep(2)

                except NoSuchElementException:
                    print("No El")
                    continue
            except TimeoutException:
                print("Timeout Exception: Page did not load.")
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
    sleep(5)
    
    comment()


login()