import React, { useCallback, useEffect, useMemo, useState } from 'react'
import {
  Backdrop,
  gLog,
  useInit,
  useState as useStateMaterialHelper,
  useStateWithCallback,
  useStateWithCallbackInstant,
  useStateWithCallbackLazy,
  Dialog,
  Box,
  SquareImg,
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
  Skeleton,
  useEffectWithoutInit,
  useLimitHeight,
  HoverWatcher,
  useLimitLine
} from 'material-ui-helper'
import 'material-ui-helper/dist/index.css'
import Collapse from '@material-ui/core/Collapse'
import Checkbox from '@material-ui/core/Checkbox'
import { ButtonBase, useTheme } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import 'material-ui-helper/src/styles.module.css'
import images from './images.json'
import './style.css'
import { grey } from '@material-ui/core/colors'


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
        {/*{*/}
        {/*  !_.isObject(it.title) ?*/}
        {/*    <Typography variant={'body2'}>*/}
        {/*      {it.title}*/}
        {/*    </Typography> :*/}
        {/*    <Box>*/}
        {/*      <Typography variant={'body2'}>*/}
        {/*        {it.title.fa}*/}
        {/*      </Typography>*/}
        {/*      <Typography flex={1} justifyContent={'flex-end'}*/}
        {/*                  variant={'body2'}>*/}
        {/*        {it.title.en}*/}
        {/*      </Typography>*/}
        {/*    </Box>*/}
        {/*}*/}
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
  const init = useInit()

  useEffect(() => {
  }, [init])


  const cal1 = useCallback((d) => {
    gLog('salkdflkaslfklaskf D1', d)
  }, [])

  const cal2 = useCallback((d) => {
    gLog('salkdflkaslfklaskf D2', init())
  }, [])


  const [d1, setD1] = useStateWithCallback(1, cal1, false)
  const [d2, setD2] = useStateWithCallbackInstant(1, cal2, false)


  useEffectWithoutInit(() => {
    gLog('salkdflkaslfklaskf:D :DDDDDDDDDDDDDDDD')
  }, [d2])


  return (
    <Box my={2}>
      <Box>
        <Button onClick={() => setD1(d => d + 1)}>
          D1- {d1}
        </Button>
      </Box>
      <Box>
        <Button onClick={() => setD2(d => d + 1)}>
          D2- {d2}
        </Button>
      </Box>
    </Box>
  )
}


function App11() {
  const [open1, _1, onOpen1, onClose1, { disabled }] = useOpenWithBrowserHistory('dialog1', {
    callBeforeOpenDuration: 4000,
    callBeforeCloseDuration: 4000,
    onBeforeOpen: () => {
      gLog('sakfjkkjaskjfk open')
    },
    onBeforeClose: () => {
      gLog('sakfjkkjaskjfk close')
    }

  })
  const [open2, _2, onOpen2, onClose2] = useOpenWithBrowserHistory('dialog2')
  const [open3, _3, onOpen3, onClose3] = useOpenWithBrowserHistory('dialog3')
  const [open4, _4, onOpen4, onClose4] = useOpenWithBrowserHistory('dialog4')


  return (
    <Box flexDirectionColumn={true}>
      <Button onClick={() => onOpen1()} disabled={disabled}>
        open dialog
      </Button>
      <Dialog fullScreen={true} open={open1} onClose={onClose1} onBackdropClick={onClose1}>
        <Box>
          <Button disabled={disabled} mx={2} onClick={() => onClose1()}>
            close
          </Button>
          <Button disabled={disabled} mx={2} onClick={() => onOpen2()}>
            openDialog2
          </Button>
          <Button disabled={disabled} mx={2} onClick={() => onOpen3()}>
            openDialog3
          </Button>
        </Box>

        <Dialog fullScreen={true} open={open2} onClose={onClose2} onBackdropClick={onClose2}>
          <Box>
            <Button mx={2} onClick={() => onClose2()}>
              close
            </Button>
            dialog3
            <Button mx={2} onClick={() => onOpen4()}>
              openDialog4
            </Button>
          </Box>
          <Dialog fullScreen={true} open={open4} onClose={onClose4} onBackdropClick={onClose4}>

            <Button mx={2} onClick={() => onClose4()}>
              close
            </Button>
            dialog4
          </Dialog>
        </Dialog>
        <Dialog fullScreen={true} open={open3} onClose={onClose3} onBackdropClick={onClose3}>
          <Box>
            <Button mx={2} onClick={() => onClose3()}>
              close
            </Button>
            dialog3
          </Box>
        </Dialog>
      </Dialog>
    </Box>
  )

}


