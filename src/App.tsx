import { useEffect, useState } from "react";
import { useAccount, useConnect } from "wagmi";
import { Hash } from "viem";
import Card from "./components/Card";
import SignerConnect from "./components/SignerConnect";
import SmartAccountCreate from "./components/SmartAccountCreate";
import NFTMint from "./components/NFTMint";
import Logo from "./assets/logo.svg";

const App: React.FC = () => {
  const { connectors, connect } = useConnect();
  const { address } = useAccount();
  const [smartAccount, setSmartAccount] = useState<any>();
  const [step, setStep] = useState<number>(0);
  const [mintTx, setMintTx] = useState<Hash | undefined>();

  useEffect(() => {
    setStep(smartAccount ? 2 : address ? 1 : 0);
  }, [address, smartAccount]);

  useEffect(() => {
    if (mintTx) {
      setStep(3);
    }
  }, [mintTx]);

  return (
    <div className="p-12">
      <div className="max-w-md mx-auto items-center flex">
        <a href="#" className="mx-auto">
          <img src={Logo} alt="Trust Wallet" className="inline-block w-48" />
        </a>
      </div>
      <div className="mt-8 space-y-4 shadow-lg rounded-lg overflow-hidden max-w-md mx-auto bg-white">
        <div className="p-8 flex flex-col justify-center items-center">
          <h1 className="mt-4 text-2xl font-semibold text-center">
            Trust Smart Account Demo
          </h1>
          <p className="mt-2 text-gray-600 text-center">
            Follow these steps to mint a free gasless NFT leveraging the power
            of Trust Smart Accounts
          </p>
        </div>
        <Card
          step={step}
          index={1}
          title="Connect your wallet"
          description={address ? `Signer ${address} is connected!` : ""}
        />
        {step === 0 && (
          <SignerConnect connectors={connectors} connect={connect} />
        )}
        <Card
          step={step}
          index={2}
          title="Create or retrieve your Smart account"
          description={
            smartAccount
              ? `Your Trust Smart Account ${smartAccount.account.address} is Ready!`
              : ""
          }
        />
        {step === 1 && (
          <SmartAccountCreate
            smartAccount={smartAccount}
            setSmartAccount={setSmartAccount}
          />
        )}
        <Card
          step={step}
          index={3}
          title="Mint NFT"
          description="NFT is Gasless"
        />
        {step === 2 && (
          <NFTMint smartAccount={smartAccount} setMintTx={setMintTx} />
        )}

        {mintTx && (
          <div className="p-8 text-center">
            <a
              href={`https://sepolia.etherscan.io/tx/${mintTx}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline text-center"
            >
              Your NFT was successfully Minted without any gas fees. Follow the
              Tx here.
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
