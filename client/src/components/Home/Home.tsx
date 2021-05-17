import classes from './Home.module.scss';

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import AppBar from '../AppBar/AppBar';
import MediaCard from '../MediaCard/MediaCard';
import { Box } from '@material-ui/core';
import CarouselWrapper from '../CarouselWrapper/CarouselWrapper';

import DemoCarousel from '../ResponsiveCarousel/ResponsiveCarousel';

const useStyles = makeStyles((theme: any) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

const styles = {
  root: {
    paddingLeft: '150px',
  },
};

export default function Home() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={4}
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
      >
        <Grid item xs={12}>
          <Grid item xs={12}>
            <AppBar />
          </Grid>
        </Grid>
        <Grid item xs={4}>
          <Grid
            container
            spacing={4}
            direction="column"
            justify="flex-start"
            alignItems="flex-start"
          >
            <Grid item xs={4}>
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
              erat, sed diam voluptua. At vero eos et accusam et justo duo
              dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
              sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit
              amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
              invidunt ut labore et dolore magna aliquyam erat, sed diam
              voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
              Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum
              dolor sit amet.
            </Grid>
            <Grid item xs={4}>
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
              erat, sed diam voluptua. At vero eos et accusam et justo duo
              dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
              sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit
              amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
              invidunt ut labore et dolore magna aliquyam erat, sed diam
              voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
              Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum
              dolor sit amet.
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={8}>
          <Grid item xs={12}>
            <Grid
              container
              spacing={4}
              direction="row"
              justify="flex-start"
              alignItems="flex-start"
            >
              <Grid item xs={8}>
                {/* Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                diam nonumy eirmod tempor invidunt ut labore et dolore magna
                aliquyam erat, sed diam voluptua. At vero eos et accusam et
                justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
                takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum
                dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
                eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
                sed diam voluptua. At vero eos et accusam et justo duo dolores
                et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus
                est Lorem ipsum dolor sit amet. */}
              </Grid>
              <Grid item xs={8}>
                {/* <CarouselWrapper /> */}
                <DemoCarousel className={classes.root} />
              </Grid>
              <Grid item xs={8}>
                <Grid container spacing={3}>
                  <Grid item xs={3}>
                    <Box m={-1}>
                      <MediaCard />
                    </Box>
                  </Grid>
                  <Grid item xs={3}>
                    <Box m={-1}>
                      <MediaCard />
                    </Box>
                  </Grid>
                  <Grid item xs={3}>
                    <Box m={-1}>
                      <MediaCard />
                    </Box>
                  </Grid>
                  <Grid item xs={3}>
                    <Box m={-1}>
                      <MediaCard />
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