function App12() {
  const [state, setState] = useState(1)
  const memo = React.useMemo(() => {
    return state * 5
  }, [state])


  gLog('aslfjklasklkflask', memo)

  return (
    <Box>
      <Button onClick={() => setState(state + 1)}>
        {memo}
      </Button>
    </Box>
  )
}

function App13() {
  const [state, setState] = useState(1)
  const memo = React.useMemo(() => {
    return state * 5
  }, [state])


  gLog('aslfjklasklkflask', memo)

  return (
    <Box>
      <Box width={400} height={400} style={{ backgroundColor: 'yellow' }}>
        sala,
        <Button color={'red'}> button</Button>
      </Box>
      <Backdrop transparent={true} open={true}/>
    </Box>
  )
}

function App14() {


  return (
    <Box flexWrap={'wrap'}>
      <ProductItem/>
      <ProductItem src={'http://api.mt.com/media/boxes/5/2020-05-04/thumbnail/15-10-41-27-has-ph.jpg'}/>
      <ProductItem/>
      <ProductItem src={'http://api.mt.com/media/boxes/5/2020-05-04/thumbnail/15-23-21-18-has-ph.jpg'}/>
      <ProductItem/>
      <ProductItem/>
      <ProductItem src={'http://api.mt.com/media/boxes/5/2020-05-04/thumbnail/15-10-41-27-has-ph.jpg'}/>
      <ProductItem/>
      <ProductItem src={'http://api.mt.com/media/boxes/5/2020-05-04/thumbnail/15-23-21-18-has-ph.jpg'}/>
      <ProductItem/>
      <ProductItem/>
      <ProductItem src={'http://api.mt.com/media/boxes/5/2020-05-04/thumbnail/15-10-41-27-has-ph.jpg'}/>
      <ProductItem/>
      <ProductItem src={'http://api.mt.com/media/boxes/5/2020-05-04/thumbnail/15-23-21-18-has-ph.jpg'}/>
      <ProductItem/>
      <ProductItem/>
      <ProductItem src={'http://api.mt.com/media/boxes/5/2020-05-04/thumbnail/15-10-41-27-has-ph.jpg'}/>
      <ProductItem/>
      <ProductItem src={'http://api.mt.com/media/boxes/5/2020-05-04/thumbnail/15-23-21-18-has-ph.jpg'}/>
      <ProductItem/>
      <ProductItem/>
      <ProductItem src={'http://api.mt.com/media/boxes/5/2020-05-04/thumbnail/15-10-41-27-has-ph.jpg'}/>
      <ProductItem/>
      <ProductItem src={'http://api.mt.com/media/boxes/5/2020-05-04/thumbnail/15-23-21-18-has-ph.jpg'}/>
      <ProductItem/>
      <ProductItem/>
      <ProductItem src={'http://api.mt.com/media/boxes/5/2020-05-04/thumbnail/15-10-41-27-has-ph.jpg'}/>
      <ProductItem/>
      <ProductItem src={'http://api.mt.com/media/boxes/5/2020-05-04/thumbnail/15-23-21-18-has-ph.jpg'}/>
      <ProductItem/>
      <ProductItem/>
      <ProductItem src={'http://api.mt.com/media/boxes/5/2020-05-04/thumbnail/15-10-41-27-has-ph.jpg'}/>
      <ProductItem/>
      <ProductItem src={'http://api.mt.com/media/boxes/5/2020-05-04/thumbnail/15-23-21-18-has-ph.jpg'}/>
      <ProductItem/>
      <ProductItem/>
      <ProductItem src={'http://api.mt.com/media/boxes/5/2020-05-04/thumbnail/15-10-41-27-has-ph.jpg'}/>
      <ProductItem/>
      <ProductItem src={'http://api.mt.com/media/boxes/5/2020-05-04/thumbnail/15-23-21-18-has-ph.jpg'}/>
      <ProductItem/>
      <ProductItem/>
      <ProductItem src={'http://api.mt.com/media/boxes/5/2020-05-04/thumbnail/15-10-41-27-has-ph.jpg'}/>
      <ProductItem/>
      <ProductItem src={'http://api.mt.com/media/boxes/5/2020-05-04/thumbnail/15-23-21-18-has-ph.jpg'}/>
      <ProductItem/>
      <ProductItem/>
      <ProductItem src={'http://api.mt.com/media/boxes/5/2020-05-04/thumbnail/15-10-41-27-has-ph.jpg'}/>
      <ProductItem/>
      <ProductItem src={'http://api.mt.com/media/boxes/5/2020-05-04/thumbnail/15-23-21-18-has-ph.jpg'}/>
      <ProductItem/>
      <ProductItem/>
      <ProductItem src={'http://api.mt.com/media/boxes/5/2020-05-04/thumbnail/15-10-41-27-has-ph.jpg'}/>
      <ProductItem/>
      <ProductItem src={'http://api.mt.com/media/boxes/5/2020-05-04/thumbnail/15-23-21-18-has-ph.jpg'}/>
      <ProductItem/>
      <ProductItem/>
      <ProductItem src={'http://api.mt.com/media/boxes/5/2020-05-04/thumbnail/15-10-41-27-has-ph.jpg'}/>
      <ProductItem/>
      <ProductItem src={'http://api.mt.com/media/boxes/5/2020-05-04/thumbnail/15-23-21-18-has-ph.jpg'}/>
      <ProductItem/>
      <ProductItem/>
      <ProductItem src={'http://api.mt.com/media/boxes/5/2020-05-04/thumbnail/15-10-41-27-has-ph.jpg'}/>
      <ProductItem/>
      <ProductItem src={'http://api.mt.com/media/boxes/5/2020-05-04/thumbnail/15-23-21-18-has-ph.jpg'}/>
      <ProductItem/>
      <ProductItem/>
      <ProductItem src={'http://api.mt.com/media/boxes/5/2020-05-04/thumbnail/15-10-41-27-has-ph.jpg'}/>
      <ProductItem/>
      <ProductItem src={'http://api.mt.com/media/boxes/5/2020-05-04/thumbnail/15-23-21-18-has-ph.jpg'}/>
      <ProductItem/>
      <ProductItem/>
      <ProductItem src={'http://api.mt.com/media/boxes/5/2020-05-04/thumbnail/15-10-41-27-has-ph.jpg'}/>
      <ProductItem/>
      <ProductItem src={'http://api.mt.com/media/boxes/5/2020-05-04/thumbnail/15-23-21-18-has-ph.jpg'}/>
      <ProductItem/>
      <ProductItem/>
      <ProductItem src={'http://api.mt.com/media/boxes/5/2020-05-04/thumbnail/15-10-41-27-has-ph.jpg'}/>
      <ProductItem/>
      <ProductItem src={'http://api.mt.com/media/boxes/5/2020-05-04/thumbnail/15-23-21-18-has-ph.jpg'}/>
      <ProductItem/>
      <ProductItem/>
      <ProductItem src={'http://api.mt.com/media/boxes/5/2020-05-04/thumbnail/15-10-41-27-has-ph.jpg'}/>
      <ProductItem/>
      <ProductItem src={'http://api.mt.com/media/boxes/5/2020-05-04/thumbnail/15-23-21-18-has-ph.jpg'}/>
      <ProductItem/>
    </Box>
  )
}

