import {
	Button,
	Card,
	Divider,
	FormControl,
	InputAdornment,
	OutlinedInput,
	Stack,
	Typography,
} from '@mui/material';
import DCAToggleGroup from './DCAToggleGroup';
import { useContext, useState } from 'react';
import Web3 from 'web3';
import { Web3Context } from '../../context/Web3Context';
import useGetAccount from './../../hooks/web3/useGetAccount';

const listaCantidad = [
	{
		value: 50,
		label: '50 USD',
	},
	{
		value: 100,
		label: '100 USD',
	},
	{
		value: 200,
		label: '200 USD',
	},
];

const listaFrequencia = [
	{
		value: 4,
		label: 'Semanal',
	},
	{
		value: 2,
		label: 'Quincenal',
	},
	{
		value: 1,
		label: 'Mensual',
	},
];

const listaDuracion = [
	{
		value: 12,
		label: '1 Año',
	},
	{
		value: 24,
		label: '2 Años',
	},
	{
		value: 60,
		label: '5 Años',
	},
];

const nodeEndpoint = 'https://public-node.testnet.rsk.co';
const ABI = [
	{
		inputs: [],
		stateMutability: 'nonpayable',
		type: 'constructor',
	},
	{
		inputs: [],
		name: 'admin',
		outputs: [
			{
				internalType: 'address',
				name: '',
				type: 'address',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: '_tokenA',
				type: 'address',
			},
			{
				internalType: 'uint256',
				name: '_totalDeposit',
				type: 'uint256',
			},
			{
				internalType: 'uint256',
				name: '_swapAmount',
				type: 'uint256',
			},
			{
				internalType: 'uint256',
				name: '_interval',
				type: 'uint256',
			},
		],
		name: 'createPosition',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: '_user',
				type: 'address',
			},
			{
				internalType: 'address',
				name: '_poolAddress',
				type: 'address',
			},
		],
		name: 'executeSwap',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [],
		name: 'getAllUsersWithPositions',
		outputs: [
			{
				internalType: 'address[]',
				name: '',
				type: 'address[]',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'uint256',
				name: '_newSwapAmount',
				type: 'uint256',
			},
			{
				internalType: 'uint256',
				name: '_newInterval',
				type: 'uint256',
			},
		],
		name: 'modifyPosition',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: '',
				type: 'address',
			},
		],
		name: 'positions',
		outputs: [
			{
				internalType: 'contract IERC20',
				name: 'tokenA',
				type: 'address',
			},
			{
				internalType: 'uint256',
				name: 'amountA',
				type: 'uint256',
			},
			{
				internalType: 'uint256',
				name: 'swapAmount',
				type: 'uint256',
			},
			{
				internalType: 'uint256',
				name: 'amountB',
				type: 'uint256',
			},
			{
				internalType: 'uint256',
				name: 'interval',
				type: 'uint256',
			},
			{
				internalType: 'uint256',
				name: 'nextSwapTime',
				type: 'uint256',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [],
		name: 'terminatePosition',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256',
			},
		],
		name: 'usersWithPositions',
		outputs: [
			{
				internalType: 'address',
				name: '',
				type: 'address',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'uint256',
				name: '_amount',
				type: 'uint256',
			},
		],
		name: 'withdrawNative',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		stateMutability: 'payable',
		type: 'receive',
	},
];

