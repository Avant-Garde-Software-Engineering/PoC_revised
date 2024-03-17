export const displayMovForm = () => {
    const moveProdWin = document.getElementById('requestMove');
    moveProdWin.style.display = 'flex';
}
  
export const hideMovForm = (e) => {
    if(e) e.preventDefault()  
    const moveProdWin = document.getElementById('requestMove');
    const prodMovForm = document.getElementById('moveRequestForm');
    moveProdWin.style.display = 'none';
    prodMovForm.reset();
}
  
export const moveProduct = (e) => {
    e.preventDefault()
    
    console.log("move product click")
}