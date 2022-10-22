
locals {
  target_service_account = "terraform@${var.project}.iam.gserviceaccount.com"
  services = [
    "ciccd-service",
    "forward-service",
  ]
}

#-----------------------------------------------#

# expose the current project config (https://stackoverflow.com/questions/63824928/how-can-we-add-project-number-from-variable-in-terraform-gcp-resource-iam-bindin)
data "google_project" "current-project" {}


#-----------------------------------------------#

# Enable required apis
resource "google_project_service" "services" {
  count              = length(var.gcp_service_list)
  project            = var.project
  service            = element(var.gcp_service_list, count.index)
  disable_on_destroy = false
}