import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  IconButton,
  Typography,
  Collapse,
} from "@material-ui/core/";
import { red } from "@material-ui/core/colors";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import ConfirmDialog from "./confirmDialog";
import { Context as ApiContext } from "../context/ApiContext";

import { Dialog } from "@material-ui/core";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import Carousel from "./Carousel";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 500,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function DisasterCard({
  open,
  onClose,
  incident,
  admin,
  images,
  editOpen,
}) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const { deleteIncident } = useContext(ApiContext);

  const handleDelete = async () => {
    handleClose();
    await deleteIncident(incident.id);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const handleClose = () => {
    onClose();
  };
  return (
    <Dialog open={open} onClose={handleClose}>
      <Card className={classes.root}>
        <CardHeader
          title={incident.disasterTypeName}
          subheader={incident.incidentDate}
          action={
            <>
              {admin && (
                <>
                  <IconButton
                    aria-label="edit"
                    onClick={() => {
                      editOpen(true);
                      handleClose();
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    onClick={() => setConfirmOpen(true)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </>
              )}

              <IconButton
                className={clsx(classes.expand, {
                  [classes.expandOpen]: expanded,
                })}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </IconButton>
            </>
          }
        />
        {images && images.length > 0 && <Carousel images={images} />}
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {incident.comment}
          </Typography>
        </CardContent>
        <CardActions disableSpacing></CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography>Total Death : {incident.totalDeath}</Typography>
            <Typography>Missing People {incident.missingPeople}</Typography>
            <Typography>Estimated Loss : {incident.estimatedLoss}</Typography>
            <Typography>Affected Family : {incident.affectdFamily}</Typography>
            <Typography>Injured : {incident.injured}</Typography>
            <Typography>Damaged Houses : {incident.damagedHouses} </Typography>
            <Typography>Website : {incident.website} </Typography>
          </CardContent>
        </Collapse>
      </Card>
      <ConfirmDialog
        title="Delete Incident?"
        open={confirmOpen}
        setOpen={setConfirmOpen}
        onConfirm={handleDelete}
      >
        Are you sure you want to delete this incidents?
      </ConfirmDialog>
    </Dialog>
  );
}
