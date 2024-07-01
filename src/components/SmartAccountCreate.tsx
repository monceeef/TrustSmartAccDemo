import React from "react";
import { useAccount, useWalletClient } from "wagmi";
import { createSmartAcc } from "../utils/helpers";

interface SmartAccountCreateProps {
  smartAccount: any;
  setSmartAccount: (smartAccount: any) => void;
}

const SmartAccountCreate: React.FC<SmartAccountCreateProps> = ({
  smartAccount,
  setSmartAccount,
}) => {
  const { data: walletClient } = useWalletClient();
  const account = useAccount();

  const handleCreateSmartAccount = async () => {
    if (walletClient) {
      const smartAcc = await createSmartAcc(walletClient);
      setSmartAccount(smartAcc);
    }
  };

  if (!account.isConnected) return null;

  return (
    <div className="flex justify-center space-x-4">
      <div className="flex flex-col space-y-4">
        <div className="flex justify-center">
          {!smartAccount && (
            <button
              type="button"
              onClick={handleCreateSmartAccount}
              className="inline-block rounded-full bg-primary px-5 py-3 text-center font-bold text-white transition hover:border-black hover:bg-white hover:text-black"
            >
              Create Smart Account
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SmartAccountCreate;
