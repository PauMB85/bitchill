import { Button } from '@mui/material';
import { useContext } from 'react';
import { Web3Context } from '../../context/Web3Context';

export default function Logout() {
	const { setProvider, web3auth, setWeb3auth } = useContext(Web3Context);
	const logout = async () => {
		if (!web3auth) {
			console.error('Error al desconectar');
		}
		await web3auth.logout();
		setProvider(null);
		setWeb3auth(null);
	};
	return <Button onClick={logout}>Logout</Button>;
}
