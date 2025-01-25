import React, { Fragment } from 'react'

import Home from '@/components/section/home/Home'

import Featured from '@/components/section/feature/Featured'

export default function page() {
  return (
    <Fragment>
      <Home />
      <Featured />
    </Fragment>
  )
}
