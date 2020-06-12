import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import MatchCard from "./MatchCard";

export default function ({ cards }) {
  const [randomCards, setRandomCards] = useState([]);
  const [termId, setTermId] = React.useState(null);
  const [isMatched, setIsMatched] = React.useState(false);
  const [isTwoSelected, setIsTwoSelected] = React.useState(false);
  const [isCompleted, setIsCompleted] = React.useState(false);

  useEffect(() => {
    const randomCardGen = () => {
      const random = [];
      let indices = new Set();
      while (random.length < 16 && random.length < cards.length * 2) {
        let randomCardIndex = Math.floor(
          Math.random() * Math.floor(cards.length)
        );
        if (!indices.has(randomCardIndex)) {
          indices.add(randomCardIndex);
          random.push({
            term: cards[randomCardIndex].term,
            cardId: cards[randomCardIndex].id,
          });
          random.push({
            definition: cards[randomCardIndex].definition,
            cardId: cards[randomCardIndex].id,
          });
        }
      }
      // setRandomCards(random);
      let randomized = random.sort(function () {
        return 0.5 - Math.random();
      });
      setRandomCards(randomized);
    };
    // const randomCards = randomCardGen();
    randomCardGen();
  }, [isCompleted]);

  const props = {
    setIsTwoSelected,
    isMatched,
    isTwoSelected,
    setIsMatched,
    termId,
    setTermId,
  };

  return (
    <div className="match-container">
      {randomCards.map((card) => {
        return <MatchCard card={card} props={props} />;
      })}
    </div>
  );
}
