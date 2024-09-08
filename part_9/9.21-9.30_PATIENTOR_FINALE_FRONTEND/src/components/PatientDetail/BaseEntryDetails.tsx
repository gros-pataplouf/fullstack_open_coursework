import React from 'react'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import { Entry } from '../../types'

interface EntryDetailProps {
    entry: Entry;
    children: React.JSX.Element[]
}


function BaseEntryDetails(props : EntryDetailProps) : React.JSX.Element {
    const {entry, children} = props;
    const [icon, ...rest] = children;


  return (
    <Box
    component="span"
    >
    <Card style={{backgroundColor:"lightblue", marginBottom: "5px", boxShadow: "1px, 2px, 0px, 0px", border: "1px solid blue"}}>
    <CardContent>
    
    <p>{icon} {entry.date}</p>
    <p>Treating physician: {entry.specialist}</p>
    <p><em>{entry.description}</em></p>
    {rest}
    </CardContent>
    </Card>
    </Box>
  )
}

export default BaseEntryDetails