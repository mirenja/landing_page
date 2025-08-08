# Enable the GKE API
resource "google_project_service" "gke_api" {
  project = var.project_id
  service = "container.googleapis.com"
  disable_on_destroy = false
}

# Create VPC network
resource "google_compute_network" "gke_network" {
  name                    = "gke-network"
  auto_create_subnetworks = false
}

# Create subnetwork
resource "google_compute_subnetwork" "gke_subnet" {
  name          = "gke-subnet"
  region        = var.region
  ip_cidr_range = "10.0.0.0/16"
  network       = google_compute_network.gke_network.id

  # Required for VPC-native GKE
  secondary_ip_range {
    range_name    = "pods"
    ip_cidr_range = "10.1.0.0/16"
  }

  secondary_ip_range {
    range_name    = "services"
    ip_cidr_range = "10.2.0.0/20"
  }
}

# GKE Autopilot Cluster
resource "google_container_cluster" "gke_cluster" {
  name     = "${var.cluster_prefix}-${var.env}-autopilot-cluster"
  location = var.region

  enable_autopilot     = true
  deletion_protection  = false

  network    = google_compute_network.gke_network.id
  subnetwork = google_compute_subnetwork.gke_subnet.id

  ip_allocation_policy {
    cluster_secondary_range_name  = "pods"
    services_secondary_range_name = "services"
  }

  depends_on = [
    google_project_service.gke_api,
    google_compute_subnetwork.gke_subnet
  ]
}