import React, { useContext, useEffect, useState } from 'react';
import { PhotoContext } from '../context/photo/photoContext';
import '../css/verticalList.css';
import EditBox from './EditBox';
import InfoBox from './InfoBox';
import { useParams, useHistory } from 'react-router-dom';


const VerticalList = () => {
  const [ width, setWidth ] = useState(window.innerWidth);
  const { photos, removePhoto, getAllPhotos } = useContext(PhotoContext);
  const { id } = useParams();
  const index = id ? id : 0;
  const history = useHistory();


  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }
    if(width > 700){
      history.push('/gallery_react_firebase')
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [width, history]);

  useEffect(() => {
    if(photos.length === 0){
      getAllPhotos();
    }
  }, [getAllPhotos, photos.length]);


  useEffect(()=>{
    function findPos(obj) {
      let curtop = 0;
      if (obj.offsetParent) {
        do {
          curtop += obj.offsetTop;
        } while (obj === obj.offsetParent);
        return [curtop];
      }
    }
    const anchor = document.querySelector(`.divider-${index}`);
    if(anchor){
      window.scroll(0,findPos(anchor));
    }
    
  },[index]);

  const onRemoveClickHandler = () => {
    const result = window.confirm('Are you sure you want to delete this photo?');
    if(!result) return false
    removePhoto({
      id: photos[index].id,
      fileNameInStorage: photos[index].fileNameInStorage
    });
  }


  return(
    <>
    {photos.length > 0 && 
      <div className="vertical-list">
        { photos.map((item,ind) => (
          <div className="photo-box" key={ind}>
            <div className={`divider divider-${ind}`}></div>
            <div className={`photo-item photo-item-${ind}`}>
              <img 
                src={item.fileUrl} 
                data-index={ind}
                alt={item.id} />
            </div>
            <InfoBox gallery={photos} index={ind} onRemoveClickHandler={onRemoveClickHandler} />
            <EditBox gallery={photos} index={ind} />
          </div>
          ))
        }
      </div>
    }
    </>
  )

}
  
    
  



export default VerticalList;

