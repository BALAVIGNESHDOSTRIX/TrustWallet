import Head from 'next/head'
import Image from 'next/image'
import {useState} from 'react';
import {ethers} from 'ethers';

import TrustWalletABI from '../contracts/artifacts/contracts/TrustWallet.sol/TrustWallet.json';

export default function Home() {
  const contractAddress = '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512';

  const [deposit, setDeposit] = useState(1);
  const [withdrawA, setwithdrawA] = useState(1);
  const [balance, setBalance] = useState(0);

  async function requestAccount(){
    await window.ethereum.request({
      method: 'eth_requestAccounts'
    });
  }

  async function Balance(){
    if(typeof window.ethereum !== 'undefined'){
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(contractAddress, TrustWalletABI.abi, provider);
      const signer = provider.getSigner();
      try{
        const data = await contract.ShowAccountBalance(signer.getAddress());
        setBalance(data.toNumber());
        console.log(data.toNumber());
      }catch(error){
        console.log(error);
      }
    }
  }

  async function Withdraw(){
    if(typeof window.ethereum !== 'undefined'){
      await requestAccount();

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      const contract = new ethers.Contract(contractAddress, TrustWalletABI.abi, signer);
      const transaction = await contract.WithdrawAmount(withdrawA);
      setwithdrawA(1);
      await transaction.wait();
      Balance();
    }
  }

  async function DepositMoney(){
    if(typeof window.ethereum !== 'undefined'){
      await requestAccount();

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      const contract = new ethers.Contract(contractAddress, TrustWalletABI.abi, signer);
      const transaction = await contract.DepositAmount(deposit);
      setDeposit(1);
      await transaction.wait();
      Balance();
    }
  }

  return (
    <div>
      <Head>
        <title>TrustWallet</title>
      </Head>

      <section className='main__page'>
        <section className='deposit'>
          <input className='deposit__input' placeholder='1' onChange={
            (e) => setDeposit(e.target.value)
          } value={deposit}/>
          <button className='deposit__click' onClick={(e) => DepositMoney()}>Deposit</button>
        </section>

        <section className='withdraw'>
          <input className='withdraw__input' placeholder='100' onChange={(e) => setwithdrawA(e.target.value)} value={withdrawA}/>
          <button className='withdraw__click' onClick={(e) => Withdraw()}>Withdraw</button>
        </section>

        <section className='balance'>
          <span className='balance_amount'>{balance}</span>
          <button className='balance_click' onClick={(e) => Balance()}>Balance</button>
        </section>
      </section>
    </div>
  )
}
