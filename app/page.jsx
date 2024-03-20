'use client';

import { useState } from 'react';
import Render3D from '@components/render3D';
import AddShelfForm from '@components/addShelfForm';
import AddProductForm from '@components/addProductForm';
import WhsSetupForm from '@components/whsSetupForm';
import Toolbar from '@components/toolbar';
import Sidebar from '@components/sidebar'

export default function Home() {
  const [showWhsSetupForm, setShowWhsSetupForm] = useState(true);
  const [showAddShelfForm, setShowAddShelfForm] = useState(false);
  const [showAddProdForm, setShowAddProdForm] = useState(false);
  // DA FARE STESSA COSA PER MOV E SAVE

  const handleAddShelfClick = () => {
    setShowAddShelfForm(true);
  };

  const handleAddProductClick = () => {
    setShowAddProdForm(true);
  };

  return(
    <>
    <div className='flex flex-col flex-1'>
      <Toolbar
        onAddShelfClick={handleAddShelfClick}
        onAddProductClick={handleAddProductClick}
      />
      <div className='flex-1 flex flex-row max-h-[81vh]'>
        {!showWhsSetupForm && <Sidebar />}
        {!showWhsSetupForm && <Render3D />}
      </div>
    </div>
    {showWhsSetupForm && <WhsSetupForm onSubmit={ () => setShowWhsSetupForm(false) } />}
    {showAddShelfForm && <AddShelfForm onCancel={() => setShowAddShelfForm(false)} />}
    {showAddProdForm && <AddProductForm onCancel={() => setShowAddProdForm(false)} />}
  </>
  );
  
}