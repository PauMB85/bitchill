import { Outlet } from 'react-router-dom';

export default function Layout() {
	return (
		<div>
			<h1>Hello Team</h1>
			<div className='flex justify-center items-center'>
				<div className='lg:container sm:container'>
					<Outlet />
				</div>
			</div>
		</div>
	);
}
