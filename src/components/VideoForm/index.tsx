import axios from "axios";
import { useEffect, useState } from "react";
import { API } from "utils/config";
import { } from "@mui/material/Tooltip";
import { generateGUID, getCookie, setCookie } from "utils/cookie";

function VideoForm() {
  const [file, setfile] = useState<Blob | null>(null)
  const [clientId, setclientId] = useState('')
  const [videoId, setvideoId] = useState('')

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
        setfile(blob)
      }
    }
    reader.readAsArrayBuffer(videoFile);
    setvideoId(generateGUID())
  }

  async function handleSubmit(event: any) {
    event.preventDefault();
    if (!file) {
      return
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
      formData.append('chunk', chunk);
      formData.append('chunk_id', `${currentChunk}`)
      formData.append('client_id', clientId)
      if (currentChunk == totalChunks - 1) {
        formData.append('complete', 'true')
      } else {
        formData.append('complete', 'false')
      }
      // formData.append('totalChunks', totalChunks);
      // formData.append('currentChunk', file);

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
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleFileChange} />
      <button type="submit">Загрузить видео</button>
    </form>
  );
}

export default VideoForm
