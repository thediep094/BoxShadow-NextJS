import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Header from '../components/Header'

const Home: NextPage = () => {
  const router = useRouter()
  //push to boxshadow pages
  const pushToBoxShadow = () => {
    router.push('/BoxShadow')
  }
  useEffect(() => {
    pushToBoxShadow()
  }, [])

  return <div className={'Home'}></div>
}

export default Home
