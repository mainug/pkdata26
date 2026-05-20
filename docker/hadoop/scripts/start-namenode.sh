#!/bin/bash
# 학생 실습용: NameNode 및 ResourceManager 시작 스크립트

echo "=== Hadoop NameNode 시작 ==="

# 1. HDFS NameNode 포맷 (데이터 디렉토리가 비어있을 때만 최초 1회 포맷)
if [ ! -d "/hadoop/dfs/name/current" ]; then
    echo "NameNode 포맷을 진행합니다..."
    $HADOOP_HOME/bin/hdfs namenode -format -force -nonInteractive
    echo "NameNode 포맷 완료!"
else
    echo "NameNode가 이미 포맷되어 있습니다. 포맷을 건너뜁니다."
fi

# 2. NameNode 데몬 시작 (HDFS 메타데이터 관리)
echo "NameNode 데몬을 시작합니다..."
$HADOOP_HOME/bin/hdfs --daemon start namenode

# 3. ResourceManager 데몬 시작 (YARN 클러스터 리소스 관리)
echo "ResourceManager 데몬을 시작합니다..."
$HADOOP_HOME/bin/yarn --daemon start resourcemanager

echo "=== 서비스 시작 완료 ==="
echo "HDFS Web UI: http://localhost:9870"
echo "YARN Web UI: http://localhost:8088"

# 4. 컨테이너가 종료되지 않도록 로그 출력 상태 유지
tail -f $HADOOP_HOME/logs/*
