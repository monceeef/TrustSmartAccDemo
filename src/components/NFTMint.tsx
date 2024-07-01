import React, { useState } from "react";
import { Hash } from "viem";
import { mintNFT } from "../utils/mintNFT";

interface NFTMintProps {
  smartAccount: any;
  setMintTx: (txHash: Hash) => void;
}

const NFTMint: React.FC<NFTMintProps> = ({ smartAccount, setMintTx }) => {
  const [minting, setMinting] = useState(false);

  const handleMintNFT = async () => {
    setMinting(true);
    try {
      const txHash = await mintNFT(smartAccount);
      setMintTx(txHash);
    } catch (error) {
      console.error("Minting error:", error);
    } finally {
      setMinting(false);
    }
  };

  return (
    <div className="flex justify-center space-x-4 pb-4">
      {minting ? (
        <button
          type="button"
          className="inline-block rounded-full bg-primary px-5 py-3 text-center font-bold text-white transition hover:border-black hover:bg-white hover:text-black"
          disabled
        >
          Minting...
        </button>
      ) : (
        <button
          type="button"
          onClick={handleMintNFT}
          className="inline-block rounded-full bg-primary px-5 py-3 text-center font-bold text-white transition hover:border-black hover:bg-white hover:text-black"
        >
          Mint Free NFT
        </button>
      )}
    </div>
  );
};

export default NFTMint;
