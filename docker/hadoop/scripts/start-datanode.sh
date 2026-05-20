#!/bin/bash
# 학생 실습용: DataNode 및 NodeManager 시작 스크립트

echo "=== Hadoop DataNode 시작 ==="

# 1. DataNode 데몬 시작 (실제 데이터 블록 저장)
echo "DataNode 데몬을 시작합니다..."
$HADOOP_HOME/bin/hdfs --daemon start datanode

# 2. NodeManager 데몬 시작 (컨테이너 실행 및 리소스 보고)
echo "NodeManager 데몬을 시작합니다..."
$HADOOP_HOME/bin/yarn --daemon start nodemanager

echo "=== 서비스 시작 완료 ==="

# 3. 컨테이너가 종료되지 않도록 로그 출력 상태 유지
tail -f $HADOOP_HOME/logs/*
