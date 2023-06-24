import { Avatar, Box, Button, Card, CardActions, CardContent, Container, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material'
import Layout from 'components/Layout'
import VideoForm from 'components/VideoForm'
import React, { useEffect } from 'react'
import "./style.scss";
import { getCookie } from 'utils/cookie';
import { deepOrange } from '@mui/material/colors';

function VideoPage() {
  return (
    <Layout className='start-page'>
      <List>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              {/* <FolderIcon /> */}
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary="Single-line item"
            secondary={'Secondary text'}
          />
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              {/* <FolderIcon /> */}
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary="Single-line item"
            secondary={'Secondary text'}
          />
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              {/* <FolderIcon /> */}
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary="Single-line item"
            secondary={'Secondary text'}
          />
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              {/* <FolderIcon /> */}
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary="Single-line item"
            secondary={'Secondary text'}
          />
        </ListItem>
      </List>
    </Layout>
  )
}

export default VideoPage