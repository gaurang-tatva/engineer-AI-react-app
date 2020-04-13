import React, { useState, useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Post from "./../../Components/Post/Post";
import ViewPostDetails from "../../Components/Post/ViewPostDetails";
import { PER_PAGE_RECORD, API_CALL_TIMER } from "./../../Helpers/Constants";
import API from "../../API/API";
import {
  Grid,
  Box,
  CircularProgress,
  TablePagination,
  TextField,
  makeStyles,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    height: "100%",
    overflow: "auto",
    backgroundColor: theme.palette.action.selected,
    paddingBottom: theme.spacing(1),
  },
  searchContainer: {
    paddingBottom: theme.spacing(2),
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  searchInput: {
    width: "100%",
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  progressBarContainer: {
    padding: theme.spacing(2),
    textAlign: "center",
  },
  postListContainer: {
    padding: theme.spacing(2),
  },
  noResultFoundContainer: {
    textAlign: "center",
    padding: theme.spacing(2),
  },
  progressbarContainer: {
    textAlign: "center",
    padding: theme.spacing(4, 4),
  },
}));

const api = new API();
/**
 * Posts Listing component
 */
export default function Posts() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [apiPageNumber, setApiPageNumber] = useState(1);
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
  const [isBusy, setIsbusy] = useState(true);
  const [rowsPerPage, setRowsPerPage] = useState(PER_PAGE_RECORD);
  const [viewMoreModalData, setViewMoreModalData] = useState({
    open: false,
    postData: null,
  });

  useEffect(() => {
    api
      .get(`search_by_date?tags=story&page=${apiPageNumber}`)
      .then((respone) => {
        const combinePosts = [...postList, ...respone.hits];
        dispatch({
          type: "FETCH_DATA",
          postList: combinePosts,
        });
        setIsbusy(false);
      });
  }, [apiPageNumber, dispatch]);

  useEffect(() => {
    const interval = setInterval(() => {
      setApiPageNumber((apiPageNumber) => apiPageNumber + 1);
    }, API_CALL_TIMER);
    return () => {
      clearInterval(interval);
    };
  }, []);

  // GET DATA FROM REDUX
  const postList = useSelector((state) => state.Post.postList);

  // SET SEARCH
  const handleSearch = useCallback((e) => {
    setSearch(e.target.value);
  }, []);

  // PAGINATION OBJ
  let filteredPostList = [...postList];

  // SEARCH DATA
  if (search) {
    filteredPostList = filteredPostList.filter((post) => {
      const { title } = post;
      return title.toLowerCase().includes(search.toLowerCase());
    });
  }

  filteredPostList = filteredPostList.splice(page * rowsPerPage, rowsPerPage);

  // PAGINATION
  const handleChangePage = useCallback((event, newPage) => {
    setPage(newPage);
  }, []);

  const handleChangeRowsPerPage = useCallback((event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }, []);

  // REST THE MODAL DATA
  const closePostDetailModal = useCallback(() => {
    setViewMoreModalData({
      open: false,
      postData: null,
    });
  }, []);

  // OPEN THE VIEW MODAL
  const handleViewMore = useCallback((postData) => {
    setViewMoreModalData({
      open: true,
      postData,
    });
  }, []);

  return (
    <Box className={classes.root}>
      {isBusy ? (
        <Box className={classes.progressbarContainer}>
          <CircularProgress />
        </Box>
      ) : (
        <Box className={classes.postListContainer}>
          <Box className={classes.searchContainer}>
            <TextField
              id="outlined-basic"
              label="Search post"
              variant="outlined"
              onKeyUp={handleSearch}
              className={classes.searchInput}
            />
          </Box>
          {filteredPostList && filteredPostList.length ? (
            <React.Fragment>
              <Grid
                container
                spacing={3}
                direction="row"
                justify="flex-start"
                alignItems="center"
              >
                {filteredPostList.map((item, index) => (
                  <Grid item lg={6} sm={12} xs={12} key={index}>
                    <Post postData={item} handleViewMore={handleViewMore} />
                  </Grid>
                ))}
              </Grid>
              {!search && (
                <TablePagination
                  rowsPerPageOptions={[12, 24, 36]}
                  component="div"
                  count={postList.length}
                  page={page}
                  rowsPerPage={rowsPerPage}
                  onChangePage={handleChangePage}
                  onChangeRowsPerPage={handleChangeRowsPerPage}
                />
              )}
            </React.Fragment>
          ) : (
            <Box className={classes.noResultFoundContainer}>
              <Typography variant="body1"> No data found </Typography>
            </Box>
          )}
        </Box>
      )}
      <ViewPostDetails
        viewMoreModalData={viewMoreModalData}
        closePostDetailModal={closePostDetailModal}
      />
    </Box>
  );
}
