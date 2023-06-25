import { Avatar, Box, Button, Card, CardActions, CardContent, Container, List, ListItem, ListItemAvatar, ListItemText, Modal, Typography } from '@mui/material'
import Layout from 'components/Layout'
import VideoForm from 'components/VideoForm'
import React, { useEffect, useState } from 'react'
import "./style.scss";
import { getCookie } from 'utils/cookie';
import { deepOrange } from '@mui/material/colors';
import MovieIcon from '@mui/icons-material/Movie';
import AddIcon from '@mui/icons-material/Add';

function VideoPage() {
  const [videos, setvideos] = useState<string[]>([])
  const [open, setopen] = useState<boolean>(false)

  useEffect(() => {
    const cookie = getCookie('videos')
    if (cookie) {
      setvideos(cookie.split(','))
    }
  }, [])


  return (
    <Layout className='start-page'>
      <div className='start-page__list'>
        <Button variant="outlined" startIcon={< AddIcon />} onClick={() => setopen(true)}>
          Добавить видео
        </Button>
        <List>
          {videos.map(v =>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <MovieIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={v.split(':')[1]}
                secondary={`GUID: ${v.split(':')[0]}`}
              />
            </ListItem>
          )}
        </List>
      </div>
      <Modal
        open={open}
        onClose={() => setopen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ background: 'white', position: 'absolute', top: '40vh', left: '35vh', padding: '64px', borderRadius: '20px' }}>
          <Typography id="modal-modal-title" variant="h5" component="h2">
            <VideoForm />
          </Typography>
        </Box>
      </Modal>
    </Layout>
  )
}

export default VideoPage