import React from "react";

interface CardProps {
  title: string;
  description: string;
  index: number;
  step: number;
}

const Card: React.FC<CardProps> = ({ title, description, index, step }) => {
  const icon = step >= index ? "✅" : "⏳";
  return (
    <div className="max-w-md mx-auto bg-white border-b-2">
      <div className="p-8 flex items-center space-x-4">
        <div className="text-2xl">{icon}</div>
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-gray-600 text-sm">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
