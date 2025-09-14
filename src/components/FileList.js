import React from 'react';
import '../App.css';

const FileList = ({ files, onDownload, onDelete, isLoading }) => {
  const formatFileSize = (size) => {
    if (!size) return '0 B';
    const bytes = parseInt(size);
    if (bytes === 0) return '0 B';
    
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return size;
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Неизвестно';
    return new Date(dateString).toLocaleString();
  };

  if (isLoading) {
    return <div className="file-list loading">Загрузка файлов...</div>;
  }

  if (files.length === 0) {
    return <div className="file-list empty">Файлы не найдены</div>;
  }

  return (
    <div className="file-list">
      <h3>Мои файлы</h3>
      <div className="files-grid">
        {files.map((file) => (
          <div key={file.id} className="file-card">
            <div className="file-info">
              <h4 className="file-name">{file.name}</h4>
              <p className="file-size">{formatFileSize(file.size)}</p>
              <p className="file-date">{file.lastModified}</p>
            </div>
            <div className="file-actions">
              <button
                onClick={() => onDownload(file.id, file.name)}
                className="download-btn"
              >
                Скачать
              </button>
              <button
                onClick={() => onDelete(file.id)}
                className="delete-btn"
              >
                Удалить
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileList;