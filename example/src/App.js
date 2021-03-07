import React, { useCallback, useEffect, useState } from 'react'
import {
  gLog,
  useStateWithCallback,
  useStateWithCallbackInstant,
  useStateWithCallbackLazy,
  Dialog,
  Box,
  Button,
  getSafe,
  HiddenLgDown,
  HiddenLgUp,
  HiddenMdDown,
  HiddenMdUp,
  HiddenSmDown,
  HiddenSmUp,
  HiddenXlDown,
  HiddenXlUp,
  IconButton,
  Img,
  LazyLoad,
  HiddenXsDown, HiddenXsUp,
  Random,
  ShowInDesktop,
  ShowInMobile,
  ShowInTablet,
  ShowInTabletAndDesktop,
  Typography,
  useOpenWithBrowserHistory,
  UtilsElement,
  UtilsStyle,
  DefaultTextField,
  Skeleton
} from 'material-ui-helper'
import 'material-ui-helper/dist/index.css'
import Collapse from '@material-ui/core/Collapse'
import Checkbox from '@material-ui/core/Checkbox'
import { useTheme } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import 'material-ui-helper/src/styles.module.css'
import images from './images.json'
import './style.css'


const useTypographyStyle = makeStyles({
  root: props => ({
    backgroundColor: 'yellow',
    '&:before': {
      content: ' ',
      right: 0,
      left: 0,
      bottom: 0,
      borderBottom: `${getSafe(() => props.textDecorationBottom.width || '2px', '2px')} solid ${getSafe(() => props.textDecorationBottom.color || '#000', '#000')}`
    },
    '& p:after': {
      content: '',
      position: 'relative',
      right: 0,
      left: 0,
      bottom: 0,
      borderBottom: `${getSafe(() => props.textDecorationBottom.width || '2px', '2px')} solid ${getSafe(() => props.textDecorationBottom.color || '#000', '#000')}`
    }
  })
})

const App = () => {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState('sss')

  const [shake, setShake] = useState(false)
  const classes = useTypographyStyle()

  useEffect(() => {
    if (shake)
      setTimeout(() => {
        setShake(false)
      }, 600)
  }, [shake])

  return (
    <React.Fragment>

      <Button
        fullWidth={true}
        variant={'contained'}
        onClick={() => {
          setShake(true)
          setValue(Random.randomString(5))
        }}>
        clear
      </Button>
      <Typography variant={'h1'} m={12} p={12} transform={shake ? 'shake' : undefined}
                  style={{ backgroundColor: 'red' }}>
        transssssssssssssssfooorrrmmmm
      </Typography>
      <Typography variant={'h6'} py={1}
                  textDecorationBottom={{
                    color: 'red',
                    width: 5
                  }}>
        salam
      </Typography>
      <div className={classes.root}>
        <p>
          sfafas
        </p>
      </div>
    </React.Fragment>
  )
}

function P(props) {
  const primaryKey = 'color'

  return (
    <Box width={1} flexDirection={'column'}>
      <Box flex={1} width={1}>
        <React.Fragment>
          <Typography
            flex={1}
            textSelectable={false}
            px={1}
            alignItems={'center'}
            style={{
              cursor: 'pointer'
            }}>
            زنگ
          </Typography>
          <IconButton>
            ic
          </IconButton>
        </React.Fragment>
      </Box>
      <Collapse in={true}>
        <Box flexDirection={'column'}>
          {
            [
              {
                id: 1,
                title: 'قرمز',
                enTitle: 'red',
                color: 'red'
              },
              {
                id: 2,
                title: 'آبی',
                enTitle: 'blue',
                color: 'blue'
              },
              {
                id: 3,
                title: 'سبز',
                enTitle: 'green',
                color: 'green'
              },
              {
                id: 4,
                title: 'سیاه',
                enTitle: 'black',
                color: 'black'
              }
            ].map((it, index) => {

              return (
                <Item
                  item={it}
                  primaryKey={primaryKey}
                  active={true}
                  onClick={() => {
                  }}/>
              )
            })
          }
        </Box>
      </Collapse>
    </Box>
  )
}


function Item({ item: it, primaryKey, active, onClick, ...props }) {
  const theme = useTheme()
  return (
    <Box
      alignItems={'stretch'}
      width={'max-content'}
      onClick={onClick}
      style={{
        cursor: 'pointer'
      }}>
      <Checkbox
        checked={active}
        onChange={onClick}
        inputProps={{ 'aria-label': `item-${it[primaryKey]}` }}
        style={{
          margin: theme.spacing(0, 2)
        }}
      />
      <Box
        px={1}
        alignCenter={true}
        textSelectable={false}>
        <Box
          component={'span'}
          borderRadius={'100%'}
          width={20} height={20} mx={1}
          style={{ backgroundColor: it.color }}/>
        {
          !_.isObject(it.title) ?
            <Typography variant={'body2'}>
              {it.title}
            </Typography> :
            <Box>
              <Typography variant={'body2'}>
                {it.title.fa}
              </Typography>
              <Typography flex={1} justifyContent={'flex-end'}
                          variant={'body2'}>
                {it.title.en}
              </Typography>
            </Box>
        }
      </Box>
    </Box>
  )
}

