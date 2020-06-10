import {merge} from "theme-ui"
import {tailwind} from "@theme-ui/presets"

const theme = merge(tailwind, {
  initialColorModeName: `light`,
  colors: {
    primary: '#ed664c',
    // secondary: `#5f6c80`,
    toggleIcon: tailwind.colors.gray[8],
    // heading: tailwind.colors.black,
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
    body: `"IBM Plex Sans", -apple-system, BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"`,
    monospace: `Consolas, Menlo, Monaco, source-code-pro, Courier New, monospace`,
  },
  fontSizes: ["0.875rem", "1rem", "1.2rem", "1.5rem", "1.875rem", "2.25rem", "3rem", "4rem", "4.5rem"],
  styles: {
    pre: {
      fontFamily: `monospace`,
      fontSize: `14px`,
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
    // root: {
    //   color: `text`,
    //   backgroundColor: `background`,
    //   margin: 0,
    //   padding: 0,
    //   boxSizing: `border-box`,
    //   textRendering: `optimizeLegibility`,
    // },
    p: {
      fontSize: [1, 1, 2],
    },
    // ul: {
    //   li: {
    //     fontSize: [1, 1, 2],
    //     letterSpacing: `-0.003em`,
    //     lineHeight: `body`,
    //     "--baseline-multiplier": 0.179,
    //     "--x-height-multiplier": 0.35,
    //   },
    // },
    // ol: {
    //   li: {
    //     fontSize: [1, 1, 2],
    //     letterSpacing: `-0.003em`,
    //     lineHeight: `body`,
    //     "--baseline-multiplier": 0.179,
    //     "--x-height-multiplier": 0.35,
    //   },
    // },
    // h1: {
    //   variant: `text.heading`,
    //   fontSize: [5, 6, 7],
    //   mt: 2,
    // },
    // h2: {
    //   variant: `text.heading`,
    //   fontSize: [4, 5, 6],
    //   mt: 2,
    // },
    // h3: {
    //   variant: `text.heading`,
    //   fontSize: [3, 4, 5],
    //   mt: 3,
    // },
    // h4: {
    //   variant: `text.heading`,
    //   fontSize: [2, 3, 4],
    // },
    // h5: {
    //   variant: `text.heading`,
    //   fontSize: [1, 2, 3],
    // },
    // h6: {
    //   variant: `text.heading`,
    //   fontSize: 1,
    //   mb: 2,
    // },
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
  // text: {
  //   heading: {
  //     fontFamily: `heading`,
  //     fontWeight: `heading`,
  //     lineHeight: `heading`,
  //     color: `heading`,
  //   },
  // },
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
    // textDecoration: `none`,
    // ":hover": {
    //   color: `heading`,
    //   textDecoration: `underline`,
    // },
    // ":focus": {
    //   color: `heading`,
    // },
    primary: {
      color: `text`,
    },
    secondary: {
      color: `secondary`,
    },
  },
})

export default theme
