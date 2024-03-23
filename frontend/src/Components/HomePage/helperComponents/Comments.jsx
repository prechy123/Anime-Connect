/* eslint-disable react/prop-types */
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { formatDistanceToNow } from "date-fns";

const Comment = ({ postId, content, user, createdAt }) => {
  return (
    <>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt={user.username} src={user.profilepictureurl} />
        </ListItemAvatar>
        <ListItemText
          primary={user.username}
          secondary={
            <>
              {`${content}  — `}
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
              </Typography>
            </>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
    </>
  );
};

export default Comment;
