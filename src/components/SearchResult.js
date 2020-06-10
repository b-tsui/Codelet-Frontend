import React, { useState, useEffect } from "react"
import Set from "./Set"
import { api } from "../config"
import "../styles/sets.css";
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

    if (searchData.length > 0) {
        return (
            //<div>search here</div>
            <>
                <div className="sets-container">
                    {searchData.map(set => < Set set={set} key={set.id} />)}
                </div>
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