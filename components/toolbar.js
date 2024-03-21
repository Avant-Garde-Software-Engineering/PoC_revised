import Button from "@/components/button"

const Toolbar = ({ onAddShelfClick, onAddProductClick, onSaveClick }) => {
  return (
    <div className="bg-darkest flex justify-end border-b-2 max-[768px]:justify-center">
      <Button id="addShelfBtn" value="Crea scaffalatura" title="Crea scaffalatura" classtype="createShelf" onclick={onAddShelfClick}/>
      <Button id="addProductBtn" value="Crea prodotto" title="Crea prodotto" classtype="createProduct" onclick={onAddProductClick}/>
      <Button id="saveBtn" value="Salva il magazzino" title="Salva il magazzino" classtype="saveWhs" onclick={onSaveClick}/>
    </div>  
  );
};

export default Toolbar;