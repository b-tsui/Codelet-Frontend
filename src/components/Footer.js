import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import EmailIcon from '@material-ui/icons/Email';
import "../styles/footer.css"

const useStyles = makeStyles((theme) => ({

  root: {
    display: 'flex',
    flexDirection: 'column',
    width: '100vw',
    justifyContent: "center",

  },
  footer: {
    marginTop: '30px',
    borderBottom: "10px solid black",
    backgroundColor:"black",
    paddingLeft: "40px",
    paddingRight: "40px",
    paddingTop: "8px",
    borderRadius:"60px 60px 0px 0px",
    maxHeight: "95px",
  },
  container: {
    display: "flex",
    flexDirection: "row",
    minWidth: "100%",
    justifyContent: "space-between",
    paddingBottom: "15px",

  },
  devInfo : {
      display: "flex",
      flexDirection: "column",
      textAlign: "center",
      height: "60px",
      justifyContent: "space-between"
  },
  linkContainer: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems:"space-between",
      width: "100px"
  },
}));

export default function StickyFooter() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <footer className={classes.footer}>
        <Typography variant="body1" style={{ fontWeight: "bold", color: "#555555", textAlign: "center", fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif', textDecoration:"underline"}}>About the developers</Typography>
        <div className={classes.container}>
          <div className={classes.devInfo}>
            <Typography variant="body1" style={{ fontWeight: "bold", textAlign: "center",  color: "gray", textAlign: "center", fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'}}>Brandon Tsui</Typography>
            <div id="footer-link-container-1" className={classes.linkContainer}>
              <GitHubIcon onClick={() => window.open("https://github.com/b-tsui", "_blank")}/>
              <LinkedInIcon onClick={() => window.open("https://www.linkedin.com/in/brandon-tsui-72474684/", "_blank")} />
              <EmailIcon/>
            </div>
          </div>
          <div className={classes.devInfo}>
            <Typography variant="body1" style={{ fontWeight: "bold", textAlign: "center", color: "gray", textAlign: "center", fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif' }}>Lizzie Friedman</Typography>
            <div id="footer-link-container-2" className={classes.linkContainer}>
              <GitHubIcon onClick={() => window.open("https://github.com/alizafriedman", "_blank")} />
              <LinkedInIcon onClick={() => window.open("https://www.linkedin.com/in/lisa-kang-a084641aa/", "_blank")} />
              <EmailIcon />
            </div>
          </div>
          <div className={classes.devInfo}>
            <Typography variant="body1" style={{ fontWeight: "bold", textAlign: "center", color: "gray", textAlign: "center", fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif' }}>Lisa Kang</Typography>
            <div id="footer-link-container-3" className={classes.linkContainer}>
              <GitHubIcon onClick={() => window.open("https://github.com/lkang97", "_blank")} />
              <LinkedInIcon onClick={() => window.open("https://www.linkedin.com/in/lisa-kang-a084641aa/", "_blank")} />
              <EmailIcon />
            </div>
          </div>
          <div className={classes.devInfo}>
            <Typography variant="body1" style={{ fontWeight: "bold", textAlign: "center", color: "gray", textAlign: "center", fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif' }}>Chris Talley</Typography>
            <div id="footer-link-container-4" className={classes.linkContainer}>
              <GitHubIcon onClick={() => window.open("https://github.com/christophertalley", "_blank")} />
              <LinkedInIcon onClick={() => window.open("https://www.linkedin.com/in/chris-talley-91814a19b/", "_blank")} />
              <EmailIcon />
            </div>
        </div>
        </div>
      </footer>
    </div>
  );
}
