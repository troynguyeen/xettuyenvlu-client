import React, {useRef} from 'react'
import { createUseStyles } from "react-jss";
import {useLocation} from 'react-router-dom';

import {
  Container,
  Button,
} from "reactstrap";
import ReactToPrint from 'react-to-print';
import { ComponentToPrint } from './components/ComponentToPrint';

const useStyles = createUseStyles({

  printPage:{
    maxWidth: "85%",
  },

  container: {
    padding: "2 20px",
    paddingLeft: "50px",
    backgroundColor: "white",
    maxWidth: "85%",
    minHeight: "680px",
  },

  tableTitle: {
    color: "#c61d23",
    fontSize: "24px",
    fontWeight: "bold",
    paddingBottom: "5px",
  },
  subTitle: {
    color: "#2F39B1",
    fontSize: "18px",
    fontWeight: "bold",
  },
  containerForm: {
    backgroundColor: "#FFF",
    marginBottom: "50px",
    padding: "10px 20px",
  },
  section: {
    fontSize: "17px",
    backgroundColor: "red",
    color: "#FFF",
    padding: "0 15px",
    marginTop: "10px",
  },
  subSection: {
    fontSize: "15px",
    fontWeight: "bold",
    color: "#097fd9",
    padding: "5px 0",
  },
  line: {
    border: 0,
    borderTop: "1px solid #9e8787",
    margin: "10px 0",
    marginBottom: "30px",
  },
  label: {
    textAlign: "right",
    fontSize: "15px",
  },
  fieldInput: {
    fontSize: "15px",
  },
  require: {
    color: "red",
    paddingLeft: "5px",
  },
  labelRadio: {
    fontSize: "15px",
    marginLeft: "5px",
    marginRight: "20px",
    marginBottom: 0,
  },

  labelSmall: {
    fontSize: "14px",
    fontWeight: "500",
  },

  redText: {
    fontSize: "18px",
    fontWeight: "bold",
    color:"red",    
  },

  boldText: {
    fontSize: "13px",
    fontWeight: "bold",
  },

  smallText:{
    fontSize: "13px",
  },

  table:{
    textAlign: "left",
    borderColor: "#bfbfbf",
    border: "1px solid",
  },

  button: {
    padding: "7px 20px",
    border: 0,
    backgroundColor: "#26a69a",
    "&:hover": {
      backgroundColor: "#1f897f",
    },
  },

  tableTitle:{
    textAlign: "center",
    width: "20%",
    borderColor: "#bfbfbf",
    minWidth: "100px",
    border: "1px solid",
  },

  tableCenter:{
    textAlign: "center",
    borderColor: "#bfbfbf",
    minWidth: "100px",
    border: "1px solid",
    fontSize: "13px",
  },

buttonContainer:{
  textAlign:"center",
},

button1: {
  margin: "5px",
  backgroundColor: "#26a69a",
  "&:hover": {
    backgroundColor: "#1f897f",
  },
},

button2: {
  margin: "5px",
  backgroundColor: "#d4a304",
  "&:hover": {
    backgroundColor: "#997603",
  },
},

button3: {
  margin: "5px",
  backgroundColor: "#3394f5",
  "&:hover": {
    backgroundColor: "#2877c7",
  },
},

});



function Print(){
    const classes = useStyles();
    const componentRef = useRef();

    return(
        <Container className={classes.container}>
        <ComponentToPrint ref={componentRef} />
        <br></br>
        <br></br>
        
        <Container className={classes.buttonContainer}>
            <ReactToPrint
                content={() => componentRef.current}
                
                trigger={() => <Button className={classes.button1}>PRINT</Button>}
            />

        </Container>
        <br></br>
        </Container>
       
    )
}

export default Print