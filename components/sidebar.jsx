import useWarehouseStore from '@lib/store';

export default function Sidebar() {
  const { shelves, products } = useWarehouseStore();

  const handleDeleteShelf = (shelfName) => {
    useWarehouseStore.getState().removeShelf(shelfName);
  };

  const handleDeleteProduct = (productName) => {
    useWarehouseStore.getState().removeProduct(productName);
  };

  return (
    <div className="w-[17em] bg-dark p-[1em] flex flex-col gap-y-[2em] max-[768px]:order-1 max-[768px]:w-[100%]">
      <h2 className='text-lg font-semibold'>Shelves</h2>
      <ul>
        {shelves.map((shelf) => (
          <li className='list-element' key={shelf.name}>
            {shelf.name}
            <button className="delete-button" onClick={() => handleDeleteShelf(shelf.name)}> Delete</button>
          </li>
        ))}
      </ul>
      <h2 className='text-lg font-semibold'>Products</h2>
      <ul>
        {products.map((product) => (
          <li className='list-element' key={product.name}>
            {product.name}
            <button className="delete-button" onClick={() => handleDeleteProduct(product.name)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