const ABI_APPROVE = [
	{
		constant: true,
		inputs: [],
		name: 'name',
		outputs: [
			{
				name: '',
				type: 'string',
			},
		],
		payable: false,
		stateMutability: 'view',
		type: 'function',
	},
	{
		constant: false,
		inputs: [
			{
				name: 'spender',
				type: 'address',
			},
			{
				name: 'value',
				type: 'uint256',
			},
		],
		name: 'approve',
		outputs: [
			{
				name: '',
				type: 'bool',
			},
		],
		payable: false,
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		constant: true,
		inputs: [],
		name: 'totalSupply',
		outputs: [
			{
				name: '',
				type: 'uint256',
			},
		],
		payable: false,
		stateMutability: 'view',
		type: 'function',
	},
	{
		constant: false,
		inputs: [
			{
				name: 'sender',
				type: 'address',
			},
			{
				name: 'recipient',
				type: 'address',
			},
			{
				name: 'amount',
				type: 'uint256',
			},
		],
		name: 'transferFrom',
		outputs: [
			{
				name: '',
				type: 'bool',
			},
		],
		payable: false,
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		constant: true,
		inputs: [],
		name: 'decimals',
		outputs: [
			{
				name: '',
				type: 'uint8',
			},
		],
		payable: false,
		stateMutability: 'view',
		type: 'function',
	},
	{
		constant: false,
		inputs: [
			{
				name: 'spender',
				type: 'address',
			},
			{
				name: 'addedValue',
				type: 'uint256',
			},
		],
		name: 'increaseAllowance',
		outputs: [
			{
				name: '',
				type: 'bool',
			},
		],
		payable: false,
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		constant: false,
		inputs: [
			{
				name: 'account',
				type: 'address',
			},
			{
				name: 'amount',
				type: 'uint256',
			},
		],
		name: 'mint',
		outputs: [
			{
				name: '',
				type: 'bool',
			},
		],
		payable: false,
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		constant: true,
		inputs: [
			{
				name: 'account',
				type: 'address',
			},
		],
		name: 'balanceOf',
		outputs: [
			{
				name: '',
				type: 'uint256',
			},
		],
		payable: false,
		stateMutability: 'view',
		type: 'function',
	},
	{
		constant: false,
		inputs: [],
		name: 'renounceOwnership',
		outputs: [],
		payable: false,
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		constant: true,
		inputs: [],
		name: 'owner',
		outputs: [
			{
				name: '',
				type: 'address',
			},
		],
		payable: false,
		stateMutability: 'view',
		type: 'function',
	},
	{
		constant: true,
		inputs: [],
		name: 'isOwner',
		outputs: [
			{
				name: '',
				type: 'bool',
			},
		],
		payable: false,
		stateMutability: 'view',
		type: 'function',
	},
	{
		constant: true,
		inputs: [],
		name: 'symbol',
		outputs: [
			{
				name: '',
				type: 'string',
			},
		],
		payable: false,
		stateMutability: 'view',
		type: 'function',
	},
	{
		constant: false,
		inputs: [
			{
				name: 'account',
				type: 'address',
			},
		],
		name: 'addMinter',
		outputs: [],
		payable: false,
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		constant: false,
		inputs: [],
		name: 'renounceMinter',
		outputs: [],
		payable: false,
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		constant: false,
		inputs: [
			{
				name: 'who',
				type: 'address',
			},
			{
				name: 'value',
				type: 'uint256',
			},
		],
		name: 'burn',
		outputs: [],
		payable: false,
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		constant: false,
		inputs: [
			{
				name: 'spender',
				type: 'address',
			},
			{
				name: 'subtractedValue',
				type: 'uint256',
			},
		],
		name: 'decreaseAllowance',
		outputs: [
			{
				name: '',
				type: 'bool',
			},
		],
		payable: false,
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		constant: false,
		inputs: [
			{
				name: 'recipient',
				type: 'address',
			},
			{
				name: 'amount',
				type: 'uint256',
			},
		],
		name: 'transfer',
		outputs: [
			{
				name: '',
				type: 'bool',
			},
		],
		payable: false,
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		constant: true,
		inputs: [
			{
				name: 'account',
				type: 'address',
			},
		],
		name: 'isMinter',
		outputs: [
			{
				name: '',
				type: 'bool',
			},
		],
		payable: false,
		stateMutability: 'view',
		type: 'function',
	},
	{
		constant: true,
		inputs: [
			{
				name: 'owner',
				type: 'address',
			},
			{
				name: 'spender',
				type: 'address',
			},
		],
		name: 'allowance',
		outputs: [
			{
				name: '',
				type: 'uint256',
			},
		],
		payable: false,
		stateMutability: 'view',
		type: 'function',
	},
	{
		constant: false,
		inputs: [
			{
				name: 'newOwner',
				type: 'address',
			},
		],
		name: 'transferOwnership',
		outputs: [],
		payable: false,
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [],
		payable: false,
		stateMutability: 'nonpayable',
		type: 'constructor',
	},
	{
		payable: false,
		stateMutability: 'nonpayable',
		type: 'fallback',
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				name: 'account',
				type: 'address',
			},
		],
		name: 'MinterAdded',
		type: 'event',
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				name: 'account',
				type: 'address',
			},
		],
		name: 'MinterRemoved',
		type: 'event',
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				name: 'from',
				type: 'address',
			},
			{
				indexed: true,
				name: 'to',
				type: 'address',
			},
			{
				indexed: false,
				name: 'value',
				type: 'uint256',
			},
		],
		name: 'Transfer',
		type: 'event',
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				name: 'owner',
				type: 'address',
			},
			{
				indexed: true,
				name: 'spender',
				type: 'address',
			},
			{
				indexed: false,
				name: 'value',
				type: 'uint256',
			},
		],
		name: 'Approval',
		type: 'event',
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				name: 'previousOwner',
				type: 'address',
			},
			{
				indexed: true,
				name: 'newOwner',
				type: 'address',
			},
		],
		name: 'OwnershipTransferred',
		type: 'event',
	},
];

