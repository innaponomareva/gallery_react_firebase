import React from 'react';
import '../css/gridList.css';



const GridList = ({gallery, onThumbnailClickHandler}) => (
    <div className="grid-container">
      {gallery.map((item,index)=>
      <div 
        className={`grid-item grid-item-${index}`} 
        key={index}
        onClick={onThumbnailClickHandler}
        data-index={index}
        style={{backgroundImage:`url(${item.fileUrl})`}
      }></div>
      )}
    
    </div>
  )



export default GridList;

