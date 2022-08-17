import React from "react";
import { createUseStyles } from "react-jss";
import { Container } from "reactstrap";

const useStyles = createUseStyles({
  container: {
    backgroundColor: "#FFF",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    border: "4px solid #D0D0D0",
    borderRadius: "4px",
    marginTop: "50px",
    marginBottom: "550px",
  },
  header: {
    fontSize: "25px",
    color: "#CC0000",
    fontWeight: "bold",
    padding: "20px",
  },
  content: {
    fontWeight: "bold",
    paddingBottom: "20px",
  },
});

const NotFound = (props) => {
  const classes = useStyles();

  return (
    <Container className={classes.container}>
      <div className={classes.header}>404 - File or directory not found.</div>
      <div className={classes.content}>
        The resource you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </div>
    </Container>
  );
};

export default NotFound;
