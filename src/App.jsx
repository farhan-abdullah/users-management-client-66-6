import { useEffect, useState } from 'react';
import './App.css';

function App() {
	const [users, setUsers] = useState([]);
	useEffect(() => {
		fetch('http://localhost:5000/users')
			.then((res) => res.json())
			.then((data) => setUsers(data));
	}, []);
	const handleAddUser = (event) => {
		event.preventDefault();
		const form = event.target;
		const email = form.email.value;
		const name = form.name.value;
		const user = { name, email };
    // post api
		fetch('http://localhost:5000/users', {
			method: 'POST',
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify(user),
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				const newUsers = [...users, data];
        setUsers(newUsers)
				form.reset();
			});
	};
	return (
		<>
			<h1>User Management System</h1>

			<h3>Numbers of users: {users.length}</h3>
			<form onSubmit={handleAddUser}>
				<input type='text' name='name' id='' placeholder='Name' />
				<input type='email' name='email' id='' placeholder='Email' />
				<input type='submit' value='Add User' name='submit' />
			</form>
			{users.map((user) => (
				<p key={user.id}>
					{user.id}
					<br />
					{user.name}
					<br />
					{user.email}
				</p>
			))}
		</>
	);
}

export default App;
