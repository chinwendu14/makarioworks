import React from "react";

import styles from "../../styles/Search.module.scss";
import { BiSearch } from "react-icons/bi";
const Search = ({ onSubmit, onChange, value }) => {
  return (
    <div className={styles.search}>
      <span>
        <i>{<BiSearch />}</i>
      </span>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="search"
          onChange={onChange}
          value={value}
          placeholder="Check for the weather in a location"
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default Search;
