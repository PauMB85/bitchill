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
import { useState } from 'react';

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
const DCAFrom = () => {
	const [cantidad, setCantidad] = useState(0);
	const [frequencia, setFrequencia] = useState(0);
	const [duracion, setDuracion] = useState(0);
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
				<Button variant='contained' sx={{ width: '281px', height: '61px' }}>
					Depositar
				</Button>
			</div>
		</div>
	);
};

export default DCAFrom;
