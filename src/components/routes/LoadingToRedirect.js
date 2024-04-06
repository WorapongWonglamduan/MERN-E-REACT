import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const LoadingToRedirect = () => {
  const navigate = useNavigate();

  const [count, setCount] = useState(3);
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => {
        return --currentCount;
      });
    }, 1000);

    //Redirect
    count === 0 && navigate("/");
    return () => clearInterval(interval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);
  return (
    <div>
      <h1>No Permission, redirect in {count}</h1>
    </div>
  );
};

export default LoadingToRedirect;
