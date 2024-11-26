import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RingLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

const User=()=>{
    const { id } = useParams();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/api/v1/admin/getuser/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 401) {
          toast.error("Unauthorized! Redirecting to login...");
          setTimeout(() => {
            window.location.href = "/login";
          }, 2000);
          return;
        }

        const data = await response.json();
        if (data.success) {
          setUserData(data.User);
        } else {
          toast.error("Failed to fetch user profile.");
        }
      } catch (error) {
        toast.error("Error fetching user profile. Please try again.");
        console.error("Error fetching user profile:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserProfile();
  }, [id]);

  return (
    <div className="max-w-4xl mx-auto mt-8 px-4">
      <ToastContainer />
      <h1
        className="text-2xl font-bold text-pink-500 cursor-pointer"
        onClick={() => navigate(-1)}
      >
        ← Back
      </h1>

      <h1 className="text-center text-2xl font-bold text-pink-500 underline mb-6">
        User Profile
      </h1>

      {isLoading ? (
        <div className="flex justify-center items-center">
          <RingLoader color="#e11d48" size={50} />
        </div>
      ) : userData ? (
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
          {userData.role === "admin" && (
            <button
              className="mt-4 bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleManageUsers}
            >
              Manage Users
            </button>
          )}
        </div>
      ) : (
        <p className="text-center text-gray-600">User not found.</p>
      )}
    </div>
  );

};

export default User;
