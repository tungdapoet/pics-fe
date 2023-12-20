import React from 'react';
import { Box, Typography, Button, Avatar } from '@mui/material';

const bannerImagePath = require('../img/anh.png'); 
const avatarImagePath = require('../img/Profile_image.png');

const Profile = () => (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      minHeight: '200vh',
      bgcolor: '#FFFFFF',
    }}>
      {/* Banner */}
      <Box sx={{
        width: '1000px',
        height: '406px',
        borderRadius: '30px',
        backgroundImage: `url(${bannerImagePath})`, // Make sure the image is in the public/img folder
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        marginBottom: '-100px' // Pushes the avatar up to overlap the banner
      }} />

      {/* Avatar */}
     <Avatar
       src={avatarImagePath}
       alt="User Avatar"
       sx={{
         width: 200,
         height: 200,
         border: '5px solid #A5A58D',
         position: 'relative',
         marginTop: '-100px', // Adjust this value as needed
         zIndex: 1, // Make sure the zIndex is set so the avatar is above the banner
       }}
     />


      {/* User Name and Handle */}
      <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#000', textAlign: 'center' }}>
        Dưa hấu @hauhau
      </Typography>

      {/* User Bio */}
      <Typography sx={{ color: 'text.secondary', textAlign: 'center', marginTop: 2 }}>
        ghét chiến tranh yêu hòa bình yêu bồ câu ghét diều hâu
      </Typography>

      {/* Stats */}
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
        <Box sx={{ textAlign: 'center', marginX: 2 }}>
          <Typography variant="h5">21</Typography>
          <Typography>Shots</Typography>
        </Box>
        <Box sx={{ textAlign: 'center', marginX: 2 }}>
          <Typography variant="h5">238</Typography>
          <Typography>Followers</Typography>
        </Box>
        <Box sx={{ textAlign: 'center', marginX: 2 }}>
          <Typography variant="h5">101</Typography>
          <Typography>Following</Typography>
        </Box>
      </Box>

      {/* Action Buttons */}
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
        <Button variant="outlined" sx={{ marginX: 1, borderColor: '#A5A58D', borderRadius: '10px' }}>Follow</Button>
        <Button variant="outlined" sx={{ marginX: 1, borderColor: '#A5A58D', borderRadius: '10px' }}>Message</Button>
        <Button variant="outlined" sx={{ marginX: 1, borderColor: '#A5A58D', borderRadius: '10px' }}>Block</Button>
      </Box>
    </Box>
  );

export default Profile;
