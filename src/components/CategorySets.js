import React, { useState, useEffect } from "react"
import Set from "./Set"
import { api } from "../config"
import "../styles/sets.css";
import "../styles/cards.css";
import IndividualCard from "./IndividualCard";
import { Link } from "react-router-dom";

const SearchResult = ({ location: { pathname } }) => {
    const [categoryData, setCategoryData] = useState()
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        const loadData = async () => {
            let catRes = await fetch(`${api}${pathname}/sets`)
            let categoryData = await catRes.json()
            setCategoryData(categoryData)
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
                    <div>{`Category: ${categoryData.name}`}</div>
                    <div className="sets-container">
                        {categoryData.sets.map(set => < Set set={set} key={set.id} />)}
                    </div>
                </>
            }
        </>
    )
}
export default SearchResult