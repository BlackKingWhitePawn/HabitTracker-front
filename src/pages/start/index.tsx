import { Container } from '@mui/material'
import Layout from 'components/Layout'
import VideoForm from 'components/VideoForm'
import React, { useEffect } from 'react'
import "./style.scss";

function StartPage() {
  return (
    <Layout className='start-page'>
      <Container className='start-page__container'>
        <VideoForm />
      </Container>
    </Layout>
  )
}

export default StartPage