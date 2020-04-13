import React from "react";
import { Button, Typography, Card, Box, makeStyles } from "@material-ui/core";
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1, 1),
  },
  descriptionContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  buttonContainer: {
    textAlign: "Center",
  },
  elipsis: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
}));

/**
 * Post component
 */

function Post({ postData, handleViewMore }) {
  const classes = useStyles();
  
  return (
    <Card className={classes.root}>
      <Box className={classes.titleContainer}>
        <Typography variant="h6" gutterBottom className={classes.elipsis}>
          {postData.title}
        </Typography>
      </Box>
      <Box className={classes.descriptionContainer}>
        <Box className={classes.autherContainer}>
          <Typography variant="subtitle2" gutterBottom>
            Author: <strong>{postData.author} </strong>
          </Typography>
        </Box>
        <Box className={classes.dateContainer}>
          <Typography variant="subtitle2" gutterBottom>
            {postData.created_at}
          </Typography>
        </Box>
      </Box>
      <Box className={classes.buttonContainer}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleViewMore(postData)}
        >
          View More
        </Button>
      </Box>
    </Card>
  );
}

Post.propTypes = {
  PostData: PropTypes.object,
  handleViewMore: PropTypes.func,
};

export default Post;
