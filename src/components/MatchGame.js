import React, { useState, useEffect } from "react";
import MatchCard from "./MatchCard";
import Button from "@material-ui/core/Button";

export default function ({ cards }) {
  const [randomCards, setRandomCards] = useState([]);
  const [termId, setTermId] = useState(null);
  const [isMatched, setIsMatched] = useState(false);
  const [isTwoSelected, setIsTwoSelected] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [singleCard, setSingleCard] = useState(null);
  const [matchesLeft, setMatchesLeft] = useState(null);
  const [isGameFinished, setIsGameFinished] = useState(false);

  useEffect(() => {
    const randomCardGen = () => {
      setIsCompleted(false);
      setIsGameFinished(false);
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
      let randomized = random.sort(function () {
        return 0.5 - Math.random();
      });
      setRandomCards(randomized);
      setMatchesLeft(Number(randomized.length) / 2);
    };
    randomCardGen();
  }, [isCompleted, cards]);

  useEffect(() => {
    const checkMatchStatus = () => {
      if (matchesLeft === 0) {
        setIsGameFinished(true);
      }
    };

    checkMatchStatus();
  }, [matchesLeft]);

  const props = {
    setIsTwoSelected,
    isMatched,
    isTwoSelected,
    setIsMatched,
    termId,
    setTermId,
    singleCard,
    setSingleCard,
    matchesLeft,
    setMatchesLeft,
  };

  return (
    <div className="match-container">
      {isGameFinished ? (
        <div className="win-container">
          <div>You won!</div>
          <Button color="secondary" onClick={() => setIsCompleted(true)}>
            Reset Game
          </Button>
        </div>
      ) : (
        randomCards.map((card) => {
          return <MatchCard card={card} props={props} />;
        })
      )}
    </div>
  );
}
