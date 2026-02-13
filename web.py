# 정제하기 (국제우주정거장 실시간 위치)
import requests as req
import webbrowser as wb

# 위성 위치
url1 = "http://api.open-notify.org/iss-now.json"
# 탑승자 명단
url2 = "http://api.open-notify.org/astros.json"

result = req.get(url1).json()
lat = result['iss_position']['latitude']
lon = result['iss_position']['longitude']

human_num = req.get(url2).json()['number']

url = f"http://www.google.com/maps?q={lat},{lon}"
print(f"현재 {human_num}명이 탑승한 인공위성(국제우주정거장) 위치를 열겠습니다. 위도:{lat}, 경도:{lon}")
wb.open(url)