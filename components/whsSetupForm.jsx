import useWarehouseStore from '@lib/store';
import { useState } from 'react';
import FormGroup from "@components/formGroup"
import Submit from "@components/submit"
import ModalOverlay from "@components/modalOverlay"

export default function WhsSetupForm({onSubmit}) {
  const [whsWidth, setWhsWidth] = useState();
  const [whsDepth, setWhsDepth] = useState();
  const [whsHeight, setWhsHeight] = useState();
  const setWarehouseDimensions = useWarehouseStore((state) => state.setWarehouseDimensions);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Convert dimensions to numbers
    const width = parseFloat(whsWidth);
    const depth = parseFloat(whsDepth);
    const height = parseFloat(whsHeight);

    // Check if dimensions are valid
    if (isNaN(width) || isNaN(depth) || isNaN(height)) {
      alert('Please enter valid dimensions.');
      return;
    }

    // Update warehouse dimensions in the store
    setWarehouseDimensions({ width: width, depth: depth, height: height });
    
    // Notify parent component
    onSubmit();
  };
  
  const creationForm = 
  <>
    <h2>Benvenuto in <strong>WMS3D</strong>!</h2>
    <p>Inserire le misure del magazzino da creare:</p>
    <form id="WhsSetupForm" className="form" onSubmit={handleSubmit}>
      <FormGroup labelText='Larghezza (mt): ' type='number' id='WhsWidth' step='0.01' min='0.01' onChange={(e) => setWhsWidth(e.target.value)}/>
      <FormGroup labelText='Profondità (mt): ' type='number' id='WhsDepth' step='0.01' min='0.01' onChange={(e) => setWhsDepth(e.target.value)}/>
      <FormGroup labelText='Altezza (mt): ' type='number' id='WhsHeight' step='0.01' min='0.01' onChange={(e) => setWhsHeight(e.target.value)}/>
      <Submit value="Crea"/>
    </form>
  </>

  return (
    <>
      <ModalOverlay id="setupWhs" children={creationForm} />
    </>
  );
}