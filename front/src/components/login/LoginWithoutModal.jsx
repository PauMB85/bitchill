import { useContext, useEffect, useState } from 'react';
import { Web3AuthNoModal } from '@web3auth/no-modal';
import { EthereumPrivateKeyProvider } from '@web3auth/ethereum-provider';
import { CHAIN_NAMESPACES, WALLET_ADAPTERS } from '@web3auth/base';
import { OpenloginAdapter } from '@web3auth/openlogin-adapter';
import { MetamaskAdapter } from '@web3auth/metamask-adapter';
import { Web3Context } from '../../context/Web3Context';

import Web3 from 'web3';

const clientId = import.meta.env.VITE_CLIENT_ID;
function LoginWithoutModal() {
	const { provider, setProvider, web3auth, setWeb3auth } =
		useContext(Web3Context);
	const [loggedIn, setLoggedIn] = useState(false);

	useEffect(() => {
		const init = async () => {
			try {
				const chainConfig = {
					chainId: '0x1F',
					rpcTarget: 'https://public-node.testnet.rsk.co',
					chainNamespace: CHAIN_NAMESPACES.EIP155,
					displayName: 'RSK Testnet',
					ticker: 'tRBTC',
					tickerName: 'RSK Testnet',
					blockExplorer: 'https://explorer.testnet.rsk.co',
				};
				const web3auth = new Web3AuthNoModal({
					clientId,
					chainConfig,
					web3AuthNetwork: 'sapphire_devnet',
				});

				const privateKeyProvider = new EthereumPrivateKeyProvider({
					config: { chainConfig },
				});

				const openloginAdapter = new OpenloginAdapter({
					adapterSettings: {
						whiteLabel: {
							appName: 'Fuck Degens',
							appUrl: 'https://fuck-degens.io',
							defaultLanguage: 'en', // en, de, ja, ko, zh, es, fr, pt, nl
							mode: 'auto', // whether to enable dark mode. defaultValue: false
							theme: {
								primary: '#768729',
							},
							useLogoLoader: true,
						},
					},
					privateKeyProvider,
				});
				web3auth.configureAdapter(openloginAdapter);
				setWeb3auth(web3auth);

				/**
				 * METAMASK
				 */
				const metamaskAdapter = new MetamaskAdapter({
					clientId,
					web3AuthNetwork: 'sapphire_devnet',
					chainConfig,
				});
				web3auth.configureAdapter(metamaskAdapter);

				await web3auth.init();
				setProvider(web3auth.provider);
				if (web3auth.connected) {
					setLoggedIn(true);
				}
			} catch (error) {
				console.error(error);
			}
		};

		init();
	}, []);

	const login = async () => {
		if (!web3auth) {
			uiConsole('web3auth not initialized yet');
			return;
		}
		const web3authProvider = await web3auth.connectTo(
			WALLET_ADAPTERS.OPENLOGIN,
			{
				loginProvider: 'google',
			}
		);
		if (web3auth.connected) {
			setLoggedIn(true);
		}
		setProvider(web3authProvider);
	};

	const loginWithSMS = async () => {
		if (!web3auth) {
			uiConsole('web3auth not initialized yet');
			return;
		}
		const web3authProvider = await web3auth.connectTo(
			WALLET_ADAPTERS.OPENLOGIN,
			{
				loginProvider: 'sms_passwordless',
				extraLoginOptions: {
					login_hint: '+34-687925363',
				},
			}
		);
		if (web3auth.connected) {
			setLoggedIn(true);
		}
		setProvider(web3authProvider);
	};

	const loginWithEmail = async () => {
		if (!web3auth) {
			uiConsole('web3auth not initialized yet');
			return;
		}
		const web3authProvider = await web3auth.connectTo(
			WALLET_ADAPTERS.OPENLOGIN,
			{
				loginProvider: 'email_passwordless',
				extraLoginOptions: {
					login_hint: 'paumb85@gmail.com',
				},
			}
		);
		if (web3auth.connected) {
			setLoggedIn(true);
		}
		setProvider(web3authProvider);
	};

	const loginWallet = async () => {
		const web3authProvider = await web3auth.connectTo(WALLET_ADAPTERS.METAMASK);
		setProvider(web3authProvider);
		if (web3auth.connected) {
			setLoggedIn(true);
		}
	};

	const authenticateUser = async () => {
		if (!web3auth) {
			uiConsole('web3auth not initialized yet');
			return;
		}
		const idToken = await web3auth.authenticateUser();
		uiConsole(idToken);
	};

	const getUserInfo = async () => {
		if (!web3auth) {
			uiConsole('web3auth not initialized yet');
			return;
		}
		const user = await web3auth.getUserInfo();
		uiConsole(user);
	};

	const logout = async () => {
		if (!web3auth) {
			uiConsole('web3auth not initialized yet');
			return;
		}
		await web3auth.logout();
		setProvider(null);
		setLoggedIn(false);
	};

	const getAccounts = async () => {
		if (!provider) {
			uiConsole('provider not initialized yet');
			return;
		}
		const web3 = new Web3(provider);

		// Get user's Ethereum public address
		const address = await web3.eth.getAccounts();
		uiConsole(address);
	};

	const getBalance = async () => {
		if (!provider) {
			uiConsole('provider not initialized yet');
			return;
		}
		const web3 = new Web3(provider);

		// Get user's Ethereum public address
		const address = (await web3.eth.getAccounts())[0];

		// Get user's balance in ether
		const balance = web3.utils.fromWei(
			await web3.eth.getBalance(address), // Balance is in wei
			'ether'
		);
		uiConsole(balance);
	};

	function uiConsole(...args) {
		const el = document.querySelector('#console>p');
		if (el) {
			el.innerHTML = JSON.stringify(args || {}, null, 2);
		}
	}

	const loggedInView = (
		<>
			<div className='flex-container'>
				<div>
					<button onClick={getUserInfo} className='card'>
						Get User Info
					</button>
				</div>
				<div>
					<button onClick={authenticateUser} className='card'>
						Get ID Token
					</button>
				</div>
				<div>
					<button onClick={getAccounts} className='card'>
						Get Accounts
					</button>
				</div>
				<div>
					<button onClick={getBalance} className='card'>
						Get Balance
					</button>
				</div>
				<div>
					<button onClick={logout} className='card'>
						Log Out
					</button>
				</div>
			</div>
			<div id='console' style={{ whiteSpace: 'pre-line' }}>
				<p style={{ whiteSpace: 'pre-line' }}>Logged in Successfully!</p>
			</div>
		</>
	);

	const unloggedInView = (
		<>
			<button onClick={login} className='card'>
				Google
			</button>
			<button onClick={loginWithSMS} className='card'>
				SMS Login (e.g +cc-number)
			</button>
			<button onClick={loginWithEmail} className='card'>
				Email Login (e.g pau)
			</button>
			<button onClick={loginWallet} className='card'>
				Connect with your wallet
			</button>
		</>
	);

	return (
		<div className='container'>
			<h1 className='title'>ReactJS RSK</h1>
			<div className='grid'>{loggedIn ? loggedInView : unloggedInView}</div>
		</div>
	);
}

export default LoginWithoutModal;
