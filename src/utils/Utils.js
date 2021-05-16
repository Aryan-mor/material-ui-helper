import { gLog, isClient, tryIt } from './Helper'
import QueryString from 'query-string'
import _ from 'lodash'


const Utils = {
  getQueryFromUrl: url => {
    if (_.isObject(url) && url.history && url.history.state) {
      url = url.history.state.as || url.history.state
    }
    if (!_.isString(url))
      return {}
    const a = url.match('([^\\?]+)\\?(.*)')
    if (!a || _.isEmpty(a) || !_.isArray(a) || !a[2])
      return {}
    return QueryString.parse('?' + a[2])
  },
  getQueryFromWindows: () => {
    if (!isClient())
      return {}
    return Utils.getQueryFromUrl(window)
  },
  copyToClipboard: str => {
    const container = document.createElement('div')
    container.style.position = 'absolute'
    container.style.left = '-9999px'
    const el = document.createElement('textarea')
    el.value = str
    el.setAttribute('readonly', '')
    container.appendChild(el)
    document.body.appendChild(container)                  // Append the <textarea> element to the HTML document
    const selected =
      document.getSelection().rangeCount > 0        // Check if there is any content selected previously
        ? document.getSelection().getRangeAt(0)     // Store selection if found
        : false                                    // Mark as false to know no selection existed before
    el.select()                                    // Select the <textarea> content
    document.execCommand('copy')                   // Copy - only works as a result of a user action (e.g. click events)
    document.body.removeChild(container)                  // Remove the <textarea> element
    if (selected) {                                 // If a selection existed before copying
      document.getSelection().removeAllRanges()    // Unselect everything on the HTML document
      document.getSelection().addRange(selected)   // Restore the original selection
    }
  }
}

export default Utils

export const UtilsElement = {
  scrollTo: ({ behavior = 'smooth' } = {}) => {
    tryIt(() => {
      window.scrollTo({ top: 0, behavior: behavior })
    })
  },
  scrollToElement: (el, { behavior = 'smooth', offsetY = 10 } = {}) => {

    tryIt(() => {
      const elementPosition = el.getBoundingClientRect().top
      const offsetPosition = elementPosition - offsetY

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    })


  }
}

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
  },
  randomColor: () => {
    const mdColors = [
      '#F44336',
      '#FFEBEE',
      '#FFCDD2',
      '#EF9A9A',
      '#E57373',
      '#EF5350',
      '#F44336',
      '#E53935',
      '#D32F2F',
      '#C62828',
      '#B71C1C',
      '#FF8A80',
      '#FF5252',
      '#FF1744',
      '#D50000',
      '#E91E63',
      '#FCE4EC',
      '#F8BBD0',
      '#F48FB1',
      '#F06292',
      '#EC407A',
      '#E91E63',
      '#D81B60',
      '#C2185B',
      '#AD1457',
      '#880E4F',
      '#FF80AB',
      '#FF4081',
      '#F50057',
      '#C51162',
      '#9C27B0',
      '#F3E5F5',
      '#E1BEE7',
      '#CE93D8',
      '#BA68C8',
      '#AB47BC',
      '#9C27B0',
      '#8E24AA',
      '#7B1FA2',
      '#6A1B9A',
      '#4A148C',
      '#EA80FC',
      '#E040FB',
      '#D500F9',
      '#AA00FF',
      '#673AB7',
      '#EDE7F6',
      '#D1C4E9',
      '#B39DDB',
      '#9575CD',
      '#7E57C2',
      '#673AB7',
      '#5E35B1',
      '#512DA8',
      '#4527A0',
      '#311B92',
      '#B388FF',
      '#7C4DFF',
      '#651FFF',
      '#6200EA',
      '#3F51B5',
      '#E8EAF6',
      '#C5CAE9',
      '#9FA8DA',
      '#7986CB',
      '#5C6BC0',
      '#3F51B5',
      '#3949AB',
      '#303F9F',
      '#283593',
      '#1A237E',
      '#8C9EFF',
      '#536DFE',
      '#3D5AFE',
      '#304FFE',
      '#2196F3',
      '#E3F2FD',
      '#BBDEFB',
      '#90CAF9',
      '#64B5F6',
      '#42A5F5',
      '#2196F3',
      '#1E88E5',
      '#1976D2',
      '#1565C0',
      '#0D47A1',
      '#82B1FF',
      '#448AFF',
      '#2979FF',
      '#2962FF',
      '#03A9F4',
      '#E1F5FE',
      '#B3E5FC',
      '#81D4FA',
      '#4FC3F7',
      '#29B6F6',
      '#03A9F4',
      '#039BE5',
      '#0288D1',
      '#0277BD',
      '#01579B',
      '#80D8FF',
      '#40C4FF',
      '#00B0FF',
      '#0091EA',
      '#00BCD4',
      '#E0F7FA',
      '#B2EBF2',
      '#80DEEA',
      '#4DD0E1',
      '#26C6DA',
      '#00BCD4',
      '#00ACC1',
      '#0097A7',
      '#00838F',
      '#006064',
      '#84FFFF',
      '#18FFFF',
      '#00E5FF',
      '#00B8D4',
      '#009688',
      '#E0F2F1',
      '#B2DFDB',
      '#80CBC4',
      '#4DB6AC',
      '#26A69A',
      '#009688',
      '#00897B',
      '#00796B',
      '#00695C',
      '#004D40',
      '#A7FFEB',
      '#64FFDA',
      '#1DE9B6',
      '#00BFA5',
      '#4CAF50',
      '#E8F5E9',
      '#C8E6C9',
      '#A5D6A7',
      '#81C784',
      '#66BB6A',
      '#4CAF50',
      '#43A047',
      '#388E3C',
      '#2E7D32',
      '#1B5E20',
      '#B9F6CA',
      '#69F0AE',
      '#00E676',
      '#00C853',
      '#8BC34A',
      '#F1F8E9',
      '#DCEDC8',
      '#C5E1A5',
      '#AED581',
      '#9CCC65',
      '#8BC34A',
      '#7CB342',
      '#689F38',
      '#558B2F',
      '#33691E',
      '#CCFF90',
      '#B2FF59',
      '#76FF03',
      '#64DD17',
      '#CDDC39',
      '#F9FBE7',
      '#F0F4C3',
      '#E6EE9C',
      '#DCE775',
      '#D4E157',
      '#CDDC39',
      '#C0CA33',
      '#AFB42B',
      '#9E9D24',
      '#827717',
      '#F4FF81',
      '#EEFF41',
      '#C6FF00',
      '#AEEA00',
      '#FFEB3B',
      '#FFFDE7',
      '#FFF9C4',
      '#FFF59D',
      '#FFF176',
      '#FFEE58',
      '#FFEB3B',
      '#FDD835',
      '#FBC02D',
      '#F9A825',
      '#F57F17',
      '#FFFF8D',
      '#FFFF00',
      '#FFEA00',
      '#FFD600',
      '#FFC107',
      '#FFF8E1',
      '#FFECB3',
      '#FFE082',
      '#FFD54F',
      '#FFCA28',
      '#FFC107',
      '#FFB300',
      '#FFA000',
      '#FF8F00',
      '#FF6F00',
      '#FFE57F',
      '#FFD740',
      '#FFC400',
      '#FFAB00',
      '#FF9800',
      '#FFF3E0',
      '#FFE0B2',
      '#FFCC80',
      '#FFB74D',
      '#FFA726',
      '#FF9800',
      '#FB8C00',
      '#F57C00',
      '#EF6C00',
      '#E65100',
      '#FFD180',
      '#FFAB40',
      '#FF9100',
      '#FF6D00',
      '#FF5722',
      '#FBE9E7',
      '#FFCCBC',
      '#FFAB91',
      '#FF8A65',
      '#FF7043',
      '#FF5722',
      '#F4511E',
      '#E64A19',
      '#D84315',
      '#BF360C',
      '#FF9E80',
      '#FF6E40',
      '#FF3D00',
      '#DD2C00',
      '#795548',
      '#EFEBE9',
      '#D7CCC8',
      '#BCAAA4',
      '#A1887F',
      '#8D6E63',
      '#795548',
      '#6D4C41',
      '#5D4037',
      '#4E342E',
      '#3E2723',
      '#9E9E9E',
      '#FAFAFA',
      '#F5F5F5',
      '#EEEEEE',
      '#E0E0E0',
      '#BDBDBD',
      '#9E9E9E',
      '#757575',
      '#616161',
      '#424242',
      '#212121',
      '#607D8B',
      '#ECEFF1',
      '#CFD8DC',
      '#B0BEC5',
      '#90A4AE',
      '#78909C',
      '#607D8B',
      '#546E7A',
      '#455A64',
      '#37474F',
      '#263238',
      '#000000',
      '#FFFFFF'
    ]
    return mdColors[Random.randomInteger(0, mdColors.length - 1)]
  }
}

