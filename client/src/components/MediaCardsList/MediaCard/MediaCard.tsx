import React, { MouseEvent } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import PropTypes from 'prop-types';
import { useHistory } from 'react-router';

import localStyle from './MediaCard.module.scss';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 240,
  },
});

interface Props {
  title: string;
  description: string;
  imagePath: string;
  id: number;
}

const MediaCard = ({
  imagePath,
  title,
  description,
  id,
}: Props): JSX.Element => {
  const classes = useStyles();

  const history = useHistory();

  const clickHandler = () => {
    history.push(`/gamechat/${id}`);
  };

  return (
    <Card className={classes.root} onClick={clickHandler}>
      <CardActionArea>
        <CardMedia className={classes.media} image={imagePath} title={title} />
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="h2"
            classes={{ root: localStyle.title }}
          >
            {title}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            classes={{ root: localStyle.description }}
          >
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
      {/**
       *
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions>
       */}
    </Card>
  );
};

MediaCard.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  imagePath: PropTypes.string,
  id: PropTypes.number,
};

export default MediaCard;
