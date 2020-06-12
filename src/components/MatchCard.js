import React, {useState, useEffect} from 'react'
import Card from '@material-ui/core/Card';

export default function MatchCard({card, props}){
    const { setSelectedDef,
        setSelectedTerm,
        setIsTwoSelected,
        isTwoSelected,
        selectedDef,
        selectedTerm,
        isMatched,
        setIsMatched} = props;

    const [isSelected, setIsSelected] = React.useState(false);
    const [opaqueValue, setOpaqueValue] = React.useState(1);
    const [termColor, setTermColor] = React.useState('lightgray');
    const [defColor, setDefColor] = React.useState('gray');

    useEffect(() => {
        const opaqueCard = async () => {
            if (isMatched && isSelected) {
                setOpaqueValue(0)

            }
        }
        opaqueCard();
    }, [isMatched])

    // useEffect(() => {
    //     const resetSelection = async ()=>{
    //         if (isTwoSelected && !isMatched) {
    //             setIsSelected(false)
    //             setTermColor('lightgray')
    //             setDefColor('gray')
    //         }
    //     }
    //     resetSelection()
    // }, [isTwoSelected])

    const handleTermClick = async (e) => {
        const idCard = Number(e.target.id.slice(5));
        setIsSelected(true)
        setTermColor('yellow')
        setSelectedTerm(idCard);
        if (selectedDef) {
            setIsTwoSelected(true)
        }
        // if (isTwoSelected && !isMatched) {
        //     setIsSelected(false)
        // }
    }

    const handleDefClick = async (e) => {
        const idCard = Number(e.target.id.slice(4));
        setIsSelected(true)
        setDefColor('yellow')
        setSelectedDef(idCard);
        if (selectedTerm) {
            setIsTwoSelected(true);
        }
        // if (isTwoSelected && !isMatched) {
        //     setIsSelected(false)
        // }


    }
    // color: isUpvoted === false ? "#e57373" : "#eeeeee"
    if (card.term) {
        return <Card className="random-cards random-term"
            style={{ 'overflow-y': 'auto',
            backgroundColor: termColor,
            opacity: opaqueValue
             }}

            id={`term-${card.cardId}`}
            onClick={handleTermClick}
        >{card.term}</Card>
    } else {
        return <Card className="random-cards random-def"
            style={{ 'overflow-y': 'auto',
                backgroundColor: defColor,
                opacity: opaqueValue
                }}
            id={`def-${card.cardId}`}
            onClick={handleDefClick}
        >{card.definition}</Card>
    }
}
