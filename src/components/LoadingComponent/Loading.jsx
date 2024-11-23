import { Spin } from 'antd'
import React from 'react'

function Loading({children, delay = 200, isLoading}) {
  return (
    <Spin spinning={isLoading} delay={500}>
        {children}
    </Spin>
  )
}

export default Loading