import { provider, contract } from "../wallet";
import { ethers } from "ethers";

export const addDetail = async (order, place, timeStamp) => {
  const signer = provider.getSigner();
  const contractWithSigner = contract.connect(signer);
  const transaction = await contractWithSigner.logDetail(
    timeStamp,
    place,
    order
  );
  await transaction.wait();
};

export const getLogs = async (order) => {
  let len = await contract.logCount(order);
  len = len.toNumber();
  const allLogs = [];
  for (let i = 0; i < len; i++) {
    let log = await contract.logs(order, i + 1);
    allLogs.push({ place: log.place, timeStamp: log.timeStamp.toNumber() });
  }

  return allLogs;
};
