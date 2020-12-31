import React, { useRef, useState } from 'react'
import { FormController, DefaultTextField, Button, Dialog, Box, IconButton, Typography, gLog } from 'material-ui-helper'
import Collapse from '@material-ui/core/Collapse'
import Checkbox from '@material-ui/core/Checkbox'
import { useTheme } from '@material-ui/core'

const App = () => {
  const [open, setOpen] = useState(false)
  const ref = useRef()

  return (
    <React.Fragment>
      <Button
        onClick={() => {
          setOpen(true)
        }}>
        open Dialog
      </Button>
      <FormController
        innerRef={ref}
        onSubmit={() => {
          alert('onSubmit')
        }}
        onError={() => {
          alert('onError')
        }}
        m={2}>
        <Box flexDirection={'column'}>
          <DefaultTextField
            name={'one'}
            onChangeDelay={2000}
            placeholder={"sfas"}
            label={"label"}
            autoComplete={'off'}
            inputStyle={{
              textAlign:'center'
            }}
            color={{
              main:"blue",
              error:"error",
              success:"green",
              focus:{
                main: "red",
                success: "focusSuccess",
                error: "focusError",
              },
            }}
            onChange={(e, j) => {
              gLog('aslfglasklfkaslk', { e, j })
            }}
            autoFocus={true}
          />
        </Box>
      </FormController>
      <Dialog open={open}
              header={false}
              onOutSideClickClose={false}
              onBackdropClick={() => {

              }}
              onClose={() => {
                setOpen(false)
              }}>
        <Box p={5}>
          diallllllllllllllllog
        </Box>
      </Dialog>
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

export default App
