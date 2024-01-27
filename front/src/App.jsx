import './App.css';
import LoginNoModal from './components/login/LoginNoModal';
import LoginWeb3Auth from './components/login/LoginWeb3Auth';
import LoginWithoutModal from './components/login/LoginWithoutModal';
import Chain from './components/vottun/chains';

function App() {
	return (
		<>
			<h1>Hello Fuck Degens</h1>
			<div>
				<h3>NO Modal</h3>
				<LoginWithoutModal />
			</div>
		</>
	);
}

export default App;
