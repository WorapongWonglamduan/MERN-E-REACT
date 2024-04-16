import React from "react";
import { Link } from "react-router-dom";

const MenubarUser = () => {
  return (
    <div>
      <nav>
        <ul className="nav flex-column">
          <li className="nav-item">
            <Link to={"/user/wishlist"}>สินค้าที่สนใจ</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default MenubarUser;
