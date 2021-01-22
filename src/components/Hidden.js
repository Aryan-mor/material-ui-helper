import React from 'react'
import Hidden from '@material-ui/core/Hidden'

export function HiddenXlUp({ children }) {
  return <React.Fragment>
    <Hidden xlUp>{children}</Hidden>
  </React.Fragment>
}

export function HiddenLgUp({ children }) {
  return <Hidden lgUp>{children}</Hidden>
}

export function HiddenMdUp({ children }) {
  return <Hidden mdUp>{children}</Hidden>
}

export function HiddenSmUp({ children }) {
  return <Hidden smUp>{children}</Hidden>
}

export function HiddenXsUp({ children }) {
  return <Hidden xsUp>{children}</Hidden>
}


export function HiddenXlDown({ children }) {
  return <Hidden xlDown>{children}</Hidden>
}

export function HiddenLgDown({ children }) {
  return <Hidden lgDown>{children}</Hidden>
}

export function HiddenMdDown({ children }) {
  return <Hidden mdDown>{children}</Hidden>
}

export function HiddenSmDown({ children }) {
  return <Hidden smDown>{children}</Hidden>
}

export function HiddenXsDown({ children }) {
  return <Hidden xsDown>{children}</Hidden>
}


export function ShowOnlyXl({ children }) {
  return <Hidden only={['xs', 'sm', 'md', 'lg']}>{children}</Hidden>
}

export function ShowOnlyLg({ children }) {
  return <Hidden only={['xs', 'sm', 'md', 'xl']}>{children}</Hidden>
}

export function ShowOnlyMd({ children }) {
  return <Hidden only={['xs', 'sm', 'lg', 'xl']}>{children}</Hidden>
}

export function ShowOnlySm({ children }) {
  return <Hidden only={['xs', 'md', 'lg', 'xl']}>{children}</Hidden>
}

export function ShowOnlyXs({ children }) {
  return <Hidden only={['sm', 'md', 'lg', 'xl']}>{children}</Hidden>
}


export function HiddenOnlyXl({children}) {
  return <Hidden only={"xl"}>{children}</Hidden>
}

export function HiddenOnlyLg({children}) {
  return <Hidden only={"lg"}>{children}</Hidden>
}

export function HiddenOnlyMd({children}) {
  return <Hidden only={"md"}>{children}</Hidden>
}

export function HiddenOnlySm({children}) {
  return <Hidden only={"sm"}>{children}</Hidden>
}

export function HiddenOnlyXs({children}) {
  return <Hidden only={"xs"}>{children}</Hidden>
}


export const ShowInTablet = ShowOnlyMd
export const ShowInDesktop = HiddenMdDown
export const ShowInMobile = HiddenMdUp
export const ShowInTabletAndDesktop = HiddenSmDown
