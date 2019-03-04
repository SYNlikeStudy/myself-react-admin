import React,{Component} from 'react'
import LoginFrom from '../../components/login-from'
import {reqLogin} from '../../api'
import imge from '../../assets/image/logo.png'
import './index.less'
import {setItem} from '../../utils/storageUtils.js'
import MemoryUtils from '../../utils/memoryUtils'

export default class Login extends Component{
  state = {
    errMsg:''
  }
  login = async(username,password)=>{
    const result = await reqLogin(username,password)
    //console.log(result);
    if(result.status===0){
      //保存用户信息
      setItem(result.data)
      MemoryUtils.user=result.data
      //页面跳转
      this.props.history.replace('/')
    }else if(result.status===1){
      this.setState({
        errMsg:result.msg
      })
    }
  }
  render(){
    const {errMsg} = this.state
    const height = errMsg ? 30 : 0
    return(
      <div className="login">
        <header className="login-header">
          <img src={imge} alt="login"/>
          <h1>React项目: 后台管理系统</h1>
        </header>
        <section className="main">
          <div className="login-form-wrap">
            <div className="err" style={{height}}>{this.state.errMsg}</div>
            <h2>用户登陆</h2>
            <LoginFrom login={this.login}/>
          </div>
        </section>
      </div>
    )
  }
}