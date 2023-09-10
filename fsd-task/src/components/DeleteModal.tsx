import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";

const DeleteModal: React.FC<{
  activeItem: any;
  setActiveItem: any;
  toggleDelete: any;
  toggle: any;
  onDelete: any;
  item: any;
  onSave: any;
}> = ({ activeItem, item, onDelete, toggle,toggleDelete, setActiveItem, onSave }) => {

  return (
    <Modal isOpen={true} toggle={toggle}>
      <ModalHeader toggle={toggle}> Confirmation </ModalHeader>
      <ModalBody>
        <div>Do you really want to delete task ?</div>
        <Form>
          <button
            onClick={() => onDelete(item)}
            className="btn btn-danger mr-2"
          >
            Delete
          </button>
          <button onClick={toggleDelete} className="btn btn-primary mr-2">
            Cancel
          </button>
        </Form>
      </ModalBody>
    </Modal>
  );
};

export default DeleteModal;
