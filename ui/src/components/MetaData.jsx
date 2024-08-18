import { Helmet } from "react-helmet";

import React from 'react'

const MetaData = ({title}) => {
  return (
    <div>
         <Helmet title={`Daily Dose-${title}`}/>
    </div>
  )
}

export default MetaData
