import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const AdminLogin = () => {
  const histroy=useNavigate();
  const [form, setform] = useState({});
  const handleLogin = () => {
   console.log(form)
   axios.post ('http://127.0.0.1:8000/login',form).then((response)=>{if(response.data.login){sessionStorage.setItem('admin',response.data.username); histroy('/admin-dashboard')}});
    
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setform({
        ...form,
        [name]: value,
    });
};
  return (
<div className="flex items-center justify-center min-h-screen bg-gray-900 ">
      <div className="bg-gray-100 p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-black">Admin Login</h1>
        <form>
          <div className="mb-4">
            <label className="text-black">Username:</label>
            <input value={form.username} onChange={handleChange}
              type="text"
              name="username"
              className="form-input mt-2 block w-full p-3 text-lg"
              placeholder="Enter your username"
            />
          </div>
          <div className="mb-4">
            <label className="text-black">Email:</label>
            <input value={form.email} onChange={handleChange}
              type="email"
              name="email"
              className="form-input mt-2 block w-full p-3 text-lg"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label className="text-black">Password:</label>
            <input value={form.password}
              type="password" onChange={handleChange}
              name="password"
              className="form-input mt-2 block w-full p-3 text-lg"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="button"
            onClick={handleLogin}
            className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded mx-auto block w-full sm:w-auto"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};


export default AdminLogin;
