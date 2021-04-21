import pandas as pd
import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait 
from selenium.webdriver.support import expected_conditions as ec
import pyautogui as pg
import webbrowser as web
import cv2

enHost = ""

data = pd.read_csv("Mensajes.csv")
data_dict = data.to_dict('list')

user = data_dict['mensaje'][0]
psw = data_dict['mensaje'][1]

url = 'https://app4.utp.edu.co/pe/'
url2 = 'https://app4.utp.edu.co/reportes/ryc/ReporteDetalladoNotasxEstudiante.php'

# Selectores

selectorUsername = '#txtUrio'
selectorPassword = '#txtPsswd'
botonInicio = '#enviar > span.ui-button-text'
botonNotas = '#mn-adobj'

driver = webdriver.Chrome()

driver.maximize_window()

driver.get(url)

driver.find_element_by_css_selector(selectorUsername).send_keys(user)
driver.find_element_by_css_selector(selectorPassword).send_keys(psw)
driver.find_element_by_css_selector(botonInicio).click()
time.sleep(2)

pg.click(x=100, y=200)
driver.get(url2)
driver.save_screenshot("screenshot.png")
pg.press('space')
driver.save_screenshot("screenshot2.png")

time.sleep(2)
file= "screenshot.png"
fileb= "screenshotRecortado.png"

img = cv2.imread(file)
crop_img = img[0:925, 640:1280]
cv2.imwrite(fileb, crop_img)

file= "screenshot2.png"
fileb= "screenshotRecortado2.png"

img = cv2.imread(file)
crop_img = img[0:925, 640:1280]
cv2.imwrite(fileb, crop_img)

pg.hotkey('ctrl', 'w')