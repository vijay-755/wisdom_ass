
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await response.json();
        const sortedData = data.sort((a, b) => a.name.localeCompare(b.name)); // Alphabetical order
        setUsers(sortedData);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <header>
        <h1>User Directory</h1>
        <input
          type="text"
          placeholder="Search users by name..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </header>

      <ul>
        {filteredUsers.map((user) => (
          <li key={user.id}>
            <Link to={`/users/${user.id}`}>
              <h2>{user.name}</h2>
              <p>Email: {user.email}</p>
              <p>City: {user.address.city}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
