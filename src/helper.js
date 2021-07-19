import loadImageSize from './utils/loadImgSize';

export const createImg = ({file, callback, isRotateImg}) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = async(event) => {
    const src = event.target.result;
    const {width, height} = await loadImageSize(src) || {};

    const image = new Image();
    image.src = src;
    image.onload = function async() {
      const _this = this;
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(_this, 0, 0, width, height);
      isRotateImg && rotateImg({ img: this, width, height, canvas });
      const base64 = canvas.toDataURL('image/jpeg', 0.8);
      callback && callback(base64);
    };
  };
};

export const rotateImg = async({img, width, height, canvas}) => {
  const ctx = canvas.getContext('2d');
  const rotateAngle = 90;
  const angle = rotateAngle * Math.PI / 180;
  // 旋转90度
  canvas.width = height;
  canvas.height = width;
  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.rotate(angle);
  ctx.drawImage(img, 0, -height);

  // 旋转180度
  // canvas.width = width;
  // canvas.height = height;
  // ctx.fillStyle = '#fff';
  // ctx.fillRect(0, 0, canvas.width, canvas.height);
  // ctx.rotate(angle);
  // ctx.drawImage(img, -width, -height);

  // 旋转270度
  // canvas.width = height;
  // canvas.height = width;
  // ctx.fillStyle = '#fff';
  // ctx.fillRect(0, 0, canvas.width, canvas.height);
  // ctx.rotate(angle);
  // ctx.drawImage(img, -width, 0);

  // 旋转90度以内的
  const x = height * Math.sin(angle) * Math.cos(angle);
  const y = height * Math.sin(angle) * Math.sin(angle);
  canvas.width = height * Math.sin(angle) + width * Math.cos(angle);
  canvas.height = height * Math.cos(angle) + width * Math.sin(angle);
  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.rotate(angle);
  ctx.drawImage(img, x, -y);
};

export const dataURLtoFile = (dataurl, filename) => {
  const arr = dataurl.split(',');
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, {type:mime});
};
