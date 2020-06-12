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
  } = props;

  const [isSelected, setIsSelected] = useState(false);
  const [opaqueValue, setOpaqueValue] = useState(1);

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
    if (e.target.id == singleCard) {
      setIsSelected(false);
      setSingleCard(null);
      setTermId(null);
      return;
    }
    const idCard = Number(e.target.id.slice(5));
    setIsSelected(true);
    setSingleCard(e.target.id);
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
          backgroundColor: isSelected ? "#00897b" : "lightgray",
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
          backgroundColor: isSelected ? "#00897b" : "gray",
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
