import React from 'react';
import Box from '@mui/material/Box';


const TileBox = ({handleClick, img, borderColor}) => (

    <Box
        component="button"
        onClick={handleClick}
        sx={{
            height: 170,
            width: '15vw',
            backgroundImage: `url(${img})`,
            backgroundSize: 'cover',
            border: `3px solid ${borderColor}`,
            borderRadius: '4px',
            '&:hover': {
            backgroundColor: 'primary.main',
            opacity: [0.9, 0.8, 0.7],
            },
        }}
    />             
)

export default TileBox;