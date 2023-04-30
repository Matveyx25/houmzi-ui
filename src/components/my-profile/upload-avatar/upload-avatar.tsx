import React, { ChangeEvent } from 'react';
import c from 'classnames/bind';
import s from './upload-avatar.module.scss';

interface IProps {
  onUploadAvatar(file: File): void
}

const UploadAvatar: React.FC<IProps> = ({ onUploadAvatar }) => {
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    onUploadAvatar(e.target?.files![0]);
  };

  return (
    <div className={s.upload}>
        <span className={s.upload__subtitle}>
          Select or drag a photo into this window.
          <br/>
          You can upload a photo in the format JPG or PNG.
        </span>
      <label className={s.upload__label}>
        <input type="file" className={s.upload__input} onChange={onChange}/>
        <i className={c('icon-download', s.upload__img)}/>
      </label>
      <span className={s.upload__desc}>
        If you are having trouble downloading, try choosing a smaller photo.
      </span>
    </div>
  );
};

export default UploadAvatar;
