import React, { Fragment } from 'react'

import Home from '@/components/section/home/Home'

import Featured from '@/components/section/feature/Featured'

import OurProducts from '@/components/section/Our-Products/Our-Products'

import Category from '@/components/section/category/Category'

import Article from '@/components/section/article/Article'

export default function page() {
  return (
    <Fragment>
      <Home />
      <Featured />
      <OurProducts />
      <Category />
      <Article />
    </Fragment>
  )
}
