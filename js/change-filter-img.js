const changeFilterImg = (array, img) => {
  for (let index = 0; index < array.length; index++) {
    const element = array[index];
    element.addEventListener('click', () => {
      if (element.checked == true) {
        img.classList = '';
        img.style.filter = '';
        img.classList.add(`effects__preview--${element.value}`)
      }
    })
  }
};

export { changeFilterImg };

