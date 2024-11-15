import './controls.styles.css'
import { Stack } from '@mui/material';
import Button  from '@mui/material/Button';
import React from 'react';

type ControlProps = {
    onGeneratemaze: () => void,
    onDfsTrigger: () => void,
    onBfsTrigger: () => void
}

const Controls: React.FC<ControlProps>=({onGeneratemaze, onDfsTrigger, onBfsTrigger}) =>{
    return (
    <Stack className='buttons' direction='row' spacing={2}>
       <Button className='reset-button' variant='outlined' onClick={onGeneratemaze}>Generate</Button>
       <Button variant='outlined' onClick={onDfsTrigger}>Depth First Search</Button>
       <Button variant='outlined' onClick={onBfsTrigger}>Breadth First Search</Button>
    </Stack>
    )
}

export default Controls