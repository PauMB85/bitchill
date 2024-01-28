import { Stack } from '@mui/material';
import InfoLanding from '../components/card-info/InfoLanding';
import LoginWithoutModal from '../components/login/LoginWithoutModal';
import TitleLanding from '../components/title/TitleLanding';
import Logo from '../components/logo/Logo';

export default function Landing() {
	return (
		<Stack direction={'column'}>
			<Logo />
			<Stack
				direction='row'
				justifyContent='center'
				alignItems='flex-start'
				spacing={2}
				sx={{ minHeight: '100vh', marginTop: '25px' }}
			>
				<Stack
					direction='column'
					justifyContent='space-evenly'
					spacing={4}
					sx={{ height: '100%' }}
				>
					<TitleLanding />
					<LoginWithoutModal />
				</Stack>
				<InfoLanding sx={{ height: '100%' }} />
			</Stack>
		</Stack>
	);
}
