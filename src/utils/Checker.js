import _ from 'lodash'
import { gLog } from './Helper'

export function checkPattern(pattern, text) {
    return !checkHasErrorPatternReturnBool(pattern, text)
}

export function checkHasErrorPatternArray(pattern, text,ref) {
    let patternIndex = -1;
    _.forEach(pattern, function (pattern, index) {
        if (checkHasErrorPatternReturnBool(pattern, text,ref)) {
            patternIndex = index;
            return false
        }
    });
    if (patternIndex !== -1) {
        return patternIndex
    }
    return -1;
}
export function checkHasErrorPattern(pattern, text,ref) {
    if (_.isString(pattern)) {
        return !RegExp(pattern).test(text) ? 1 : -1
    } else if (_.isFunction(pattern)) {
        const p = pattern(text,ref);
        return (!p || p === undefined) ? -1 : 1
    } else if (_.isArray(pattern)) {
        return checkHasErrorPatternArray(pattern,text)
    }
    return -1
}

export function checkHasErrorPatternReturnBool(pattern, text,ref) {
    return checkHasErrorPattern(pattern, text,ref) !== -1;
}

export function isFirstAndLastName(name) {
    return RegExp('^[آ-یA-z]{2,}( [آ-یA-z]{2,})+([آ-یA-z]|[ ]?)$').test(name)
}

export function isMobileNumber(mobileNumber) {
    return RegExp('^[0]?[9][0-9]{9}$').test(mobileNumber)
}

export function isEmail(email) {
    return RegExp('^(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$').test(email)
}

export function isPassword(password) {
    return password.length >= 6
}

export function isLtr(s) {
    return !isRTL(s)
}

export function isRTL(s) {
    const ltrChars = 'A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02B8\u0300-\u0590\u0800-\u1FFF\u2C00-\uFB1C\uFDFE-\uFE6F\uFEFD-\uFFFF',
        rtlChars = '\u0591-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC',
        rtlDirCheck = new RegExp('^[^' + ltrChars + ']*[' + rtlChars + ']');
    return rtlDirCheck.test(s.replace(/[0-9]/g, '').trim()[0]);
}

export function getDevice() {
    const iw = window.innerWidth;
    let deviceSize = {
        isMobile: false,
        isPhablet: false,
        isTablet: false,
        isDesktop: true
    };
    if (960 < iw && iw < 1280) {
        deviceSize = {
            isMobile: false,
            isPhablet: false,
            isTablet: true,
            isDesktop: false
        }
    }
    if (600 < iw && iw < 960) {
        deviceSize = {
            isMobile: false,
            isPhablet: true,
            isTablet: false,
            isDesktop: false
        }
    }
    if (iw < 600) {
        deviceSize = {
            isMobile: true,
            isPhablet: false,
            isTablet: false,
            isDesktop: true
        }
    }
    return {
        deviceSize: deviceSize
    }
}
