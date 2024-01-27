import { Card, CardContent, Typography } from '@mui/material';
import PropTypes from 'prop-types';

const CardInfo = ({ title, description }) => {
	return (
		<Card
			sx={{
				backgroundColor: '#F7F7F7',
				borderRadius: '50px',
				maxWidth: '610px',
				maxHeight: '215px',
			}}
		>
			<CardContent sx={{ display: 'flex' }}>
				<div style={{ marginRight: '32px', display: 'flex' }}>
					<div
						style={{
							width: '98px',
							height: '98px',
							backgroundColor: '#FB8C00',
							borderRadius: '25px',
						}}
					></div>
				</div>
				<div>
					<Typography variant='h5'>{title}</Typography>
					<Typography>{description}</Typography>
				</div>
			</CardContent>
		</Card>
	);
};

export default CardInfo;

CardInfo.propTypes = {
	title: PropTypes.string,
	description: PropTypes.string,
};