export const UtilsTime = {
  getTimeRemaining: (endTimestamp) => {
    const total = endTimestamp - new Date().getTime()
    const seconds = Math.floor((total / 1000) % 60)
    const minutes = Math.floor((total / 1000 / 60) % 60)
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24)
    const days = Math.floor(total / (1000 * 60 * 60 * 24))

    return {
      total,
      days,
      hours,
      minutes,
      seconds
    }
  }
}

export const UtilsObject = {
  smartAssign: (target, ...objs) => {
    return tryIt(() => {
      let res = _.cloneDeep(target)
      _.forEach(objs, (obj) => {
        _.forEach(obj, (item, key) => {
          if (_.isObject(item)) {
            res[key] = tryIt(() => res[key] = Object.assign(res[key], item), res[key])
            return
          }
          if (_.isArray(item)) {
            res[key] = tryIt(() => res[key] = res[key].concat(item), res[key])
            return
          }
          return res[key] = item
        })
      })
      return res
    }, target)
  }
}

export const UtilsString = {
  replaceAll: (str, regex, to) => {
    return str.replace(regex, to)
  },
  trimAll: (str) => {
    return str.replaceAll(/ /g, '').trim()
  },
  replaceAt: (str, index, replacement) => {
    return str.substr(0, index) + replacement + str.substr(index + replacement.length)
  },
  replaceAtTo: (str, startIndex, endIndex, replacement) => {
    return str.substr(0, startIndex) + replacement + str.substr(startIndex + (endIndex - startIndex))
  },
  spaceWithPattern: (str, pattern) => {
    //spaceWithPattern("123456789","### ### ###")
    // 123 456 789
    let i = 0, string = str.toString()
    return pattern.replace(/#/g, _ => string[i++])
  }
}

