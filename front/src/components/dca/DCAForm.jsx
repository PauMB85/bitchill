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
import { ABI_APPROVE } from './ABI_APPROVE';

import { listaCantidad, listaDuracion, listaFrequencia } from './utils-dca';
const DCA_ADDRESS = '0x4a11508fdc0763c3408425d0b3779f36cdd967e7';
const WALLET_APPROVE = '0xcb46c0ddc60d18efeb0e586c17af6ea36452dae0';
const DCAFrom = () => {
	const { account } = useGetAccount();
	const [cantidad, setCantidad] = useState(0);
	const [frequencia, setFrequencia] = useState(0);
	const [duracion, setDuracion] = useState(0);

	const { provider } = useContext(Web3Context);

	const deposit = async () => {
		try {
			// paso 1 -APRROVE
			/* const tokenContract = new ethers.Contract(
				WALLET_APPROVE,
				ABI_APPROVE,
				account
			);
			const cantidadTotal = cantidad * frequencia * duracion;
			const amount = ethers.parseUnits(cantidadTotal.toString(), 18);
			const tx = await tokenContract.approve(DCA_ADDRESS, amount);
			console.log(tx);
			*/
			// paso 1 - APPROVE
			const web3 = new Web3(provider);
			const approve = new web3.eth.Contract(ABI_APPROVE, WALLET_APPROVE);
			const cantidadTotal = cantidad * frequencia * duracion;
			const amount = web3.utils.toWei(cantidadTotal, 'ether');
			const tx = await approve.methods.approve(DCA_ADDRESS, amount).send({
				from: account,
				gas: '65164',
				gasPrice: '65164',
			});
			/* const gasPrice = await approve.methods
				.approve(DCA_ADDRESS, amount)
				.estimateGas();
			const tx = await approve.methods.approve(DCA_ADDRESS, amount).send({
				from: account,
				gasPrice,
				gas: '65164',
			}); */
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
				Configura tu ahorro periódico
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
				<Typography variant='h6'>Cantidad periódica (DOC)</Typography>

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
							DOC a despositar: {cantidad * frequencia * duracion} $
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
