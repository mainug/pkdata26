# Hadoop Docker 실습 클러스터

본 디렉토리는 학생들이 Hadoop HDFS 및 YARN을 실습하기 위한 최소한의 Docker 환경을 제공합니다.
NameNode 1대, DataNode 3대 구조로 구성되어 있습니다.

## 구조 요약

*   `Dockerfile`: Ubuntu 22.04 기반에 Java 11과 Hadoop 3.3.6을 설치하는 스크립트입니다.
*   `docker-compose.yml`: 총 4개의 컨테이너(NameNode 1개, DataNode 3개)를 구성합니다.
*   `config/`: Hadoop 실행에 필요한 핵심 설정 파일들이 있습니다 (학생들이 구조를 이해하기 쉽도록 주석 처리됨).
*   `scripts/`: 컨테이너 시작 시 실행되는 스크립트입니다.

## 실행 방법

1.  터미널(또는 명령 프롬프트)을 열고 현재 디렉토리로 이동합니다.
2.  다음 명령어를 실행하여 이미지를 빌드하고 백그라운드에서 실행합니다.

```bash
docker-compose up -d --build
```

## 확인 방법 (Web UI)

브라우저를 열고 다음 주소로 접속해 보세요:

*   **HDFS Web UI**: [http://localhost:9870](http://localhost:9870)
    *   상단의 `Datanodes` 탭을 클릭하여 3개의 DataNode(datanode1, datanode2, datanode3)가 정상적으로 연결되었는지 확인하세요.
*   **YARN Web UI**: [http://localhost:8088](http://localhost:8088)
    *   좌측 메뉴의 `Nodes` 를 클릭하여 3개의 NodeManager가 작동 중인지 확인하세요.

## HDFS 실습 해보기

터미널에서 NameNode 컨테이너 내부로 진입하여 HDFS 명령어를 실습할 수 있습니다.

1.  NameNode 컨테이너 접속:
    ```bash
    docker exec -it namenode bash
    ```

2.  HDFS 디렉토리 생성 및 파일 업로드 (컨테이너 내부에서 실행):
    ```bash
    # HDFS 내부에 사용자 디렉토리 생성
    hdfs dfs -mkdir -p /user/student
    
    # 로컬에 테스트 파일 생성
    echo "Hello Hadoop!" > test.txt
    
    # HDFS로 파일 업로드
    hdfs dfs -put test.txt /user/student/
    
    # HDFS 파일 목록 확인
    hdfs dfs -ls /user/student/
    
    # 업로드한 파일 내용 확인
    hdfs dfs -cat /user/student/test.txt
    ```

3.  `exit` 명령어로 컨테이너에서 빠져나옵니다.

## 종료 방법

실습을 마치고 컨테이너를 종료하려면 다음 명령어를 실행합니다.

```bash
docker-compose down
```
