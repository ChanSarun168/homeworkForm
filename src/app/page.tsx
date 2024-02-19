// "use client";
// import { useState } from "react";
// import { Card, CardList, FormUpdate, Modal, SearchUser } from "@/components";
// import { Form } from "@/components/molecules/Form";

// export default function Home() {

//   const [selected, setSelected] = useState("");
//   const [users, setUsers] = useState([
//     {
//       id: "1",
//       name: "Tan hangsapho",
//       profile: "./user.jpg",
//     },
//     {
//       id: "2",
//       name: "Svat Manith",
//       profile: "./user1.png",
//     },
//   ]);

//   const handleUpdateUser = (updatedUser) => {
//     const updatedUsers = users.map((user) =>
//       user.id === updatedUser.id ? updatedUser : user
//     );
//     setUsers(updatedUsers);
//     setSelected("");
//   };

//   const selectedUser = users.find((user) => user.id === selected);

//   const handleDeleteCard = (id: string) => {
//     const deleteItem = users.filter((users) => users.id !== id);
//     setUsers(deleteItem);
//   };

//   return (
//     <div>
//       <SearchUser
//         user={users}
//         selectCard={selected}
//         onSelected={setSelected}
//         onDeleteCard={handleDeleteCard}
//       ></SearchUser>
//       <Modal seleted={selected}>
//         {selected && users.length > 0 ? (
//           <FormUpdate
//             UpdateUser={handleUpdateUser}
//             data={selectedUser}
//           ></FormUpdate>
//         ) : (
//           <Form addUser={setUsers}></Form>
//         )}
//       </Modal>
//     </div>
//   );
// }
// Import necessary modules
"use client";
import { useState, useEffect, createContext, useContext } from "react";
import { Card, CardList, FormUpdate, Modal, SearchUser } from "@/components";
import { Form } from "@/components/molecules/Form";

// Define the Home component
export default function Home() {
  // Define state variables
  const [selected, setSelected] = useState("");
  const [users, setUsers] = useState([]);

  // Function to retrieve users from local storage when the component mounts
  useEffect(() => {
    const storedUsers = localStorage.getItem("users");
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    }
  }, []);

  // Function to update local storage when users state changes
  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  // Function to handle updating a user
  const handleUpdateUser = (updatedUser) => {
    const updatedUsers = users.map((user) =>
      user.id === updatedUser.id ? updatedUser : user
    );
    setUsers(updatedUsers);
    setSelected("");
  };

  // Function to handle deleting a user
  const handleDeleteCard = (id) => {
    const filteredUsers = users.filter((user) => user.id !== id);
    setUsers(filteredUsers);
  };

  // Find the selected user
  const selectedUser = users.find((user) => user.id === selected);

  // Return the JSX
  return (
    <div>
      <SearchUser
        user={users}
        selectCard={selected}
        onSelected={setSelected}
        onDeleteCard={handleDeleteCard}
      ></SearchUser>
      <Modal seleted={selected}>
        {selected && users.length > 0 ? (
          <FormUpdate
            UpdateUser={handleUpdateUser}
            data={selectedUser}
          ></FormUpdate>
        ) : (
          <Form addUser={setUsers}></Form>
        )}
      </Modal>
    </div>
  );
}