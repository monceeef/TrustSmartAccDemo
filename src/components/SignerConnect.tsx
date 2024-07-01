import React from "react";
import { Connector } from "wagmi";

interface SignerConnectProps {
  connectors: readonly Connector[];
  connect: (params: { connector: Connector }) => void;
}

const SignerConnect: React.FC<SignerConnectProps> = ({
  connectors,
  connect,
}) => {
  return (
    <div className="space-y-4 mt-4 flex justify-center items-center flex-col">
      {connectors.map((connector, key) => (
        <div
          key={key}
          className="p-4 w-96 space-x-4 flex flex-row bg-white rounded-xl border-[1px] cursor-pointer text-black items-center justify-center"
          onClick={() => connect({ connector })}
        >
          <img src={connector.icon} className="w-8 h-8" />
          <button key={connector.uid} type="button">
            {connector.name}
          </button>
        </div>
      ))}
    </div>
  );
};

export default SignerConnect;
