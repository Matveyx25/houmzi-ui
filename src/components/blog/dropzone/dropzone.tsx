import React, {useCallback, useState} from 'react'
import {useDropzone} from 'react-dropzone'
import s from './dropzone.module.scss'

export const Dropzone = () => {
	const [selectedImages, setSelectedImages] = useState([]);

	const onDrop = useCallback(acceptedFiles => {
		setSelectedImages(acceptedFiles.map(file=>
			Object.assign(file, {
				preview: URL.createObjectURL(file)
			})
		))
	}, [])
		const {getRootProps, getInputProps} = useDropzone(
		{
			onDrop,  
			maxFiles: 1, 
			accept: {
      'image/jpeg': [],
      'image/jpg': [],
      'image/png': []
    }})

  return (
    <div {...getRootProps()} className={s.photos__wrap}>
      <input {...getInputProps()} />
          <p className={s.photos__title}>Перетащите файл сюда или нажмите, чтобы выбрать файл</p> 
          <p className={s.photos__desc}>(Только *.jpeg *.jpg и *.png)</p> 
					{selectedImages.length > 0 && (
						<div
								className={s.card}
							>
								{<img className={s.card__media} src={selectedImages[0].preview} alt=""/>}
								<button className={s.card__delete} onClick={() => setSelectedImages([])}>
									<i className="icon-close"/>
								</button>
							</div>
					)}
    </div>
  )
}