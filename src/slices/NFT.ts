import { ethers } from "ethers";
import { addresses } from "../constants";
import { abi as ierc20Abi } from "../abi/IERC20.json";
import { abi as nftTokenAbi } from "../abi/NFTToken.json";
import { abi as stakingAbi } from "../abi/Staking.json";
import { abi as FairLaunch } from "../abi/FairLaunch.json";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAccountSuccess, getBalances } from "./AccountSlice";
import { clearPendingTxn, fetchPendingTxns } from "./PendingTxnsSlice";
import { error } from "../slices/MessagesSlice";
import { INFTMintAsyncThunk, IPurchaseCSTAsyncThunk, IBaseAddressAsyncThunk, IJsonRPCError } from "./interfaces";
import { loadAccountDetails } from "./AccountSlice";


export const approve = createAsyncThunk(
  "nft/approve",
  async ({ amount, provider, address, networkID }: INFTMintAsyncThunk, { dispatch }) => {
    if (!provider) {
      dispatch(error("Please connect your wallet!"));
      return;
    }

    const signer = provider.getSigner();
    const nftTokenContract = new ethers.Contract(addresses[networkID].NFT_TOKEN_ADDRESS as string, nftTokenAbi, signer);
    let approveTx;

    try {
      approveTx = await nftTokenContract.approbe(ethers.utils.parseUnits("100", "wei"), { value: ethers.utils.parseEther("0.15") });
      const text = "nft mint";
      const pendingTxnType = "nft_approbe";
      dispatch(fetchPendingTxns({ txnHash: approveTx.hash, text: pendingTxnType, type: pendingTxnType }));

      await approveTx.wait();
      dispatch(loadAccountDetails({ networkID, address, provider }));
    } catch (e: unknown) {
      const errMsg = (e as IJsonRPCError).message;
      console.log(errMsg);
      dispatch(error("errMsg"));
      return;
    } finally {
      if (approveTx) {
        dispatch(clearPendingTxn(approveTx.hash));
      }
    }

  },
);


export const mintNFTWithBNB = createAsyncThunk(
  "nft/mint",
  async ({ amount, provider, address, networkID }: INFTMintAsyncThunk, { dispatch }) => {
    if (!provider) {
      dispatch(error("Please connect your wallet!"));
      return;
    }

    const signer = provider.getSigner();
    const nftTokenContract = new ethers.Contract(addresses[networkID].NFT_TOKEN_ADDRESS as string, nftTokenAbi, signer);
    let approveTx;

    try {
      approveTx = await nftTokenContract.mintNFT(ethers.utils.parseUnits("100", "wei"), { value: ethers.utils.parseEther("0.15") });
      const text = "nft mint";
      const pendingTxnType = "nft_mint";
      dispatch(fetchPendingTxns({ txnHash: approveTx.hash, text: pendingTxnType, type: pendingTxnType }));

      await approveTx.wait();
      dispatch(loadAccountDetails({ networkID, address, provider }));
    } catch (e: unknown) {
      const errMsg = (e as IJsonRPCError).message;
      console.log(errMsg);
      dispatch(error("errMsg"));
      return;
    } finally {
      if (approveTx) {
        dispatch(clearPendingTxn(approveTx.hash));
      }
    }

  },
);


export const stake = createAsyncThunk(
  "nft/stake",
  async ({ amount, provider, address, networkID }: INFTMintAsyncThunk, { dispatch }) => {
    if (!provider) {
      dispatch(error("Please connect your wallet!"));
      return;
    }

    const signer = provider.getSigner();
    const stakingContract = new ethers.Contract(addresses[networkID].STAKING_ADDRESS as string, stakingAbi, signer);
    let approveTx;

    try {
      approveTx = await stakingContract.mintNFT(ethers.utils.parseUnits("100", "wei"), { value: ethers.utils.parseEther("0.15") });
      const text = "nft mint";
      const pendingTxnType = "nft_mint";
      dispatch(fetchPendingTxns({ txnHash: approveTx.hash, text: pendingTxnType, type: pendingTxnType }));

      await approveTx.wait();
      dispatch(loadAccountDetails({ networkID, address, provider }));
    } catch (e: unknown) {
      const errMsg = (e as IJsonRPCError).message;
      console.log(errMsg);
      dispatch(error("errMsg"));
      return;
    } finally {
      if (approveTx) {
        dispatch(clearPendingTxn(approveTx.hash));
      }
    }

  },
);
