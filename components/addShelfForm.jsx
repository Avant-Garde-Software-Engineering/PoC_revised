import { useState } from 'react';
import useWarehouseStore from '@lib/store';
import FormGroup from "@components/formGroup"
import Submit from "@components/submit"
import Cancel from "@components/cancel"
import ModalOverlay from "@components/modalOverlay"

const AddShelfForm = ({onCancel}) => {
  const [shelfId, setShelfId] = useState('');
  const [binSize, setBinSize] = useState('');
  const [shelfWidth, setShelfWidth] = useState('');
  const [shelfHeight, setShelfHeight] = useState('');

  const addShelf = useWarehouseStore((state) => state.addShelf);
  const { warehouse } = useWarehouseStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!shelfId || !binSize || !shelfWidth || !shelfHeight) {
      alert('Please fill in all fields');
      return;
    }

    if(shelfWidth * binSize > warehouse.width || shelfHeight * binSize > warehouse.height || binSize > warehouse.depth){
      alert('The shelf is too big');
      return;
    }

    // Call the addShelf function from the store
    addShelf({
      name: String(shelfId),
      binSize: parseFloat(binSize),
      width: parseInt(shelfWidth),
      height: parseInt(shelfHeight),
      x: parseFloat(binSize*shelfWidth/2),
      y: parseFloat(binSize*shelfHeight/2),
      z: parseFloat(binSize/2)
    });
    // Clear form fields
    setShelfId('');
    setBinSize();
    setShelfWidth();
    setShelfHeight();

    onCancel();
  };

  const handleCancel = () => {
    // Hide the form
    onCancel();
  };

  const addShelfForm = <form id="shelfSetupForm" className="form" onSubmit={handleSubmit}>
      <FormGroup labelText='Codice: ' type='text' id='shelfId' onChange={(e) => setShelfId(e.target.value)} />
      <FormGroup labelText='Grandezza bin (mt): ' type='number' id='binSize' step='0.01' min='0.01' onChange={(e) => setBinSize(e.target.value)}/>
      <FormGroup labelText='Larghezza (bin): ' type='number' id='shelfWidth' step='1' min='1' onChange={(e) => setShelfWidth(e.target.value)} />
      <FormGroup labelText='Altezza (bin): ' type='number' id='shelfHeight' step='1' min='1' onChange={(e) => setShelfHeight(e.target.value)}/>
      <Cancel onclick={handleCancel}/>
      <Submit value="Aggiungi"/>
    </form>

  return (
    <>
      <ModalOverlay hidden={false} id="addShelf" children={addShelfForm} />
    </>
  );
};

export default AddShelfForm;