import { useCallback, useEffect, useState } from 'react'


export default function useOpenWithBrowserHistory(defaultOpen = false) {

  const [open, setOpen] = useState(defaultOpen)

  useEffect(() => {
    window.onpopstate = function(event) {
      if (!event.state || event.state.dialog === 1) {
        setOpen(true)
        return
      }
      setOpen(false)
    }
    return () => {
      window.onpopstate = undefined
    }
  }, [])

  const handleOpenClick = useCallback(() => {
    history.pushState({
      dialog: 1
    }, null, location.href)
    setOpen(true)
  }, [])

  const handleCloseClick = useCallback(() => {
    window.history.back()
  }, [])

  function handleSetOpen(open) {
    if (open) {
      handleOpenClick()
      return
    }
    handleCloseClick()
  }

  return [open, handleSetOpen]
}
