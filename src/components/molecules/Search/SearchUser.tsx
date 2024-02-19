"use Client";
import React, { useState } from "react";
import { InputForm } from "@/components/atoms";
import { Card } from "@/components/atoms";

const SearchUser = ({ user, selectCard, onSelected, onDeleteCard }) => {
  const [finduser, setfinduser] = useState("");
  const filteredData = user.filter((item) =>
    item.name.toLowerCase().includes(finduser.toLowerCase())
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setfinduser(event.target.value);
  };
  console.log(user)
  return (
    <div>
      <form action="">
        <InputForm
          type={"search"}
          name={"search"}
          id={"search"}
          className="w-[600px] h-[50px] rounded-lg border border-black p-5 mt-5 ml-[450px]"
          placeholder="search....."
          onchange={handleChange}
        />
      </form>
      {filteredData.length > 0 ? (
        filteredData.map((item, index) => (
          <Card
            id={item.id}
            name={item.name}
            profile={item.profile}
            key={index} 
            selectedCard={selectCard}
            onselected={onSelected}
            onDeleteCard={onDeleteCard}
          />
        ))
      ) : (
        <p className="ml-[450px] text-2xl font-semibold">No User</p>
      )}
    </div>
  );
};

export { SearchUser };
