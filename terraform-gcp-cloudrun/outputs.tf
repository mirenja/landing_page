output "service_url" {
  description = "The URL of the deployed Cloud Run service."
  value       = google_cloud_run_service.service.status[0].url
}

output "service_name" {
  description = "The name of the Cloud Run service."
  value       = google_cloud_run_service.service.name
}

output "artifact_registry_repo_url" {
  description = "The Docker Artifact Registry repository URL"
  value = var.create_repo ? "${google_artifact_registry_repository.docker_repo[0].location}-docker.pkg.dev/${google_artifact_registry_repository.docker_repo[0].project}/${google_artifact_registry_repository.docker_repo[0].repository_id}" : ""
}


output "gke_cluster_name" {
  description = "The name of the GKE cluster"
  value       = google_container_cluster.gke_cluster.name
}

output "gke_endpoint" {
  description = "The endpoint of the GKE cluster"
  value       = google_container_cluster.gke_cluster.endpoint
}
