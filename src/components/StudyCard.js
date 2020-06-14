import React, { useState } from "react";
import ReactCardFlip from "react-card-flip";
import MobileStepper from "@material-ui/core/MobileStepper";
import Button from "@material-ui/core/Button";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import "../styles/cards.css";
import '../styles/study-card.css'


const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 500,
    flexGrow: 1,
    fontWeight: 400
  },
  card: {
    backgroundColor: "#2b3238",
    display: "flex",
    minWidth: 500,
    minHeight: 300,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "12px 12px 0px 0px",
    border: "1px solid #00897b",
    color: "darkgrey",
    boxSizing: "border-box",
    overflow: "auto",
    alignSelf: "start"
  },
  title: {
    fontSize: 14,
  },
}));

export default function StudyCard({ cards }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = cards.length;
  const classes = useStyles();

  const theme = useTheme();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleClick = (e) => {
    e.preventDefault();
    setIsFlipped(!isFlipped);
  };

  return (
    <>
      {cards && (
        <div className={classes.root}>
          <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
            <Card id="front-study-card" className={classes.card} onClick={handleClick}>
              <CardContent className={classes.cardText}>
                <Typography component="h3" variant={classes.title} style={{ fontWeight: 400 }}>
                  {cards[activeStep].term}
                </Typography>
              </CardContent>
            </Card>
            <Card id="back-study-card" className={classes.card} onClick={handleClick}>
              <CardContent className={classes.cardText, 'study-card-def'}>
                <Typography component="h3" variant={classes.title} style={{ fontWeight: 400 }}>
                  {cards[activeStep].definition}
                </Typography>
              </CardContent>
            </Card>
          </ReactCardFlip>
          <MobileStepper
            id="card-stepper"
            steps={maxSteps}
            position="static"
            variant="text"
            activeStep={activeStep}
            nextButton={
              <Button
                size="small"
                onClick={handleNext}
                disabled={activeStep === maxSteps - 1}
                color="secondary"
              >
                Next
                {theme.direction === "rtl" ? (
                  <KeyboardArrowLeft />
                ) : (
                    <KeyboardArrowRight />
                  )}
              </Button>
            }
            backButton={
              <Button
                color="secondary"
                size="small"
                onClick={handleBack}
                disabled={activeStep === 0}
              >
                {theme.direction === "rtl" ? (
                  <KeyboardArrowRight />
                ) : (
                    <KeyboardArrowLeft />
                  )}
                Back
              </Button>
            }
          />
        </div>
      )
      }
    </>
  );
}
