import React, { useState } from 'react'
import dynamic from "next/dynamic";
import s from './editor.module.scss'
import { Button } from '../../shared/button/button';
import { Input } from '../../shared/input/input';
import { Dropzone } from '../dropzone/dropzone';

const ReactQuill = dynamic(
	() => {
		return import('react-quill');
	},
	{ ssr: false }
);

export const Editor = () => {
	const [value, setValue] = useState("");

	const modules = {
		toolbar: [
			[{ header: '1' }, { header: '2' }, { font: [] }],
			[{ size: [] }],
			['bold', 'italic', 'underline', 'strike', 'blockquote'],
			[
				{ list: 'ordered' },
				{ list: 'bullet' },
				{ indent: '-1' },
				{ indent: '+1' },
			],
			['link'],
		],
		clipboard: {
			matchVisual: false,
		},
	}

	const onSubmit = () => {
		console.log(value);
	}

	return (
		<div className={s.editorContainer}>
			<h1 className={s.title}>
				Превью
			</h1>
			<Dropzone/>
			<h1 className={s.title}>
				Название
			</h1>
			<Input></Input>
			<h1 className={s.title}>
				Статья
			</h1>
			<ReactQuill theme='snow' modules={modules} value={value} onChange={setValue} className={s.richText}/>
			<div className={s.buttonWrapper}>
				<Button onClick={onSubmit}>Создать</Button>
			</div>
		</div>
	)
}