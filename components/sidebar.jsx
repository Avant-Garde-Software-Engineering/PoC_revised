import useWarehouseStore from '@lib/store';

export default function Sidebar() {
  const { shelves, products } = useWarehouseStore();

  return (
    <div className="w-[17em] bg-dark p-[1em] flex flex-col gap-y-[2em] max-[768px]:order-1 max-[768px]:w-[100%]">
      <h2 className='text-lg font-semibold'>Shelves</h2>
      <ul>
        {shelves.map((shelf) => (
          <li key={shelf.name}>{shelf.name}</li>
        ))}
      </ul>
      <h2 className='text-lg font-semibold'>Products</h2>
      <ul>
        {products.map((product) => (
          <li key={product.name}>{product.name}</li>
        ))}
      </ul>
    </div>
  );
}