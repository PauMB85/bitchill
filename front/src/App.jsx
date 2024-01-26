import './App.css';
import LoginWeb3Auth from './components/login/LoginWeb3Auth';
import Chain from './components/vottun/chains';

function App() {
	return (
		<>
			<h1>Hello Team</h1>
			<div>
				<LoginWeb3Auth />
			</div>
			<div>
				<Chain />
			</div>
		</>
	);
}

export default App;
