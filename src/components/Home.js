import React, { useEffect, useState } from "react";
import { useAuth0 } from "../react-auth0-spa";
import { api } from "../config";
import Set from "./Set";
import CreateSet from "./CreateSet";
import Loading from "./Loading";
import "../styles/home-page.css";
import OrderByMenu from "./OrderByMenu";

import { Typography } from "@material-ui/core";

const Home = () => {
  const { user, loading } = useAuth0();
  const [sets, setSets] = useState([]);
  const [fetched, setFetched] = useState(false);

  useEffect(() => {
    const loadSets = async () => {
      const res = await fetch(`${api}/sets`);
      const sets = await res.json();
      //sorts by number of upvotes/downvotes
      let sortedSet = sets.sort((a, b) => {
        return b.num_upvotes - a.num_upvotes;
      });
      setSets(sortedSet);
      setFetched(true);
    };
    loadSets();
  }, [fetched]);

  return (
    <>
      {loading && <Loading />}
      {!loading && (
        <>
          {user && <h1 className="home-welcome">Welcome, {user.name}</h1>}
          {!user && (
            <div>
              <h1 className="home-welcome">Welcome to Codelet!</h1>
              <div className="home-welcome-message">
                <div>
                  Codelet is an app dedicated for creating and studying coding
                  flashcards.
                </div>

                <div>
                  To experience the app to its fullest extent, please login,
                  create a new account, or login as the demo user!
                </div>

                <div>
                  To login as demo, provide an email of <b>demo@demo.com</b> and
                  password <b>demo123!</b>
                </div>
              </div>
            </div>
          )}
          <div className="home-content">
            <Typography variant="h5" component="h5">
              Browse Sets
            </Typography>
            <OrderByMenu
              setSets={setSets}
              sets={sets}
              setFetched={setFetched}
            />
          </div>
          <div className="sets-container">
            <CreateSet />
            {fetched &&
              sets.map((set) => (
                <Set
                  set={set}
                  key={set.id}
                  setSets={setSets}
                  setFetched={setFetched}
                />
              ))}
          </div>
        </>
      )}
    </>
  );
};

export default Home;
