// @jsx jsx
import {
  jsx,
  Container,
  Box,
  Flex,
  Heading,
  Text,
  Link as ALink,
  useThemeUI,
} from 'theme-ui'
// eslint-disable-next-line no-unused-vars
import React from 'react'
import { graphql, Link } from 'gatsby'
import Image from 'gatsby-image'
import formatDate from '../utils/format-date'
import { defaultShadow } from '../gatsby-plugin-theme-ui'

import Layout from '../components/layout'
import Row from '../components/row'

const Posts = ({ data }) => (
  <Box as="ul" variant="lists.unstyled">
    {data.allMdx.nodes.map((node) =>
      !node.frontmatter.draft ? (
        <li key={node.frontmatter.title} sx={{ marginBottom: 1 }}>
          <Flex
            sx={{
              flexDirection: ['column', 'row'],
              justifyContent: 'space-between',
            }}
          >
            <Link
              sx={{
                variant: 'styles.a',
              }}
              to={node.fields.slug}
            >
              {node.frontmatter.title}
            </Link>
            <span>{formatDate(new Date(node.frontmatter.date))}</span>
          </Flex>
        </li>
      ) : null
    )}
  </Box>
)

const ArtAndDesign = ({ data }) => (
  <Flex
    sx={{
      overflowX: 'auto',
      overscrollBehaviorX: 'contain',
      pb: 1,
      scrollbarWidth: 'none',
      '::-webkit-scrollbar': {
        display: 'none',
      },
    }}
  >
    {data.allDesignJson.nodes.map((node) => (
      <Flex
        key={node.title}
        sx={{
          flexDirection: 'column',
          flex: '1 0 auto',
        }}
      >
        <Image
          sx={{
            boxShadow: defaultShadow,
            borderRadius: 3,
            mr: 3,
            maxWidth: '90vw',
          }}
          fixed={node.media.childImageSharp.fixed}
        />
      </Flex>
    ))}
  </Flex>
)

const Projects = ({ data }) => (
  <>
    {data.allProjectsJson.nodes.map((project, index) => (
      <Box as="section" key={project.title} mt={index === 0 ? 0 : 2}>
        <Heading as="h3" variant="text.body" mb={1}>
          <ALink href={project.link}>{project.title}</ALink>
        </Heading>
        <Text>{project.description}</Text>
      </Box>
    ))}
  </>
)

const tripletsOf = (arr) => {
  if (arr.length === 0) {
    return []
  }
  return [arr.slice(0, 3)].concat(tripletsOf(arr.slice(3)))
}

const CodeAndOpenSource = ({ data }) => {
  const triplets = tripletsOf(data.allCodeJson.nodes)
  return (
    <>
      {triplets.map((row) => (
        <Row key={row.reduce((acc, val) => acc + val.title, '')}>
          {row.map((openSourceProj) => (
            <Box key={openSourceProj.title} sx={{ flex: 1 / 3, pr: 3 }} mt={2}>
              <Heading as="h3" variant="text.body" mb={1}>
                <ALink href={openSourceProj.link}>{openSourceProj.title}</ALink>
              </Heading>
              <Text>{openSourceProj.description}</Text>
            </Box>
          ))}
        </Row>
      ))}
    </>
  )
}

const Me = ({ data }) => {
  const context = useThemeUI()
  const { theme } = context
  const breakpoint = theme.breakpoints[0]
  const sources = [
    {
      ...data.me.childImageSharp.fluid,
      media: `(min-width: ${breakpoint})`,
    },
    {
      ...data.meMobile.childImageSharp.fluid,
      media: `(max-width: ${breakpoint})`,
    },
  ]
  return (
    <div
      sx={{
        [`@media screen and (max-width: ${breakpoint})`]: {
          maxWidth: 128,
          maxHeight: 128,
          borderRadius: '50%',
          overflow: 'hidden',
        },
        boxShadow: defaultShadow,
      }}
    >
      <Image loading="auto" fluid={sources} alt="Me" />
    </div>
  )
}

