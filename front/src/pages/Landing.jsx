import { Stack } from '@mui/material';
import InfoLanding from '../components/card-info/InfoLanding';
import LoginWithoutModal from '../components/login/LoginWithoutModal';
import TitleLanding from '../components/title/TitleLanding';

export default function Landing() {
	return (
		<Stack
			direction='row'
			justifyContent='center'
			alignItems='center'
			spacing={2}
			sx={{ height: '100vh' }}
		>
			<Stack
				direction='column'
				justifyContent='space-evenly'
				spacing={2}
				sx={{ height: '100%' }}
			>
				<TitleLanding />
				<LoginWithoutModal />
			</Stack>
			<InfoLanding sx={{ height: '100%' }} />
		</Stack>
	);
}
