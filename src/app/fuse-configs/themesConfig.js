import {fuseDark} from '@fuse/fuse-colors';
import lightBlue from '@material-ui/core/colors/lightBlue';
import red from '@material-ui/core/colors/red';

const lightText = {
  primary: 'rgb(17, 24, 39)',
  secondary: 'rgb(107, 114, 128)',
  disabled: 'rgb(149, 156, 169)',
};

const darkText = {
  primary: 'rgb(255,255,255)',
  secondary: 'rgb(229, 231, 235)',
  disabled: 'rgb(156, 163, 175)',
};

const themesConfig = {
  default: {
    palette: {
      mode: 'light',
      text: lightText,
      common: {
        black: 'rgb(17, 24, 39)',
        white: 'rgb(255, 255, 255)',
      },
      primary: fuseDark,
      secondary: {
        light: lightBlue[100],
        main: lightBlue[500],
        dark: lightBlue[900],
      },
      background: {
        paper: '#FFFFFF',
        default: '#f6f7f9',
      },
      error: red,
    },
    status: {
      danger: 'orange',
    },
  },
  sunset     : {
      palette: {
          type     : 'light',
          primary  : {
              light: '#ff908b',
              main : '#d0605e',
              dark : '#9b3134'
          },
          secondary: {
              light       : '#c76a1d',
              main        : '#ff994c',
              dark        : '#ffca7b',
              contrastText: '#fff'
          },
          error    : red
      },
      status : {
          danger: 'orange'
      }
  },
  greeny     : {
      palette: {
          type     : 'light',
          primary  : {
              light: '#6cabd4',
              main : '#387ca3',
              dark : '#005074'
          },
          secondary: {
              light       : '#89f6cf',
              main        : '#55c39e',
              dark        : '#159270',
              contrastText: '#fff'
          },
          error    : red
      },
      status : {
          danger: 'orange'
      }
  },
  beach      : {
      palette: {
          type     : 'light',
          primary  : {
              light       : '#c4d8dd',
              main        : '#93a7ab',
              dark        : '#65787c',
              contrastText: '#fff'
          },
          secondary: {
              light       : '#ffb281',
              main        : '#f18153',
              dark        : '#ba5228',
              contrastText: '#fff'
          }
      }
  },
  tech       : {
      palette: {
          type     : 'light',
          primary  : {
              light       : '#87efff',
              main        : '#4dbce9',
              dark        : '#008cb7',
              contrastText: '#fff'
          },
          secondary: {
              light: '#ffff83',
              main : '#d1e751',
              dark : '#9db516'
          }
      }
  },
  sweetHues  : {
      palette: {
          type     : 'light',
          primary  : {
              light       : '#d5c1eb',
              main        : '#a391b9',
              dark        : '#746389',
              contrastText: '#fff'
          },
          secondary: {
              light: '#90afd4',
              main : '#6080a3',
              dark : '#325474'
          }
      }
  },
  deepOcean  : {
      palette: {
          type     : 'dark',
          primary  : {
              light: '#8f53e7',
              main : '#5a24b4',
              dark : '#1e0083'
          },
          secondary: {
              light       : '#ff61ff',
              main        : '#fe00e9',
              dark        : '#c600b6',
              contrastText: '#fff'
          }
      }
  },
  slate      : {
      palette: {
          type     : 'dark',
          primary  : {
              light: '#86fff7',
              main : '#4ecdc4',
              dark : '#009b94'
          },
          secondary: {
              light       : '#ff9d99',
              main        : '#ff6b6b',
              dark        : '#c73840',
              contrastText: '#fff'
          }
      }
  },
  defaultDark: {
    palette: {
      mode: 'dark',
      text: darkText,
      primary: fuseDark,
      secondary: {
        light: lightBlue[100],
        main: lightBlue[500],
        dark: lightBlue[900],
      },
      background: {
        paper: '#1E2125',
        default: '#121212',
      },
      error: red,
    },
    status: {
      danger: 'orange',
    },
  },
  legacy: {
    palette: {
      mode: 'light',
      text: lightText,
      primary: fuseDark,
      secondary: {
        light: lightBlue[400],
        main: lightBlue[600],
        dark: lightBlue[700],
      },
      background: {
        paper: '#FFFFFF',
        default: '#F7F7F7',
      },
      error: red,
    },
    status: {
      danger: 'orange',
    },
  },
  light1: {
    palette: {
      mode: 'light',
      text: lightText,
      primary: {
        light: '#b3d1d1',
        main: '#006565',
        dark: '#003737',
      },
      secondary: {
        light: '#ffecc0',
        main: '#FFBE2C',
        dark: '#ff9910',
        contrastText: '#272727',
      },
      background: {
        paper: '#FFFFFF',
        default: '#F0F7F7',
      },
      error: red,
    },
    status: {
      danger: 'orange',
    },
  },
  light2: {
    palette: {
      mode: 'light',
      text: lightText,
      primary: {
        light: '#fdf3da',
        main: '#f8d683',
        dark: '#f3bc53',
        contrastText: '#252525',
      },
      secondary: {
        light: '#FADCB3',
        main: '#F3B25F',
        dark: '#ec9339',
        contrastText: '#252525',
      },
      background: {
        paper: '#FAFBFD',
        default: '#FFFFFF',
      },
      error: red,
    },
    status: {
      danger: 'orange',
    },
  },
  light3: {
    palette: {
      mode: 'light',
      text: lightText,
      primary: {
        light: '#D9C8CE',
        main: '#80485B',
        dark: '#50212F',
      },
      secondary: {
        light: '#FFE3BF',
        main: '#FFB049',
        dark: '#FF8619',
        contrastText: '#252525',
      },
      background: {
        paper: '#FFF0DF',
        default: '#FAFAFE',
      },
      error: red,
    },
    status: {
      danger: 'orange',
    },
  },
  light4: {
    palette: {
      mode: 'light',
      text: lightText,
      primary: {
        light: '#CDCCE8',
        main: '#5854B1',
        dark: '#2D2988',
      },
      secondary: {
        light: '#F8EBF2',
        main: '#E7BDD3',
        dark: '#D798B7',
        contrastText: '#1E1F23',
      },
      background: {
        paper: '#FFFFFF',
        default: '#F6F7FB',
      },
      error: red,
    },
    status: {
      danger: 'orange',
    },
  },
  light5: {
    palette: {
      mode: 'light',
      text: lightText,
      primary: {
        light: '#C2C7F1',
        main: '#3543D0',
        dark: '#161EB3',
      },
      secondary: {
        light: '#B3F1FE',
        main: '#00CFFD',
        dark: '#00B2FC',
        contrastText: '#1E1F23',
      },
      background: {
        paper: '#FFFFFF',
        default: '#F7FAFF',
      },
      error: red,
    },
    status: {
      danger: 'orange',
    },
  },
  light6: {
    palette: {
      mode: 'light',
      text: lightText,
      primary: {
        light: '#BBE2DA',
        main: '#1B9E85',
        dark: '#087055',
      },
      secondary: {
        light: '#FFD0C1',
        main: '#FF6231',
        dark: '#FF3413',
        contrastText: '#FFF',
      },
      background: {
        paper: '#FFFFFF',
        default: '#F2F8F1',
      },
      error: red,
    },
    status: {
      danger: 'orange',
    },
  },
  light7: {
    palette: {
      mode: 'light',
      text: lightText,
      primary: {
        light: '#BFC4E6',
        main: '#2A3BAB',
        dark: '#0F1980',
      },
      secondary: {
        light: '#C2ECF0',
        main: '#33C1CD',
        dark: '#149EAE',
        contrastText: '#1E1F23',
      },
      background: {
        paper: '#FFFFFF',
        default: '#EDF0F6',
      },
      error: red,
    },
    status: {
      danger: 'orange',
    },
  },
  light8: {
    palette: {
      mode: 'light',
      text: lightText,
      primary: {
        light: '#D2EFF2',
        main: '#68C8D5',
        dark: '#3AA7BA',
      },
      secondary: {
        light: '#FFF2C6',
        main: '#FED441',
        dark: '#FDB91C',
        contrastText: '#1E1F23',
      },
      background: {
        paper: '#FAF6F3',
        default: '#FFFFFF',
      },
      error: red,
    },
    status: {
      danger: 'orange',
    },
  },
  light9: {
    palette: {
      mode: 'light',
      text: lightText,
      primary: {
        light: '#D3C0CD',
        main: '#6B2C57',
        dark: '#3C102C',
      },
      secondary: {
        light: '#FDEAC9',
        main: '#F9B84B',
        dark: '#F59123',
        contrastText: '#1E1F23',
      },
      background: {
        paper: '#FFFFFF',
        default: '#FAFAFE',
      },
      error: red,
    },
    status: {
      danger: 'orange',
    },
  },
  light10: {
    palette: {
      mode: 'light',
      text: lightText,
      primary: {
        light: '#C6C9CD',
        main: '#404B57',
        dark: '#1C232C',
      },
      secondary: {
        light: '#FEEDC7',
        main: '#FCC344',
        dark: '#FAA11F',
        contrastText: '#1E1F23',
      },
      background: {
        paper: '#FFFFFF',
        default: '#F5F4F6',
      },
      error: red,
    },
    status: {
      danger: 'orange',
    },
  },
  light11: {
    palette: {
      mode: 'light',
      text: lightText,
      primary: {
        light: '#C4C4C4',
        main: '#3A3A3A',
        dark: '#181818',
      },
      secondary: {
        light: '#EFEFED',
        main: '#CBCAC3',
        dark: '#ACABA1',
        contrastText: '#1E1F23',
      },
      background: {
        paper: '#EFEEE7',
        default: '#FAF8F2',
      },
      error: {
        light: '#F7EAEA',
        main: '#EBCECE',
        dark: '#E3B9B9',
      },
    },
    status: {
      danger: 'yellow',
    },
  },
  light12: {
    palette: {
      mode: 'light',
      text: lightText,
      primary: {
        light: '#FFFAF6',
        main: '#FFEDE2',
        dark: '#FFE0CF',
      },
      secondary: {
        light: '#DBD8F7',
        main: '#887CE3',
        dark: '#584CD0',
        contrastText: '#FFFFFF',
      },
      background: {
        paper: '#FFFFFF',
        default: '#FCF8F5',
      },
      error: red,
    },
    status: {
      danger: 'orange',
    },
  },
  dark1: {
    palette: {
      mode: 'dark',
      text: darkText,
      primary: {
        light: '#C2C2C3',
        main: '#323338',
        dark: '#131417',
      },
      secondary: {
        light: '#B8E1D9',
        main: '#129B7F',
        dark: '#056D4F',
        contrastText: '#FFFFFF',
      },
      background: {
        paper: '#262526',
        default: '#1E1D1E',
      },
      error: red,
    },
    status: {
      danger: 'orange',
    },
  },
  dark2: {
    palette: {
      mode: 'dark',
      text: darkText,
      primary: {
        light: '#C9CACE',
        main: '#4B4F5A',
        dark: '#23262E',
      },
      secondary: {
        light: '#F8F5F2',
        main: '#E6DED5',
        dark: '#D5C8BA',
        contrastText: '#23262E',
      },
      background: {
        paper: '#31343E',
        default: '#2A2D35',
      },
      error: {
        light: '#F7EAEA',
        main: '#EBCECE',
        dark: '#E3B9B9',
      },
    },
    status: {
      danger: 'orange',
    },
  },
  dark3: {
    palette: {
      mode: 'dark',
      text: darkText,
      primary: {
        light: '#C2C8D2',
        main: '#354968',
        dark: '#16213A',
      },
      secondary: {
        light: '#F4CFCA',
        main: '#D55847',
        dark: '#C03325',
        contrastText: '#FFFFFF',
      },
      background: {
        paper: '#23354E',
        default: '#1B2A3F',
      },
      error: red,
    },
    status: {
      danger: 'orange',
    },
  },
  dark4: {
    palette: {
      mode: 'dark',
      text: darkText,
      primary: {
        light: '#CECADF',
        main: '#5A4E93',
        dark: '#2E2564',
      },
      secondary: {
        light: '#B3EBD6',
        main: '#00BC77',
        dark: '#009747',
        contrastText: '#FFFFFF',
      },
      background: {
        paper: '#22184B',
        default: '#180F3D',
      },
      error: red,
    },
    status: {
      danger: 'orange',
    },
  },
  dark5: {
    palette: {
      mode: 'dark',
      text: darkText,
      primary: {
        light: '#CCD7E2',
        main: '#56789D',
        dark: '#2B486F',
      },
      secondary: {
        light: '#D7D3ED',
        main: '#796CC4',
        dark: '#493DA2',
        contrastText: '#FFFFFF',
      },
      background: {
        paper: '#465261',
        default: '#232931',
      },
      error: red,
    },
    status: {
      danger: 'orange',
    },
  },
  dark6: {
    palette: {
      mode: 'dark',
      text: darkText,
      primary: {
        light: '#FFC7CE',
        main: '#FF445D',
        dark: '#FF1F30',
      },
      secondary: {
        light: '#B4E3FB',
        main: '#05A2F3',
        dark: '#0175EA',
        contrastText: '#FFFFFF',
      },
      background: {
        paper: '#2F3438',
        default: '#25292E',
      },
      error: red,
    },
    status: {
      danger: 'orange',
    },
  },
  dark7: {
    palette: {
      mode: 'dark',
      text: darkText,
      primary: {
        light: 'FFECC5',
        main: '#FEBE3E',
        dark: '#FD991B',
      },
      secondary: {
        light: '#FFC8C7',
        main: '#FE4644',
        dark: '#FD201F',
        contrastText: '#FFFFFF',
      },
      background: {
        paper: '#2A2E32',
        default: '#212529',
      },
      error: red,
    },
    status: {
      danger: 'orange',
    },
  },
  dark8: {
    palette: {
      mode: 'dark',
      text: darkText,
      primary: {
        light: '#BEBFC8',
        main: '#252949',
        dark: '#0D0F21',
      },
      secondary: {
        light: '#CBD7FE',
        main: '#5079FC',
        dark: '#2749FA',
        contrastText: '#1A1E22',
      },
      background: {
        paper: '#2D3159',
        default: '#202441',
      },
      error: red,
    },
    status: {
      danger: 'orange',
    },
  },
  dark9: {
    palette: {
      mode: 'dark',
      text: darkText,
      primary: {
        light: '#BCC8CD',
        main: '#204657',
        dark: '#0B202C',
      },
      secondary: {
        light: '#B3EBC5',
        main: '#00BD3E',
        dark: '#00981B',
        contrastText: '#FFFFFF',
      },
      background: {
        paper: '#1C1E27',
        default: '#15171E',
      },
      error: red,
    },
    overrides: {
      MuiInputLabel: { // Name of the component ⚛️ / style sheet
        root: { // Name of the rule
          "&$focused": { // increase the specificity for the pseudo class
            color: "#204657"
          }
        }
      }
    },
    status: {
      danger: 'orange',
    }
  },
  dark10: {
    palette: {
      mode: 'dark',
      text: darkText,
      primary: {
        light: '#C3C2D2',
        main: '#36336A',
        dark: '#16143C',
      },
      secondary: {
        light: '#D6CEFC',
        main: '#765CF5',
        dark: '#4630EE',
        contrastText: '#FFFFFF',
      },
      background: {
        paper: '#2D2A5D',
        default: '#26244E',
      },
      error: red,
    },
    status: {
      danger: 'orange',
    },
  },
  dark11: {
    palette: {
      mode: 'dark',
      text: darkText,
      primary: {
        light: '#BFB7BF',
        main: '#2A0F29',
        dark: '#0F040F',
      },
      secondary: {
        light: '#D9B9C3',
        main: '#801737',
        dark: '#500716',
        contrastText: '#FFFFFF',
      },
      background: {
        paper: '#200D1F',
        default: '#2D132C',
      },
      error: red,
    },
    status: {
      danger: 'orange',
    },
  },
  dark12: {
    palette: {
      mode: 'dark',
      text: darkText,
      primary: {
        light: '#CCC3C8',
        main: '#543847',
        dark: '#291720',
      },
      secondary: {
        light: '#DFB8BD',
        main: '#BE717A',
        dark: '#99424A',
        contrastText: '#1a161c',
      },
      background: {
        paper: '#4D4351',
        default: '#27141F',
      },
      error: red,
    },
    status: {
      danger: 'orange',
    },
  },
  greyDark: {
    palette: {
      mode: 'dark',
      text: darkText,
      primary: {
        light: fuseDark[200],
        main: fuseDark[700],
        dark: fuseDark[800],
      },
      secondary: {
        light: lightBlue[100],
        main: lightBlue[500],
        dark: lightBlue[900],
      },
      background: {
        paper: fuseDark[400],
        default: fuseDark[500],
      },
      error: red,
    },
    status: {
      danger: 'orange',
    },
  },
};

export default themesConfig;
