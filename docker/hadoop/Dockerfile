# 학생 실습용: Hadoop 베이스 이미지
FROM ubuntu:22.04

# 비대화형 모드로 설정하여 설치 중 사용자 입력 대기 방지
ENV DEBIAN_FRONTEND=noninteractive

# 1. 필수 패키지 및 Java 설치
# Hadoop은 Java 기반이므로 OpenJDK 11을 설치합니다.
RUN apt-get update && apt-get install -y \
    wget \
    tar \
    curl \
    openjdk-11-jdk \
    && rm -rf /var/lib/apt/lists/*

# 2. 환경변수 설정
# JAVA_HOME: Java 설치 경로
# HADOOP_HOME: Hadoop 설치 경로
ENV JAVA_HOME=/usr/lib/jvm/java-11-openjdk-amd64
ENV HADOOP_VERSION=3.3.6
ENV HADOOP_HOME=/opt/hadoop
ENV PATH=$PATH:$HADOOP_HOME/bin:$HADOOP_HOME/sbin

# 3. Hadoop 다운로드 및 압축 해제
RUN wget -q https://archive.apache.org/dist/hadoop/common/hadoop-${HADOOP_VERSION}/hadoop-${HADOOP_VERSION}.tar.gz \
    && tar -xzf hadoop-${HADOOP_VERSION}.tar.gz -C /opt/ \
    && mv /opt/hadoop-${HADOOP_VERSION} ${HADOOP_HOME} \
    && rm hadoop-${HADOOP_VERSION}.tar.gz

# 4. 사용자 설정 파일 및 실행 스크립트 복사
# 호스트의 config 디렉토리 내용을 컨테이너의 hadoop 설정 디렉토리로 복사
COPY config/* ${HADOOP_HOME}/etc/hadoop/
# 호스트의 scripts 디렉토리를 컨테이너의 /scripts 로 복사
COPY scripts/ /scripts/

# 스크립트에 실행 권한 부여
RUN chmod +x /scripts/*.sh

# Hadoop이 사용하는 로그 및 데이터 디렉토리 생성
RUN mkdir -p /hadoop/dfs/name && \
    mkdir -p /hadoop/dfs/data && \
    mkdir -p ${HADOOP_HOME}/logs

# HDFS 사용자 설정 (root 사용자로 실행 시 오류 방지)
ENV HDFS_NAMENODE_USER=root
ENV HDFS_DATANODE_USER=root
ENV HDFS_SECONDARYNAMENODE_USER=root
ENV YARN_RESOURCEMANAGER_USER=root
ENV YARN_NODEMANAGER_USER=root

WORKDIR /scripts
