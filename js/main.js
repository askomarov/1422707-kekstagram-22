import { createOfferList } from './data.js';
import { createPicturesElemts } from './create-pictures-elemtns.js';
import { doBigPicture } from './big-picture.js';
import { userModalUpload } from './user-modal.js';

document.addEventListener('DOMContentLoaded', () => {
  const pictures = createOfferList();
  createPicturesElemts(pictures);
  doBigPicture(pictures);
  userModalUpload();
});
