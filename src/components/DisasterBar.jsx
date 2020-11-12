import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import {
    Container,
    Select,
    Grid,
    Icon,
    Menu,
    MenuItem,
} from "@material-ui/core";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";

export default function ButtonAppBar({
    disasterTypeNames,
    handleChange,
    type,
    user,
    setSourceOpen,
    handleCreate,
    handleClick,
}) {
    return (
        <AppBar position="static">
            <Toolbar>
                {/* <IconButton edge="start" color="inherit" aria-label="menu">
                    <MenuIcon />
                </IconButton> */}
                <Container>
                    <Grid
                        container
                        direction="row"
                        alignItems="center"
                        justify="space-between"
                    >
                        <Grid item>
                            <Select
                                value={type}
                                onChange={handleChange}
                                variant="outlined"
                                style={{
                                    color: "white",
                                }}
                                IconComponent={KeyboardArrowDownIcon}
                            >
                                <MenuItem value="All">
                                    <Typography variant="h6">
                                        {" "}
                                        All Disasters
                                    </Typography>
                                </MenuItem>
                                {disasterTypeNames &&
                                    disasterTypeNames.map((item) => (
                                        <MenuItem value={item.disasterTypeName}>
                                            <Typography variant="h6">
                                                {item.disasterTypeName}
                                            </Typography>
                                        </MenuItem>
                                    ))}
                            </Select>
                        </Grid>
                        <Grid item>
                            {user && [
                                <Button
                                    style={{ color: "white" }}
                                    onClick={() => {
                                        setSourceOpen(true);
                                    }}
                                    key="1"
                                >
                                    Add Source
                                </Button>,
                                <Button
                                    style={{ color: "white" }}
                                    onClick={handleCreate}
                                    key="2"
                                >
                                    Create User
                                </Button>,
                            ]}
                            <Button
                                color="yellow"
                                style={{ color: "white" }}
                                onClick={handleClick}
                            >
                                {user ? "Sign Out" : "Sign In"}
                            </Button>
                        </Grid>
                    </Grid>
                </Container>
            </Toolbar>
        </AppBar>
    );
}
