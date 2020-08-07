// @jsx jsx
import { jsx, Box, Container, Flex, Heading, Text } from 'theme-ui'
// eslint-disable-next-line no-unused-vars
import React from 'react'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Image from 'gatsby-image'
import formatDate from '../utils/format-date'

import Layout from '../components/layout'

const NoteTemplate = ({ data }) => {
  const post = data.mdx
  return (
    <Layout>
      <Container
        sx={{
          backgroundColor: '#250051',
          boxShadow: '0 4px 10px -5px rgba(0, 0, 0, 0.15)',
        }}
        py={4}
      >
        <Box sx={{ px: 3, margin: '0 auto', textAlign: 'center' }}>
          <div sx={{ opacity: 0.5 }}>
            {formatDate(new Date(post.frontmatter.date))} &middot;{' '}
            {post.fields.readingTime.text}
          </div>
          <Heading variant="text.blogPostTitle">
            {post.frontmatter.title}
          </Heading>
          <Flex
            sx={{
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Image
              sx={{
                borderRadius: '50%',
                overflow: 'hidden',
              }}
              fixed={data.file.childImageSharp.fixed}
            />
            <Text sx={{ opacity: 0.5, ml: 1 }}>by Kabir Goel</Text>
          </Flex>
        </Box>
        <Box sx={{ maxWidth: 485, mt: 4, mx: 'auto' }}>
          <Heading sx={{ textAlign: 'center' }}>
            {post.frontmatter.description}
          </Heading>
          <Box sx={{ maxWidth: 485 }}>
            <MDXRenderer>{post.body}</MDXRenderer>
          </Box>
        </Box>
      </Container>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      body
      frontmatter {
        title
        description
        date
      }
      fields {
        readingTime {
          text
        }
      }
    }
    file(relativePath: { eq: "author.png" }) {
      childImageSharp {
        fixed(
          width: 28
          height: 28
          fit: COVER
          cropFocus: ENTROPY
          duotone: { highlight: "#ffffff", shadow: "#250051" }
        ) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`

export default NoteTemplate
