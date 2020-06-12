import React, { useState, useEffect } from "react"
import Set from "./Set"
import { api } from "../config"
import Typography from "@material-ui/core/Typography";

import "../styles/sets.css";
import "../styles/cards.css";


import IndividualCard from "./IndividualCard";
import { Link } from "react-router-dom";
const SearchResult = ({ location: { search } }) => {
    const [searchData, setSearchData] = useState()
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        const loadData = async () => {
            let searchRes = await fetch(`${api}/sets/search${search}`)
            let searchData = await searchRes.json()
            setSearchData(searchData)
            setLoaded(true)
        }
        loadData()
    }, [])


    return (
        //<div>search here</div>

        <>
            {!loaded && <div>loading</div>}
            {loaded &&
                <>
                    {searchData.sets &&

                        <>
                            <Typography style={{ marginTop: "15px" }} variant="h5" component="h4">
                                <div className="search-results" >Set Search Results:</div>
                            </Typography>
                            <div className="sets-container">
                                {searchData.sets.map(set => < Set set={set} key={set.id} />)}
                            </div>
                        </>
                    }
                    {searchData.sets.length === 0 &&
                        <Typography variant="h6" component="h5">
                            <div className="search-results">No Sets Results</div>
                        </Typography>}
                    {searchData.cards &&
                        <>
                            <Typography variant="h5" component="h4">
                                <div className="search-results" >Card Search Results:</div>
                            </Typography>
                            <div className="cards-container">
                                {searchData.cards.map(card => <Link to={`/sets/${card.set_id}`} className="search-card-link">< IndividualCard setFetched={true} card={card} key={card.id} /></Link>)}
                            </div>
                        </>
                    }
                    {searchData.cards.length === 0 &&
                        <Typography variant="h6" component="h5">
                            <div className="search-results">No Cards Results</div>
                        </Typography>
                    }
                </>
            }
        </>
    )

    // else {
    //     return (
    //         <div className='sets-error'>no results found please try another search</div>
    //     )
    // }

}
export default SearchResult
