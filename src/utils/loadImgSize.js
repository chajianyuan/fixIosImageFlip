export default function loadImageSize(url) {
  return new Promise(resolve => {
    const img = new Image();
    img.src = url;
    img.onload = () => {
      const width = img.width;
      const height = img.height;
      const size = { width, height };
      resolve(size);
    };
  });
}
