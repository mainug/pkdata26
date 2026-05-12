FROM ubuntu:22.04
LABEL maintainer="PMW alsdnr0850@gmail.com"
RUN apt update &&\
    apt -y upgrade &&\
    apt install -y sudo passwd openssh-server wget nano net-tools iputils-ping openjdk-8-jdk python3-pip &&\
    apt clean &&\
    rm -rf /var/lib/apt/lists/* &&\
    groupadd pkdata &&\
    useradd -m -d /home/pkdata -s /bin/bash -g pkdata -G sudo pkdata &&\
    echo "pkdata:1234" | chpasswd &&\
    mkdir -p /home/pkdata/ .ssh &&\
    chown -R pkdata:pkdata /home/pkdata &&\
    echo "export JAVA_HOME=/usr/lib/jvm/java-8-openjdk-amd64" >> /home/pkdata/.bashrc &&\
    chown pkdata:pkdata /home/pkdata/.bashrc &&\
    mkdir -p /var/run/sshd &&\
    echo "PermitRootLogin no" >> /etc/ssh/sshd_config &&\
    echo "PasswordAuthentication yes" >> /etc/ssh/sshd_config
USER pkdata
WORKDIR /home/pkdata
RUN pip install --upgrade pip && pip install jupyterlab
ENV PATH="/home/pkdata/.local/bin:$PATH"
CMD ["/bin/bash","-c","service ssh start && exe3c /bin/bash"]