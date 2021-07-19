import React       from 'react';
import {dataURLtoFile, createImg} from './helper';
import RolateIcon from './images/rolate.png';
import CameraIcon from './images/camera.png';

import './App.css';

class HomePage extends React.Component {
  constructor() {
    super();
    this.state = {
      token: '',
      img: ''
    };
  }

  fileUpLoad = async(e) => {
    if (e.target.files.length === 0) {
      return;
    }
    if (!e.target.files[0].type.match('image.*')) {
      alert('只能上传图片！');
      return;
    }
    const file = e.target.files[0];
    e.target.value = '';
    createImg({
      file,
      callback: data => {
        this.setState({
          img: data
        });
      }
    });
  }

  handleRotate = () => {
    const img = document.querySelector('img');
    if (!img) {
      return;
    }
    createImg({
      file: dataURLtoFile(img.src, 'test.img'),
      isRotateImg: true,
      callback: data => {
        this.setState({
          img: data
        });
      }
    });
  };

  render() {
    const {img} = this.state;
    return (
      <main className="index-page">
        <div className="title">图片翻转</div>
        <div className="img-upload">
          {
            img ? <img className="img" src={img} /> : <div className="img-upload-wrap">
              <img className="camera" src={CameraIcon} />
              <input
                id="input"
                type="file"
                accept="image/jpeg,image/jpg,image/png,image/svg"
                className="file-upload"
                onChange={this.fileUpLoad}
              />
            </div>
          }
        </div>
        <div className="footer-btn">
          <img className="camera" src={RolateIcon} onClick={this.handleRotate} />
        </div>
      </main>
    );
  }
}

export default HomePage;
