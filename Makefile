.PHONY: pre-commit
pre-commit:
	poetry run pre-commit run --all-files --show-diff-on-failure --color always


.PHONY: build
build:
	skaffold build --default-repo=us-docker.pkg.dev/nessight-refactor

.PHONY: deploy-k8s
deploy-k8s:
	- cd app && npm install && npm run build
	- skaffold run --force=true --default-repo=us-docker.pkg.dev/nessight-refactor -n nessight-prod
	
