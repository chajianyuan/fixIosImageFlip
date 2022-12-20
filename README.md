## 解决IOS上传图片翻转问题

### 一、问题描述

ios拍照上传图片，图片会旋转展示

### 二、原因
 iPhone对拍摄的照片附加了EXIF信息（如镜头、光圈、快门、焦距、相机拍摄角度等），图片被上传后自动根据相机拍摄角度做了旋转。
 
### 三、解决方案

#### 方案一、添加旋转按钮，由用户操作决定使用哪种角度的图片（每次操作旋转90度）
起始图：

<img src="https://github.com/chajianyuan/picture/blob/master/1626676773014.jpg?raw=true" width="300px" />

##### 翻转的过程

##### 1. 修改canvas的宽高

<img src="https://github.com/chajianyuan/picture/blob/master/1626676783920.jpg?raw=true" width="300px" />

```js
canvas.width = height;
canvas.height = width;
```

##### 2. 将canvas旋转90度

⚠️ 旋转过程中canvas的坐标轴也会跟着旋转

<img src="https://github.com/chajianyuan/picture/blob/master/1626676796148.jpg?raw=true" width="400px" />

```js
ctx.rotate(angle);
```

##### 3. 将canvas移动到可视区

<img src="https://github.com/chajianyuan/picture/blob/master/1626676809755.jpg?raw=true" width="400px" />

```js
ctx.drawImage(img, 0, -height);
```


#### 方案二、 根据图像EXIF信息中的相机拍摄角度（Orientation），再旋转回来

优点：无需用户操作，一气呵成，无论是什么角度的照片，都能给旋转回来
缺点：开发人员需要获取图像的EXIF信息

### 三、扩展

#### 1、旋转180度

<img src="https://github.com/chajianyuan/picture/blob/master/1626676825075.jpg?raw=true" width="400px" />

```js
canvas.width = width;
canvas.height = height;
ctx.rotate(angle);
ctx.drawImage(img, -width, -height);
```

#### 2、旋转270度

<img src="https://github.com/chajianyuan/picture/blob/master/1626676833261.jpg?raw=true" width="400px" />

```js
canvas.width = height;
canvas.height = width;
ctx.rotate(angle);
ctx.drawImage(img, -width, 0);
```


#### 3. 旋转90度以内的(以30度为例)

<img src="https://github.com/chajianyuan/picture/blob/master/1626676840224.jpg?raw=true" width="500px" />

<img src="https://github.com/chajianyuan/picture/blob/master/1626676848764.jpg?raw=true" width="300px" />

```js
const x = height * Math.sin(angle) * Math.cos(angle);
const y = height * Math.sin(angle) * Math.sin(angle);
canvas.width = height * Math.sin(angle) + width * Math.cos(angle);
canvas.height = height * Math.cos(angle) + width * Math.sin(angle);
ctx.rotate(angle);
ctx.drawImage(img, x, -y);
```


### 四、项目如何启动？

```js
npm install/yarn

npm start/yarn start
```

