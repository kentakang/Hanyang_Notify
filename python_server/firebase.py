# HanyangNotify API Server
# firebase.py
# 오늘의 점심, 저녁 데이터를 FCM을 통해 알려주는 스크립트
import firebase_admin
import requests, json
import pymysql
import sys
from firebase_admin import credentials
from oauth2client.service_account import ServiceAccountCredentials
from datetime import datetime

conn = pymysql.connect(host='', user='', password='', db='', charset='utf8')
curs = conn.cursor(pymysql.cursors.DictCursor)
countCurs = conn.cursor(pymysql.cursors.Cursor)

year = str(datetime.today().year)
month = str(datetime.today().strftime("%m"))
day = str(datetime.today().strftime("%d"))

def _get_access_token():
    credentials = ServiceAccountCredentials.from_json_keyfile_name(
        'firebase.json', 'https://www.googleapis.com/auth/firebase.messaging'
    )
    access_token_info = credentials.get_access_token()
    return access_token_info.access_token

def _send_push(title, body):
    url = 'https://fcm.googleapis.com/v1/projects/hanyang-675a9/messages:send'

    headers = {
        'Authorization' : 'Bearer ' + _get_access_token(),
        'Content-Type' : 'application/json; UTF-8',
    }

    data = {
        "message" : {
            "topic" : "ALL",
            "notification" : {
                "title" : title,
                "body" : body,
            }
        }
    }

    res = requests.post(url, headers = headers, data=json.dumps(data))
    print(res.json())
    res.close()

def lunch():
    sql = "SELECT food, type FROM mealList WHERE year = %s and month = %s and day = %s and type='lunch'"
    countSQL = "SELECT COUNT(*) FROM mealList WHERE year = %s and month = %s and day = %s and type='lunch'"

    countCurs.execute(countSQL, (year, month, day))
    result = countCurs.fetchone()
    countCurs.close()

    if (result[0] != 0):
        curs.execute(sql, (year, month, day))
        result = curs.fetchall()
        curs.close()
        food = result[0].get('food')
        _send_push("오늘의 점심", food[:-1])

def dinner():
    sql = "SELECT food, type FROM mealList WHERE year = %s and month = %s and day = %s and type='dinner'"
    countSQL = "SELECT COUNT(*) FROM mealList WHERE year = %s and month = %s and day = %s and type='dinner'"

    countCurs.execute(countSQL, (year, month, day))
    result = countCurs.fetchone()
    countCurs.close()

    if (result[0] != 0):
        curs.execute(sql, (year, month, day))
        result = curs.fetchall()
        curs.close()
        food = result[0].get('food')
        _send_push("오늘의 석식", food[:-1])

if (sys.argv[0] == lunch):
    lunch()
elif (sys.argv[0] == dinner):
    dinner()