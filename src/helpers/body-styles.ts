export const addBodyStyles = () => {
  document.body.style.overflow = 'hidden';
  document.body.style.height = '100vh';
};

export const removeBodyStyles = () => {
  document.body.style.overflow = '';
  document.body.style.height = '';
};

export const switchBodyStyles = (windowWidth, minWindowWidth) => {
  windowWidth > minWindowWidth
    ? addBodyStyles()
    : removeBodyStyles();
};
