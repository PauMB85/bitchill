import { Link } from 'react-router-dom';
import Logout from '../logout/Logout';
import { Button, Typography } from '@mui/material';

export default function Menu() {
	return (
		<aside
			style={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'flex-start',
			}}
		>
			<Button component={Link} to='/home'>
				<Typography>Home</Typography>
			</Button>
			<Button component={Link} to='/home'>
				<Typography>Actividad</Typography>
			</Button>
			<Logout />
		</aside>
	);
}