function ProductItem({ src = '' }) {

  return (
    <Box
      py={2.25}
      px={2}
      width={1 / 5}>
      <Box flexDirectionColumn={true} width={'40%'}>
        <Box width={1} pr={1}>
          <Img
            src={src}
            groupKey={'test'}
            alt={'thumbnail-skeleton'}
            imageWidth={600}
            imageHeight={372}/>
        </Box>
      </Box>
      <Box width={'60%'}>
        <Skeleton borderRadius={3} width={2 / 3} mt={3} height={30}/>
      </Box>
    </Box>
  )
}


function App15() {

  return (
    <Box
      p={2}
      style={{ backgroundColor: 'green' }}>
      <SquareImg
        width={100}
        imageWidth={800}
        imageHeight={500}
        src={'http://api.mt.com/media/boxes/2/2021-03-04/media/09-42-13-97-has-ph.jpg'}
        alt={'testSrc'}/>

    </Box>
  )
}

function App16() {

  return (
    <Box flexDirectionColumn={true}>
      <Box my={5} style={{
        backgroundColor: 'yellow'
      }}>
        <Cm1/>
      </Box>
      {/*<Box my={5} style={{ backgroundColor: 'green' }}>*/}
      {/*  <Cm2/>*/}
      {/*</Box>*/}
    </Box>
  )
}


