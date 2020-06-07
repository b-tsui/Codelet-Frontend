import React, { useEffect, useState } from "react"
import { useAuth0 } from "../react-auth0-spa"
import { api } from "../config"
import IndividualCard from "./IndividualCard"
import "../styles/cards.css"

export default function Cards({ location }) {
    const { user } = useAuth0();
    const [cards, setCards] = useState([])
    const [fetched, setFetched] = useState(false)
    useEffect(() => {
        const loadCards = async () => {
            const res = await fetch(`${api}${location.pathname}/cards`)
            const cards = await res.json()
            setFetched(true)
            setCards(cards)
        }
        loadCards();
    }, [])
    return (
        <>
            <div className="cards-container">
                {fetched && cards.map((card) => <IndividualCard card={card} key={card.id} />)}
            </div>
        </>
    )
}