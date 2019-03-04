/**
 * Created by Administrator on 2019/2/26.
 */
import React from 'react'
import {render} from 'react-dom'
import App from './App.jsx'
import {getItem} from './utils/storageUtils'
import MemoryUtils from './utils/memoryUtils'

const user = getItem()
if(user && user._id){
  MemoryUtils.user=user
}

render(<App/>,document.getElementById('app'))