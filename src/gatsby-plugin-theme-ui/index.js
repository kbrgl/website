const lists = {
  marginLeft: 0,
  paddingLeft: '1em',
  li: {
    marginBottom: 1,
  },
}

const theme = {
  colors: {
    primary: '#ffffff',
    text: '#ffffff',
    background: '#bb27ad',
    highlight: '#00000022',
  },
  fonts: {
    body:
      '"Charter", Georgia, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
    heading:
      '"Cooper Hewitt", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
    title:
      '"Cooper Hewitt", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
    monospace:
      '"Fira Mono", Consolas, "Andale Mono WT", "Andale Mono", "Lucida Console", "Lucida Sans Typewriter", "DejaVu Sans Mono", "Bitstream Vera Sans Mono", "Liberation Mono", "Nimbus Mono L", Monaco, "Courier New", Courier, monospace;',
  },
  fontSizes: {
    body: 18,
    heading: 18,
    title: 30,
  },
  fontWeights: {
    body: 400,
    heading: 600,
    title: 400,
  },
  text: {
    body: {
      fontFamily: 'body',
      fontSize: 'body',
      fontWeight: 'body',
      lineHeight: 'body',
      color: 'text',
    },
    heading: {
      fontFamily: 'heading',
      fontSize: 'heading',
      fontWeight: 'heading',
      lineHeight: 'heading',
      color: 'text',
      marginBottom: 1,
    },
    title: {
      fontFamily: 'title',
      fontSize: 'title',
      fontWeight: 'title',
      lineHeight: 'title',
      color: 'text',
    },
    monospace: {
      fontFamily: 'monospace',
      fontSize: 'body',
      fontWeight: 'body',
      color: 'text',
    },
    logotype: {
      fontFamily: 'heading',
      fontSize: 'body',
      fontWeight: 600,
    },
    blogPostTitle: {
      fontSize: 48,
      fontWeight: 700,
      lineHeight: 1.2,
      marginTop: 1,
      marginBottom: 1,
    },
  },
  sizes: {
    container: 850,
  },
  styles: {
    root: {
      fontFamily: 'body',
      fontSize: 'body',
      fontWeight: 'body',
      color: 'text',
      lineHeight: 'body',
      a: {
        textDecoration: 'none',
        color: 'text',
      },
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale',
      '& :focus': {
        outlineWidth: 1,
        outlineStyle: 'dotted',
        outlineColor: 'primary',
      },
      '& ::selection': {
        backgroundColor: 'highlight',
      },
      'a.footnote-backref': {
        textDecoration: 'none',
        ml: '5px',
      },
    },
    hr: {
      color: 'primary',
      padding: 0,
      margin: 0,
      height: 0,
      border: 0,
      borderTop: '1px solid',
      borderColor: 'primary',
    },
    a: {
      textDecoration: 'underline',
    },
    ol: {
      ...lists,
    },
    ul: {
      ...lists,
    },
  },
  lineHeights: {
    body: 1.5,
    heading: 1.5,
    title: 1.25,
  },
  layout: {
    navbar: {},
    container: {
      px: [2, 0],
    },
  },
  space: [0, 10, 20, 30, 60],
  boxes: {
    left: {
      flex: 1 / 1.818,
      p: 3,
      pl: 0,
      pr: [0, 3],
      borderBottom: '1px solid',
      borderColor: 'primary',
    },
    right: {
      flex: 1 / 2.222,
      p: 3,
      pr: 0,
      pl: [0, 3],
      borderBottom: '1px solid',
      borderLeft: [0, '1px solid'],
      borderColor: 'primary',
    },
    full: {
      borderBottom: '1px solid',
      borderColor: 'primary',
      py: 3,
    },
  },
  lists: {
    unstyled: {
      listStyleType: 'none',
      padding: 0,
      marginBottom: 0,
    },
  },
  buttons: {
    unstyled: {
      backgroundColor: 'transparent',
      border: 0,
      padding: 0,
      margin: 0,
      color: 'inherit',
    },
  },
  breakpoints: ['850px'],
}

export const defaultShadow = (theme) =>
  `5px 5px 10px -5px ${theme.colors.primary}`

export default theme
