// @jsx jsx
import { jsx } from 'theme-ui'
// eslint-disable-next-line no-unused-vars
import React from 'react'
import { Helmet } from 'react-helmet'
import PropTypes from 'prop-types'
import 'typeface-cooper-hewitt'

import Navbar from '../navbar'
import Footer from '../footer'
import Background from '../background'

import './normalize.css'
import './style.css'

const Layout = ({ children }) => (
  <div
    sx={{
      position: 'relative',
      minHeight: '100vh',
    }}
  >
    <Helmet
      title="Kabir Goel"
      meta={[
        {
          name: 'description',
          content: 'Indian-American maker from New Delhi, India.',
        },
        {
          name: 'google-site-verification',
          content: 'mYCbMoGP2dt071GwtAtMtstdSx4tkrIBffu2E2fGbOA',
        },
      ]}
      htmlAttributes={{ lang: 'en' }}
    />
    <Navbar />
    <main>{children}</main>
    <Footer />
    <Background />
  </div>
)

export default Layout