function Cm1() {

  const [randomText, setRandomText] = useState('')
  const [ref, show, setShow, { canHide, lineHeight }] = useLimitHeight(100, { watcher: [randomText] })


  return (
    <Box flexDirectionColumn={true}>
      <Box
        ref={ref}
        flexDirectionColumn={true}
        style={{
          maxHeight: !show ? 120 : undefined,
          overflow: !show ? 'hidden' : undefined
        }}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
        molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
        numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
        optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis
        <br/>
        {randomText}
      </Box>
      {
        canHide &&
        <Button onClick={() => {
          setShow(!show)
        }}>{show ? 'بستن' : 'بازکردن'}</Button>
      }
      <Button onClick={() => {
        const t1 = '\n' +
          '        obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam\n' +
          '        nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit,\n' +
          '        tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit,\n' +
          '        obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam\n' +
          '        nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit,\n' +
          '        tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit,\n' +
          '        Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,\n' +
          '        molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum\n' +
          '        numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium\n' +
          '        optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis\n' +
          '        obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam\n' +
          '        nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit,\n' +
          '        tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit,\n' +
          '        obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam\n' +
          '        nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit,\n' +
          '        tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit,\n' +
          '        quia. Quo neque error repudiandae fuga? Ipsa laudantium molestias eos\n' +
          '        quia. Quo neque error repudiandae fuga? Ipsa laudantium molestias eos\n' +
          '        quia. Quo neque error repudiandae fuga? Ipsa laudantium molestias eos\n' +
          '        quia. Quo neque error repudiandae fuga? Ipsa laudantium molestias eos\n' +
          '        quia. Quo neque error repudiandae fuga? Ipsa laudantium molestias eos\n' +
          '        quia. Quo neque error repudiandae fuga? Ipsa laudantium molestias eos'
        if (randomText === t1) {
          setRandomText('')
          return
        }
        setRandomText(t1)
      }}>
        changeText
      </Button>

    </Box>
  )

}


const t1 = '\n' +
  '        obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam\n' +
  '        nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit,\n' +
  '        tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit,\n' +
  '        obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam\n' +
  '        nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit,\n' +
  '        tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit,\n' +
  '        Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,\n' +
  '        molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum\n' +
  '        numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium\n' +
  '        optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis\n' +
  '        obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam\n' +
  '        nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit,\n' +
  '        tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit,\n' +
  '        obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam\n' +
  '        nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit,\n' +
  '        tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit,\n' +
  '        quia. Quo neque error repudiandae fuga? Ipsa laudantium molestias eos\n' +
  '        quia. Quo neque error repudiandae fuga? Ipsa laudantium molestias eos\n' +
  '        quia. Quo neque error repudiandae fuga? Ipsa laudantium molestias eos\n' +
  '        quia. Quo neque error repudiandae fuga? Ipsa laudantium molestias eos\n' +
  '        quia. Quo neque error repudiandae fuga? Ipsa laudantium molestias eos\n' +
  '        quia. Quo neque error repudiandae fuga? Ipsa laudantium molestias eos'

