import React from 'react';
import s from './toast.module.scss';
import { ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

export const Toast: React.FC = () => (
  <ToastContainer
    position="bottom-center"
    autoClose={5000}
    hideProgressBar={true}
    closeOnClick
    toastClassName={s.toast}
    limit={3}
    closeButton={false}
    transition={Zoom}
  />
);
