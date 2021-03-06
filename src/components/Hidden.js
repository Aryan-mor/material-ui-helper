import React from 'react'
import Hidden from '@material-ui/core/Hidden'

export function HiddenXlUp({ children }) {
  return <React.Fragment>
    <Hidden initialWidth={"lg"} xlUp>{children}</Hidden>
  </React.Fragment>
}

export function HiddenLgUp({ children }) {
  return <Hidden initialWidth={"lg"} lgUp>{children}</Hidden>
}

export function HiddenMdUp({ children }) {
  return <Hidden initialWidth={"lg"} mdUp>{children}</Hidden>
}

export function HiddenSmUp({ children }) {
  return <Hidden initialWidth={"lg"} smUp>{children}</Hidden>
}

export function HiddenXsUp({ children }) {
  return <Hidden initialWidth={"lg"} xsUp>{children}</Hidden>
}


export function HiddenXlDown({ children }) {
  return <Hidden initialWidth={"lg"} xlDown>{children}</Hidden>
}

export function HiddenLgDown({ children }) {
  return <Hidden initialWidth={"lg"} lgDown>{children}</Hidden>
}

export function HiddenMdDown({ children }) {
  return <Hidden initialWidth={"lg"} mdDown>{children}</Hidden>
}

export function HiddenSmDown({ children }) {
  return <Hidden initialWidth={"lg"} smDown>{children}</Hidden>
}

export function HiddenXsDown({ children }) {
  return <Hidden initialWidth={"lg"} xsDown>{children}</Hidden>
}


export function ShowOnlyXl({ children }) {
  return <Hidden initialWidth={"lg"} only={['xs', 'sm', 'md', 'lg']}>{children}</Hidden>
}

export function ShowOnlyLg({ children }) {
  return <Hidden initialWidth={"lg"} only={['xs', 'sm', 'md', 'xl']}>{children}</Hidden>
}

export function ShowOnlyMd({ children }) {
  return <Hidden initialWidth={"lg"} only={['xs', 'sm', 'lg', 'xl']}>{children}</Hidden>
}

export function ShowOnlySm({ children }) {
  return <Hidden initialWidth={"lg"} only={['xs', 'md', 'lg', 'xl']}>{children}</Hidden>
}

export function ShowOnlyXs({ children }) {
  return <Hidden initialWidth={"lg"} only={['sm', 'md', 'lg', 'xl']}>{children}</Hidden>
}


export function HiddenOnlyXl({ children }) {
  return <Hidden initialWidth={"lg"} only={'xl'}>{children}</Hidden>
}

export function HiddenOnlyLg({ children }) {
  return <Hidden initialWidth={"lg"} only={'lg'}>{children}</Hidden>
}

export function HiddenOnlyMd({ children }) {
  return <Hidden initialWidth={"lg"} only={'md'}>{children}</Hidden>
}

export function HiddenOnlySm({ children }) {
  return <Hidden initialWidth={"lg"} only={'sm'}>{children}</Hidden>
}

export function HiddenOnlyXs({ children }) {
  return <Hidden initialWidth={"lg"} only={'xs'}>{children}</Hidden>
}


export const ShowInTablet = ShowOnlyMd
export const ShowInDesktop = HiddenMdDown
export const ShowInMobile = HiddenMdUp
export const ShowInTabletAndDesktop = HiddenSmDown
