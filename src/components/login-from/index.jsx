import React,{Component} from 'react'
import {Form, Icon, Input, Button,message} from 'antd'
const Item = Form.Item

class LoginFrom extends Component{
  checkPwd=(rule,value,callback)=>{
    if(!value){
      callback('必须输入密码')
    }else if(value.length<4){
      callback('密码长度必须超过4位')
    }else if(value.length>12){
      callback('密码长度必须小于11位')
    }else if(!/^[a-zA-Z0-9_]+$/.test(value)){
      callback('密码只能包含大小写英文、数字或者下划线')
    }else{
      callback()
    }
  }
  handleSubmit=(e)=>{
    e.preventDefault()
    const {validateFields,resetFields} = this.props.form
    validateFields(async (err,values)=>{
      console.log(err,values)
      if(!err){
        //console.log(values);
        const {username,password} = values
        this.props.login(username,password)
      }else{
        resetFields(['password'])
        const errMessage = Object.values(err).reduce((pre,cur)=>pre+cur.errors[0].message+' ','')
        message.error(errMessage)
      }
    })
  }
  render(){
    const {getFieldDecorator} = this.props.form
    return(
      <Form className="login-form" onSubmit={this.handleSubmit}>
  <Item>
    {getFieldDecorator('username', {
      rules: [
        { required: true, message: '请输入用户名!' },
        {max:12,message:'用户名最大长度为12位'},
        {min:4,message:'用户名最小长度为4位'},
        {pattern:/^[a-zA-Z0-9_]+$/,message:'用户名由英文大小写,中文及_组成'}
      ],
    })(
      <Input prefix={<Icon type="user"/>} placeholder="用户名" />
    )}
  </Item>
    <Item>
      {getFieldDecorator('password',{
        rules:[
          {validator:this.checkPwd}
        ]
      })(
        <Input prefix={<Icon type="safety"/>}placeholder="密码" type="password"/>
      )}
    </Item>
    <Item>
      <Button type="primary" htmlType="submit">登录</Button>
      </Item>
      </Form>
    )
  }
}
const WrappedNormalLoginForm = Form.create()(LoginFrom)
export default WrappedNormalLoginForm