const IndexPage = ({ data }) => (
  <Layout>
    <Container>
      <Row
        sx={{
          borderBottom: '1px solid',
          borderColor: 'primary',
          py: 3,
        }}
      >
        <Box
          sx={{
            flex: 1 / 3,
            mb: [3, 0],
          }}
        >
          <Me data={data} />
        </Box>
        <Flex
          sx={{
            flexDirection: 'column',
            justifyContent: 'space-between',
            flex: 2 / 3,
          }}
          ml={[0, 3]}
        >
          <Heading as="h1" variant="title" mb={2}>
            <del>Some guy from New Delhi</del>. Prolific producer of shower
            thoughts.
          </Heading>
          <Text sx={{ maxWidth: 435 }}>
            I’m an Indian-American maker, an incoming freshman at
            UC&nbsp;Berkeley and the outgoing President of{' '}
            <ALink href="https://exunclan.com/about">Exun&nbsp;Clan</ALink>. I
            like clean typefaces, Middleditch & Schwartz, naps and tea.
          </Text>
        </Flex>
      </Row>
      <Row>
        <Box variant="boxes.left">
          <Heading>Writing</Heading>
          <Text mb={2}>
            Mostly serious. Some not. (I’m trying to figure out the best way to
            share my writing, so there’s going to be more here soon!)
          </Text>
          <Posts data={data} />
        </Box>
        <Box variant="boxes.right">
          <Heading>On The Web</Heading>
          <Text mb={2}>
            You can follow me on{' '}
            <ALink href="https://twitter.com/@KabirGoel">Twitter</ALink>,{' '}
            <ALink href="https://open.spotify.com/user/12181834510?si=bmVw93WRQrOy0m0wBwXbAw">
              Spotify
            </ALink>
            , or <ALink href="https://github.com/kbrgl">GitHub</ALink>. I have
            an <ALink href="https://instagram.com/kabirhgoel">Instagram</ALink>,
            but I don’t accept follow requests from people I don’t know.
          </Text>
          <Text>
            I also have a <ALink href="https://keybase.io/kabir">Keybase</ALink>{' '}
            account, in case you wish to communicate securely.
          </Text>
        </Box>
      </Row>
      <Box variant="boxes.full">
        <Heading mb={3}>Art &amp; Design</Heading>
        <ArtAndDesign data={data} />
      </Box>
      <Row>
        <Box variant="boxes.left">
          <Heading>Now</Heading>
          <Text mb={2}>
            Right now, I’m completing CS 61A and CS 61B, two Berkeley pre-reqs
            for the CS major. I hope to major in what I call CS-squared:
            Computer Science and Cognitive Science.
          </Text>
          <Text mb={2}>
            In my off time, I’m exploring an interesting design problem focused
            on making blogging easier and more compatible with twenty first
            century design idioms.
          </Text>
          <Text mb={2}>
            Recently, I joined the Alumni Leadership Council (ALC) for the
            Conrad Foundation as an Observer, after a year as a Student Alumni
            Ambassador. For the next two months, I’m going to try out the ALC
            and figure out whether it’s a good fit for me.
          </Text>
          <Text>
            I’m also working on an applied machine learning project in medicine.
          </Text>
        </Box>
        <Box variant="boxes.right">
          <Heading mb={1}>Projects</Heading>
          <Projects data={data} />
        </Box>
      </Row>
      <Box variant="boxes.full">
        <Heading mb={0}>Code &amp; Open-Source</Heading>
        <CodeAndOpenSource data={data} />
      </Box>
      <Row>
        <Box variant="boxes.left">
          <Heading>Colophon</Heading>
          <Text>
            This website is set in Charter and Cooper Hewitt, and runs on the
            Gatsby static site generator. If you see something you like, be sure
            to check out{' '}
            <ALink href="https://github.com/kbrgl/website">the source</ALink>!
          </Text>
        </Box>
        <Box variant="boxes.right">
          <Heading>Last edited {data.currentBuildDate.currentDate}</Heading>
          <Text>
            The previous iteration of this website can be found on the{' '}
            <ALink href="https://web.archive.org/web/*/kabirgoel.com">
              Internet Archive
            </ALink>
            . Even older versions can be found on{' '}
            <ALink href="https://github.com/kbrgl/kbrgl.github.io">
              GitHub
            </ALink>
            .
          </Text>
        </Box>
      </Row>
    </Container>
  </Layout>
)

export default IndexPage

export const IndexQuery = graphql`
  query IndexQuery {
    me: file(relativePath: { eq: "me.png" }) {
      childImageSharp {
        fluid(
          maxWidth: 750
          duotone: { highlight: "#ffffff", shadow: "#250051" }
        ) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    meMobile: file(relativePath: { eq: "me-mobile.png" }) {
      childImageSharp {
        fluid(
          maxWidth: 250
          duotone: { highlight: "#ffffff", shadow: "#250051" }
        ) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    allMdx(sort: { fields: frontmatter___date, order: DESC }) {
      nodes {
        fields {
          slug
        }
        frontmatter {
          title
          description
          date
          draft
        }
      }
    }
    allDesignJson {
      nodes {
        title
        description
        media {
          childImageSharp {
            fixed(height: 300) {
              ...GatsbyImageSharpFixed
            }
          }
        }
        type
      }
    }
    allProjectsJson {
      nodes {
        title
        link
        description
      }
    }
    allCodeJson {
      nodes {
        title
        link
        description
      }
    }
    currentBuildDate {
      currentDate
    }
  }
`
