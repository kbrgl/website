// @jsx jsx
import { jsx, Container, Text, Heading } from 'theme-ui'
// eslint-disable-next-line no-unused-vars
import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'

const NotFound = () => (
  <Layout>
    <Container
      sx={{
        py: 3,
        borderBottom: '1px solid',
        borderBottomColor: 'primary',
        minHeight: ['60vh', '75vh'],
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      <div>
        <Heading variant="title" mb={1}>
          Not Found.
        </Heading>
        <Text>
          Whatever you’re looking for wasn’t found, but you can always{' '}
          <Link
            sx={{
              variant: 'styles.a',
            }}
            to="/"
          >
            go home
          </Link>
          .
        </Text>
      </div>
    </Container>
  </Layout>
)

export default NotFound
