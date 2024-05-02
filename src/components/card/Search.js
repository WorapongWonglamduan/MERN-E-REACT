import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const search = useSelector((state) => state.search);
  const { text } = useMemo(() => search, [search]);

  const handleChange = (e) => {
    dispatch({ type: "SEARCH_QUERY", payload: { text: e.target.value } });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/shop?" + text, { state: { text: text } });
  };
  return (
    <form onSubmit={handleSubmit}>
      <input onChange={handleChange} type="search" className="form-control" />
    </form>
  );
};

export default Search;
