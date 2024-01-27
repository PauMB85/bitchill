import { Stack } from '@mui/material';
import React from 'react';
import CardInfo from './CardInfo';

const infoLanding = [
	{
		title: '¿Qué es DCA?',
		description: `DCA (Dollar Cost Average) es una herramienta que un inversionista
    puede utilizar para generar ahorros durante un largo período mientras
    neutraliza la volatilidad a corto plazo en el mercado.Las compras se
    producen independientemente del precio del activo y a intervalos
    regulares.`,
	},
	{
		title: 'Rendimientos en Dollar on Chain (DOC)',
		description:
			'Dollar con Chain (DOC) es una stablecoin respaldada por Bitcoin. En Nombre se deposita en Tropykus la cantidad total de DOC definida por el usuario para las compras de DCA para que de rendimientos al 6% anual mientras se hacen las compras con la frecuencia definida.',
	},
	{
		title: 'Préstamos para la vida real',
		description:
			'Al hacer la estrategia de DCA el usuario acumula Bitcoin cada semana o mes, y esto le abre la oportunidad de pedir préstamos usando su Bitcoin como garantía. El usuario podrá pedir préstamos hasta un 30% del Bitcoin que tenga acumulado.',
	},
];
export default function InfoLanding() {
	return (
		<Stack spacing={3}>
			{infoLanding.map(({ title, description }, index) => (
				<CardInfo key={index} title={title} description={description} />
			))}
		</Stack>
	);
}
