// @jsx jsx
import { jsx } from 'theme-ui'
// eslint-disable-next-line no-unused-vars
import React from 'react'
import { keyframes } from '@emotion/core'

const animate = keyframes`
  from {
    background-position: 50% 0%;
  }

  to {
    background-position: 50% 200%;
  }
`

export default () => (
  <div
    sx={{
      position: 'absolute',
      content: '""',
      top: 0,
      left: 0,
      zIndex: -2,
      height: '100%',
      width: '100%',
      margin: '0 auto',
      background: `linear-gradient(
        to bottom,
        #c42da8,
        #9e16c3,
        #6501de,
        #9e16c3,
        #c42da8
      )`,
      backgroundSize: '200% 200%',
      animation: `${animate} 15s ease infinite`,
    }}
  />
)
