import React, { useState } from "react";
import "./SearchBox.css";
import { Container } from "react-bootstrap";
function SearchBox({ onSearch }) {
  const [searchKeyword, setSearchKeyword] = useState("");
  const handleSearch = (e) => {
    const keyword = e.target.value;
    setSearchKeyword(keyword);
    onSearch(keyword);
  };
  return (
    <Container>
      <div className="search">
        <input
          type="text"
          className="search-input"
          placeholder="Enter something here..."
          value={searchKeyword}
          onChange={handleSearch}
        />
        <i className="bi bi-search search-icon"></i>
      </div>
    </Container>
  );
}

export default SearchBox;
