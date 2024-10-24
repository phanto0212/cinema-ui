import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0,
  },
  reducers: {
    increment: state => {
      // Redux Toolkit cho phép chúng ta "mutate" state trực tiếp trong reducer
      state.value += 1
    },
    decrement: state => {
      state.value -= 1
    }
  }
})

// Export các actions để sử dụng trong component
export const { increment, decrement } = counterSlice.actions

// Export reducer để sử dụng trong store
export default counterSlice.reducer
