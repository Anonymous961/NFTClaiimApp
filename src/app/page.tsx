"use client";
import Image from "next/image";
import {
  ConnectButton,
  MediaRenderer,
  useReadContract,
  useWalletBalance,
} from "thirdweb/react";
import thirdwebIcon from "@public/thirdweb.svg";
import { client } from "./client";
import { defineChain, sepolia } from "thirdweb/chains";
import { createWallet, inAppWallet, walletConnect } from "thirdweb/wallets";
import { getContract, toEther } from "thirdweb";
import { getContractMetadata } from "thirdweb/extensions/common";
import {
  getActiveClaimCondition,
  getTotalClaimedSupply,
  nextTokenIdToMint,
} from "thirdweb/extensions/erc721";

export default function Home() {
  const chain = defineChain(sepolia);
  console.log(chain);

  const contract = getContract({
    client,
    chain: chain,
    address: "0x6982CDAb4f08d1ac0822dB081e3EB42552d60D38",
  });

  const { data: contractMetadata, isLoading: isContractMetaDataLoading } =
    useReadContract(getContractMetadata, {
      contract: contract,
    });
  console.log(contractMetadata);

  const { data: claimedSupply } = useReadContract(getTotalClaimedSupply, {
    contract: contract,
  });

  const { data: tottalNFTSupply } = useReadContract(nextTokenIdToMint, {
    contract: contract,
  });

  const { data: claimCondition } = useReadContract(getActiveClaimCondition, {
    contract: contract,
  });

  const getPrice = (quantity: number) => {
    const total =
      quantity * parseInt(claimCondition?.pricePerToken.toString() || "0");
    return toEther(BigInt(total));
  };

  return (
    <main className="p-4 pb-10 min-h-[100vh] flex items-center justify-center container max-w-screen-lg mx-auto">
      <div className="py-20 text-center">
        <Header />
        <ConnectButton client={client} chain={chain} />
        <div className="flex flex-col items-center mt-4">
          {isContractMetaDataLoading ? (
            <p>Loading...</p>
          ) : (
            <>
              <MediaRenderer
                client={client}
                src={contractMetadata?.image}
                className="rounded-xl"
              />
            </>
          )}
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
