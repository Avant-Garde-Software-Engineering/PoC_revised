import { create } from 'zustand';

const useWarehouseStore = create((set) => ({
  shelves: [],
  products: [],
  warehouse: {
    width: null,
    depth: null,
    height: null,
  },
  setShelves: (shelves) => {
    console.log("Setting shelves:", shelves);
    set({ shelves });
  },
  setProducts: (products) => {
    console.log("Setting products:", products);
    set({ products });
  },
  setWarehouseDimensions: (dimensions) => {
    console.log("Setting warehouse dimensions:", dimensions);
    set((state) => ({ warehouse: { ...state.warehouse, ...dimensions } }));
  },
  addShelf: (shelf) => {
    console.log("Adding shelf:", shelf);
    set((state) => ({ shelves: [...state.shelves, shelf] }));
  },
  updateShelfPosition: (shelfId, newX, newY, newZ) => {
    set((state) => ({
      shelves: state.shelves.map((shelf) =>
        shelf.id === shelfId ? { ...shelf, x: newX, y: newY, z: newZ } : shelf
      ),
    }));
  },
  addProduct: (product) => {
    console.log("Adding product:", product);
    set((state) => ({ products: [...state.products, product] }));
  },
  removeShelf: (shelfId) => {
    console.log("Removing shelf with ID:", shelfId);
    set((state) => ({ shelves: state.shelves.filter((shelf) => shelf.id !== shelfId) }));
  },
  removeProduct: (productId) => {
    console.log("Removing product with ID:", productId);
    set((state) => ({ products: state.products.filter((product) => product.id !== productId) }));
  },
}));

export default useWarehouseStore;
