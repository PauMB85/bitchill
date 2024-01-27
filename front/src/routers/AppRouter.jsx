import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Landing from '../pages/Landing';
import Home from '../pages/Home';
import PrivateRouter from './PrivateRouter';

export default function AppRouter() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<PrivateRouter />}>
					<Route index element={<Home />} />
					<Route path='*' element={<Home />} />
				</Route>
				<Route path='/landing' element={<Landing />} />
			</Routes>
		</BrowserRouter>
	);
}
