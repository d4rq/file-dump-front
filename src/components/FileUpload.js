import React, { useState, useRef } from 'react';
import '../App.css';

const FileUpload = ({ onUpload }) => {
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileSelect = (selectedFile) => {
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    handleFileSelect(droppedFile);
  };

  const handleInputChange = (e) => {
    const selectedFile = e.target.files[0];
    handleFileSelect(selectedFile);
  };

  const handleClickOnDropZone = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (file) {
      onUpload(file);
      setFile(null);
      // Очищаем input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <div className="file-upload">
      <h3>Загрузить файл</h3>
      <div
        className={`drop-zone ${isDragging ? 'dragging' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClickOnDropZone}
      >
        <input
          ref={fileInputRef}
          id="file-input"
          type="file"
          onChange={handleInputChange}
          className="file-input"
        />
        <p>Перетащите файл сюда или нажмите для выбора</p>
        {file && <p className="selected-file">Выбран: {file.name}</p>}
      </div>
      <button onClick={handleSubmit} disabled={!file} className="upload-btn">
        Загрузить
      </button>
    </div>
  );
};

export default FileUpload;