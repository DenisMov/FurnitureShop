const controlBodyOverflow = (isModalVisible: boolean) => {
  if (isModalVisible) {
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = "17px";
  } else {
    document.body.style.overflow = "";
    document.body.style.paddingRight = "0px";
  }
};

export default controlBodyOverflow;
