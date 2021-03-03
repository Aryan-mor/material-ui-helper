import { useCallback, useEffect, useState } from 'react'
import { getSafe, tryIt } from '..'
import _ from 'lodash'

const listOfListener = {}

function onPopState(event) {
  _.forEach(listOfListener, l => {
    tryIt(() => l(event))
  })
}

export default function useOpenWithBrowserHistory(uniq, defaultValue) {

  const [open, setOpen] = useState(false)

  useEffect(() => {

    if (!listOfListener[uniq]) {
      listOfListener[uniq] = function(event) {
        const state = event.state
        const data = getSafe(() => state[uniq], undefined)
        if (!state || data !== true) {
          setOpen(false)
          return
        }
        if (data === true) {
          setOpen(true)
        }
      }
    }
    window.onpopstate = onPopState
    if (defaultValue) {
      handleOpenClick()
    }

    return () => {
      tryIt(() => {
        delete listOfListener[uniq]
      })
    }
  }, [])

  const handleOpenClick = useCallback(() => {
    const data = {}
    data[uniq] = true
    history.pushState(data, null, location.href)
    setOpen(true)
  }, [])
  const handleCloseClick = useCallback(() => {
    window.history.back()
  }, [])


  const handleSetOpen = useCallback((open) => {
    if (open) {
      handleOpenClick()
      return
    }
    handleCloseClick()
  }, [])

  return [open, handleSetOpen, handleOpenClick, handleCloseClick]
}