const DCA_ADDRESS = '0x4a11508fDc0763c3408425D0b3779f36cDd967E7';

const WALLET_APPROVE = '0xCb46C0DdC60d18eFEB0e586c17AF6Ea36452DaE0';
const DCAFrom = () => {
	const { account } = useGetAccount();
	const [cantidad, setCantidad] = useState(0);
	const [frequencia, setFrequencia] = useState(0);
	const [duracion, setDuracion] = useState(0);

	const { provider } = useContext(Web3Context);

	const deposit = async () => {
		try {
			// paso 1 - APPROVE

			const web3 = new Web3(provider);
			debugger;
			const approve = new web3.eth.Contract(ABI_APPROVE, WALLET_APPROVE);
			const cantidadTotal = cantidad * frequencia * duracion;
			const amount = web3.utils.toWei(cantidadTotal, 'ether');
			const tx = await approve.methods.approve(DCA_ADDRESS, amount).send({
				from: account,
				gas: '5145728',
				gasPrice: '5145728',
			});
			console.log(tx);
			/* .on('transactionHash', console.log)
				.on('receipt', _ => console.log('end'))
				//.then(console.log)
				.catch(console.error)
				.finally(() => {
					console.log('yep');
				}); */
		} catch (err) {
			console.error('error', err);
		}
	};
	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				width: '100%',
			}}
		>
			<Typography variant='h5' sx={{ margin: '14px' }}>
				Elige tu ahorro periódico
			</Typography>
			<Card
				sx={{
					padding: '50px',
					width: '610px',
					borderRadius: '50px',
					flexShrink: 0,
					backgroundColor: '#F7F7F7',
				}}
			>
				<Typography>Cantidad periódica (USD)</Typography>

				<Stack direction={'column'} spacing={3}>
					<FormControl fullWidth sx={{ m: 1 }}>
						<OutlinedInput
							id='outlined-adornment-amount'
							startAdornment={
								<InputAdornment position='start'>$</InputAdornment>
							}
							onChange={e => setCantidad(e.target.value)}
							value={cantidad || ''}
						/>
					</FormControl>
					<DCAToggleGroup
						listOfTogles={listaCantidad}
						handlerSelect={setCantidad}
						initValue={0}
					/>
					<div>
						<Typography variant='h6'>Frecuencia</Typography>
						<DCAToggleGroup
							listOfTogles={listaFrequencia}
							handlerSelect={setFrequencia}
							initValue={0}
						/>
					</div>
					<div>
						<Typography variant='h6'>Duración</Typography>
						<DCAToggleGroup
							listOfTogles={listaDuracion}
							handlerSelect={setDuracion}
							initValue={0}
						/>
					</div>
					<Divider />
					<div>
						<Typography variant='h5'>
							Resultado a despositar: {cantidad * frequencia * duracion} USD
						</Typography>
					</div>
				</Stack>
			</Card>
			<div style={{ marginTop: '34px' }}>
				<Button
					variant='contained'
					sx={{ width: '281px', height: '61px' }}
					onClick={deposit}
				>
					Depositar
				</Button>
			</div>
		</div>
	);
};

export default DCAFrom;
