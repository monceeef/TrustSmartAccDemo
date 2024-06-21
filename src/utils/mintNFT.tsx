import { ENVS } from "./helpers";

const nftAbi = [
  {
    inputs: [],
    name: "mint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const mintNFT = async (smartAccountClient: any) => {
  const txHash = await smartAccountClient.writeContract({
    address: ENVS.NFT_CONTRACT,
    abi: nftAbi,
    functionName: "mint",
  });

  return txHash;
};

export { mintNFT };
