import React, { useState, useEffect } from "react";
import MatchCard from "./MatchCard";
import "../styles/match-game.css"

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

  // Generates an array of 8 random cards (terms and definitions) for the matching game
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

      // Randomize the order of terms and definitions for added difficulty
      let randomized = random.sort(function () {
        return 0.5 - Math.random();
      });

      setRandomCards(randomized);
      setMatchesLeft(Number(randomized.length) / 2);
    };
    randomCardGen();
  }, [isCompleted, cards]);

  // Checks to see how many correct pairs are still needed to complete the game
  useEffect(() => {
    const checkMatchStatus = () => {
      if (matchesLeft === 0) {
        setIsGameFinished(true);
      }
    };

    checkMatchStatus();
  }, [matchesLeft]);

  // Defines props that need to be passed into individual match card component
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
          <div>Nice try! You have successfully matched all pairs!</div>
          <Button color="secondary" onClick={() => setIsCompleted(true)}>
            Replay Game
          </Button>
        </div>
      ) : (
        <div className="match-container">
          <div className="game-description">
            Make all the cards disappear! Click on a term (light gray) and
            definition (dark gray) to match them. Correct pairs will disappear,
            while incorrect pairs will flash red.
          </div>
          {randomCards.map((card) => {
            return <MatchCard key={card.cardId} card={card} props={props} />;
          })}
        </div>
      )}
    </div>
  );
}
