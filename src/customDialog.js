import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function CustomDialog(props) {
  const { open, title, contentText, 
    handlePositive, handleNegative, 
    stateOver, stateReset 
  } = props;

  // TODO Make this a generic custom dialog
  // TODO Add in feature for confirm reset game(done), confirm play bot
  return (
    <Dialog open={open}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
            <DialogContentText>
                {contentText}
            </DialogContentText>
        </DialogContent>
        {stateOver &&
          <DialogActions>
            <Button onClick={handlePositive}>Restart</Button>
            <Button onClick={handleNegative}>Cancel</Button>
          </DialogActions>
        }
        {stateReset &&
          <DialogActions>
            <Button onClick={handlePositive}>Yes</Button>
            <Button onClick={handleNegative}>No</Button>
        </DialogActions>
        }
    </Dialog>
  );
}