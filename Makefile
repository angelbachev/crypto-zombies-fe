##@ Crypto Zombies FE

help:  ## Display help
	@awk 'BEGIN {FS = ":.*##"; printf "\nUsage:\n  make \033[36m\033[0m\n"} /^[a-zA-Z_-]+:.*?##/ { printf "  \033[36m%-30s\033[0m %s\n", $$1, $$2 } /^##@/ { printf "\n\033[1m%s\033[0m\n", substr($$0, 5) } ' $(MAKEFILE_LIST)

dev: ## Run dev server
	npm run dev

type-zombie-contract: ## Generate type for CryptoZombie contract
	node generate-contract-type.ts "./src/web3/contracts/ZombieOwnership.json" "./src/web3/contracts/types/ZombieOwnership.ts"

type-kitties-contract: ## Generate type for CryptoKitties contract
	node generate-contract-type.ts "./src/web3/contracts/KittyFactory.json" "./src/web3/contracts/types/KittyFactory.ts"