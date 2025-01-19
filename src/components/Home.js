import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
import "../index.css"

const Home = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { darkMode, toggleTheme } = useContext(ThemeContext);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        if (!response.ok) throw new Error("Failed to fetch users.");
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={`home ${darkMode ? "dark" : "light"}`}>
      <header>
        <h1>User Directory</h1>
        <button onClick={toggleTheme}>{darkMode ? "Light Mode" : "Dark Mode"}</button>
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </header>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <ul>
          {filteredUsers.map(user => (
            <li key={user.id}>
              <Link to={`/user/${user.id}`}>
                <h3>{user.name}</h3>
                <p>Email: {user.email}</p>
                <p>City: {user.address.city}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Home;
