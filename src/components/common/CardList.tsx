import React from "react";
import { exampleCards } from "../../../data/exampleCards";
const CardList = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
      {exampleCards.map((card) => (
        <div
          key={card.id}
          className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition-shadow"
        >
          <img
            src={card.imageUrl}
            alt={card.title}
            className="w-full h-40 object-cover rounded-xl mb-4"
          />
          <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
          <p className="text-gray-600 text-sm">{card.description}</p>
        </div>
      ))}
    </div>
  );
};

export default CardList;