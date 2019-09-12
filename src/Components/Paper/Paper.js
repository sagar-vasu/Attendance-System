import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
// import "./paper.css";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
    marginTop:'50px !important',

  }
}));

export default function PaperSheet(props) {
  const classes = useStyles();

  return (
    <div>
      <Paper className={classes.root} >
        {props.children}
      </Paper>
    </div>
  );
}
