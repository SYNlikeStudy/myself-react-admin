import React,{Component} from 'react'
import PropTypes from 'prop-types'
import {Form,Select,Input} from 'antd'

const Item = Form.Item
const Option = Select.Option

class AddCategoryForm extends Component{
  static propTypes = {
    categoryData:PropTypes.array.isRequired,
    getForm:PropTypes.func.isRequired
  }
  componentWillMount(){
    const {getForm,form} = this.props
    getForm(form)
  }
  render(){
    const {categoryData} = this.props
    const {getFieldDecorator} = this.props.form
    return(
      <Form>
        <Item label="所属分类:">
          {
            getFieldDecorator(
              'parentId',
              {initialValue:'0'}//设置子节点初始值
              )(
              <Select>
                <Option value="0">一级分类</Option>
                {
                  categoryData.map(item=><Option value={item._id} key={item._id}>{item.name}</Option>)
                }
              </Select>
            )
          }
        </Item>
        <Item label="分类名称:">
          {
            getFieldDecorator('categoryName',{})(<Input placeholder="输入分类名称"/>)
          }
        </Item>
      </Form>
    )
  }
}
export default Form.create()(AddCategoryForm)