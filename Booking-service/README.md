# Booking Microservices Project

## Wymagania projektowe

Należy zaimplementować aplikację opartą na architekturze mikroserwisowej, składającą się z co najmniej trzech odrębnych, logicznie uzasadnionych usług (mikroserwisów). Przykładowe komponenty:

- Usługa frontendowa
- Usługa backendowa (API)
- Usługa dedykowana (np. obsługa logiki biznesowej)
- Baza danych (SQL/NoSQL)
- Pamięć podręczna (np. Redis)

Technologie implementacji są dowolne. Należy zadbać o poprawną komunikację między serwisami (np. REST, gRPC, komunikacja przez kolejkę).

---

## Technologie i architektura

- **Frontend:** React + TypeScript (Vite), serwowany przez Nginx
- **API Gateway:** Node.js + Express, reverse proxy, rate limiting (Redis)
- **Booking Service:** Node.js + Express + Prisma, PostgreSQL
- **User Service:** Node.js + Express, PostgreSQL, JWT autoryzacja
- **Bazy danych:** PostgreSQL (osobne dla użytkowników i rezerwacji)
- **Cache:** Redis (rate limiting)
- **Komunikacja:** REST (HTTP, JSON), proxy przez API Gateway

---

## Elementy oceniane

> Ocenie podlega logiczny podział na mikroserwisy, spójność i poprawność zaimplementowanej komunikacji między nimi.

### Jakość Architektury (x / 8 pkt)

- Logiczny podział na mikroserwisy: frontend, api-gateway, booking-service, user-service, bazy danych, redis
- Spójna komunikacja REST przez API Gateway
- Oddzielne bazy danych dla różnych domen

> Wymagana jest poprawna składnia pliku docker-compose.yml.
> Należy zdefiniować wszystkie usługi aplikacji oraz zależności (depends_on).
> Wymagane jest efektywne zarządzanie konfiguracją (np. zmienne środowiskowe).

### Definicja Usług (docker-compose.yml) (x / 14 pkt)

- Poprawna składnia pliku [`docker-compose.yml`](docker-compose.yml)
- Wszystkie usługi i zależności (`depends_on`)
- Konfiguracja przez zmienne środowiskowe (np. `DATABASE_URL`)

- Healthcheck dla każdej usługi

### Sieci Docker (x / 6 pkt)

> Należy utworzyć i wykorzystać niestandardową sieć Docker.
> Wymagana jest poprawna konfiguracja komunikacji przez nazwy kontenerów.

- Niestandardowa sieć Docker (`app-network`)
- Komunikacja przez nazwy kontenerów (np. `user-service:3003`)

### Wolumeny Docker (x / 6 pkt)

> Należy skonfigurować wolumeny dla usług stanowych w celu zapewnienia trwałości danych.

- Wolumeny dla baz danych (`booking-db-data`, `user-db-data`)

### Optymalizacja Obrazów Docker (Dockerfile) (x / 11 pkt)

> Należy przygotować własne, poprawne pliki Dockerfile.
> Wymagane jest zastosowanie technik minimalizacji rozmiaru obrazu (multi-stage builds, itp.).
> Ocenie podlega efektywne wykorzystanie cache'u warstw oraz użycie .dockerignore.

- Własne pliki Dockerfile dla każdej usługi
- Multi-stage builds (frontend, booking-service)
- Użycie `.dockerignore` dla minimalizacji obrazu

### Multiplatformowość (x / 5 pkt)

> Należy zbudować obrazy wieloarchitekturowe (amd64, arm64) przy użyciu docker buildx lub podobnego mechanizmu.

Fragment `docker buildx imagetools inspect revilllo/booking-service:latest` by pokazać, że obraz jest wieloarchitekturowy
(Nie jest na windowsa, ponieważ to wymaga Kontenerów na Windowsie, co jest pay-to-win i jakby, nie lol. Go install GNU/Linux, enjoy your life)

```Dockerfile
Name:      docker.io/revilllo/booking-service:latest
MediaType: application/vnd.oci.image.index.v1+json
Digest:    sha256:653f4c06c04ad8cb86ba1a67276893e3c413f2e6e9bc36605c1ee4de4d23b17a

Manifests:
  Name:        docker.io/revilllo/booking-service:latest@sha256:cc6afda866797d542c823cda2a3136c8ec0d57ecc8c7d12c996d626ac3f3820f
  MediaType:   application/vnd.oci.image.manifest.v1+json
  Platform:    linux/amd64

  Name:        docker.io/revilllo/booking-service:latest@sha256:881f54c65da2665e3ecc4f72a556f5e926e7c6372877f9714b13f9965b533bb7
  MediaType:   application/vnd.oci.image.manifest.v1+json
  Platform:    linux/arm64
```

### Dodatkowe punkty

> Implementacja dyrektyw healthcheck w pliku docker-compose.yml. (+4 pkt)
> Wykorzystanie argumentów budowania (ARG) i zmiennych (ENV) w Dockerfile do parametryzacji. (+1 pkt)
> Zastosowanie Docker Secrets do zarządzania danymi wrażliwymi. (+3 pkt)
> Implementacja mechanizmu "live reload"/"hot reload" dla usług deweloperskich. (+2 pkt)

