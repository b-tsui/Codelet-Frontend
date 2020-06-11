import React, { useState, useEffect } from "react"
import Set from "./Set"
import { api } from "../config"
import "../styles/sets.css";
import "../styles/cards.css";
import IndividualCard from "./IndividualCard";
const SearchResult = (props) => {
    const [searchData, setSearchData] = useState([])

    useEffect(() => {
        const loadData = async () => {
            let searchRes = await fetch(`${api}/sets/search${props.location.search}`)
            let searchData = await searchRes.json()
            setSearchData(searchData)
        }
        loadData()
    }, [])

    if (searchData) {
        return (
            //<div>search here</div>
            <>

                {searchData.sets &&
                    <>
                        <div>Set Search Results</div>
                        <div className="sets-container">
                            {searchData.sets.map(set => < Set set={set} key={set.id} />)}
                        </div>
                    </>
                }

                {searchData.cards &&
                    <>
                        <div>Card Search Results</div>
                        <div className="cards-container">
                            {searchData.cards.map(card => < IndividualCard setFetched={true} card={card} key={card.id} />)}
                        </div>
                    </>
                }
            </>
        )
    }
    else {
        return (
            <div className='sets-error'>no results found please try another search</div>
        )
    }

}
export default SearchResult