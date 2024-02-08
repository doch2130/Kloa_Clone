'use client'
import { useEffect } from 'react'
import Router from 'next/router'
import NProgress from "nprogress"

export default function NProgressbar() {
  useEffect(() => {
    const handleRouteStart = () => NProgress.start();
    const handleRouteDone = () => NProgress.done();
 
    Router.events.on("routeChangeStart", handleRouteStart);
    Router.events.on("routeChangeComplete", handleRouteDone);
    Router.events.on("routeChangeError", handleRouteDone);
 
    return () => {
      Router.events.off("routeChangeStart", handleRouteStart);
      Router.events.off("routeChangeComplete", handleRouteDone);
      Router.events.off("routeChangeError", handleRouteDone);
    };
  }, []);

  return (
    <div className='fixed top-0 left-0 z-[200] w-full h-[69px] border-b-4 border-b-[#5865f2]'></div>
  )
}
