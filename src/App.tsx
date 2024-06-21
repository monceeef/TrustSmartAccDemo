import Header from "./components/Header";
import SignerConnect from "./components/SignerConnect";
import SmartAccountCreate from "./components/SmartAccountCreate";

function App() {
  return (
    <>
      <div>
        <Header />
        <div className="p-12">
          <SmartAccountCreate />
          <SignerConnect />
        </div>
      </div>
    </>
  );
}

export default App;
