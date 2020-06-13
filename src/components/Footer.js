import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import EmailIcon from '@material-ui/icons/Email';

const useStyles = makeStyles((theme) => ({

  footer: {
    padding: "10px",
    paddingLeft: "40px",
    paddingRight: "40px",
    marginTop: '30px',
    backgroundColor:"black",
  },
  container: {
    display: "flex",
    flexDirection: "row",
    minWidth: "100%",
    justifyContent: "space-between"
  },
  devInfo : {
      display: "flex",
      flexDirection: "column",
      textAlign: "center"
  },
  linkContainer: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems:"space-between"
  }
}));

export default function StickyFooter() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <footer className={classes.footer}>
              <Typography variant="body1" style={{ color: "lightgray", textAlign: "center", fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'}}>About the developers:</Typography>
        <div className={classes.container}>
          <div className={classes.devInfo}>
            <Typography variant="body1" style={{textAlign: "center"}}>Brandon Tsui</Typography>
            <div className={classes.linkContainer}>
                <a>
                    <GitHubIcon/>
                </a>
                <a>
                    <LinkedInIcon/>
                </a>
                <a>
                    <EmailIcon/>
                </a>
            </div>
          </div>
          <div className={classes.devInfo}>
            <Typography variant="body1">Lizzie Friedman</Typography>
            <div className={classes.linkContainer}>
                <a>
                    <GitHubIcon />
                </a>
                <a>
                    <LinkedInIcon />
                </a>
                <a>
                    <EmailIcon />
                </a>
            </div>
          </div>
          <div className={classes.devInfo}>
            <Typography variant="body1">Lisa Kang</Typography>
            <div className={classes.linkContainer}>
                <a>
                    <GitHubIcon />
                </a>
                <a>
                    <LinkedInIcon />
                </a>
                <a>
                    <EmailIcon />
                </a>
            </div>
          </div>
          <div className={classes.devInfo}>
            <Typography variant="body1">Chris Talley</Typography>
            <div className={classes.linkContainer}>
                <a>
                    <GitHubIcon />
                </a>
                <a>
                    <LinkedInIcon />
                </a>
                <a>
                    <EmailIcon />
                </a>
            </div>
        </div>
        </div>
      </footer>
    </div>
  );
}
