import {merge} from "theme-ui"
import {tailwind} from "@theme-ui/presets"

const theme = merge(tailwind, {
  initialColorModeName: `light`,
  colors: {
    primary: '#ed664c',
    toggleIcon: tailwind.colors.gray[8],
    divide: tailwind.colors.gray[4],
    highlight: `#e2e8f0`,
    highlightWeight: `#86a1ab`,
    tagColor: `#175a8a`,
    tagBackground: tailwind.colors.gray[2],
    modes: {
      dark: {
        text: tailwind.colors.gray[4],
        primary: '#ed664c',
        secondary: `#7f8ea3`,
        toggleIcon: tailwind.colors.gray[4],
        background: `#1A202C`,
        heading: tailwind.colors.white,
        divide: tailwind.colors.gray[8],
        muted: tailwind.colors.gray[8],
        highlight: `#333c4a`,
        highlightWeight: `#86a1ab`,
        tagColor: tailwind.colors.blue[2],
        tagBackground: tailwind.colors.gray[7],
      },
    },
  },
  fonts: {
    body: `"IBM Plex Sans","Microsoft yahei"`,
    monospace: `Consolas, Menlo, Monaco`,
  },
  fontSizes: ["0.875rem", "1rem", "1.2rem", "1.5rem", "1.75rem", "2rem", "2.25rem", "2.5rem", "2.75rem"],
  styles: {
    pre: {
      fontFamily: `monospace`,
      fontSize: `14px`,
      padding: 3,
      borderRadius: `5px`,
    },
    root: {
      transition: `background 0.25s ease-in-out`,
      "::selection": {
        backgroundColor: `text`,
        color: `background`,
      },
      a: {
        transition: `all 0.3s ease-in-out`,
        color: `dark`,
        'text-decoration': `none`,
      },
      'a:hover': {
        color: `primary`,
      }
    },
    ul: {
      li: {
        fontSize: [1, 1, 2],
        lineHeight: `body`,
      },
    },
    ol: {
      li: {
        fontSize: [1, 1, 2],
        lineHeight: `body`,
      },
    },
    h4: {
      mt: 3
    },
    h5: {
      mt: 4
    },
    p: {
      fontSize: [1, 1, 2],
    },
    blockquote: {
      borderLeftColor: `primary`,
      borderLeftStyle: `solid`,
      borderLeftWidth: `6px`,
      mx: 0,
      pl: 4,
      p: {
        fontStyle: `italic`,
      },
    },
    table: {
      width: `100%`,
      my: 4,
      borderCollapse: `separate`,
      borderSpacing: 0,
      [[`th`, `td`]]: {
        textAlign: `left`,
        py: `4px`,
        pr: `4px`,
        pl: 0,
        borderColor: `muted`,
        borderBottomStyle: `solid`,
      },
    },
    th: {
      verticalAlign: `bottom`,
      borderBottomWidth: `2px`,
      color: `heading`,
    },
    td: {
      verticalAlign: `top`,
      borderBottomWidth: `1px`,
    },
  },
  layout: {
    container: {
      padding: [3, 4],
      maxWidth: `1024px`,
    },
  },
  dividers: {
    bottom: {
      borderBottomStyle: `solid`,
      borderBottomWidth: `1px`,
      borderBottomColor: `divide`,
      pb: 3,
    },
    top: {
      borderTopStyle: `solid`,
      borderTopWidth: `1px`,
      borderTopColor: `divide`,
      pt: 3,
    },
  },
  links: {
    primary: {
      color: `text`,
    },
    secondary: {
      color: `secondary`,
    },
  },
})

export default theme