const src = 'https://api.mehrtakhfif.com/media/boxes/14/2020-11-01/category/10-57-24-70-has-ph.jpg'

function App2({ ...props }) {

  let its = [...images.categories, ...images.categories]


  return (
    <Box m={5}
         center={true}
         flexWrap={'wrap'}
         style={{ position: 'relative' }}>
      <Box style={{ position: 'fixed', top: 0, zIndex: 99999 }}>
        <Button


          onClick={() => {
            UtilsElement.scrollTo()
          }}>
          scrollTop
        </Button>
        <Button onClick={() => {
          UtilsElement.scrollToElement(document.getElementById('testEl'), { offsetY: 300 })
        }}>
          ScrollToElement
        </Button>
      </Box>
      <LazyElement items={its}/>
      <LazyElement items={its} id={'testEl'}/>
      <LazyElement items={its}/>
      <LazyElement items={its}/>
      <LazyElement items={its}/>
      <LazyElement items={its}/>
      <LazyElement items={its}/>
      <LazyElement items={its}/>
    </Box>
  )
}


const LazyElement = ({ items: its, ...props }) => {
  return (
    <Box my={20} transition={false} serverSideRender={false} width={1} flexWrap={'wrap'} {...props}>
      {
        its.map(({ media, ...im }, index) =>
          <Box
            key={index}
            width={1 / 4}>
            <Box width={1} p={2}
                 flexDirectionColumn={true}>
              {
                true &&
                <Img
                  minHeight={20}
                  imageWidth={800}
                  imageHeight={500}
                  alt={media.title}
                  src={media.image}/>
              }
              <Box width={1} height={100} style={{ backgroundColor: Random.randomColor() }}>
                {Random.randomString(5)}
              </Box>
              <Typography center={true} variant={'body1'} pt={1}>
                {im.name}
              </Typography>
            </Box>
          </Box>
        )}
    </Box>
  )
}

function App3({ ...props }) {


  return (
    <Box flexDirectionColumn={true} height={2000}>
      <Box m={5}
           flexWrap={'wrap'}>
        {
          (new Array(200).fill(null)).map((i, index) => {
            const color = Random.randomColor()
            return (
              <Box key={color} width={'30%'} p={1}>
                <LazyLoad width={1}>
                  <El index={index} color={color}/>
                </LazyLoad>
              </Box>
            )
          })
        }
      </Box>
    </Box>
  )
}

const El = ({ index, color }) => {
  return (
    <Box
      width={1}
      style={{
        backgroundColor: color,
        ...UtilsStyle.borderRadius(5)
      }}>
      <Typography p={5} variant={'h6'} fontWeight={500}>
        {color}
      </Typography>
    </Box>
  )
}

function App4() {
  const theme = useTheme()
  const [disable, setDisable] = useState(true)
  return (
    <Box>
      <Button onClick={() => {
        setDisable(st => !st)
      }}>
        safasf
      </Button>
      <Button
        pt={[2, 5]}
        id={'login_first_step_submit_button'}
        fullWidth={true}
        color={theme.palette.primary.main}
        loading={false}
        disableElevation={true}
        disabled={disable}
        typography={{
          py: '8px',
          variant: 'body1',
          color: '#fff'
        }}>
        coskafasjjfh
      </Button>
    </Box>
  )
}

function App5() {

  function Box2({ children }) {
    return (
      <Box width={200} height={200} p={2} center={true}>
        <Box width={1} center={true} height={1} style={{ border: `1px solid #ccc`, ...UtilsStyle.borderRadius(5) }}>
          {children}
        </Box>
      </Box>
    )
  }

  const v1 = false
  const v2 = false
  const v3 = true

  return (
    <Box flexDirectionColumn={true} center={true}>
      {
        v1 &&
        <Box width={'98%'} py={2} my={2} flexWrap={'wrap'}
             style={{
               border: '1px solid #ddd',
               ...UtilsStyle.borderRadius(5)
             }}>
          <Box2>
            <HiddenXlUp>
              HiddenXlUp
            </HiddenXlUp>
          </Box2>
          <Box2>
            <HiddenLgUp>
              HiddenLgUp
            </HiddenLgUp>
          </Box2>
          <Box2>
            <HiddenMdUp>
              HiddenMdUp
            </HiddenMdUp>
          </Box2>
          <Box2>
            <HiddenSmUp>
              HiddenSmUp
            </HiddenSmUp>
          </Box2>
          <Box2>
            <HiddenXsUp>
              HiddenSmUp
            </HiddenXsUp>
          </Box2>
        </Box>
      }
      {v2 &&
      <Box width={'98%'} py={2} my={2} flexWrap={'wrap'}
           style={{
             border: '1px solid #ddd',
             ...UtilsStyle.borderRadius(5)
           }}>
        <Box2>
          <HiddenXlDown>
            HiddenXlDown
          </HiddenXlDown>
        </Box2>
        <Box2>
          <HiddenLgDown>
            HiddenLgDown
          </HiddenLgDown>
        </Box2>
        <Box2>
          <HiddenMdDown>
            HiddenMdDown
          </HiddenMdDown>
        </Box2>
        <Box2>
          <HiddenSmDown>
            HiddenSmDown
          </HiddenSmDown>
        </Box2>
        <Box2>
          <HiddenXsDown>
            HiddenXsDown
          </HiddenXsDown>
        </Box2>
      </Box>}
      {
        v3 &&
        <Box width={'98%'} py={2} my={2} flexWrap={'wrap'}
             style={{
               border: '1px solid #ddd',
               ...UtilsStyle.borderRadius(5)
             }}>
          <Box2>
            <ShowInTablet>
              ShowInTablet
            </ShowInTablet>
          </Box2>
          <Box2>
            <ShowInDesktop>
              ShowInDesktop
            </ShowInDesktop>
          </Box2>
          <Box2>
            <ShowInMobile>
              ShowInMobile
            </ShowInMobile>
          </Box2>
          <Box2>
            <ShowInTabletAndDesktop>
              ShowInTabletAndDesktop
            </ShowInTabletAndDesktop>
          </Box2>
        </Box>
      }

    </Box>
  )
}


