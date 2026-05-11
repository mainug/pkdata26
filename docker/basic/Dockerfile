# 원하는 이미지 다운로드
FROM python:alpine3.23

# 작업위치
WORKDIR /app

# 소스의 파일을 내부에 복사, 폴더는 폴더로 복사, 파일은 파일로 복사
COPY myapp.py test.py

# 명령실행
CMD ["python3", "test.py"]