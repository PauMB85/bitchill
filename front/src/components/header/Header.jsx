import { Card, Stack, Typography } from '@mui/material';

export default function Header() {
	return (
		<Stack
			direction={'row'}
			justifyContent={'space-between'}
			style={{ marginBottom: '50px' }}
		>
			<div>LOGO</div>
			<Card
				sx={{
					width: '330px',
					height: '80px',
					borderRadius: '20px',
					backgroundColor: 'rgba(247, 247, 247, 0.20)',
				}}
			>
				<Stack
					direction={'row'}
					alignItems={'center'}
					justifyContent={'space-around'}
					style={{ height: '100%' }}
				>
					<Stack direction={'column'}>
						<Typography variant='body-1'>Balance USD</Typography>
						<Typography variant='h6'>5000</Typography>
					</Stack>
					<Stack direction={'column'}>
						<Typography variant='body-1'>Billetera</Typography>
						<Typography variant='h6'>0x098...087</Typography>
					</Stack>
				</Stack>
			</Card>
		</Stack>
	);
}
