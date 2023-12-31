import axios from "axios";
import { useEffect, useState } from "react";
import { API } from "utils/config";
import { Input, Button } from "@mui/material";
import { generateGUID, getCookie, setCookie } from "utils/cookie";
import "./style.scss";

function VideoForm() {
  const [file, setfile] = useState<Blob | null>(null)
  const [clientId, setclientId] = useState('')
  const [videoId, setvideoId] = useState('')
  const [fileName, setfileName] = useState('')

  useEffect(() => {
    let clientId = getCookie('clientId')

    if (!clientId) {
      clientId = generateGUID()
      setCookie('clientId', generateGUID(), 7)
    }

    setclientId(clientId)
  }, [])

  function handleFileChange(event: any) {
    const videoFile = event.target.files[0]
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.result) {
        const blob = new Blob([reader.result], { type: videoFile.type });
        setvideoId(generateGUID())
        setfile(blob)
        setfileName(videoFile.name)
      }
    }
    reader.readAsArrayBuffer(videoFile);
  }

  async function handleSubmit(event: any) {
    event.preventDefault();
    if (!file) {
      return
    }

    const videos = getCookie('videos')
    console.log(videos);

    if (!videos) {
      setCookie('videos', `${videoId}:${fileName}`, 1000)
    } else {
      setCookie('videos', `${videos},${videoId}:${fileName}`, 1000)
    }

    const CHUNK_SIZE = 102400; // Размер чанка (в байтах)

    const totalChunks = Math.ceil(file.size / CHUNK_SIZE);
    console.log('total chunks ' + totalChunks);

    let currentChunk = 0;

    while (currentChunk < totalChunks) {
      const start = currentChunk * CHUNK_SIZE;
      const end = Math.min(start + CHUNK_SIZE, file.size);
      const chunk = file.slice(start, end);
      const formData = new FormData();
      formData.append('video_id', videoId)
      formData.append('client_id', clientId)
      formData.append('chunk', chunk);
      formData.append('chunk_id', `${currentChunk}`)
      if (currentChunk == totalChunks - 1) {
        formData.append('complete', 'true')
      } else {
        formData.append('complete', 'false')
      }

      try {
        await axios.post(`${API}/upload-video`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        console.log(currentChunk);
      } catch (error) {
        console.error('Error uploading chunk:', error);
        // Обработка ошибки при загрузке чанка
      }

      // TODO: ставить счетчики для запросов
      currentChunk++;
      console.log(currentChunk);
    }

    // Все чанки загружены
    console.log('Video upload complete!');
  }

  return (
    <form className="video-form" onSubmit={handleSubmit}>
      <Input type="file" onChange={handleFileChange} />
      <div className="video-form__submit">
        <Button className="video-form__submit" type="submit" variant="outlined" >Загрузить видео</Button>
      </div>
    </form>
  );
}

export default VideoForm
