import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import MatchCard from "./MatchCard";

export default function ({ cards }) {
  const [randomCards, setRandomCards] = useState([]);
  //   const [selectedTerm, setSelectedTerm] = React.useState(null);
  //   const [selectedDef, setSelectedDef] = React.useState(null);
  const [termId, setTermId] = React.useState(null);
  const [isMatched, setIsMatched] = React.useState(false);
  const [isTwoSelected, setIsTwoSelected] = React.useState(false);
  const [isCompleted, setIsCompleted] = React.useState(false);
  const [reset, setReset] = React.useState(false);
  // const [cardId, setCardId] = React.useState(null);

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

  //   useEffect(() => {
  //     const matchChecker = async (e) => {
  //       console.log(selectedDef, selectedTerm);
  //       if (selectedTerm === null && selectedDef === null) {
  //         // setIsMatched(false);
  //         // debugger;
  //         return;
  //       }

  //       if (selectedDef === selectedTerm && selectedTerm !== null) {
  //         console.log("theres a match");
  //         setIsMatched(true);
  //         debugger;
  //       } else {
  //         console.log(false);
  //         setIsMatched(false);
  //         // setReset(true);
  //         debugger;
  //       }
  //       setSelectedTerm(null);
  //       setSelectedDef(null);
  //       setIsMatched(false);
  //       setIsTwoSelected(false);
  //     };
  //     matchChecker();
  //   }, [isTwoSelected]);

  // console.log(randomCards);

  // const handleTermClick = async (e) =>{
  //     const idCard = Number(e.target.id.slice(5));
  //     setSelectedTerm(idCard);
  //     if (selectedDef) {
  //         setIsTwoSelected(true)
  //     }

  // }

  // const handleDefClick = async (e) => {
  //     const idCard = Number(e.target.id.slice(4));
  //     setSelectedDef(idCard);
  //     if (selectedTerm) {
  //         setIsTwoSelected(true)
  //     }

  // }
  const props = {
    // setSelectedDef,
    // setSelectedTerm,
    setIsTwoSelected,
    // selectedDef,
    // selectedTerm,
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
