import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Profile=()=>{
    const navigate = useNavigate();
    const location = useLocation();
    const [userData, setUserData] = useState(null);
    const [loading,setLoading]=useState(true);

    useEffect(() => {
        const fetchUser = async () => {
          try {
            const token = localStorage.getItem('token');
            const { role } = location.state || {};
            if (!role) {
              setLoading(false);
              navigate('/login');
            }
            
            const response=await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/${role}`,{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            })
            const data = await response.json();
    
            setUserData(data.User);
            setLoading(false);
          } catch (error) {
            toast.error('Failed to fetch user data. Please try again.');
          }
        };
    
        fetchUser();
      }, [navigate]);

      const handleLogout = () => {
        localStorage.removeItem('token');
        toast.info('Logged out successfully.');
        navigate('/login');
      };

      if (loading) {
        return <p className="text-center text-gray-600">Loading...</p>;
      }

    if (!userData) {
        navigate('/login');
        return null;
    }

    const handleManageUsers = () => {
      navigate('/manage-users');
    };
    
    return (
        <div className="max-w-4xl mx-auto mt-8 px-4">
            <ToastContainer/>
            <h1
              className="text-2xl text-pink-500 cursor-pointer text-right"
              onClick={handleLogout}
              >
              Logout
          </h1>
            <h1
                className="text-3xl font-bold text-pink-500 text-center underline pb-12 "
              >
                Profile
            </h1>
          <div className="bg-white border-4 border-gray-300 p-6 rounded-lg shadow-md">
            <div className="mb-4">
              <p className="font-bold text-lg text-gray-800">ID</p>
              <p className="text-gray-600">{userData._id}</p>
            </div>
            <div className="mb-4">
              <p className="font-bold text-lg text-gray-800">Email/Username</p>
              <p className="text-gray-600">{userData.email}</p>
            </div>
            <div className="mb-4">
              <p className="font-bold text-lg text-gray-800">Role</p>
              <p className="text-gray-600">{userData.role}</p>
            </div>
            <div>
              <p className="font-bold text-lg text-gray-800">User Object</p>
              <pre className="text-gray-600 bg-gray-100 p-4 rounded-lg">
                {JSON.stringify(userData, null, 2)}
              </pre>
            </div>
            {userData.role === 'admin' && (
              <button
                className="mt-4 bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleManageUsers}
              >
                Manage Users
              </button>
            )}
          </div>
        </div>
    );
}

export default Profile;