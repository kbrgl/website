// @jsx jsx
import { jsx, Flex, Container, Text, Button } from 'theme-ui'
// eslint-disable-next-line no-unused-vars
import React from 'react'

const Footer = () => (
  <footer>
    <Container>
      <Flex
        sx={{
          justifyContent: ['left', 'space-between'],
          flexDirection: ['column', 'row'],
        }}
        py={3}
      >
        <div>
          <Text>
            “If there’s anything more important than my ego around, I want it
            caught and shot now.”
          </Text>
          <Text>
            <em>—Zaphod Beeblebrox, The Hitchhiker’s Guide to the Galaxy</em>
          </Text>
        </div>
        <Button
          onClick={() => {
            window.scrollTo(0, 0)
          }}
          sx={{
            border: '1px solid',
            borderColor: 'primary',
            borderRadius: '50%',
            margin: 0,
            padding: 0,
            mt: [2, 0],
            pb: '4px',
            color: 'text',
            background: 'transparent',
            width: 30,
            height: 30,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            lineHeight: '1em',
            transition: 'background .2s ease-in-out, color .2s ease-in-out',
            ':hover': {
              backgroundColor: 'primary',
              color: 'background',
            },
          }}
          variant="circle"
        >
          ↑
        </Button>
      </Flex>
    </Container>
  </footer>
)

export default Footer
