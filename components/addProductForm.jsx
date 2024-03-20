import { useState } from 'react';
import useWarehouseStore from '@lib/store';
import FormGroup from "@components/formGroup"
import Submit from "@components/submit"
import Cancel from "@components/cancel"
import ModalOverlay from "@components/modalOverlay"

const AddProductForm = ({onCancel}) => {
  const [ProductId, setProductId] = useState('');

  const addProduct = useWarehouseStore((state) => state.addProduct);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!ProductId) {
      alert('Please fill in all fields');
      return;
    }
    // Call the addProduct function from the store
    addProduct({
      name: String(ProductId),
      size: 1,    //di default da cambiare
      x: parseFloat(1/2), //di default da cambiare in base a size
      y: parseFloat(1/2), //di default da cambiare in base a size
      z: parseFloat(1/2) //di default da cambiare in base a size
    });
    // Clear form fields
    setProductId('');

    onCancel();
  };

  const handleCancel = () => {
    onCancel();
  };

  const addProductForm = <form id="ProductSetupForm" className="form" onSubmit={handleSubmit}>
      <FormGroup labelText='Nome: ' type='text' id='prodName' onChange={(e) => setProductId(e.target.value)} />
      <Cancel onclick={handleCancel}/>
      <Submit value="Aggiungi"/>
    </form>

  return (
    <>
      <ModalOverlay hidden={false} id="addProduct" children={addProductForm} />
    </>
  );
};

export default AddProductForm;