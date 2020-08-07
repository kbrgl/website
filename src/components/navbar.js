// @jsx jsx
import { jsx, Text, Container, Box, Link as ALink } from 'theme-ui'
// eslint-disable-next-line no-unused-vars
import React from 'react'
import { Link, graphql, StaticQuery } from 'gatsby'
import Image from 'gatsby-image'

const Navbar = () => (
  <StaticQuery
    query={graphql`
      query NavbarQuery {
        file(relativePath: { eq: "logo.png" }) {
          childImageSharp {
            fixed(height: 30) {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
    `}
    render={(data) => (
      <nav
        sx={{
          variant: 'layout.navbar',
        }}
      >
        <Container>
          <div
            sx={{
              pt: 3,
              pb: [1, 2],
              borderBottom: '1px solid',
              borderBottomColor: 'text',
              display: ['block', 'flex'],
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <Link
                to="/"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Image sx={{ mr: 1 }} fixed={data.file.childImageSharp.fixed} />
                <Text variant="logotype">Kabir Goel</Text>
              </Link>
            </div>
            <div>
              <Box
                as="ul"
                mt={[2, 0]}
                mb={0}
                variant="lists.unstyled"
                sx={{
                  cursor: 'default',
                  li: {
                    display: 'inline-block',
                    marginRight: [2, 3],
                    marginBottom: 0,
                    ':last-child': {
                      marginRight: 0,
                    },
                  },
                }}
              >
                <li>
                  <ALink
                    sx={{
                      textDecoration: 'none',
                    }}
                    href="mailto:kabirgoel.kg@gmail.com"
                  >
                    Email
                  </ALink>
                </li>
                <li>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://www.dropbox.com/s/k3bvk9ls3yzv0a6/r%C3%A9sum%C3%A9.pdf?dl=0"
                  >
                    Résumé
                  </a>
                </li>
              </Box>
            </div>
          </div>
        </Container>
      </nav>
    )}
  />
)

export default Navbar
