import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.common.exceptions import NoSuchElementException

from utils import generate_random_email, generate_random_password

from datetime import datetime
print(datetime.now().strftime('%Y-%m-%d %H:%M:%S'))

retries = 3

service = webdriver.FirefoxService(
    log_output='log.txt', service_args=['--log', 'debug'])
options = webdriver.FirefoxOptions()

print(f'Automation begin... Current Round: 1')
with webdriver.Firefox(service=service, options=options) as driver:
    driver.implicitly_wait(8)
    try:
        driver.get("https://open.spotify.com")
        time.sleep(2)

        driver.find_element(By.XPATH,
                            '//*[@id="main"]/div/div[2]/div[3]/header/div[4]/div[1]/button[1]').click()
        time.sleep(2)

        username = driver.find_element(By.ID,
                                       'username')
        # username.send_keys(email)
        # time.sleep(2)

        for _ in range(0, retries):
            try:
                username.send_keys(generate_random_email())
                time.sleep(2)
                alreadyBanner = driver.find_element(
                    By.XPATH, '//*[@id="__next"]/main/main/section/div/form/div/div/div/div[2]/div[1]')
                username.clear()
            except NoSuchElementException:
                break

        for _ in range(0, retries):
            try:
                username.send_keys(generate_random_email())
                time.sleep(1)
                errorBanner = driver.find_element(
                    By.XPATH, '//*[@id="username-error-message"]')
            except NoSuchElementException:
                break

        next = driver.find_element(By.XPATH,
                                   '//*[@id="__next"]/main/main/section/div/form/button')
        next.click()
        time.sleep(2)

        passwordBox = driver.find_element(By.ID, 'new-password')
        passwordBox.send_keys(generate_random_password())
        time.sleep(1)
        next2 = driver.find_element(By.XPATH,
                                    '//*[@id="__next"]/main/main/section/div/form/div[2]/button')
        next2.click()
        time.sleep(2)

        name = driver.find_element(By.ID, 'displayName')
        name.send_keys('Biplab Gorge Demison')
        time.sleep(1)

        yy = driver.find_element(By.ID, 'year')
        yy.send_keys(1999)
        time.sleep(1)

        mm = driver.find_element(By.ID, 'month')
        mm.click()
        op = driver.find_element(By.XPATH, '//*[@id="month"]/option[2]')
        op.click()
        time.sleep(1)

        dd = driver.find_element(By.ID, 'day')
        dd.send_keys(11)
        time.sleep(1)

        gender = driver.find_element(
            By.XPATH, '//*[@id="__next"]/main/main/section/div/form/div[1]/div[2]/div/section/div[3]/fieldset/div/div/div[1]')
        gender.click()
        time.sleep(1)

        next3 = driver.find_element(
            By.XPATH, '//*[@id="__next"]/main/main/section/div/form/div[2]/button')
        next3.click()
        time.sleep(2)

        signUp = driver.find_element(
            By.XPATH, '//*[@id="__next"]/main/main/section/div/form/div[2]/button')
        signUp.click()
        time.sleep(8)

        search = driver.find_element(
            By.XPATH, '//*[@id="Desktop_LeftSidebar_Id"]/nav/div[1]/ul/li[2]/a')
        search.click()
        time.sleep(8)

        done = False

        try:
            iframe = driver.find_element(
                By.XPATH, '/html/body/div[13]/div/div/div/iframe')
            driver.switch_to.frame(iframe)
            dismiss = driver.find_element(
                By.XPATH, '/html/body/div/div/div[4]/button')
            dismiss.click()
            driver.switch_to.default_content()
            time.sleep(2)
            done = True
        except NoSuchElementException:
            print('No terms and conditions popped up')

        searchInput = driver.find_element(
            By.XPATH, '//*[@id="main"]/div/div[2]/div[3]/header/div[3]/div/div/form/input')
        searchInput.click()
        searchInput.send_keys('Sad Hindi Rap')
        time.sleep(8)

        if not done:
            try:
                iframe = driver.find_element(
                    By.XPATH, '/html/body/div[13]/div/div/div/iframe')
                driver.switch_to.frame(iframe)
                dismiss = driver.find_element(
                    By.XPATH, '/html/body/div/div/div[4]/button')
                dismiss.click()
                driver.switch_to.default_content()
                time.sleep(2)
            except NoSuchElementException:
                print('No terms and conditions popped up')

        erik = driver.find_element(
            By.XPATH, '//*[@id="searchPage"]/div/div/section[1]/div[2]/div/div/div/div[2]/div/div/span[2]/a')
        erik.click()
        time.sleep(4)

        playlist1 = driver.find_element(
            By.XPATH, '//*[@id="main"]/div/div[2]/div[3]/div[1]/div[2]/div[2]/div[2]/main/section/div/section[1]/div[2]/div[1]/div[1]')
        playlist1.click()
        time.sleep(4)

        driver.find_element(
            By.XPATH, '//*[@id="main"]/div/div[2]/div[3]/div[1]/div[2]/div[2]/div[2]/main/div[1]/section/div[2]/div[2]/div[2]/div/div/button[1]').click()
        time.sleep(4)

        back = driver.find_element(
            By.XPATH, '//*[@id="main"]/div/div[2]/div[3]/header/div[2]/button[1]')
        back.click()
        time.sleep(2)

        playlist2 = driver.find_element(
            By.XPATH, '//*[@id="main"]/div/div[2]/div[3]/div[1]/div[2]/div[2]/div[2]/main/section/div/section[1]/div[2]/div[2]/div[1]')
        playlist2.click()
        time.sleep(4)

        driver.find_element(
            By.XPATH, '//*[@id="main"]/div/div[2]/div[3]/div[1]/div[2]/div[2]/div[2]/main/div[1]/section/div[2]/div[2]/div[2]/div/div/button[1]').click()
        time.sleep(4)

        back = driver.find_element(
            By.XPATH, '//*[@id="main"]/div/div[2]/div[3]/header/div[2]/button[1]')
        back.click()
        time.sleep(2)

        playlist3 = driver.find_element(
            By.XPATH, '//*[@id="main"]/div/div[2]/div[3]/div[1]/div[2]/div[2]/div[2]/main/section/div/section[1]/div[2]/div[3]/div[1]')
        playlist3.click()
        time.sleep(4)

        driver.find_element(
            By.XPATH, '//*[@id="main"]/div/div[2]/div[3]/div[1]/div[2]/div[2]/div[2]/main/div[1]/section/div[2]/div[2]/div[2]/div/div/button[1]').click()
        time.sleep(4)

        back = driver.find_element(
            By.XPATH, '//*[@id="main"]/div/div[2]/div[3]/header/div[2]/button[1]')
        back.click()
        time.sleep(2)

        playlist4 = driver.find_element(
            By.XPATH, '//*[@id="main"]/div/div[2]/div[3]/div[1]/div[2]/div[2]/div[2]/main/section/div/section[1]/div[2]/div[4]/div[1]')
        playlist4.click()
        time.sleep(4)

        driver.find_element(
            By.XPATH, '//*[@id="main"]/div/div[2]/div[3]/div[1]/div[2]/div[2]/div[2]/main/div[1]/section/div[2]/div[2]/div[2]/div/div/button[1]').click()
        time.sleep(4)

        back = driver.find_element(
            By.XPATH, '//*[@id="main"]/div/div[2]/div[3]/header/div[2]/button[1]')
        back.click()
        time.sleep(2)

        time.sleep(4)
        driver.quit()
        print('First four playlist is liked by a new account ✅')
    except:
        print('Some error occurred')
        driver.quit()

print(datetime.now().strftime('%Y-%m-%d %H:%M:%S'))
