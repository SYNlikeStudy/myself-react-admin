import React, {Component} from 'react';
import PropTypes from 'prop-types'
import {Form,Input} from 'antd'

class UpdataCategoryNameForm extends Component {
  static propTypes = {
    categoryName:PropTypes.string.isRequired,
    updataForm:PropTypes.func.isRequired
  }
  componentWillMount(){
    //将form对象传递给父组件
    const {updataForm,form} = this.props
    updataForm(form)
  }
  render () {
    const {getFieldDecorator} = this.props.form
    const {categoryName} = this.props
    return (
      <Form>
        <Form.Item>
          {
            getFieldDecorator('categoryName',{initialValue:categoryName})(<Input/>)
          }
        </Form.Item>
      </Form>
    )
  }
}
export default Form.create()(UpdataCategoryNameForm)