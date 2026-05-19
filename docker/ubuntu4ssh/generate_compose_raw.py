def generate_docker_compose_raw(num_containers=12):
    # 파일의 시작 부분 (버전 및 services 선언)
    compose_content = "version: '3.8'\nservices:\n"

    # 1부터 12까지 반복하며 문자열을 붙여나감
    for i in range(1, num_containers + 1):
        formatted_num = f"{i:02d}"
        
        service_name = f"pkuser{formatted_num}"
        container_name = f"pkuser{formatted_num}"
        hostname = f"PK{formatted_num}"
        host_port = 2200 + i
        volume_mapping = f"D:/data/container_ssh/pkuser{formatted_num}:/home/pkuser/data"

        # YAML 구조에 맞게 들여쓰기(띄어쓰기 2칸, 4칸)를 맞춰서 템플릿 작성
        service_template = f"""
  {service_name}:
    image: pkteam:1.0
    container_name: {container_name}
    hostname: {hostname}
    ports:
      - "{host_port}:22"
    restart: unless-stopped
    volumes:
      - {volume_mapping}
"""
        compose_content += service_template

    # 외부 라이브러리 없이 파이썬 기본 기능으로 파일 쓰기
    output_filename = "docker-compose.yml"
    with open(output_filename, "w", encoding="utf-8") as f:
        f.write(compose_content.strip() + "\n")
    
    print(f" 성공적으로 {output_filename} 파일이 생성되었습니다! (pip 설치 불필요)")

if __name__ == "__main__":
    generate_docker_compose_raw(12)