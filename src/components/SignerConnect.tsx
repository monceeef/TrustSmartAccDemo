import { useAccount, useConnect } from "wagmi";

export default function SignerConnect() {
  const { connectors, connect } = useConnect();
  const account = useAccount();

  return (
    <div className="space-y-4 mt-4">
      {connectors.map((connector, key) => (
        <div
          key={key}
          className="p-4 space-x-4 flex flex-row bg-white rounded-xl border-[1px] cursor-pointer text-black"
          onClick={() => connect({ connector })}
        >
          <img src={connector.icon} className="w-8 h-8" />
          <button key={connector.uid} type="button">
            {connector.name}
          </button>
        </div>
      ))}
      {account.isConnected && (
        <div>You've connected signer {account.address} successfully</div>
      )}
    </div>
  );
}
