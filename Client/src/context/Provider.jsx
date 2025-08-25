import { useReducer } from 'react'
import Reducer from './Reducer'
import Context from './Context'

function Provider({ children }) {
  const [state, dispatch] = useReducer(Reducer, {
    items: [],
    total: 0,
    itemCount: 0
  })

  return <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
}

export default Provider
