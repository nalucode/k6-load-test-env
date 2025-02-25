FROM golang:1.22.2 AS builder
RUN go install go.k6.io/xk6/cmd/xk6@latest
RUN xk6 build --with github.com/grafana/xk6-output-prometheus-remote --output /tmp/k6

FROM grafana/k6:latest
COPY --from=builder /tmp/k6 /usr/bin/k6