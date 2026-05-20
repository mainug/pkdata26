#!/bin/bash
# 학생 실습용: DataNode 및 NodeManager 시작 스크립트

echo "=== Hadoop DataNode 시작 ==="

# [포트 미스매치 방지 정책 주입]
# 데이터노드가 자신의 호스트네임에 맞춰 외부 브라우저와 통신 포트를 올바르게 바인딩하도록 강제 설정합니다.
if [ -f "$HADOOP_HOME/etc/hadoop/hdfs-site.xml" ]; then
    echo "hdfs-site.xml에 데이터노드 주소 바인딩 설정을 추가합니다..."
    MY_HOSTNAME=$(hostname)
    # 호스트네임에 따라 HTTP 포트를 동적으로 지정하여 포트 충돌 및 리다이렉트 포트 미스매치를 방지합니다.
    if [ "$MY_HOSTNAME" = "datanode1" ]; then
        MY_PORT=9864
    elif [ "$MY_HOSTNAME" = "datanode2" ]; then
        MY_PORT=9865
    elif [ "$MY_HOSTNAME" = "datanode3" ]; then
        MY_PORT=9866
    else
        MY_PORT=9864
    fi
    sed -i "/<\/configuration>/i \\  <property>\n    <name>dfs.datanode.http.address<\/name>\n    <value>${MY_HOSTNAME}:${MY_PORT}<\/value>\n  <\/property>" $HADOOP_HOME/etc/hadoop/hdfs-site.xml
fi

# 1. DataNode 데몬 시작 (실제 데이터 블록 저장)
echo "DataNode 데몬을 시작합니다..."
$HADOOP_HOME/bin/hdfs --daemon start datanode

# 2. NodeManager 데몬 시작 (컨테이너 실행 및 리소스 보고)
echo "NodeManager 데몬을 시작합니다..."
$HADOOP_HOME/bin/yarn --daemon start nodemanager

echo "=== 서비스 시작 완료 ==="

# 3. 컨테이너가 종료되지 않도록 로그 출력 상태 유지
tail -f $HADOOP_HOME/logs/*