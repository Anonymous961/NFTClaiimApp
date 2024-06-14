import Image from "next/image";
import { ConnectButton, useWalletBalance } from "thirdweb/react";
import thirdwebIcon from "@public/thirdweb.svg";
import { client } from "./client";
import { sepolia } from "thirdweb/chains";
import { createWallet, inAppWallet, walletConnect } from "thirdweb/wallets";

const wallets = [
  createWallet("io.metamask"),
  createWallet("com.coinbase.wallet"),
  walletConnect(),
  inAppWallet({
    auth: {
      options: ["email", "google", "apple", "facebook", "phone"],
    },
  }),
];

export default async function Home() {
  const chain = sepolia;
  const contractAddress = "0x6982CDAb4f08d1ac0822dB081e3EB42552d60D38";

  return (
    <main className="p-4 pb-10 min-h-[100vh] flex items-center justify-center container max-w-screen-lg mx-auto">
      <div className="py-20">
        <Header />

        <div className="flex justify-center mb-20">
          <ConnectButton client={client} />
        </div>
      </div>
    </main>
  );
}

function Header() {
  return (
    <header className="flex flex-row items-center ">
      <Image
        src={thirdwebIcon}
        alt=""
        className="size-[150px] md:size-[150px]"
        style={{
          filter: "drop-shadow(0px 0px 24px #a726a9a8)",
        }}
      />

      <h1 className="text-2xl md:text-6xl font-semibold md:font-bold tracking-tighter mb-6 text-zinc-100">
        NFT Claim App
      </h1>
    </header>
  );
}
