import Button from "@/components/button"

const Toolbar = ({ onAddShelfClick, onAddProductClick, onMoveClick, onSaveClick }) => {
  return (
    <div className="bg-darkest flex justify-end border-b-2 max-[768px]:justify-center">
      <Button id="addShelfBtn" value="Crea scaffalatura" title="Crea scaffalatura" classtype="createShelf" onclick={onAddShelfClick}/>
      <Button id="addProductBtn" value="Crea prodotto" title="Crea prodotto" classtype="createProduct" onclick={onAddProductClick}/>
      <Button id="askMoveBtn" value="Richiesta di spostamento" title="Richiesta di spostamento" classtype="moveProduct" onclick={onMoveClick}/>
      <Button id="saveBtn" value="Salva il magazzino" title="Salva il magazzino" classtype="saveWhs" onclick={onSaveClick}/>
    </div>  
  );
};

export default Toolbar;