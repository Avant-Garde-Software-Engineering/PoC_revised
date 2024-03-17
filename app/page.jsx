"use client"

import { useEffect } from "react"
import { useState } from "react"

import Button from "@/components/button"
import ModalOverlay from "@components/modalOverlay"
import FormGroup from "@components/formGroup"
import Submit from "@components/submit"
import Cancel from "@components/cancel"
import SideGroup from "@components/sideGroup"
import * as shelfSetup from "@utilities/shelfSetup"
import * as prodSetup from "@utilities/prodSetup"
import * as movSetup from "@utilities/movSetup"
import * as whsSetup from "@utilities/whsSetup"
import SideContent from "@components/sideContent"

const Home = () => {
  const [shelfLibContent, setShelfLib] = useState(new Array())
  const [prodLibContent, setProdLib] = useState(new Array())
  const [started, setStarted] = useState(false)

  useEffect(() => {
    if(!started) {
      setStarted(!started)
      whsSetup.onStartup()   
    }
    console.log(shelfLibContent)
  });

  const removeFromShelf = (id) => {
    console.log(shelfLibContent)
    const nextLib = shelfLibContent.slice()
    nextLib.splice(nextLib.indexOf(id), 1);
    setShelfLib(nextLib)
  }

  const addToShelf = (id) => {
    const nextLib = shelfLibContent.slice()
    nextLib.push(id)
    setShelfLib(nextLib)
  }

  const shelfLib = []
  shelfLibContent.forEach(element => {
    shelfLib.push(<SideContent key={element} value={element} onBtClick={() => {removeFromShelf(element)}} />)
  });

  const removeFromProd = (id) => {
    console.log(prodLibContent)
    const nextLib = prodLibContent.slice()
    nextLib.splice(nextLib.indexOf(id), 1);
    setProdLib(nextLib)
  }

  const addToProd = (id) => {
    const nextLib = prodLibContent.slice()
    nextLib.push(id)
    setProdLib(nextLib)
  }

  const prodLib = []
  prodLibContent.forEach(element => {
    prodLib.push(<SideContent key={element} value={element} onBtClick={() => {removeFromProd(element)}} />)
  });

  const creationForm = 
  <>
    <h2>Benvenuto in <strong>WMS3D</strong>!</h2>
    <p>Inserire le misure del magazzino da creare:</p>
    <form id="WhsSetupForm" className="form" onSubmit={whsSetup.createWarehouse}>
      <FormGroup labelText='Larghezza (mt): ' type='number' id='WhsWidth' step='0.01' min='0.01'/>
      <FormGroup labelText='Profondità (mt): ' type='number' id='WhsDepth' step='0.01' min='0.01'/>
      <FormGroup labelText='Altezza (mt): ' type='number' id='WhsHeight' step='0.01' min='0.01'/>
      <Submit value="Crea"/>
    </form>
  </>
  
  const addShelfForm = 
  <>
    <h2>Aggiungi una scaffalatura</h2>
    <p>Inserire i dati della scaffalatura da creare:</p>
    <form className="form" id="shelfSetupForm" onSubmit={(e) => {shelfSetup.createShelf(e, addToShelf)}}>
        <FormGroup labelText='Codice: ' type='text' id='shelfId'/>
        <FormGroup labelText='Grandezza bin (mt): ' type='number' id='binSize' step='0.01' min='0.01'/>
        <FormGroup labelText='Larghezza (bin): ' type='number' id='shelfWidth' step='1' min='1'/>
        <FormGroup labelText='Altezza (bin): ' type='number' id='shelfHeight' step='1' min='1'/>
        <Cancel onclick={shelfSetup.hideShelfForm}/>
        <Submit value="Aggiungi"/>
    </form>
  </>

  const addProductForm =
  <>
    <h2>Aggiungi un prodotto:</h2>
    <p>Inserire il nome e le misure del prodotto da creare:</p>
    <form id="prodSetupForm" className="form" onSubmit={(e) => {prodSetup.createProduct(e, addToProd)}}>
      <FormGroup labelText='Nome: ' type='text' id='prodName'/>
      <Cancel onclick={prodSetup.hideProdForm}/>
      <Submit value="Aggiungi"/>
    </form>
  </>

  const moveProductForm = 
  <>
    <h2>Richiesta di movimentazione</h2>
    <p>Seleziona il prodotto da spostare e la destinazione:</p>
    <form id="moveRequestForm" className="form" onSubmit={movSetup.moveProduct}>
      <Cancel onclick={movSetup.hideMovForm}/>
      <Submit value="Invia richiesta"/>
    </form>
  </>

  return (
    <>
      <div className="bg-darkest flex justify-end border-b-2 max-[768px]:justify-center">
          <Button id="addShelfBtn" value="Crea scaffalatura" title="Crea scaffalatura" classtype="createShelf" onclick={shelfSetup.displayShelfForm}/>
          <Button id="addProductBtn" value="Crea prodotto" title="Crea prodotto" classtype="createProduct" onclick={prodSetup.displayProdForm}/>
          <Button id="askMoveBtn" value="Richiesta di spostamento" title="Richiesta di spostamento" classtype="moveProduct" onclick={movSetup.displayMovForm}/>
      </div>
      <div className="flex flex-row h-[100vh] max-[768px]:flex-col">
        <div className="bg-light overflow-auto w-[100%] h-[100%] max-[768px]:order-2 max-[768px]:w-[100%]">canvas</div>
        <div className="w-[17em] bg-dark p-[1em] flex flex-col gap-y-[2em] max-[768px]:order-1 max-[768px]:w-[100%]">
          <SideGroup id="shelves" title="Scaffalature" content={shelfLib}/>
          <SideGroup id="products" title="Prodotti" content={prodLib}/>
        </div>
      </div>
      <ModalOverlay id="setupWhs" children={creationForm} />
      <ModalOverlay id="addShelf" children={addShelfForm} />
      <ModalOverlay id="addProduct" children={addProductForm} />
      <ModalOverlay id="requestMove" children={moveProductForm} />
    </>    
  )
}

export default Home