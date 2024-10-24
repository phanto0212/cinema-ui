import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './slides/counterSlide' // Đảm bảo đường dẫn là đúng

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
})

export default store