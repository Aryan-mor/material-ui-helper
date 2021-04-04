import React from 'react'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core'
import ThemeProvider from '@material-ui/styles/ThemeProvider'
import App from './App'
import createPalette from '@material-ui/core/styles/createPalette'
import { Box } from 'material-ui-helper'

const fs = 32

const defaultTheme = createMuiTheme()
const theme = createMuiTheme({
  palette: createPalette({
    primary: {
      light: '#ffb4b4',
      main: '#ff527b',
      dark: '#ff003d'
    },
    secondary: {
      light: '#6faff8',
      main: '#52A3FF',
      dark: '#3593fd'
    },
    error: {
      light: '#dd4a66',
      main: '#E4254A',
      dark: '#e20631'
    },
    divider: '#E9E9E9'
  }),
  status: {},
  props: {
    MuiCard: {
      elevation: 2
    },
    MuiTooltip: {},
    MuiTypography: {
      style: {
        margin: 'unset'
      }
    }
  },
  typography: {
    h1: {
      fontSize: fs,
      [defaultTheme.breakpoints.down('md')]: {
        fontSize: '22px'
      }
    },
    h2: {
      fontSize: fs - (2 * 1)
    },
    h3: {
      fontSize: fs - (2 * 2)
    },
    h4: {
      fontSize: fs - (2 * 3)
    },
    h5: {
      fontSize: fs - (2 * 4)
    },
    h6: {
      fontSize: fs - (2 * 5)
    },
    subtitle1: {
      fontSize: fs - (2 * 6)
    },
    body1: {
      fontSize: fs - (2 * 7)
    },
    subtitle2: {
      fontSize: fs - (2 * 8)
    },
    body2: {
      fontSize: fs - (2 * 9)
    },
    caption: {
      fontSize: fs - (2 * 10)
    }
  },
  shadows: [
    'none',
    '0 .125rem .25rem rgba(0,0,0,.075)',
    '0 .5rem 1rem rgba(0,0,0,.15)',
    '0 0 20px 0 rgba(0,0,0,0.2)',
    '0 0 20px 0 rgba(0,0,0,0.2)',
    '0 0 20px 0 rgba(0,0,0,0.2)',
    '0 0 20px 0 rgba(0,0,0,0.2)',
    '0 0 20px 0 rgba(0,0,0,0.2)',
    '0 0 20px 0 rgba(0,0,0,0.2)',
    '0 0 20px 0 rgba(0,0,0,0.2)',


    '0 .5rem 1rem rgba(0,0,0,.15)',


    '0 .5rem 1rem rgba(0,0,0,.15)',
    '0 .5rem 1rem rgba(0,0,0,.15)',
    '0 .5rem 1rem rgba(0,0,0,.15)',
    '0 .5rem 1rem rgba(0,0,0,.15)',
    '0 .5rem 1rem rgba(0,0,0,.15)',
    '0 .5rem 1rem rgba(0,0,0,.15)',
    '0 .5rem 1rem rgba(0,0,0,.15)',
    '0 .5rem 1rem rgba(0,0,0,.15)',
    '0 .5rem 1rem rgba(0,0,0,.15)',
    '0 .5rem 1rem rgba(0,0,0,.15)',
    '0 .5rem 1rem rgba(0,0,0,.15)',
    '0 .5rem 1rem rgba(0,0,0,.15)',
    '0 .5rem 1rem rgba(0,0,0,.15)',
    '0 .5rem 1rem rgba(0,0,0,.15)',
    '0 .5rem 1rem rgba(0,0,0,.15)'
  ]
})

export default function() {

  return (
    <MuiThemeProvider theme={defaultTheme}>
      <ThemeProvider theme={defaultTheme}>
        <App/>
      </ThemeProvider>
    </MuiThemeProvider>
  )
}
