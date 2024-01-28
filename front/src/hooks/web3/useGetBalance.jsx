import { useEffect, useContext, useState } from 'react';
import { Web3Context } from '../../context/Web3Context';
import Web3 from 'web3';

export default function useGetBalance(account) {
	const { provider } = useContext(Web3Context);
	const [balance, setBalance] = useState(0);
	useEffect(() => {
		const getBalance = async () => {
			if (provider) {
				const web3 = new Web3(provider);
				const balancEther = web3.utils.fromWei(
					await web3.eth.getBalance(account), // Balance is in wei
					'ether'
				);
				setBalance(balancEther);
			}
		};

		getBalance();
	}, [account]);
	return { balance };
}
