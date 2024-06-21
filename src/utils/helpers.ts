import {
  ENTRYPOINT_ADDRESS_V06,
  createSmartAccountClient,
  walletClientToSmartAccountSigner,
} from "permissionless";
import { signerToTrustSmartAccount } from "permissionless/accounts";
import {
  createPimlicoBundlerClient,
  createPimlicoPaymasterClient,
} from "permissionless/clients/pimlico";
import { createPublicClient, http } from "viem";
import { sepolia } from "viem/chains";

export const ENVS = {
  PIMLICO_API_KEY: import.meta.env.VITE_PIMLICO_API_KEY,
  NFT_CONTRACT: import.meta.env.VITE_NFT_CONTRACT,
};

export const publicClient = createPublicClient({
  transport: http("https://rpc.ankr.com/eth_sepolia"),
});

export const paymasterClient = createPimlicoPaymasterClient({
  transport: http(
    `https://api.pimlico.io/v2/sepolia/rpc?apikey=${ENVS.PIMLICO_API_KEY}`
  ),
  entryPoint: ENTRYPOINT_ADDRESS_V06,
});

export const pimlicoBundlerClient = createPimlicoBundlerClient({
  transport: http(
    `https://api.pimlico.io/v2/sepolia/rpc?apikey=${ENVS.PIMLICO_API_KEY}`
  ),
  entryPoint: ENTRYPOINT_ADDRESS_V06,
});

export const createSmartAcc = async (walletClient: any) => {
  const smartAccountSigner = walletClientToSmartAccountSigner(walletClient);

  const trustAccount = await signerToTrustSmartAccount(publicClient, {
    entryPoint: ENTRYPOINT_ADDRESS_V06,
    signer: smartAccountSigner,
  });
  const smartAccountClient = createSmartAccountClient({
    account: trustAccount,
    entryPoint: ENTRYPOINT_ADDRESS_V06,
    chain: sepolia,
    bundlerTransport: http(
      `https://api.pimlico.io/v2/sepolia/rpc?apikey=${ENVS.PIMLICO_API_KEY}`
    ),
    middleware: {
      sponsorUserOperation: paymasterClient.sponsorUserOperation,
      gasPrice: async () =>
        (await pimlicoBundlerClient.getUserOperationGasPrice()).fast,
    },
  });
  return smartAccountClient;
};
