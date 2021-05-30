import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Box from './box/Box'
import { useEffectWithoutInit } from '../index'


function DelayComponent(props) {
  const { delay, refresh, forceShow, children } = props
  const [show, setShow] = useState()


  useEffect(() => handleShow(), [])

  useEffectWithoutInit(() => {
    if (refresh) {
      setShow(false)
      handleShow()
    }
  }, [refresh])

  function handleShow() {
    setTimeout(() => {
      setShow(true)
    }, delay)
  }


  return (
    (forceShow || show) ?
      children :
      <React.Fragment/>
  )
}


//region propTypes
DelayComponent.defaultProps = {
  delay: 300,
  refresh: false,
  forceShow: false
}

DelayComponent.propTypes = {
  delay: PropTypes.number,
  refresh: PropTypes.bool,
  forceShow: PropTypes.bool
}

export default DelayComponent
//endregion propTypes