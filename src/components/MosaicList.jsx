import styles from '../css/mosaicList.module.css';

const MosaicList = ({ gallery, onPhotoClickHandler, lineWidth }) => {
  const images = [...gallery];
  let list = getListWithRows(images, lineWidth);

  return (
    <div style={{ width: lineWidth }}>
      {list.map((elem, index) => (
        <div
          className={styles.row}
          key={index}
          style={{ height: `${elem.height}px` }}
        >
          {elem.row.map((img, indx) => {
            const imgIndexInGallery = gallery.findIndex((i) => i.id === img.id);
            return (
              <div
                className={styles.row_item}
                key={indx}
                onClick={onPhotoClickHandler}
              >
                <img
                  src={img.fileUrl}
                  data-index={imgIndexInGallery}
                  alt={`${img.id}`}
                  style={{ maxWidth: `${lineWidth}px` }}
                />
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

const getListWithRows = (images, lineWidth) => {
  const list = [];
  while (images.length > 0) {
    const row = createRow(images, lineWidth);
    const rowHeight = calcRowHeight(row, lineWidth);
    list.push({ height: rowHeight, row: row });
  }
  return list;
};

const createRow = (images, lineWidth) => {
  let rowItems = [];

  let upright = 0;
  let landscape = 0;
  let panorama = 0;

  for (let index = 0; index < images.length; index++) {
    rowItems.push(images[index]);
    if (images[index].size.format === 'upright') upright++;
    if (images[index].size.format === 'landscape') landscape++;
    if (images[index].size.format === 'panorama') panorama++;

    if (lineWidth === 1000) {
      if (upright === 4) break;
      if (upright === 3) {
        if (!images[index + 1]) break;
        if (images[index + 1].size.format === 'panorama') break;
        if (images[index + 1].size.format === 'landscape') break;
      }
      if (upright === 2 && landscape === 1) break;
      if (upright === 2 && panorama === 1) break;
      if (upright === 1 && landscape === 2) break;
      if (landscape === 2) {
        if (!images[index + 1]) break;
        if (images[index + 1].size.format === 'panorama') break;
        if (images[index + 1].size.format === 'landscape') break;
      }
      if (landscape === 1 && panorama === 1) break;
    } else if (lineWidth < 1000) {
      if (upright === 3) break;
      if (upright === 2 && landscape === 1) break;
      if (upright === 1 && landscape === 1) break;
      if (landscape === 2) break;
      if (panorama === 1) break;
    }
  }

  const numberofElemsInRow = rowItems.length;
  removeItemsInImages(images, numberofElemsInRow);
  return rowItems;
};

const removeItemsInImages = (images, numberofElemsInRow) =>
  images.splice(0, numberofElemsInRow);

const calcRowHeight = (row, lineWidth) => {
  if (row.length === 1) {
    return 300;
  }
  const imageHeight = 200;
  const widthsSum = calcWidthsSum(row, imageHeight);
  const coefficient = lineWidth / widthsSum;
  return imageHeight * coefficient;
};

const calcWidthsSum = (row, rowHeight) => {
  let sum = 0;
  row.forEach((image) => {
    const imageCoeff = image.size.width / image.size.height;
    const imageWidth = rowHeight * imageCoeff;
    sum = sum + imageWidth;
  });
  return sum;
};

export default MosaicList;
