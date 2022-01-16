import React from 'react';
import Box from '@mui/material/Box';


const TileBox = ({handleClick, img, borderColor}) => {

    const getColor = () => {
        switch(borderColor) {
            case 'RED':
                return '#f44336'; //500
            case 'BLUE':
                return '#2962ff'; //A700
            default:
                return borderColor;
        }
    };

    return (
        <Box
        component="button"
        onClick={handleClick}
        disabled={borderColor ? true : false}
        sx={{
            height: 170,
            width: '15vw',
            backgroundImage: `url(${img})`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: '50% 50%',
            backgroundColor: 'white',
            border: borderColor ? `10px solid ${getColor()}` : '2px solid black',
            borderRadius: '8px',
            '&:hover': borderColor ? "" : {
                border: '3px solid black',
                opacity: [0.9, 0.8, 0.7],
            },
        }}
    />
    );

}

export default TileBox;
