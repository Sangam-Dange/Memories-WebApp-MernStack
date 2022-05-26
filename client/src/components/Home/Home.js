import React, { useEffect, useState } from 'react'
import { Container,Grow, Grid, Paper} from "@material-ui/core";
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import { useDispatch } from 'react-redux';
import { getPosts } from '../../actions/postsAction';
import useStyles from "../../styles"
import Paginate from '../pagination/Pagination';
const Home = ({setUser}) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [currentId, setCurrentId] = useState(null);
    useEffect(() => {
      dispatch(getPosts());
    }, [dispatch,currentId]);
  return (
    <Grow in>
        <Container>
          <Grid
            container
            justifyContent="space-between"
              className={classes.mainContainer}
            alignItems="stretch"
            spacing={3}
          >
            <Grid item xs={12} sm={7}>
              <Posts setCurrentId={setCurrentId} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form setCurrentId={setCurrentId} currentId={currentId} />
              <Paper  elevation={6}>
                  <Paginate/>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Grow>
  )
}

export default Home