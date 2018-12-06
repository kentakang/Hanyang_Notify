# HanyangNotify API Server
# parser.py
# 나이스에서 급식 및 가정통신문 정보를 파싱해오며, 학교 홈페이지에서 가정통신문을 파싱하는 스크립트
import urllib.request
from bs4 import BeautifulSoup
from datetime import datetime
import re
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
import pymysql

# DB 설정
conn = pymysql.connect(host='', user='', password='', db='', charset='utf8')
curs = conn.cursor(pymysql.cursors.DictCursor)
countCurs = conn.cursor(pymysql.cursors.Cursor)

year = str(datetime.today().year)
month = datetime.today().strftime("%m")

# 급식 파싱
def get_meal():
    url = "https://stu.sen.go.kr/sts_sci_md00_001.do?schulCode=B100000601&schulCrseScCode=2&schMmealScCode=2&ay=%s&mm=%s"
    url = url % \
        (
            year,
            month
        )
    req = urllib.request.Request(url)
    data = urllib.request.urlopen(req).read()

    bs = BeautifulSoup(data, 'html.parser')
    dayTable = bs.find_all('td')

    for br in bs.find_all('br'):
        br.replace_with("\n")

    sql = "INSERT INTO mealList(year, month, day, type, food) VALUES (%s, %s, %s, %s, %s)"
    countSQL = "SELECT COUNT(*) FROM mealList WHERE year = %s and month = %s"

    countCurs.execute(countSQL, (year, month))
    result = countCurs.fetchone()

    if (result[0] == 0):
        for i in dayTable:
            day = re.findall("\\d+", i.get_text())
            meal = re.findall("[가-힣]+", i.get_text())

            if (len(day) > 0):
                x = 0
                food = ""
                isDinner = False

                for j in meal:
                    if j == "석식":
                        print(food)
                        curs.execute(sql, (year, month, day[0], 'lunch', food))
                        isDinner = True
                        food = ""
                    elif j == "중식":
                        print("중식")
                    else:
                        food += j + ","

                    if x + 1 == len(meal):
                        print(food)
                        if (isDinner):
                            curs.execute(sql, (year, month, day[0], 'dinner', food))
                        else:
                            curs.execute(sql, (year, month, day[0], 'lunch', food))
                    else:
                        x += 1

# 학사일정 파싱
def get_schedule():
    url = "https://stu.sen.go.kr/sts_sci_sf01_001.do?schulCode=B100000601&schulCrseScCode=4&&schulKndScCode=04&ay=%s&mm=%s"
    url = url % \
        (
            year,
            month
        )
    req = urllib.request.Request(url)
    data = urllib.request.urlopen(req).read()

    bs = BeautifulSoup(data, 'html.parser')
    dayTable = bs.find_all('td')

    sql = "INSERT INTO scheduleList(year, month, day, schedule) VALUES (%s, %s, %s, %s)"
    countSQL = "SELECT COUNT(*) FROM scheduleList WHERE year = %s and month = %s"

    countCurs.execute(countSQL, (year, month))
    result = countCurs.fetchone()

    print(month)

    if (result[0] == 0):
        for i in dayTable:
            day = re.findall("\\d+", i.get_text())
            schedules = re.findall("[가-힣()(정·부회장 선거),]+", i.get_text())

            if (len(day) > 0):
                x = 0
                schedule = ""

                for j in schedules:
                    schedule += j

                if x + 1 == len(schedules):
                    curs.execute(sql, (year, month, day[0], schedule))
                else:
                    x += 1

# 가정통신문 파싱
def get_document():
    chrome_options = Options()
    chrome_options.add_argument("--headless")

    driver = webdriver.Chrome('./chromedriver', chrome_options=chrome_options)
    driver.implicitly_wait(3)
    driver.get('http://hanyang.hs.kr/8666/subMenu.do')

    bs = BeautifulSoup(driver.page_source, 'html.parser')
    notices = bs.select('.subject > .samu')
    days = bs.select('tr > td')
    days = re.findall("\\d\\d\\d\\d-\\d\\d-\\d\\d", str(days))
    idx = 0

    for title in notices:
        sql = "INSERT INTO documentList(title, date) VALUES (%s, %s)"
        countSQL = "SELECT COUNT(*) FROM documentList WHERE title = %s and date = %s"

        countCurs.execute(countSQL, (title.text, days[idx]))
        result = countCurs.fetchone()

        if (result[0] == 0):
            curs.execute(sql, (title.text, days[idx]))

        idx += 1

get_document()
get_meal()
get_schedule()
conn.commit()
conn.close()