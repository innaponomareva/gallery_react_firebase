import React from 'react';
import '../css/mosaicList.css';



const MosaicList = ({gallery, onThumbnailClickHandler, lineWidth}) => {
  
  const images = [...gallery];
  let list = getListWithRows(images, lineWidth);

  while(images.length > 0){
    const temp = getListWithRows(images, lineWidth)
    list = [...list,...temp];
  }
  
  return(
    <div className="mosaic-list" style={{width: lineWidth}}>
    {list.map( (elem, index) => 
      <div className="row" key={index} style={{height: `${elem.height}px`}}>
        {elem.row.map((img, indx) => {
          const imgIndexInGallery = gallery.findIndex(i => i.id === img.id);
          return(
            <div className="row-item" key={indx} data-index={imgIndexInGallery} onClick={onThumbnailClickHandler}>
              <img 
                src={img.fileUrl}
                alt={`${img.id}`} 
                style={{maxWidth: `${lineWidth}px`}}
               />
            </div>
            )}
        )}
      </div>)}
      
    </div>
  )
}

const getListWithRows = (images, lineWidth) => {
  const list = [];
  const row = createRow(images, lineWidth);
  const rowHeight = calcRowHeight(row, lineWidth);
  list.push({height: rowHeight, row: row});
  return list;
}

const createRow = (images, lineWidth) => {
  let rowItems = [];

  for(let index = 0; index < images.length; index++){
    let upright = 0;
    let landscape = 0;
    let panorama = 0;
    rowItems.push(images[index]);
    rowItems.forEach(item => {
      if(item.size.format === 'upright') upright++;
      if(item.size.format === 'landscape') landscape++;
      if(item.size.format === 'panorama') panorama++;
    });

    if(lineWidth === 1000){
      if(upright === 4) break;
      if(upright === 3){
        if(!images[index + 1]) break;
        if(images[index + 1].size.format === 'panorama') break;
        if(images[index + 1].size.format === 'landscape') break;
      }
      if(upright === 2 && landscape === 1) break;
      if(upright === 2 && panorama === 1) break;
      if(upright === 1 && landscape === 2) break;
      if(landscape === 2){
        if(!images[index + 1]) break;
        if(images[index + 1].size.format === 'panorama') break;
        if(images[index + 1].size.format === 'landscape') break;
      };
      if(landscape === 1 && panorama === 1) break;
      
    }else if(lineWidth === 700 || lineWidth === 400){
      if(upright === 3) break;
      if(upright === 2 && landscape === 1)break;
      if(upright === 1 && landscape === 1)break;
      if(landscape === 2) break;
      if(panorama === 1) break;
    }
}

  let numberofElemsInRow = getNumberOfElementsInRow(rowItems);
  removeItemsInImages(images,numberofElemsInRow)
  return rowItems;
}

const getNumberOfElementsInRow = (row) => row.length;
const removeItemsInImages = (images, numberofElemsInRow) => images.splice(0,numberofElemsInRow);
const calcRowHeight = (row, lineWidth) => {
  if(row.length === 1 && lineWidth !== 400){
    return 300;
  }
  if(row.length === 1 && lineWidth === 400){
    return 200;
  }
  const imageHeight = 200;
  const widthsSum = calcWidthsSum(row, imageHeight);
  const coefficient = lineWidth / widthsSum;
  return imageHeight * coefficient;
}

const calcWidthsSum = (row, rowHeight) => {
  let sum = 0;
  row.forEach(image => {
    const imageCoeff = image.size.width / image.size.height;
    const imageWidth = rowHeight * imageCoeff;
    sum = sum + imageWidth;
  })
  return sum;
}



export default MosaicList;





