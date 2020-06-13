import React, { useState, useEffect } from 'react'
import '../styles/quiz-page.css'

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

const CardQuiz = ({ cards, value }) => {
    const classes = useStyles();
    const [questionDef, setQuestionDef] = useState('');
    const [answer, setAnswer] = useState('');
    const [terms, setTerms] = useState([]);
    const [correct, setCorrect] = useState(false)

    useEffect(() => {
        const createQuestion = () => {

            let randomIndex = [];
            while (randomIndex.length < 4) {
                let r = Math.floor(Math.random() * cards.length);
                if (randomIndex.indexOf(r) === -1) randomIndex.push(r);
            }

            let questionCard = cards[randomIndex[0]];
            let qDef = questionCard.definition;
            let answer = questionCard.term;
            let qTerm1 = cards[randomIndex[1]].term;
            let qTerm2 = cards[randomIndex[2]].term;
            let qTerm3 = cards[randomIndex[3]].term;

            setQuestionDef(qDef);
            setAnswer(answer);
            let allTerms = [answer, qTerm1, qTerm2, qTerm3];
            let randomizedTerms = allTerms.sort(function () {
                return 0.5 - Math.random();
            });
            setTerms(randomizedTerms);
        }
        createQuestion();
    }, [correct])

    const checkAnswer = (e) => {
        let ele = e.target;
        let definitionEle = document.getElementById('card-quiz-definition');
        if (answer === e.target.id) {
            ele.style.backgroundColor = "#00897b";
            definitionEle.style.backgroundColor = "#00897b";
            setCorrect(!correct);

        } else {
            ele.style.backgroundColor = "red";
        }
        setTimeout(() => {
            ele.style.backgroundColor = "lightgray";
            definitionEle.style.backgroundColor = "#18212b";
        }, 500)
    }

    return (
        <div className='card-quiz-container'>
            <div className='card-quiz-definition'>
                <Card className={classes.root, 'card-quiz-definition'} id='card-quiz-definition' variant="outlined">
                    <CardContent>
                        <Typography variant='subtitle1' component='h2'>
                            {questionDef}
                        </Typography>
                    </CardContent>
                </Card>
            </div>
            <div className='card-quiz-terms-container'>
                <List component="nav" aria-label="quiz answers list" className='card-quiz-terms-container'>
                    {terms.map((term) => <ListItem button id={term} className={'card-quiz-term'} onClick={checkAnswer}>{term}</ListItem>)}
                </List>
            </div>
        </div >
    )
}

export default CardQuiz;