function Cm2() {


  const [randomText, setRandomText] = useState(t1)
  const [ref, show, setShow, { canHide, lineHeight }] = useLimitLine(4, { defaultShow: false, watcher: [randomText] })


  return (
    <Box
      ref={ref} flexDirectionColumn={true}>
      <Box
        flexDirectionColumn={true}
        style={{
          maxHeight: !show ? (4 * lineHeight) + 20 : undefined,
          overflow: !show ? 'hidden' : undefined
        }}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
        molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
        numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
        optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
        molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
        numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
        optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
        molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
        numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
        optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
        molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
        numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
        optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
        molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
        numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
        optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
        molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
        numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
        optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis
        <br/>
        {randomText}
      </Box>
      {
        canHide &&
        <Button onClick={() => {
          setShow(!show)
        }}>{show ? 'بستن' : 'بازکردن'}</Button>
      }
      <Button
        onClick={() => {
          if (randomText === t1) {
            setRandomText('')
            return
          }
          setRandomText(t1)
        }}>
        changeText
      </Button>

    </Box>
  )
}

function App17() {
  const [d1, setD1] = useStateMaterialHelper(1, {
    validator: (vale, setter) => {
      if (vale > 10)
        return
      setter(vale)
    }
  })


  return (
    <Box style={{ backgroundColor: 'red', width: 100, height: 100 }}>
      <Button onClick={() => setD1(d1 + 1)}>
        add
      </Button>
      {d1}
    </Box>
  )
}


function createItem(index) {
  const items = []
  for (let i = index; i < (index + (Math.random() * 10) + 1); i++) {
    items.push({
      label: `sub${index}-${i}`
    })
  }
  return {
    label: `menu-${index}`,
    items: items
  }
}

const menu = [
  createItem(1),
  createItem(2),
  createItem(3),
  createItem(4),
  createItem(5),
  createItem(6),
  createItem(7),
  createItem(8)
]

function App18({ ...props }) {
  const [activeMenu, setActiveMenu] = useState(0)
  const [timer, setTimer] = useState(undefined)


  useEffect(() => {
    gLog('Hoooooooovver', activeMenu)
  }, [activeMenu])

  function onHover(index) {
    clearTimeout(timer)
    setTimer(setTimeout(() => {
      setActiveMenu(index)
    }, 600))
  }

  return (
    <Box display={'flex'} m={8} flexWrap={'wrap'}>
      <Box display={'flex'} width={1}>
        {['red', 'blue', 'green', 'pink', 'brown', 'black', 'yellow', 'cyan'].map(it => (
          <Box key={it} width={1 / 4} height={100} p={2}>
            <Box width={1}
                 height={1}
                 display={'flex'}
                 alignCenter
                 justifyCenter
                 borderRadius={5}
                 skeleton={true}
                 hoverStyle={{
                   backgroundColor: it
                 }}>
              {it}
            </Box>
          </Box>
        ))}
      </Box>
      <Box display={'flex'} component={'ul'} flexDirection={'column'}>
        {menu.map((item, index) => (
          <Box key={item.label} component={'li'}>
            <HoverWatcher
              p={1} m={0.5}
              component={ButtonBase}
              enterSkip={false}
              timeout={1000}
              onHover={(hover) => {
                if (hover)
                  onHover(index)
              }}
              style={{
                borderColor: `1px solid ${grey[400]}`,
                ...UtilsStyle.borderRadius(5)
              }}>
              <Typography variant={'h6'}>
                {item.label}
              </Typography>
            </HoverWatcher>
          </Box>
        ))}
      </Box>
      <Box display={'flex'} mx={1}
           flexDirection={'column'} component={'ul'}
           styke={{
             backgroundColor: grey[200]
           }}>
        {
          menu[activeMenu].items.map((item, index) => (
            <Box key={item.label} component={'li'}>
              <HoverWatcher
                p={1} m={0.5}
                component={ButtonBase}
                enterSkip={true}
                onHover={(hover) => {
                  clearTimeout(timer)
                }}
                style={{
                  borderColor: `1px solid ${grey[400]}`,
                  ...UtilsStyle.borderRadius(5)
                }}>
                <Typography variant={'h6'}>
                  {item.label}
                </Typography>
              </HoverWatcher>
            </Box>
          ))
        }
      </Box>
    </Box>
  )
}


function App19() {
  return (
    <Box mx={4} my={5}>
      <Typography
        variant={{
          xs: 'h1',
          sm:"h2",
          md:"h3",
          lg:"h4",
          xl:"h5"
        }}>
        Test Text
      </Typography>
    </Box>
  )
}

export default App19
