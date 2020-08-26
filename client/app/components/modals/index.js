import Add from './Add';
import Delete from './Delete';
import Rename from './Rename';

const mapping = {
  addingModal: Add,
  deletingModal: Delete,
  renamingModal: Rename,
};

export default (modalType) => mapping[modalType];
