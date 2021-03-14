import { createOfferList } from './data.js';
import { createPicturesElemts } from './create-pictures-elemtns.js';
import { userModalUpload } from './user-modal.js';
import { onInputTagValidateListener, onCommentInputListener } from './form/tags.js';

document.addEventListener('DOMContentLoaded', () => {
  const pictures = createOfferList();
  createPicturesElemts(pictures);
  userModalUpload();

  onInputTagValidateListener();
  onCommentInputListener();
});
