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
  value = "${google_artifact_registry_repository.docker_repo.location}-docker.pkg.dev/${google_artifact_registry_repository.docker_repo.project}/${google_artifact_registry_repository.docker_repo.repository_id}"
}