import React from "react";
import DialogTitle from "./../Dialog/DialogTitle";
import { withStyles } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import MuiDialogContent from "@material-ui/core/DialogContent";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Dialog,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  media: {
    height: 100,
    width: 100,
    borderRadius: theme.spacing(2),
    margin: "0 auto",
  },
}));

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

/**
 * View order details Modal
 */

export default function ViewOrderDetailModal({
  viewMoreModalData,
  closePostDetailModal,
}) {
  const classes = useStyles();
  let postData = viewMoreModalData.postData;

  return (
    <Dialog
      onClose={closePostDetailModal}
      aria-labelledby="customized-dialog-title"
      open={viewMoreModalData.open}
    >
      <DialogTitle id="customized-dialog-title" onClose={closePostDetailModal}>
        View Details
      </DialogTitle>
      {postData && (
        <DialogContent dividers>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableBody>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell align="left">{postData.title}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Author</TableCell>
                  <TableCell align="left">{postData.author}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Created</TableCell>
                  <TableCell align="left">{postData.created_at}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
      )}
    </Dialog>
  );
}
