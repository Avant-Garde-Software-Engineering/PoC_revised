import { create } from 'zustand';

const useWarehouseStore = create((set) => ({
  shelves: [],
  products: [],
  warehouse: {
    width: null,
    depth: null,
    height: null,
  },
  selectedObjectId: null,
  selectObject: (objectId) => set({ selectedObjectId: objectId }),
  deselectObject: () => set({ selectedObjectId: null }),
  setShelves: (shelves) => set({ shelves }),
  setProducts: (products) => set({ products }),
  setWarehouseDimensions: (dimensions) => set((state) => ({ warehouse: { ...state.warehouse, ...dimensions } })),
  addShelf: (shelf) => set((state) => ({ shelves: [...state.shelves, shelf] })),
  updateShelfPosition: (shelfId, newX, newZ) => {
    set((state) => ({
      shelves: state.shelves.map((shelf) =>
        shelf.id === shelfId ? { ...shelf, x: newX, z: newZ } : shelf
      ),
    }));
  },
  addProduct: (product) => set((state) => ({ products: [...state.products, product] })),
  removeShelf: (shelfId) => set((state) => ({ shelves: state.shelves.filter(shelf => shelf.id !== shelfId) })),
  removeProduct: (productId) => set((state) => ({ products: state.products.filter(product => product.id !== productId) })),
}));

export default useWarehouseStore;