import { useEffect, useState } from 'react'
import Header from './components/Header'
import Produtos from './containers/Produtos'

import { GlobalStyle } from './styles'
import { useGetProdutosQuery } from './services/api'
import { UseSelector, useDispatch, useSelector } from 'react-redux'
import { RootReducer } from './store/store'
import { carrinhoactions, favoritosactons } from './store/store'

export type Produto = {
  id: number
  nome: string
  preco: number
  imagem: string
}

function App() {
  const carrinho = useSelector((state: RootReducer) => state.carrinhoReducer)
  const favoritos = useSelector((state: RootReducer) => state.favoritosReducer)
  const dispatch = useDispatch()
  const { data: produtos, isLoading } = useGetProdutosQuery()

  return (
    <>
      <GlobalStyle />
      <div className="container">
        <Header favoritos={favoritos} itensNoCarrinho={carrinho} />
        <Produtos />
      </div>
    </>
  )
}

export default App
