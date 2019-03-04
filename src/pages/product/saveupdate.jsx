import React, {Component} from 'react';
import {Card,Icon,Form,Input,Cascader,InputNumber,Button} from 'antd'

const Item = Form.Item

class Saveupdate extends Component {
  render () {
    const {state} = this.props.location
    //form表单的尺寸
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 2 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 10 },
      },
    }
    //三级联动下拉框的静态测试数据
    const options = [{
      value: 'zhejiang',
      label: 'Zhejiang',
      children: [{
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [{
          value: 'xihu',
          label: 'West Lake',
        }],
      }],
    }, {
      value: 'jiangsu',
      label: 'Jiangsu',
      children: [{
        value: 'nanjing',
        label: 'Nanjing',
        children: [{
          value: 'zhonghuamen',
          label: 'Zhong Hua Men',
        }],
      }],
    }];
    return (
      <Card
        title={
          <div style={{fontSize:25}}>
            <Icon type="arrow-left" style={{marginRight:10}} onClick={()=>this.props.history.goBack()}/>
            {state ? '编辑商品' : '添加商品'}
          </div>
        }
        style={{width:'100%',margin:'20px'}}
      >
        <Form>
          <Item {...formItemLayout} label="商品名称:">
            <Input/>
          </Item>
          <Item {...formItemLayout} label="商品描述:">
            <Input/>
          </Item>
          <Item {...formItemLayout} label="所属分类:">
            <Cascader options={options} placeholder="未选择" />
          </Item>
          <Item {...formItemLayout} label="商品价格:">
            <InputNumber style={{position:'relative',zIndex:5}}/><Input addonAfter="元" style={{width:0,position:'absolute',left:65,top:-6.5}}/>
          </Item>
          <Item {...formItemLayout} label="商品图片:">
          </Item>
          <Item {...formItemLayout} label="商品详情:">
          </Item>
          <Button type="primary">提交</Button>
        </Form>
      </Card>
    )
  }
}
export default Form.create()(Saveupdate)