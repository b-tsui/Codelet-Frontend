import React, { useState, useEffect } from "react";
import { useAuth0 } from "../react-auth0-spa";
import Set from "./Set";
import { api } from "../config";

const Profile = () => {
  const { user, loading, getTokenSilently } = useAuth0();
  const [userSets, setUserSets] = useState([]);
  const [favoriteSets, setFavoriteSets] = useState([]);
  const [fetched, setFetched] = useState(false);

  useEffect(() => {
    const loadSets = async () => {
      const token = await getTokenSilently();
      const res = await fetch(`${api}/users/sets`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setFetched(true);
      setUserSets(data.userSets);
      setFavoriteSets(data.userFavSets);
    };
    loadSets();
  }, []);

  if (loading || !user) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <img src={user.picture} alt="Profile" />

      <h2>{user.name}</h2>
      <p>{user.email}</p>
      <code>{JSON.stringify(user, null, 2)}</code>
      <div>
        <h1>favorited sets:</h1>
        <div>
          {fetched && favoriteSets.map((set) => <Set set={set} key={set.id} />)}
        </div>
      </div>
      <div>
        <h1>my sets:</h1>
        <div>
          {fetched && userSets.map((set) => <Set set={set} key={set.id} />)}
        </div>
      </div>
    </>
  );
};

export default Profile;
