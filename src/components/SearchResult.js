import React, { useState, useEffect } from "react"
import Set from "./Set"
import { api } from "../config"
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
                            <div>Set Search Results:</div>
                            <div className="sets-container">
                                {searchData.sets.map(set => < Set set={set} key={set.id} />)}
                            </div>
                        </>
                    }
                    {searchData.sets.length === 0 && <div>No Sets Results</div>}

                    {searchData.cards &&
                        <>
                            <div>Card Search Results:</div>
                            <div className="cards-container">
                                {searchData.cards.map(card => <Link to={`/sets/${card.set_id}`} className="search-card-link">< IndividualCard setFetched={true} card={card} key={card.id} /></Link>)}
                            </div>
                        </>
                    }
                    {searchData.cards.length === 0 && <div>No Cards Results</div>}
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