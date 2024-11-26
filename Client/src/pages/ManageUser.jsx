import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RingLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

const ManageUser = () => {
    const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/api/v1/admin/allusers`,
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
          setUsers(data.Users);
        } else {
          toast.error("Failed to fetch users.");
        }
      } catch (error) {
        toast.error("Error fetching users. Please try again.");
        console.error("Error fetching users:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleUpdateRole = async (email, newRole) => {
    setIsUpdating(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/admin/update`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ email, role: newRole }),
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
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.email === email ? { ...user, role: newRole } : user
          )
        );
        toast.success("User role updated successfully!");
      } else {
        toast.error("Failed to update user role.");
      }
    } catch (error) {
      toast.error("Error updating role. Please try again.");
      console.error("Error updating role:", error);
    } finally {
      setIsUpdating(false); // Stop loading after role update
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-8 px-4">
      <ToastContainer />
        <h1
            className="text-2xl font-bold text-pink-500 cursor-pointer"
            onClick={() => navigate(-1)}
            >
            ← Profile
        </h1>
      <h1 className="text-center text-2xl font-bold text-pink-500 underline mb-6">
        Manage Users
      </h1>

      {/* Show loader if data is being fetched */}
      {isLoading ? (
        <div className="flex justify-center items-center">
          <RingLoader color="#e11d48" size={50} />
        </div>
      ) : (
        <table className="table-auto w-full border-collapse border border-gray-300 rounded-lg shadow-md">
          <thead>
            <tr className="bg-pink-500 text-white">
              <th className="px-4 py-2 border border-gray-300">ID</th>
              <th className="px-4 py-2 border border-gray-300">Email</th>
              <th className="px-4 py-2 border border-gray-300">Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user._id}
                className="hover:bg-pink-50 odd:bg-gray-50 even:bg-white"
              >
                <td className="px-4 py-2 border border-gray-300">{user._id}</td>
                <td className="px-4 py-2 border border-gray-300">
                <button
                    onClick={() => navigate(`/admin/user/${user._id}`)}
                    className="text-pink-500 hover:underline"
                  >
                    {user.email}
                  </button>
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleUpdateRole(user.email, e.target.role.value);
                    }}
                    className="flex items-center space-x-4"
                  >
                    <select
                      name="role"
                      id="role"
                      defaultValue={user.role}
                      className="border border-gray-300 rounded-lg px-3 py-1 text-gray-800"
                    >
                      <option value="admin">Admin</option>
                      <option value="moderator">Moderator</option>
                      <option value="client">Client</option>
                    </select>
                    <button
                      type="submit"
                      className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600"
                    >
                      {isUpdating ? (
                        <RingLoader color="#fff" size={20} />
                      ) : (
                        "Update"
                      )}
                    </button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ManageUser;
