import axios from "axios";
import { useState } from "react";
import { API } from "utils/config";
import { } from "@mui/material/Tooltip";

function VideoForm() {
  const [file, setfile] = useState<any>(null)

  function handleFileChange(event: any) {
    const videoFile = event.target.files[0]
    setfile(videoFile)
  }

  async function handleSubmit(event: any) {
    const CHUNK_SIZE = 5242880; // Размер чанка (в байтах) - здесь установлено 5 МБ

    const totalChunks = Math.ceil(file.size / CHUNK_SIZE);
    let currentChunk = 0;

    while (currentChunk < totalChunks) {
      const start = currentChunk * CHUNK_SIZE;
      const end = Math.min(start + CHUNK_SIZE, file.size);
      const chunk = file.slice(start, end);

      const formData = new FormData();
      formData.append('video_id', '-1')
      formData.append('chunk', chunk);
      formData.append('chunk_id', `${currentChunk}`)
      if (currentChunk = totalChunks - 1) {
        formData.append('complete', 'true')
      } else {
        formData.append('complete', 'false')
      }
      // formData.append('totalChunks', totalChunks);
      // formData.append('currentChunk', file);

      try {
        await axios.post('/upload-video', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        currentChunk++;
      } catch (error) {
        console.error('Error uploading chunk:', error);
        // Обработка ошибки при загрузке чанка
      }
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
