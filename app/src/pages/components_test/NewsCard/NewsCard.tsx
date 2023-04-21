import * as React from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { CardHeader } from '@mui/material';

export interface INewsCard {
  img?: string;
  title?: string;
  summary?: string;
  dateOfPublication?: string;
  sourceTitle?: string;
  category?: string;
}

function getCurrentDate() {
    let today = new Date();
    let date = today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + today.getDate();
    return date + ' 8 hours ago'
}

const NewsCard: React.FC<{ newsCard: INewsCard }> = ({ newsCard }) =>{ 
  return(
    <React.Fragment>
      <Card style={{margin:'0 auto', maxWidth:'65vh', marginBottom: '15px', width:'316px'}}>
        <CardMedia
          sx={{ height: 140 }}
          image={newsCard.img}
          title="try hard"
        />
        <CardHeader
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={newsCard.title}
          subheader={`${newsCard.category} - ${getCurrentDate()}`}
          sx={{fontWeight:'bold'}}
        />
        <CardContent>
          <Typography 
            gutterBottom variant="h6" 
            component="div" 
            style={{fontWeight:'bold'}}
          >
            {newsCard.sourceTitle}    
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {newsCard.summary}
          </Typography>
        </CardContent>
      </Card>
    </React.Fragment>

  )
}

export default NewsCard;