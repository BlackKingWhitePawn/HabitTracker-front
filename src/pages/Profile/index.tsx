import { Box, Button, Card, CardActions, CardContent, Container, Typography } from '@mui/material'
import Layout from 'components/Layout'
import VideoForm from 'components/VideoForm'
import React, { useEffect } from 'react'
import "./style.scss";
import { getCookie } from 'utils/cookie';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

function ProfilePage() {
  return (
    <Layout className='start-page'>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Информация о профиле
          </Typography>
          <Typography variant="h5" component="div">
            Имя Пользователя
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            <i>GUID: {getCookie('clientId')}</i>
          </Typography>
          <Typography variant="body2">
            Описание
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Редактировать профиль</Button>
        </CardActions>
      </Card>
    </Layout>
  )
}

export default ProfilePage