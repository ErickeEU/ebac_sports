import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit'

import api, { useGetProdutosQuery } from '../services/api'
import { Produto } from '../App'

const favoritosInitialState: Produto[] = []

const carrinhoInitialState: Produto[] = []

const favoritosSlice = createSlice({
  name: 'favoritos',
  initialState: favoritosInitialState,
  reducers: {
    favoritar: (state, action: PayloadAction<Produto>) => {
      if (state.find((p) => p.id == action.payload.id)) {
        return state.filter((p) => p.id !== action.payload.id)
      } else {
        state.push(action.payload)
      }
    }
  }
})

const carrinhoSlice = createSlice({
  name: 'carrinho',
  initialState: carrinhoInitialState,
  reducers: {
    adicionaraocarrinho: (state, action: PayloadAction<Produto>) => {
      if (state.find((p) => p.id === action.payload.id)) {
        alert('Item já adicionado')
      } else {
        state.push(action.payload)
      }
    }
  }
})

const Store = configureStore({
  reducer: {
    favoritosReducer: favoritosSlice.reducer,
    carrinhoReducer: carrinhoSlice.reducer,
    [api.reducerPath]: api.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware)
})

export const carrinhoactions = carrinhoSlice.actions
export const favoritosactons = favoritosSlice.actions
export default Store
export type RootReducer = ReturnType<typeof Store.getState>
