#!/bin/bash
# stop-docker-start-k8s.sh

set -e

echo "Stopping Docker Compose stack..."
docker-compose down -v

echo "Applying Kubernetes manifests..."
kubectl apply -f k8s/namespace.yaml
kubectl apply -f k8s/secret.yaml
kubectl apply -f k8s/configmap.yaml
kubectl apply -f k8s/booking-init-sql.yaml
kubectl apply -f k8s/user-init-sql.yaml
kubectl apply -f k8s/booking-db-pvc.yaml
kubectl apply -f k8s/user-db-pvc.yaml
kubectl apply -f k8s/booking-db-deployment.yaml
kubectl apply -f k8s/user-db-deployment.yaml
kubectl apply -f k8s/redis-deployment.yaml
kubectl apply -f k8s/prisma-migrate-job.yaml
kubectl apply -f k8s/booking-service-deployment.yaml
kubectl apply -f k8s/user-service-deployment.yaml
kubectl apply -f k8s/api-gateway-deployment.yaml
kubectl apply -f k8s/frontend-deployment.yaml
kubectl apply -f k8s/booking-service-hpa.yaml
kubectl apply -f k8s/ingress.yaml
echo "Waiting for all pods to be ready..."
kubectl wait --for=condition=Ready pods --all -n booking-app --timeout=120s
echo "Setting up Ingress NGINX controller..."
kubectl -n ingress-nginx port-forward svc/ingress-nginx-controller 3000:80

echo "Done! App is now running on Kubernetes."