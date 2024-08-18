import { Modal, Table, Button } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { HiOutlineExclamationCircle } from "react-icons/hi";

import { FaPenToSquare } from "react-icons/fa6";
import axios from 'axios';


export default function DashUsers() {
  const { currentUser } = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState("");
  const [userIdToChangeRole, setUserIdToChangeRole] = useState("");
  const [selectedRole, setSelectedRole] = useState("user");

  const [updatemodel, setUpdateModel] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("/api/user/getusers");
        if (res.status === 200) {
          setUsers(res.data.users);
          if (res.data.users.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      fetchUsers();
    }
  }, [currentUser._id]);

  const handleShowMore = async () => {
    const startIndex = users.length;
    try {
      const res = await fetch(`/api/user/getusers?startIndex=${startIndex}`);
      const data = await res.json();
      if (res.ok) {
        setUsers((prev) => [...prev, ...data.users]);
        if (data.users.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

 

const handleDeleteUser = async () => {
  try {
    const res = await axios.delete(`/api/user/delete/${userIdToDelete}`);
    if (res.status === 200) {
      setUsers((prev) => prev.filter((user) => user._id !== userIdToDelete));
      setShowModal(false);
    } else {
      console.log(res.data.message);
    }
  } catch (error) {
    console.log(error.message);
  }
};


  const [selectedUserId, setSelectedUserId] = useState("");

  const handleChangeRole = async () => {
    try {
      const res = await fetch(`/api/user/change-role/${selectedUserId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        // body: JSON.stringify({ role: newRole }),
      });
      if (res.ok) {
        setUsers((prevUsers) =>
          prevUsers.map((user) => {
            if (user._id === selectedUserId) {
              return { ...user, isAdmin: newRole === "admin" };
            }
            return user;
          })

        );
        setUpdateModel(false)
        
      } else {
        console.log("Failed to change user role");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const [selectedUserRole, setSelectedUserRole] = useState("");

  return (
    <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
      {currentUser.isAdmin && users.length > 0 ? (
        <>
          <Table hoverable className="shadow-md">
            <Table.Head>
              <Table.HeadCell>Date created</Table.HeadCell>
              <Table.HeadCell>User image</Table.HeadCell>
              <Table.HeadCell>Username</Table.HeadCell>
              <Table.HeadCell>Email</Table.HeadCell>
              <Table.HeadCell>Role</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
              <Table.HeadCell>Edit</Table.HeadCell>
            </Table.Head>
            {users.map((user) => (
              <Table.Body className="divide-y" key={user._id}>
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell>
                    {new Date(user.createdAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>
                    <img
                      src={user.profilePicture}
                      alt={user.username}
                      className="w-10 h-10 object-cover bg-gray-500 rounded-full"
                    />
                  </Table.Cell>
                  <Table.Cell>{user.username}</Table.Cell>
                  <Table.Cell>{user.email}</Table.Cell>

                  <Table.Cell>
                    {user.isAdmin &&   user.isAdmin ? (
                      <h1 className="text-gray-800 font-bold dark:text-white">Admin</h1>
                    ) : user.isEditor ? (<>
                      <h1 className="text-gray-800 font-bold dark:text-white">Editor</h1>
                        
                    </>) : (
                      <h1 className="text-gray-800 dark:text-white">User</h1>
                    )}
                  </Table.Cell>
                  <Table.Cell>
                    <span
                      onClick={() => {
                        setShowModal(true);
                        setUserIdToDelete(user._id);
                      }}
                      className="font-medium text-red-500 hover:underline cursor-pointer"
                    >
                      Delete
                    </span>
                  </Table.Cell>

                  <Table.Cell>
                    <span
                      key={user._id}
                      className="font-medium text-teal-500 hover:underline cursor-pointer dark:text-white"
                      onClick={() => {
                        setUpdateModel(true);
                        setSelectedUserId(user._id);
                        // setSelectedUserRole(user.isAdmin ? "editor" : "admin");
                      }}
                    >
                      Update Role
                    </span>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
          </Table>
          {showMore && (
            <button
              onClick={handleShowMore}
              className="w-full text-teal-500 self-center text-sm py-7"
            >
              Show more
            </button>
          )}
        </>
      ) : (
        <p>You have no users yet!</p>
      )}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size="md"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this user?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDeleteUser}>
                Yes, I'm sure
              </Button>
              <Button color="gray" onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>







      <Modal
        show={updatemodel}
        onClose={() => setUpdateModel(false)}
        popup
        size="md"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <FaPenToSquare className="h-14 w-14 text-teal-400 dark:text-gray-200 mb-4 mx-auto" />
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
              Are you sure you want to Make this editor?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleChangeRole}>
                Yes, I'm sure
              </Button>
              <Button color="gray" onClick={() => setUpdateModel(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
