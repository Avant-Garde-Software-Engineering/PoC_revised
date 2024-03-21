import useWarehouseStore from '@lib/store';

export default function Sidebar() {
  const { shelves, products , selectedObjectId} = useWarehouseStore();

  const handleDeleteShelf = (shelfName) => {
    if(selectedObjectId === shelfName) {
      useWarehouseStore.getState().deselectObject();
    }
    useWarehouseStore.getState().removeShelf(shelfName);
  };

  const handleDeleteProduct = (productName) => {
    useWarehouseStore.getState().removeProduct(productName);
  };

  const handleSelectShelf = (shelfName) => {
    useWarehouseStore.getState().selectObject(shelfName);
  };

  const handleSelectProduct = (productName) => {
    useWarehouseStore.getState().selectObject(productName);
  };

  return (
    <div className="overflow-y-scroll w-[17em] bg-dark p-[1em] flex flex-col gap-y-[2em] max-[768px]:order-1 max-[768px]:w-[100%]">
      <h2 className='text-lg font-semibold'>Scaffalature</h2>
      <ul>
        {shelves.map((shelf) => (
          <li className='list-element' key={shelf.name} >
            <button className="list-text-element" onClick={() => handleSelectShelf(shelf.name)}>{shelf.name}</button>
            <button className="delete-button" onClick={() => handleDeleteShelf(shelf.name)}> Delete</button>
          </li>
        ))}
      </ul>
      <h2 className='text-lg font-semibold'>Prodotti</h2>
      <ul>
        {products.map((product) => (
          <li className='list-element' key={product.name}>
            <span className="list-text-element">
            {product.name}
            </span> 
            <button className="move-button">Move</button>
            <button className="delete-button" onClick={() => handleDeleteProduct(product.name)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
