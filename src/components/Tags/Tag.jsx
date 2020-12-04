import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import { firstLetter } from '../../utils/format';


export default function Tag(props) {

  const {handleDelete , tag} = props;
  return (
    <Chip
  avatar={<Avatar>{firstLetter(tag.label)}</Avatar>}
        key={tag.id}
        label={tag.label}
        clickable
        //style={{backgroundColor: tag.color }}
        onDelete={()=>handleDelete(tag)}
      />
      
  );
}
