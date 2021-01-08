export const UtilsStyle = {
  transition: (duration = 500) => {
    return {
      'WebkitTransition': 'all ' + duration + 'ms ease',
      'MozTransition': 'all ' + duration + 'ms ease',
      'MsTransition': 'all ' + duration + 'ms ease',
      'OTransition': 'all ' + duration + 'ms ease',
      transition: 'all ' + duration + 'ms ease'
    }
  },
  borderRadius: (radius) => {

    return {
      borderRadius: radius,
      WebkitBorderRadius: radius,
      MozBorderRadius: radius
    }
  },
  widthFitContent: () => {
    return {
      width: 'max-content',
      whiteSpace: 'nowrap'
    }
  },
  heightFitContent: () => {
    return {
      height: 'max-content',
      whiteSpace: 'nowrap'
    }
  },
  disableTextSelection: () => {
    return {
      WebkitTouchCallout: 'none',
      WebkitUserSelect: 'none',
      KhtmlUserSelect: 'none',
      MozUserSelect: 'none',
      MsUserSelect: 'none',
      userSelect: 'none'
    }
  }
}

export const Random = {
  randomInteger: (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min
  },
  randomString: (length, withNumber = true) => {
    let result = ''
    const characters = withNumber ? 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789' : 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    const charactersLength = characters.length
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    return result
  }
}
