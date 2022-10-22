# Edissa

## Description

Reservation management platform built with [Nest](https://github.com/nestjs/nest).

Built as hobby project to gain hands-on experience with:
  - nest
  - typeorm
  - google cloud spanner 
  - postgresql
  - grpc
  - terraform
  - microservices
  - dev containers

## Requirements

### Node version and package manager

 - node
 - yarn
  
### Google cloud cli

See [google cloud cli installation instructions](https://cloud.google.com/sdk/docs/install#deb)

### Spanner emulator

For local development you need to have the **google cloud spanner emulator** additional component installed and configured.

#### Install spanner emulator

```sh
  sudo apt-get install google-cloud-cli-spanner-emulator  
```

#### Create a gcloud configuration for the spanner emulator

```sh
  gcloud config configurations create emulator
  gcloud config set auth/disable_credentials true
  gcloud config set project YOUR_PROJECT_ID
  gcloud config set api_endpoint_overrides/spanner http://localhost:9020/
```

## Running the app

**Note: make sure to configure and start the spanner emulator**

```
gcloud config configuration activate emulator
gcloud emulators spanner start
```

Create a spanner instance with database in the emulator
```sh
gcloud spanner instances create edissa-instance \
   --config=emulator-config --description="Test Instance" --nodes=1
gcloud spanner databases create edissa-db --instance edissa-instance
```

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ NODE_ENV=production yarn start:prod
```

## Test

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```

## Instructions to create resources with terraform

### Requirements

- A fork (recommended) or clone of this repo
- Install the following tools:
  - [terraform](https://learn.hashicorp.com/tutorials/terraform/install-cli#install-terraform)
  - [gcloud sdk](https://cloud.google.com/sdk/docs/install#installation_instructions)
  - [firebase CLI](https://firebase.google.com/docs/cli#install_the_firebase_cli)  
    Needed to deploy firestore security rules

### Create new GCP project

- create a new GCP project
- add a billing account

### Authenticate and set up GCP project

```sh
gcloud auth login
gcloud auth application-default login
gcloud config set project YOUR-GCP_PROJECT
```
### Create a service account that will be used to create all required resources

The service account that will be used is: `terraform@PROJECT_ID.iam.gserviceaccount.com`,

```sh
gcloud iam service-accounts create terraform
```

You must create this service account manually and give it the following permissions:
| Role name | Role           |
| ----------| -----          |
| Project IAM Admin | roles/resourcemanager.projectIamAdmin |
| Service Usage Admin | roles/serviceusage.serviceUsageAdmin |

```sh
gcloud projects add-iam-policy-binding YOUR_GCP_PROJECT \
    --member="serviceAccount:terraform@YOUR_GCP_PROJECT.iam.gserviceaccount.com" \
    --role="roles/resourcemanager.projectIamAdmin"

gcloud projects add-iam-policy-binding YOUR_GCP_PROJECT \
    --member="serviceAccount:terraform@YOUR_GCP_PROJECT.iam.gserviceaccount.com" \
    --role="roles/serviceusage.serviceUsageAdmin"
```

### Make sure you have the Service Account Token Creator role

The user, group or service account which will invoke the terraform commands will need the Service Account Token Creator role. Either on project level or on service account level.

```sh
# Allow users in the dev ops group to create access token for the terraform service account
gcloud iam service-accounts add-iam-policy-binding \
  terraform@[GCP-PROJECT].iam.gserviceaccount.com \
  --member='group:dev-ops@example.com' \
  --role='roles/iam.serviceAccountTokenCreator'

# Or allow a single user (even if that user is already owner) to create access token for the service account
gcloud iam service-accounts add-iam-policy-binding \
  terraform@[GCP-PROJECT].iam.gserviceaccount.com \
  --member='user:your-email@example.com' \
  --role='roles/iam.serviceAccountTokenCreator'

```

### Create a bucket to store terraform state

```sh
# example: gsutil mb -c standard -l europe-west1 gs://edissa-terraform-state
gsutil mb -c <storage-class> -l <region> gs://<bucket-name>

# example: gsutil versioning set on gs://edissa-terraform-state
gsutil versioning set on gs://<bucket-name>
```

### Create terraform backend config file

in `./terraform` add a file `config.gcs.tfbackend` with content:

```
bucket = "edissa-terraform-state"
```

### Add a terraform variable file `terraform.tfvars` in the `./terraform` sub folder.

```sh
# Your gcp project
project = "edissa"

region = "europe-west1"
zone = "europe-west1-c"
location = "europe-west"
```
### Let terraform create the required resources

```sh
cd terraform

# initialize terraform by running...
terraform init -backend-config=bucket=TERRAFORM_STATE_BUCKET 

# ...or use the config.gcs.tfbackend file
terraform init -backend-config=config.gcs.tfbackend

terraform plan

terraform apply
```