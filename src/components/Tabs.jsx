import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import { NavLink } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    width: 500,
    fontSize: "50px",
  },
  link: {
    textDecoration: "none",
  },
});

export default function SimpleBottomNavigation() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      className={classes.root}
    >
      <NavLink to="/" className={classes.link}>
        <BottomNavigationAction label="HOME" showLabel />
      </NavLink>

      <NavLink to="/flood" className={classes.link}>
        <BottomNavigationAction label="FLOOD" showLabel />
      </NavLink>

      <NavLink to="/fire" className={classes.link}>
        <BottomNavigationAction label="FIRE" showLabel />
      </NavLink>

      <NavLink to="/earthquake" className={classes.link}>
        <BottomNavigationAction label="EARTHQAKE" showLabel />
      </NavLink>
    </BottomNavigation>
  );
}
