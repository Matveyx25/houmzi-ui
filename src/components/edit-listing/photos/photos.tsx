import React from 'react';
import s from './photos.module.scss';
import c from 'classnames/bind';
import { Block } from '../block/block';
import { IMedia } from '../../../interfaces/edit-listing/media.interface';

interface IProps {
  listingData: any

  addMedia(file: FormData): void

  deleteMedia(fileId: string): void

  updateData(data: any): void
}

interface IState {
  fileInput: React.RefObject<HTMLInputElement>
}

export class Photos extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = { fileInput: React.createRef<HTMLInputElement>() };
  }

  addMedia = (files: any) => {
    const { addMedia } = this.props;

    for (let i = 0; i < files.length; i++) {
      const formData = new FormData();

      formData.append('file', files[i]);
      addMedia(formData);
    }
  };

  dropFile = (e) => {
    const { files } = e.dataTransfer;

    e.preventDefault();

    this.addMedia(files);
  };

  dragOverHandler = (e) => e.preventDefault();

  render(): React.ReactElement {
    const { listingData, deleteMedia, updateData } = this.props;
    const { fileInput } = this.state;

    return (
      <Block className={s.photos} title="Photos">
        {
          listingData?.media.length > 0 &&
          <>
            <div className={s.photos__list}>
              {
                listingData?.media.map((media: IMedia) => (
                  <div
                    key={media.id}
                    className={c(s.card, listingData?.avatarId === media.id && s.active)}
                    onClick={() => media.type === 'image' && updateData({ avatar: media.id })}
                  >
                    {
                      media.type === 'image'
                        ? <img className={s.card__media} src={media.url} alt=""/>
                        : <>
                          <video className={s.card__media} src={media.url}/>
                          <div className={s.card__bg}/>
                          <img className={s.card__play} src="/images/play.svg" alt=""/>
                        </>
                    }
                    <button className={s.card__delete} onClick={() => deleteMedia(media.id)}>
                      <i className="icon-close"/>
                    </button>
                  </div>
                ))
              }
            </div>
            <div className={s.photos__selectAvatar}>
              Tap on a photo to make it main
            </div>
          </>
        }
        <input
          ref={fileInput}
          multiple
          className={s.photos__input}
          type="file"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.addMedia(e.target?.files)}
        />
        <div className={s.photos__wrap} onClick={() => fileInput.current?.click()}
             onDrop={this.dropFile} onDragOver={this.dragOverHandler}>
          <div className={s.photos__title}>
            <span>Select or drag a photo into this window. </span>
            <span>You can upload a photo or video in the format JPG, PNG or MP4.</span>
          </div>
          <i className={c('icon-download', s.photos__icon)}/>
          <div className={s.photos__desc}>
            If you are having trouble downloading, try choosing a smaller photo or video.
          </div>
        </div>
      </Block>
    );
  }
}
