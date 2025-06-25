#!/bin/bash
# stop-k8s-start-docker.sh

set -e

echo "Stopping all Kubernetes resources in booking-app namespace..."
kubectl delete all --all -n booking-app || true
kubectl delete pvc --all -n booking-app || true
kubectl delete configmap --all -n booking-app || true
kubectl delete secret --all -n booking-app || true
kubectl delete ingress --all -n booking-app || true

echo "Bringing up Docker Compose stack..."
docker-compose up -d
echo "Waiting for Docker containers to be ready..."

echo "Done! App is now running on Docker Compose."