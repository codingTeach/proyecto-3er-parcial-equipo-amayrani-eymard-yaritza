import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://backend-students.onrender.com/login', { username, password }, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      localStorage.setItem('token', response.data.token);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed. Please try again.');
    }
  };

  return (
    <div className="bg-sky-100 flex justify-center items-center h-screen">
      <div className="w-1/2 h-screen hidden lg:block">
        <img src="https://img.freepik.com/fotos-premium/imagen-fondo_910766-187.jpg?w=826" alt="Placeholder Image" class="object-cover w-full h-full"/>
      </div>

      <div class="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
        <h1 class="text-2xl font-semibold mb-4">Login</h1>
        <form onSubmit={handleLogin} className="p-6 bg-white rounded shadow-md">

          <label for="username" class="block text-gray-600">Username</label>
          <input 
              type="text" 
              id="username"
              name="username" 
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" 
              autocomplete="off" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}/>
          
          <div className='mb-4'>
          <label for="password" class="block text-gray-800">Password</label>
          <input 
              type="password" 
              id="password" 
              name="password" 
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" 
              autocomplete="off" 
              value={password}
              onChange={(e) => setPassword(e.target.value)} />
          </div>
          

          <button type="submit" className="bg-red-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full">Login</button>
        </form>

      </div>
    </div>
  );
};


export default Login;
