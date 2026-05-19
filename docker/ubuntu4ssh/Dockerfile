FROM ubuntu:22.04

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update && \
    apt-get install -y --no-install-recommends openssh-server && \
    mkdir -p /run/sshd && \
    useradd -m -s /bin/bash -U pkuser && \
    echo "pkuser:1234" | chpasswd && \
    printf '%s\n' \
        'PermitRootLogin no' \
        'PasswordAuthentication yes' \
        > /etc/ssh/sshd_config.d/99-docker.conf && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

EXPOSE 22

CMD ["/usr/sbin/sshd", "-D", "-e"]
