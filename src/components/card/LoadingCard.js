import React from "react";
import { Skeleton, Card } from "antd";
const LoadingCard = ({ count = 1 }) => {
  const LoopCard = () => {
    let card = [];
    for (let i = 0; i < count; i++) {
      card.push(
        <div className="col-md-4 mb-4" key={i}>
          <Card>
            <Skeleton active />
          </Card>
        </div>
      );
    }
    return card;
  };
  return (
    <>
      <LoopCard />
    </>
  );
};

export default LoadingCard;
