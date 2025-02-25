# Testes de Carga com k6, Prometheus e Grafana

Este projeto fornece um ambiente simples para testes de carga usando o k6, monitoramento de métricas com o Prometheus e visualização com o Grafana. Ele é configurado com Docker Compose para facilitar a execução e integração entre as ferramentas.

## O que é?

- **k6**: Uma ferramenta de teste de carga, ideal para simular tráfego em APIs, sites ou serviços.
- **Prometheus**: Um sistema de monitoramento que coleta métricas exportadas pelo k6 via remote write.
- **Grafana**: Uma plataforma de visualização que exibe dashboards com as métricas coletadas, incluindo um dashboard pré-configurado.

O ambiente é estruturado para:

- Executar testes de carga a partir de scripts na pasta `tests/`.
- Armazenar métricas no Prometheus.
- Visualizar resultados em um dashboard do Grafana provisionado automaticamente.

## Pré-requisitos

- **Docker**: Instale o Docker (versão 20.10 ou superior recomendada).
- **Docker Compose**: Certifique-se de que o Docker Compose está instalado (geralmente vem com o Docker).
- Um terminal para executar comandos.

## Como utilizar

### 1. Prepare os scripts de teste

- Coloque seus scripts de teste (ex.: `example.js`) na pasta `tests/`. O exemplo fornecido simula carga pesada em `test.k6.io`.

### 2. Iniciar os serviços

```bash
docker compose up -d --build
```

### 3. Executar testes de carga

```bash
docker compose run k6 run /tests/example.js
```

### 4. Visualizar os resultados

**Prometheus**: Acesse <http://localhost:9090> para ver as métricas brutas (ex.: k6_http_req_duration).
**Grafana**: Acesse <http://localhost:3000> (login: admin, senha: admin), vá até "Dashboards" e abra o dashboard provisionado (ex.: "k6-dashboard").

### 5. Para os serviços

```bash
docker compose down
```

## Melhorias

Ainda não consegui reutilizar o mesmo container do k6 para todos os testes de carga que executo. Para isso, seria necessário incluir um bash no container, permitindo que o comando `tail -f /dev/null` o mantenha ativo. Assim, poderíamos rodar os testes usando `docker-compose exec ...` sem criar novos containers.
