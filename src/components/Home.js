import React from "react"
import { useAuth0 } from "../react-auth0-spa"

const Home = () => {
    const { user, loading } = useAuth0();

    if (!user) {
        return (
            <>
                {loading && <div>loading</div>}
                {!loading && <h1 className="home-welcome">Welcome to Codelet!</h1>}
            </>
        )
    } else {
        return (
            <>
                {loading && <div>loading</div>}
                {!loading && <h1 className="home-welcome">Welcome, {user.name}</h1>}
            </>
        )
    }
}

export default Home;