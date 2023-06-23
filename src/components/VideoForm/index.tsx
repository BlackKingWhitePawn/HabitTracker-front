import axios from "axios";
import { useState } from "react";
import { API } from "utils/config";

function VideoForm() {
  const [file, setFile] = useState<any>(null);
  const handleSubmit = (event: any) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('video', file);
    axios.post('/upload-video', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(response => {
        console.log('Видео успешно загружено');
        // выполняем нужные действия
      })
      .catch(error => {
        console.error(`Ошибка загрузки видео: ${error}`);
      });
  };
  const handleFileChange = (event: any) => {
    setFile(event.target.files[0]);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleFileChange} />
      <button type="submit">Загрузить видео</button>
    </form>
  );
}

export default VideoForm