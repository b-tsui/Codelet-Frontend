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
  } = props;

  const [isSelected, setIsSelected] = React.useState(false);
  const [opaqueValue, setOpaqueValue] = React.useState(1);

  useEffect(() => {
    const opaqueCard = async () => {
      if (isMatched && isSelected) {
        setOpaqueValue(0);
        setIsMatched(false);
      }

      if (isTwoSelected && isSelected) {
        setIsTwoSelected(false);
      }
      setIsSelected(false);
      setTermId(null);
    };
    opaqueCard();
  }, [isMatched, isTwoSelected]);

  const handleClick = async (e) => {
    const idCard = Number(e.target.id.slice(5));
    setIsSelected(true);
    if (termId) {
      console.log(termId, idCard);
      if (termId === idCard) {
        setIsMatched(true);
        console.log("match");
      } else {
        setIsMatched(false);
        setIsTwoSelected(true);
        console.log("not match");
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
          backgroundColor: isSelected ? "yellow" : "lightgray",
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
          "overflow-y": "auto",
          backgroundColor: isSelected ? "yellow" : "gray",
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
