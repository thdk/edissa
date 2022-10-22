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
