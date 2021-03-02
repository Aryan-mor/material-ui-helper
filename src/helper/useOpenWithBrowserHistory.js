import { useCallback, useEffect, useState } from 'react'


export default function useOpenWithBrowserHistory() {

  const [open, setOpen] = useState(false)

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

  return [open, handleOpenClick, handleCloseClick]
}
