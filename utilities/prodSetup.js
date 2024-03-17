export const displayProdForm = () => {
    const setupProdWin = document.getElementById('addProduct');
    setupProdWin.style.display = 'flex';
}
  
export const hideProdForm = (e) => {
    if(e) e.preventDefault()  
    const setupProdWin = document.getElementById('addProduct');
    const prodSizeForm = document.getElementById('prodSetupForm');
    setupProdWin.style.display = 'none';
    prodSizeForm.reset();
}

export const createProduct = (e, addToProd) => {
    /***********************************************/
    /*************** SETUP PRODOTTO ****************/
    /***********************************************/
    e.preventDefault();
    let prodWidth = 1.5;//parseFloat(document.getElementById('prodWidth').value);
    let prodDepth = 1.5;//parseFloat(document.getElementById('prodDepth').value);
    let prodHeight = 1.5;//parseFloat(document.getElementById('prodHeight').value);
    let prodName = document.getElementById('prodName').value.trim();
  
    if (isNaN(prodDepth) || isNaN(prodWidth) || isNaN(prodHeight) || prodName.length == 0) {        /*da implementare se check stesso nome*/       
      alert("Assicurarsi di aver compilato tutti i campi");
    } 
    else {
      hideProdForm(null)
      addToProd(prodName)
      /*
      try{
        let newProduct = new Product(prodName, prodWidth, prodHeight, prodDepth);
        if(addObjToLib(newProduct, prodName)){
          scene.add(newProduct.mesh);
        }
        closeSetUpProdWin();   
      } catch (e) {
        alert(e);
      }*/
    }
}