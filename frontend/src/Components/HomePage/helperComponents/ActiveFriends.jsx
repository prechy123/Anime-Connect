import { Avatar, AvatarGroup, Box, Typography } from "@mui/material";

const ActiveFriends = () => {
  return (
    <Box>
      <Typography variant="h6" fontWeight={100} x>
        Online Friends
      </Typography>
      <AvatarGroup max={8}>
        <Avatar
          alt="Remy Sharp"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwiVqpNd0zv349lznWpZI0-KKoEyp-sFiA_g&usqp=CAU"
        />
        <Avatar
          alt="Travis Howard"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTP6-MfoJ0MLH3ZH7oIyNvP_PfLRoYI-ZgPeQ&usqp=CAU"
        />
        <Avatar
          alt="Cindy Baker"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnnu6obVk9X7KpF7ddIVK0Xukk7GK5uWC1GA&usqp=CAU"
        />
        <Avatar alt="Agnes Walker" src="" />
        <Avatar
          alt="Trevor Henderson"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwWuvJHLqnpwQKedQusejSFEL-9Y3grrH4vQ&usqp=CAU"
        />
        <Avatar
          alt="Cindy Baker"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnnu6obVk9X7KpF7ddIVK0Xukk7GK5uWC1GA&usqp=CAU"
        />
        <Avatar
          alt="Cindy Baker"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTE5fPhctwNLodS9VmAniEw_UiLWHgKs0fs1w&usqp=CAU"
        />
        <Avatar
          alt="Travis Howard"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTP6-MfoJ0MLH3ZH7oIyNvP_PfLRoYI-ZgPeQ&usqp=CAU"
        />
        <Avatar
          alt="Travis Howard"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTP6-MfoJ0MLH3ZH7oIyNvP_PfLRoYI-ZgPeQ&usqp=CAU"
        />
      </AvatarGroup>
    </Box>
  );
};

export default ActiveFriends;
