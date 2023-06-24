import VideoForm from 'components/VideoForm'
import React, { useEffect } from 'react'
import { generateGUID, getCookie, setCookie } from 'utils/cookie'

function StartPage() {
  return (
    <VideoForm />
  )
}

export default StartPage