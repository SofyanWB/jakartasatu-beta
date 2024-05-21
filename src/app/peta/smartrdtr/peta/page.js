"use client";

import dynamic from "next/dynamic";

const Map = dynamic(() => import("./Map"), { ssr: false, webpack: false });

const page = () => {
  return(
      <Map />
  )
}

export default page