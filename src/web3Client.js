import Web3 from "web3";
import { ethers } from "ethers";
import { Contract } from "ethers";
import { abi } from "./artifacts/contracts/lottery.sol/lottery.json";
export const initWeb3 = () => {
  return new Promise(async (resolve, reject) => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      if (typeof provider !== "undefined") {
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const accounts = await signer.getAddress();
        console.log(accounts);
        const contract = new Contract(
          process.env.REACT_APP_CONTRACT_ADDRESS,
          abi,
          signer
        );
        resolve({ contract, provider });
      }
    } else {
      reject("Please install Metamask chrome plugin while accessing the app");
    }
  });
};

export const connectWallet = async () => {
  if (window.ethereum) {
    const accounts = await window.ethereum.request({ method: "eth_accounts" });
    const chainId = await window.ethereum.request({ method: "eth_chainId" });
  } else {
    alert("Please install Metamask");
  }
};

export const isMetamaskAvailable = () => {
  if (window.ethereum) {
    return true;
  }
  return false;
};

export const isAlreadyConnected = async () => {
  if (window.ethereum) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const accounts = await provider.listAccounts();
    console.log(await (await provider.getBalance(accounts[0])).toString());
    return accounts.length > 0;
  }
};

export const isWalletConnected = async () => {
  return new Promise(async (resolve, reject) => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      if (typeof provider !== "undefined") {
        const signer = provider.getSigner();
        let connectStatus;
        try {
          const accounts = await signer.getAddress();
          if (accounts.length > 0) {
            connectStatus = true;
          }
        } catch (e) {
          connectStatus = false;
        }

        resolve(connectStatus);
      }
    } else {
      reject("Please install Metamask chrome plugin while accessing the app");
    }
  });
};
