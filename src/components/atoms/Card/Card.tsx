"use client";
import React, { useState } from "react";
import Link from "next/link";
interface CardProp {
  id: string;
  name: string;
  profile: string;
  selectedCard: string | null;
  onselected: React.Dispatch<React.SetStateAction<string>>;
  onDeleteCard: (id: string) => void;
}
const Card: React.FC<CardProp> = ({
  id,
  name,
  profile,
  selectedCard,
  onselected,
  onDeleteCard,
}: CardProp) => {
  const CardStyle =
    "w-[700px] h-[250px] flex items-center justify-evenly shadow-2xl border-[1px] border-black rounded-lg relative mt-5 cursor-pointer";
  return (
    <div className="w-[1024px] m-auto">
      <div
        onClick={() => {
          if (selectedCard === id) {
            // unselect
            onselected("");
          } else {
            // select
            onselected(id);
          }
        }}
        className={
          selectedCard == id ? `${CardStyle} bg-green-200` : `${CardStyle}`
        }
      >
        <div className="w-[200px] h-[200px] bg-yellow-500 flex items-center justify-center">
          <img
            src={profile}
            alt="User Profile"
            className="w-[100%] h-[100%] object-cover"
          />
        </div>
        <div className="flex flex-col justify-center space-y-20 h-[200px]">
          <h1 className="text-2xl font-bold">{name}</h1>
          <Link href={`/${name}`}>
            <button className="w-[150px] h-14 bg-blue-400 text-xl" key={id}>
              Preview
            </button>
          </Link>
        </div>
        <div className="absolute top-0 right-0">
          <button
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded-full"
            onClick={(e) => {
              onDeleteCard(id);
              e.stopPropagation();
            }}
          >
            X
          </button>
        </div>
      </div>
    </div>
  );
};

export { Card };
