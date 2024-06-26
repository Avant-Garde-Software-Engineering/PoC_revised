import { useState } from 'react';
import useWarehouseStore from '@lib/store';
import FormGroup from "@components/formGroup"
import Submit from "@components/submit"
import Cancel from "@components/cancel"
import ModalOverlay from "@components/modalOverlay"

const MoveProductForm = ({onCancel}) => {
  const [shelfName, setShelfName] = useState('');
  const [bin, setBin] = useState('','');

  const moveProd = useWarehouseStore((state) => state.moveProduct);
  const { warehouse } = useWarehouseStore();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Call the addShelf function from the store
    moveProd({
      shelfName: String(shelfId),
      bin: parseFloat(binSize),
    });
    // Clear form fields
    setShelfName();
    setBin();

    onCancel();
  };

  const handleCancel = () => {
    // Hide the form
    onCancel();
  };

  const moveProductForm = <form id="moveProdForm" className="form" onSubmit={handleSubmit}>
      <FormGroup labelText='Codice: ' type='text' id='shelfId' onChange={(e) => setShelfId(e.target.value)} />
      <FormGroup labelText='Grandezza bin (mt): ' type='number' id='binSize' step='0.01' min='0.01' onChange={(e) => setBinSize(e.target.value)}/>
      <FormGroup labelText='Larghezza (bin): ' type='number' id='shelfWidth' step='1' min='1' onChange={(e) => setShelfWidth(e.target.value)} />
      <FormGroup labelText='Altezza (bin): ' type='number' id='shelfHeight' step='1' min='1' onChange={(e) => setShelfHeight(e.target.value)}/>
      <Submit value="Aggiungi"/>
      <Cancel onclick={handleCancel}/>
    </form>

  return (
    <>
      <ModalOverlay hidden={false} id="moveProd" children={moveProductForm} />
    </>
  );
};

export default MoveProductForm;