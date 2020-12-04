import { Box, Grid, makeStyles, Paper, Typography } from "@material-ui/core";
import clsx from "clsx";
import React from "react";

const useStyles = makeStyles((theme) => ({
  plan: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    
    borderBottom: "solid 1px",
    "& > *": {
      display: "flex",
      padding: theme.spacing(1),
      cursor: "pointer",
    },
  },
  root: {
    border: "solid 1px",
    width :190,
    background: "#ccc",
  },
  container : {
    margin: theme.spacing(1),
  },
  header: {
    borderBottom: "solid 1px",
    padding: theme.spacing(2),
  },

  active: {
    color: 'white',
    backgroundImage: " linear-gradient(to right, #000046, #1cb5e0)",
    boxShadow:  "0px 3px 3px -2px rgba(0,0,0,0.2), 0px 3px 4px 0px rgba(0,0,0,0.14), 0px 1px 8px 0px rgba(0,0,0,0.12)",
  },
}));

export function SuscriptionPlanComponent(props) {
  const { plan, onChoose, active } = props;
  const classes = useStyles();
  const plans = [
    {
      title: "Basic",
      description: "Plan de petit artisan",
      ads_creation: 2,
      ads_visit: 50,
      contact_craftsman: 50,
      extension: 30,
      shop: false,
      free_consultation: true,
      personal_page: true,
      technical_assistance: true,
    },
  ];
  return (
    <Box className={classes.container}>
      <Paper elevation={3} className={clsx([classes.root,active && classes.active])}>
        <Grid container md={12}>
          <Grid item md={12} className={classes.header}>
            <Box>
              <Grid container>
                <Grid item md={12} className={"text-center"}>
                  <Typography
                    className={"text-center"}
                    component={"h4"}
                    autoCapitalize
                    variant={"h4"}
                  >
                    Basic
                  </Typography>
                </Grid>
                <Grid item md={12} className={"text-center"}>
                  <Typography component={"span"} >
                    Plan de petit artisan
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid item md={12} className={classes.plan}>
            <Typography variant={"caption"}>Ads Creation</Typography>
            <Typography variant={"caption"}>{plan.ads_creation}</Typography>
          </Grid>
          <Grid item md={12} className={classes.plan}>
            <Typography variant={"caption"}>Visits Ads</Typography>
            <Typography variant={"caption"}>{plan.ads_visit}</Typography>
          </Grid>
          <Grid item md={12} className={classes.plan}>
            <Typography variant={"caption"}>Contact the craftsmen</Typography>
            <Typography variant={"caption"}>
              {plan.ads_contact_craftsmen}
            </Typography>
          </Grid>
          <Grid item md={12} className={classes.plan}>
            <Typography variant={"caption"}>Extension</Typography>
            <Typography variant={"caption"}>{plan.extension}</Typography>
          </Grid>
          <Grid item md={12} className={classes.plan}>
            <Typography variant={"caption"}>Shop</Typography>
            <Typography variant={"caption"}>{plan.shop}</Typography>
          </Grid>
          <Grid item md={12} className={classes.plan}>
            <Typography variant={"caption"}>Free Consultations</Typography>
            <Typography variant={"caption"}>{plan.free_consultation}</Typography>
          </Grid>
          <Grid item md={12} className={classes.plan}>
            <Typography variant={"caption"}>Personal page</Typography>
            <Typography variant={"caption"}>{plan.personal_page}</Typography>
          </Grid>
          <Grid item md={12} className={classes.plan}>
            <Typography variant={"caption"}>Technical assistance</Typography>
            <Typography variant={"caption"}>
              {plan.technical_assistance}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
