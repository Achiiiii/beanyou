# Ensage Helm Setup

## preparation
1. install [LENS App](https://k8slens.dev/) - monitor the AWS status
2. install [VPN](https://www.draytek.com/products/smart-vpn-client/) - need authentication

## CI/CD plan
1. merge PR to develop -> build docker image (auto-generating tag) -> update dev service
2. merge to main -> build docker image (auto-generating tag) -> update staging service
3. tag version bu Git -> build docker image (use git tag) -> update prod service

## Steps
1. install [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)
```bash
$ aws configure
## the key / secret / region can be checked on AWS console
```

2. clone the helm repo
```bash
$ git clone git@github.com:ensage-tour/helm.git ensage-helm
$ cd ensage-helm
```

3. install Helm
```bash
$ brew install helm
$ helm version
```

4. install [kubectl](https://kubernetes.io/docs/tasks/tools/#kubectl)
```bash
## after following the official doc to install kubectl
## setup config
$ aws eks update-kubeconfig --region ap-northeast-1 --name ensage
## get k8s context
$ kubectl config get-contexts
```

5. update the image version of ECR
 - find the image version
 - update the file in values.yaml (https://github.com/ensage-tour/helm/blob/master/values.yaml)
``` yaml
frontend_image: 265876020689.dkr.ecr.ap-northeast-1.amazonaws.com/ensage-tour-frontend:{FE-IMAGE-VERSION}
backend_image: 265876020689.dkr.ecr.ap-northeast-1.amazonaws.com/ensage-tour-backend:{BE-IMAGE-VERSION}
```

6. run the update helm script
```bash
[helm-ensage] helm upgrade ensage-dev .
```

7. check the AWS pods / deplyment status on LENS App
8. pull request to update the latest image in repo

## Release & Update
Repeat the step 5 - step 8

P.S.
By now, we have to modify the data to below as we want to deploy to dev.
change to this:
```
frontend_host: ensage-dev-www.ensage.tours
namespace: ensage-dev
```
