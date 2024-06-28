import { type SmartAccountClient } from "permissionless";
import { ENVS } from "./helpers";
import { Chain, Transport } from "viem";
import { EntryPoint } from "permissionless/types";
import { SmartAccount } from "permissionless/accounts";

const nftAbi = [
  {
    inputs: [],
    name: "mint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const mintNFT = async (
  smartAccountClient: SmartAccountClient<
    EntryPoint,
    Transport,
    Chain,
    SmartAccount<EntryPoint>
  >
) => {
  const txHash = await smartAccountClient.writeContract({
    address: ENVS.NFT_CONTRACT,
    abi: nftAbi,
    functionName: "mint",
    account: smartAccountClient.account,
  });

  return txHash;
};

export { mintNFT };
