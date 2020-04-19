import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

const useStyles = makeStyles({
  root: {
    maxWidth: 320,
  },
  button: {
      width: '200px',
      justifyContent: 'center',
      color: '#3E9B4C'
  }
});

export default function ImgMediaCard(e) {
    const classes = useStyles();
  return (
    <Card className={classes.root}>
        <CardActionArea>
            <CardMedia
                component="img"
                alt={e.size}
                height="400"
                image={e.image}
                title="Contemplative Reptile"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                    {e.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                    across all continents except Antarctica
                </Typography>
            </CardContent>
        </CardActionArea>
        <CardActions style={{justifyContent: 'center'}}>
            <Button
                color="default"
                className={classes.button}
                startIcon={<ShoppingCartIcon />}
            >
                Add to Cart
            </Button>
        </CardActions>
    </Card>
  );
}