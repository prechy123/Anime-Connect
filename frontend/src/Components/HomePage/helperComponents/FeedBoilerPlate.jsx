import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Checkbox,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import {
  AccessTime,
  Comment,
  Favorite,
  FavoriteBorder,
  MoreVert,
  Share,
} from "@mui/icons-material";

import { formatDistanceToNow } from "date-fns";

const FeedBoilerPlate = ({
  username,
  fullname,
  content,
  likeCount,
  comments,
  commentsCount,
  shareCount,
  profilepictureurl,
  createdAt,
}) => {
  const theme = useTheme();
  return (
    <Card sx={{ margin: 5, backgroundColor: theme.palette.primary.other }}>
      <CardHeader
        avatar={<Avatar alt={username} src={profilepictureurl} />}
        action={
          <IconButton aria-label="settings">
            <MoreVert />
          </IconButton>
        }
        title={fullname}
        subheader={"@" + username}
      />

      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {content}
        </Typography>
      </CardContent>
      <CardActions
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: "10px",
        }}
      >
        <Box sx={{ display: "flex" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Checkbox
              icon={<FavoriteBorder />}
              checkedIcon={<Favorite sx={{ color: "red" }} />}
              aria-label="like post"
            />

            <Typography>{likeCount}</Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton aria-label="Like Post">
              <Comment />
            </IconButton>
            <Typography>{commentsCount}</Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton aria-label="share">
              <Share />
            </IconButton>
            <Typography>{shareCount}</Typography>
          </Box>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton aria-label="share">
            <AccessTime />
          </IconButton>
          <Typography>
            {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
          </Typography>
        </Box>
      </CardActions>
    </Card>
  );
};

export default FeedBoilerPlate;
