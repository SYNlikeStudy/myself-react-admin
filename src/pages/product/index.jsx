import React, {Component} from 'react';
import {Card,Select,Input,Button,Icon,Table,message} from 'antd'

import MyButton from '../../components/my-button'
import {reqProductsLisst,reqSearchProductsLisst} from '../../api'

const Option = Select.Option

export default class Index extends Component {
  state = {
    products:[],//商品分页列表数据
    total:0,//列表数据的总条数
    searchType:'productName',
    searchName:''
  }
  componentWillMount(){
    //table的表头信息
    this.columns = [
      {
        title: '商品名称',
        dataIndex: 'name',
        width:300
      },
      {
        title: '商品描述',
        dataIndex: 'desc',
        width:300
      },
      {
        title: '价格',
        dataIndex: 'price',
        width:150,
        render:text => '¥'+text
      },
      {
        title: '状态',
        render:() => (
          <div>
            <Button type="primary">下架</Button>&nbsp;&nbsp;
            在售
          </div>
        )
      },
      {
        title: '操作',
        render:product => (
          <div>
            <MyButton name="详情"/>
            <MyButton name="修改" onClick={()=>this.props.history.push('/product/saveupdate',product)}/>
          </div>
        )
      }
    ]
  }
  componentDidMount(){
    this.searchProducts(1,3)
  }
  //请求商品列表数据&搜索商品列表数据
  searchProducts = async(pageNum, pageSize) => {
    const {searchType,searchName} = this.state
    let result
    if(searchName){
      result = await reqSearchProductsLisst({pageNum, pageSize, searchType,searchName})
    }else{
      result = await reqProductsLisst(pageNum,pageSize)
    }
    if(result.status===0){
      //请求成功
      this.setState({
        products:result.data.list,
        total:result.data.total
      })
    }else{
      message.error('请求商品分页列表失败')
    }
  }
  //受控组件函数
  handleChange = (name,value) => {
    this.setState({
      [name]:value
    })
  }
  render () {
    const {products,total} = this.state
    return (
      <Card
        title={
          <div>
            <Select defaultValue="productName" style={{ width: 130}} onChange={(value)=>this.handleChange('searchType',value)}>
              <Option value="productName">根据商品名称</Option>
              <Option value="productDesc">根据商品描述</Option>
            </Select>
            <Input placeholder="关键字" style={{width:200,margin:'0 5px'}} onChange={(e)=>this.handleChange('searchName',e.target.value)}/>
            <Button type="primary" onClick={()=>this.searchProducts(1,3)}>搜索</Button>
          </div>
        }
        extra={<Button type="primary" onClick={()=>this.props.history.push('/product/saveupdate')}><Icon type="plus" />添加产品</Button>}
        style={{ width: '100%',margin:'20px'}}
      >
        <Table
          columns={this.columns}
          dataSource={products}
          bordered
          pagination={{
            defaultPageSize:3,
            showSizeChanger: true,
            pageSizeOptions: ['3', '6', '9', '12'],
            showQuickJumper: true,
            total,
            onChange:this.searchProducts,
            onShowSizeChange:this.searchProducts,
          }}
          rowKey='_id'
          loading={products.length===0}
        />
      </Card>
    )
  }
}