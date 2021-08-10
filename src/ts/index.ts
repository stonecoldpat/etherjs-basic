import { ETHEREUM_NETWORK, INFURA_PROJECT_ID, MNEMONIC } from "./config";
import { providers, Wallet, utils } from "ethers";

/**
 * Set up the provider and wallet
 */
export async function setup() {
  const infuraProvider = new providers.InfuraProvider(
    ETHEREUM_NETWORK,
    INFURA_PROJECT_ID
  );

  const wallet = Wallet.fromMnemonic(MNEMONIC).connect(infuraProvider);

  return { wallet, provider: infuraProvider };
}

/**
 * Wait function
 * @param ms Milli-seconds
 */
export async function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

(async () => {
  const { wallet, provider } = await setup();
  const balance = await provider.getBalance(wallet.address);
  console.log("Wallet ready: " + wallet.address);
  console.log("Balance: " + utils.formatEther(balance));
})().catch((e) => {
  console.log(e);
});
