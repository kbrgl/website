// @jsx jsx
import { jsx, Flex } from 'theme-ui'
// eslint-disable-next-line no-unused-vars
import React from 'react'

export default ({ children, ...props }) => (
  <Flex
    sx={{
      flexDirection: ['column', 'row'],
    }}
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...props}
  >
    {children}
  </Flex>
)