function App6() {
  const [state, setState] = useState(false)
  const [value, setValue] = useState('')

  return (
    <Box p={10} flexDirectionColumn={true}>
      <DefaultTextField
        value={value}
        variant={'outlined'}
        placeholder={'جستجو'}
        name={'search'}
        autoComplete={'off'}
        autoFocus={false}
        onFocusIn={() => setState(true)}
        onFocusOut={() => setState(false)}
        onChangeTextField={(e, v) => setValue(v)}/>
      {state && 'fffffffffoccuuuused'}
    </Box>
  )
}


function App7() {
  const [show, setShow] = useState(true)

  return (
    <Box width={1 / 4}>
      <Button onClick={() => setShow(!show)}>
        show
      </Button>
      <Box flexDirectionColumn={true}>
        <Img
          imageHeight={372}
          imageWidth={600}
          src={'https://api.mehrtakhfif.com/media/boxes/2/2021-02-13/thumbnail/15-01-42-00-has-ph.jpg'}/>
        {
          show &&
          <Img
            imageHeight={372}
            imageWidth={600}
            src={'https://api.mehrtakhfif.com/media/boxes/2/2021-02-13/thumbnail/15-01-42-00-has-ph.jpg'}/>
        }
        {
          show &&
          <Img
            imageHeight={372}
            imageWidth={600}
            src={'https://api.mehrtakhfif.com/media/boxes/2/2021-02-13/thumbnail/15-01-42-00-has-ph.jpg'}/>
        }
        {
          show &&
          <Img
            imageHeight={372}
            imageWidth={600}
            src={'https://api.mehrtakhfif.com/media/boxes/2/2021-02-13/thumbnail/15-01-42-00-has-ph.jpg'}/>
        }
        {
          show &&
          <Img
            imageHeight={372}
            imageWidth={600}
            src={'https://api.mehrtakhfif.com/media/boxes/2/2021-02-13/thumbnail/15-01-42-00-has-ph.jpg'}/>
        }
      </Box>
    </Box>
  )
}

function App8() {

  return (
    <Box width={1 / 4}>
      <Skeleton height={300}/>
    </Box>
  )
}


function App9() {

  return (
    <Box>
      <TestItem uniq={'dialog'}/>
      <TestItem uniq={'dialog22'}/>
    </Box>
  )
}

function TestItem({ uniq }) {
  const [open, _, onOpen, onClose] = useOpenWithBrowserHistory(uniq)

  return (
    <React.Fragment>
      <Button onClick={onOpen}>
        open
      </Button>

      <Dialog open={open} fullScreen={true} closeElement={undefined} onClose={undefined}>
        <Box width={1} height={1} center={true}>
          <Button onClick={onClose}>
            tessssssssssssttt {uniq}
          </Button>
        </Box>
      </Dialog>
    </React.Fragment>
  )
}



function App10() {

  const cal1 = useCallback((d) => {
    gLog("salkdflkaslfklaskf D1",d)
  },[]);

  const cal2 = useCallback((d) => {
    gLog("salkdflkaslfklaskf D2",d)
  },[]);


  const [d1,setD1] = useStateWithCallback(1,cal1,false)
  const [d2,setD2] = useStateWithCallbackInstant(1,cal2,false)

  return(
    <Box my={2}>
      <Box>
        <Button onClick={()=>setD1(d=>d+1)}>
          D1- {d1}
        </Button>
      </Box>
      <Box>
        <Button onClick={()=>setD2(d=>d+1)}>
          D2- {d2}
        </Button>
      </Box>
    </Box>
  )
}


export default App10
