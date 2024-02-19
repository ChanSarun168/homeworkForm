import React from "react";
import { Card } from "./Card";

interface CardListProps {
  data: User[];
  selectCard: string;
  onSelected: React.Dispatch<React.SetStateAction<string>>;
  onDeleteCard: (id: string) => void;
}

const CardList = ({ data, selectCard, onSelected, setUser , onDeleteCard}: CardListProps) => {
  return (
    <>
      {data.map((item, index) => (
        <Card
          id={item.id}
          name={item.name}
          profile={item.profile}
          key={index}
          selectedCard={selectCard}
          onselected={onSelected}
          onDeleteCard={onDeleteCard}
        ></Card>
      ))}
    </>
  );
};

export { CardList };
