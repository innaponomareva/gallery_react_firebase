import React, { useContext, useEffect, useState, useCallback } from 'react';
import '../css/gallery.css';
import ModalWindow from './ModalWindow'
import { PhotoContext } from '../context/photo/photoContext';
import MosaicList from './MosaicList';
import GridList from './GridList';
import { useHistory } from 'react-router-dom';



const Gallery = ({gallery}) => {
  const { removePhoto } = useContext(PhotoContext);
  const [ index, setIndex ]  = useState(0);
  const [width, setWidth] = useState(window.innerWidth);
  const history = useHistory();
  
  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
      if(document.querySelector('body').style.overflow === 'hidden'){
        document.querySelector('body').style.overflow = 'auto';
      }
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [width]);


  const onThumbnailClickHandler = (event) => {
    let target = event.target;
    if(event.target.tagName === 'IMG'){
      target = event.target.parentNode;
    }
    const currIndex = target.getAttribute('data-index');
    setIndex(parseInt(currIndex));
    if(width > 700){
      document.querySelector('.modal-window').style.display = 'block';
      document.querySelector('body').style.overflow = 'hidden';
      document.querySelector('.blocker').style.display = 'block';
      document.querySelector('.blocker').style.backgroundColor = '#464646';
      document.querySelector('.blocker').style.opacity = '90%';
    }else if(width < 700){
      const targetIndex = event.target.getAttribute('data-index');
      history.push(`/photosinfo/${targetIndex}`);
    }
  }

  const onCloseClickHandler = () => {
    setIndex(0);
    if(width > 700){
      document.querySelector('.modal-window').style.display = 'none';
      document.querySelector('body').style.overflow = 'auto';
      document.querySelector('.blocker').style.display = 'none';
      document.querySelector('.edit-box').style.display = 'none';
      document.querySelector('.info-box').style.display = 'flex';
    }
  }

  const onRemoveClickHandler = () => {
    // ask for confirmation before delete
    const result = window.confirm('Are you sure you want to delete this photo?');
    // if cancel return false 
    if(!result) return false
    // if confirm do this 
    // show the 1st photo if user removes the last photo in array
    if(index === gallery.length - 1) setIndex(0)
    // remove photo with id
    removePhoto({
      id: gallery[index].id,
      fileNameInStorage: gallery[index].fileNameInStorage
    });
  }

  const nextBtnHandler = useCallback(() => {
    if(index === gallery.length - 1){ // if user reaches the last photo
      setIndex(0); // go to the 1st photo
    }else{ // in other cases
      setIndex(index + 1); // go to the next photo
    }
  }, [index, gallery.length])


  const prevBtnHandler = useCallback(() => {
    if(index === 0){ // if user reaches the 1st photo
      setIndex(gallery.length - 1); // go to the last photo
    }else { // in other cases
      setIndex(index - 1); // go to the previous photo
    }
  }, [index, gallery.length])


  useEffect(() => {
    // sliding photos with keyboard
    const handleKeyEvent = (event) => {
      if(event.key === 'ArrowRight'){
        nextBtnHandler();
      }else if(event.key === 'ArrowLeft'){
        prevBtnHandler();
      }
    }
    document.addEventListener('keydown', handleKeyEvent);
    // remove EventListener when ComponentDidUnmount
    return () => document.removeEventListener('keydown', handleKeyEvent);
  }, [nextBtnHandler, prevBtnHandler]);

  
  return (
    <div className="gallery">
      { gallery.length > 0 ?
      <>
        {width > 700 &&  
        <>
          <div className="blocker"></div>
          <GridList
            gallery={gallery}
            onThumbnailClickHandler={onThumbnailClickHandler}
          />
          <ModalWindow 
            gallery={gallery} 
            index={index} 
            prevBtnHandler={prevBtnHandler} 
            nextBtnHandler={nextBtnHandler} 
            onRemoveClickHandler={onRemoveClickHandler} 
            onCloseClickHandler={onCloseClickHandler}
          />
        </>
        }

        {width < 700 && 
        <>
          <div className="blocker"></div>
          <GridList
            gallery={gallery}
            onThumbnailClickHandler={onThumbnailClickHandler}
          />
        </>
        }
      </>
      :
      // show this if gallery is empty
      <div className="help-text">No photos found...</div> 
      }
    </div>
  )
}


export default Gallery;
