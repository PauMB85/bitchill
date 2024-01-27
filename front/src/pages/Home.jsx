import DCAFrom from '../components/dca/DCAForm';
import Header from '../components/header/Header';
import Menu from '../components/menu/Menu';

export default function Home() {
	return (
		<>
			<Header />
			<div
				style={{
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'flex-start',
				}}
			>
				<Menu />
				<DCAFrom />
			</div>
		</>
	);
}