- Healthcheck w compose (+4 pkt)
- Zastosowanie ENV w Dockerfile (częściowo, np. DATABASE_URL)
- Hot reload dla developmentu (możliwe przez nodemon w api-gateway)

---

## Elementy oceniane Kubernetes

### Manifesty Zasobów Kubernetes (`Deployment`, `Service`, `ConfigMap`, `Secret`): (x /19 pkt)

> Należy przygotować poprawne manifesty YAML.
> Wymagana jest poprawna konfiguracja selektorów, etykiet, portów.
> Ocenie podlega bezpieczne zarządzanie sekretami i konfiguracją.

- Deployment dla każdej usługi: `frontend`, `api-gateway`, `booking-service`, `user-service`, `booking-db`, `user-db`, `redis`
- Service dla każdej usługi:
- ConfigMap: `user-init-sql`, `booking-init-sql`
- Secret: `booking-secret` dla bazy danych
- selektory, etykiety, porty: działa
- sekrety w osobnym pliku zakodowane base64 (nie w .env, bo pushuje na repo anyways)

### Trwałe Przechowywanie Danych (PV/PVC): (x / 9 pkt)

> Wymagana jest poprawna definicja PersistentVolumeClaim.
> Należy użyć StorageClass (jeśli dostępne) lub zdefiniować PersistentVolume.
> Ocenie podlega poprawne podmontowanie wolumenów w Podach.

- PVC: `booking-db-pvc`, `user-db-pvc`
- StorageClass: hostpath (jeśli dostępne)
- Wolumeny: działają

### Ruch Zewnętrzny (Ingress / LoadBalancer): (x / 9 pkt)

> Należy skonfigurować dostęp do aplikacji z zewnątrz za pomocą Ingress lub Service typu LoadBalancer.
> Wymagana jest poprawna konfiguracja reguł routingu lub ekspozycji portów.

- Ingress: skonfigurowany routing `/api` do api-gateway i `/` do frontendu. Wszystkie usługi mają odpowiednie porty

### Skalowanie Aplikacji (Replicas + HPA): (x / 13 pkt)

> Należy ustawić odpowiednią liczbę replik (replicas) w Deployment.
> Wymagane jest skonfigurowanie działającego HorizontalPodAutoscaler (HPA) dla co najmniej jednej usługi (wymaga Metrics Server).

- Replicas: Wszystkie usługi mają dwie repliki
- HPA: skonfigurowany dla `booking-service`

### Dodatkowe punkty

> Monitoring: Wdrożenie Prometheus + Grafana, konfiguracja ServiceMonitor/adnotacji, stworzenie prostego dashboardu. (+4 pkt)
> Helm: Spakowanie aplikacji jako Helm Chart. (+3 pkt)
> CI/CD: Zaimplementowanie prostego potoku CI/CD (np. GitHub Actions) do automatycznego budowania obrazów i pushowania do repozytorium kontenerów. (+3 pkt)

- [placeholder]

---

## Podsumowanie technologii

- **Frontend:** React, TypeScript, Vite, Nginx
- **Backend:** Node.js, Express, Prisma, PostgreSQL, JWT
- **API Gateway:** Express, http-proxy-middleware, Redis (rate limiting)
- **Bazy danych:** PostgreSQL (osobne dla userów i bookingów)
- **Cache:** Redis
- **Docker:** Compose, multi-stage builds, healthchecks, wolumeny, sieć

---

## Uruchomienie

1. Clone the repo `git clone <repo-url>` and cd into the directory
2. Have Docker Desktop running
3. (optional) if you want to make changes, `docker build -t <your-registry>/booking-service:latest ./booking-service` and `docker push <your-registry>/booking-service:latest` for each service with Dockerfile.
4. Ensure `kubectl get storageclass` exists
5. Pray to God if you believe in one, if you don't—you better start right now:

```sh
kubectl apply -f k8s/namespace.yaml
kubectl apply -f k8s/secret.yaml
kubectl apply -f k8s/configmap.yaml
kubectl apply -f k8s/booking-init-sql.yaml
kubectl apply -f k8s/user-init-sql.yaml
kubectl apply -f k8s/booking-db-pvc.yaml
kubectl apply -f k8s/user-db-pvc.yaml
# Wait for PVCs to be Bound
kubectl -n booking-app get pvc
kubectl apply -f k8s/booking-db-deployment.yaml
kubectl apply -f k8s/user-db-deployment.yaml
kubectl apply -f k8s/redis-deployment.yaml
# Wait for DB pods to be Running
kubectl -n booking-app get pods
# Delete any Pending pods if needed
kubectl -n booking-app get pods | grep Pending | awk '{print $1}' | xargs kubectl -n booking-app delete pod
kubectl apply -f k8s/prisma-migrate-job.yaml
kubectl apply -f k8s/booking-service-deployment.yaml
kubectl apply -f k8s/user-service-deployment.yaml
kubectl apply -f k8s/api-gateway-deployment.yaml
kubectl apply -f k8s/frontend-deployment.yaml
kubectl apply -f k8s/booking-service-hpa.yaml
kubectl apply -f k8s/ingress.yaml
```

6. run `kubectl -n ingress-nginx port-forward svc/ingress-nginx-controller 3000:80`
7. Open `http://localhost:3000` in a browser.
8. Congratulations :3

Aplikacja dostępna na `http://localhost:3000`

---
