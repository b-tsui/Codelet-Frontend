import React, { useState, useEffect } from "react";
import Set from "./Set";
import { api } from "../config";
import "../styles/sets.css";
import "../styles/cards.css";

import Typography from "@material-ui/core/Typography";

const SearchResult = ({ location: { pathname } }) => {
  const [categoryData, setCategoryData] = useState();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      let catRes = await fetch(`${api}${pathname}/sets`);
      let categoryData = await catRes.json();
      setCategoryData(categoryData);
      setLoaded(true);
    };
    loadData();
  }, [pathname]);

  return (
    //<div>search here</div>
    <>
      {!loaded && <div>loading</div>}
      {loaded && (
        <>
          <Typography
            variant="h3"
            style={{ textAlign: "center", margin: "15px" }}
          >
            <div>{`Category: ${categoryData.name}`}</div>
          </Typography>
          <div className="sets-container">
            {categoryData.sets.map((set) => (
              <Set set={set} key={set.id} />
            ))}
          </div>
        </>
      )}
    </>
  );
};
export default SearchResult;
