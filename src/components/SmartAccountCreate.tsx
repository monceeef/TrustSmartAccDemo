import { useEffect, useState } from "react";

import { useAccount, useWalletClient } from "wagmi";
import { mintNFT } from "../utils/mintNFT";
import { createSmartAcc, publicClient } from "../utils/helpers";
import { Hash } from "viem";

export default function SmartAccountCreate() {
  const [smartAccount, setSmartAccount] = useState<any>();
  const { data: walletClient } = useWalletClient();
  const [mintTx, setMintTx] = useState<Hash>();
  const [minting, setMinting] = useState(false);
  // const [receipt, setReceipt] = useState<TransactionReceipt>();
  const account = useAccount();

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

  useEffect(() => {
    (async () => {
      if (mintTx) {
        const receipt = await publicClient.waitForTransactionReceipt({
          hash: mintTx,
        });
        console.log(receipt);
        // setReceipt(receipt);
      }
    })();
  }, [mintTx]);

  if (!account.isConnected) return <></>;

  return (
    <div className="flex justify-center space-x-4">
      <div className="flex flex-col space-y-4">
        {smartAccount && (
          <p>
            Your Trust Smart Account {smartAccount.account.address} is Ready!
          </p>
        )}
        <div className="flex justify-center">
          {mintTx ? (
            <a
              href={`https://sepolia.etherscan.io/tx/${mintTx}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Your NFT was successfully Minted without any gas fees. Follow the
              Tx here.
            </a>
          ) : minting ? (
            <button
              type="button"
              className="inline-block rounded-full bg-primary px-5 py-3 text-center font-bold text-white transition hover:border-black hover:bg-white hover:text-black"
            >
              Minting...
            </button>
          ) : !smartAccount ? (
            <button
              type="button"
              onClick={async () => {
                const smartAcc = await createSmartAcc(walletClient);
                setSmartAccount(smartAcc);
              }}
              className="inline-block rounded-full bg-primary px-5 py-3 text-center font-bold text-white transition hover:border-black hover:bg-white hover:text-black"
            >
              Create Smart Account
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
      </div>
    </div>
  );
}
