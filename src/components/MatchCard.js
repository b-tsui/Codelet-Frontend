import React, { useState, useEffect } from "react";
import Card from "@material-ui/core/Card";

export default function MatchCard({ card, props }) {
  const {
    setIsTwoSelected,
    isTwoSelected,
    isMatched,
    setIsMatched,
    termId,
    setTermId,
    singleCard,
    setSingleCard,
    matchesLeft,
    setMatchesLeft,
  } = props;

  const [isSelected, setIsSelected] = useState(false);
  const [opaqueValue, setOpaqueValue] = useState(1);
  const [cardColor, setCardColor] = useState("");

  // Determines how to re-render card based off of current state
  useEffect(() => {
    const renderCard = () => {
      // If there is a correct match
      if (isMatched && isSelected) {
        setOpaqueValue(0);
        setMatchesLeft(matchesLeft - 1);
        setIsMatched(false);
      }

      // If two cards are selected and don't match
      if (isTwoSelected && isSelected) {
        setIsTwoSelected(false);
        setCardColor("red");
      }

      // Waits 0.5 seconds before reseting card to initial color
      setTimeout(() => {
        setIsSelected(false);
        setTermId(null);
      }, 500);

      // return function cleanup() {
      //   clearTimeout(wait);
      // };
    };
    renderCard();
  }, [isMatched, isTwoSelected]);

  // Function to set card as selected
  const handleClick = async (e) => {
    // Makes sure the selected card doesn't match itself
    if (e.target.id === singleCard) {
      setIsSelected(false);
      setSingleCard(null);
      setTermId(null);
      return;
    }

    const idCard = Number(e.target.id.slice(5));
    setIsSelected(true);
    setCardColor("#00897b");
    setSingleCard(e.target.id);

    // Checks to see if there are two cards selected in state
    if (termId) {
      if (termId === idCard) {
        setIsMatched(true);
      } else {
        setIsMatched(false);
        setIsTwoSelected(true);
      }
    }
    setTermId(idCard);
  };

  if (card.term) {
    return (
      <Card
        className="random-cards random-term"
        style={{
          "overflow-y": "auto",
          backgroundColor: isSelected ? cardColor : "lightgray",
          opacity: opaqueValue,
        }}
        id={`term-${card.cardId}`}
        onClick={handleClick}
      >
        {card.term}
      </Card>
    );
  } else {
    return (
      <Card
        className="random-cards random-def"
        style={{
          overflowY: "auto",
          backgroundColor: isSelected ? cardColor : "gray",
          opacity: opaqueValue,
        }}
        id={`defi-${card.cardId}`}
        onClick={handleClick}
      >
        {card.definition}
      </Card>
    );
  }
}
