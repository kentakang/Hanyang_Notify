# HanyangNotify API Server
# server.py
# 데이터베이스에 있는 데이터를 가져와 JSON 형식으로 보여주는 스크립트
import http.server
import pymysql
import json
from datetime import datetime

# /meal
def get_meal():
    conn = pymysql.connect(host='', user='', password='', db='', charset='utf8')
    curs = conn.cursor(pymysql.cursors.DictCursor)
    countCurs = conn.cursor(pymysql.cursors.Cursor)
    year = str(datetime.today().year)
    month = str(datetime.today().strftime("%m"))
    day = str(datetime.today().strftime("%d"))
    sql = "SELECT food, type FROM mealList WHERE year = %s and month = %s and day = %s"
    countSQL = "SELECT COUNT(*) FROM mealList WHERE year = %s and month = %s and day = %s"
    countCurs.execute(countSQL, (year, month, day))
    result = countCurs.fetchone()
    countCurs.close()
    if (result[0] != 0):
        curs.execute(sql, (year, month, day))
        result = curs.fetchall()
        curs.close()
        return json.dumps(result, ensure_ascii=False)
    else:
        curs.close()
        return "[{'food' : '급식이 없습니다.', 'type' : ''}]"

# /schedule
def get_schedule():
    conn = pymysql.connect(host='localhost', user='user', password='password', db='database', charset='utf8')
    curs = conn.cursor(pymysql.cursors.DictCursor)
    countCurs = conn.cursor(pymysql.cursors.Cursor)
    year = str(datetime.today().year)
    month = str(datetime.today().strftime("%m"))
    day = str(datetime.today().strftime("%d"))
    sql = "SELECT schedule FROM scheduleList WHERE year = %s and month = %s and day = %s"
    countSQL = "SELECT COUNT(*) FROM scheduleList WHERE year = %s and month = %s and day = %s"
    countCurs.execute(countSQL, (year, month, day))
    result = countCurs.fetchone()
    countCurs.close()
    if (result[0] != 0):
        curs.execute(sql, (year, month, day))
        result = curs.fetchall()
        curs.close()
        return json.dumps(result, ensure_ascii=False)
    else:
        curs.close()
        return "[{'schedule' : '학사일정이 없습니다.'}]"

# /document
def get_document():
    conn = pymysql.connect(host='localhost', user='user', password='password', db='database', charset='utf8')
    curs = conn.cursor(pymysql.cursors.DictCursor)
    sql = "SELECT * FROM documentList ORDER BY date DESC limit 1"
    curs.execute(sql)
    result = curs.fetchall()
    curs.close()
    return json.dumps(result, ensure_ascii=False)

# HTTP 서버 핸들러
class MyHandler(http.server.BaseHTTPRequestHandler):
    def do_GET(self):
        if self.path == "/meal":
            message = get_meal()
        elif self.path == "/schedule":
            message = get_schedule()
        elif self.path == "/document":
            message = get_document()
        else:
            message = "Unsupported API"
        self.send_response(200) #응답코드
        self.end_headers() #헤더가 본문을 구분
        self.wfile.write(message.encode("EUC-KR"))

server = http.server.HTTPServer(('', 8888), MyHandler)
server.serve_forever()