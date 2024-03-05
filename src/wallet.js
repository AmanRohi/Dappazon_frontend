import { ethers } from "ethers";
import dappazon from "./Dappazon.json"; // Replace with your contract's ABI
const ABI = dappazon.abi;
const contractAddress = "0xf8dd102C5dE75E9cfe998f7Ca27ae5a0476F4880"; // Replace with your contract's address
export const provider = new ethers.providers.Web3Provider(window.ethereum);

export const contract = new ethers.Contract(contractAddress, ABI, provider);
