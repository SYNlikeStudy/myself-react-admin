import React, {Component} from 'react';
import {
  Card,
  Button,
  Icon,
  Table,
  Modal,
  message,
} from 'antd'

import {reqCategory,reqAddCategory,reqUpdateCategoryName} from '../../api/index'
import AddCategoryForm from "../../components/add-category-form/index";
import UpdataCategoryNameForm from '../../components/updata-category-name-form'
import MyButton from '../../components/my-button'

export default class Category extends Component {
  state = {
    categoryData : [],//一级分类数据
    subCategoryData : [],//二级分类数据
    visible:false,
    setNameVisible:false,
    category:{},//保存当前选中单个分类数据
    parentId:'0',//该显示几级分类
    parentName:'',//二级分类旁边的文字
    isSubCategoriesLoading:true
  }
  componentWillMount(){
    this.columns = [{
      title: '品类名称',
      dataIndex: 'name',
      render: text => text,
    }, {
      title: '操作',
      width:300,
      render:category => {
        if(this.state.parentId==='0'){
          return(
            <div>
              <MyButton onClick={()=>this.setState({setNameVisible:true,category})} name="修改名称"/>&nbsp;&nbsp;&nbsp;
              <MyButton name="查看其子品类" onClick={()=>{
                this.setState({
                  parentId:category._id,
                  parentName:category.name
                })
                this.category(category._id)
              }
              }/>
            </div>
          )
        }else{
          return(
              <MyButton onClick={()=>this.setState({setNameVisible:true,category})} name="修改名称"/>
          )
        }
      }
    }]
  }
  componentDidMount(){
    this.category('0')
  }
  //获取分类列表
  category = async(parentId) => {
    const result = await reqCategory(parentId)
    if(result.status===0){
      //请求数据成功
      if(parentId==='0'){
        this.setState({
          categoryData:result.data
        })
      }else{
        if(result.data.length){
          this.setState({
            subCategoryData:result.data,
            isSubCategoriesLoading:true
          })
        }else{
          this.setState({
            subCategoryData:result.data,
            isSubCategoriesLoading:false
          })
        }
      }
    }else{
      message.error('获取分类列表数据失败~')
    }
  }
  //点击添加按钮显示组件
  handleAdd = () => {
    this.setState({
      visible:true
    })
  }
  //点击确定添加分类
  handleOk = async() => {
    const parentId = this.form.getFieldValue('parentId')
    const categoryName = this.form.getFieldValue('categoryName')
    const result = await reqAddCategory(parentId,categoryName)
    let updateState = {visible:false}
    if(result.status===0){
      const currentId = this.state.parentId
      if(parentId==='0'){
        updateState.categoryData=[...this.state.categoryData,result.data]
      }else if(currentId===parentId){
        updateState.subCategoryData=[...this.state.subCategoryData,result.data]
      }
      message.success('添加分类成功~')
    }else{
      message.error('添加分类失败~')
    }
    //清空用户输入
    this.form.resetFields();
    //统一更新状态
    this.setState(updateState)
  }
  //修改名称点击ok
  setName = async() => {
    const newName = this.form.getFieldValue('categoryName')
    const {_id,name} = this.state.category
    //判断修改前后是否一致,不一致则修改
    if(newName!==name){
      const result = await reqUpdateCategoryName(_id,newName)
      if(result.status===0){
        message.success('修改成功')
        this.setState({
          setNameVisible:false,
          categoryData:this.state.categoryData.map(item=>{
            if (item._id === _id) {
              item.name = newName;
            }
            return item;
          })
        })
      }else{
        message.error('修改失败')
        this.setState({
          setNameVisible:false
        })
      }
      //重置表单
      this.form.resetFields()
    }else{
      message.warn('名称一致')
      this.setState({
        setNameVisible:false
      })
    }
  }
  render () {
    const {categoryData,category,parentId,parentName,subCategoryData,isSubCategoriesLoading} = this.state
    const isCategory = parentId==='0'
    const thisTitle = isCategory
      ?'一级分类列表'
      :<div>
        <MyButton name="一级分类" onClick={()=>this.setState({parentId:'0'})}/>
        <Icon type="arrow-right" />
        <span>{parentName}</span>
      </div>
    const thisCategoryData = isCategory ? categoryData : subCategoryData
    const isLoading = isCategory ? categoryData.length===0 :isSubCategoriesLoading&&subCategoryData.length===0
    return (
      <Card
        title={thisTitle}
        extra={<Button type='primary' onClick={this.handleAdd}><Icon type="plus"/>添加品类</Button>}
        style={{width:'100%',margin:'20px'}}
      >
        <Table
          columns={this.columns}
          dataSource={thisCategoryData}
          bordered
          pagination={{
            pageSize:3,
            showSizeChanger: true,
            pageSizeOptions: ['3', '6', '9', '12'],
            showQuickJumper: true
          }}
          rowKey='_id'
          loading={isLoading}
        />
        <Modal
          title="添加分类"
          visible={this.state.visible}
          okText={'确认'}
          cancelText={'取消'}
          onOk={this.handleOk}
          onCancel={()=>this.setState({visible:false})}
        >
          <AddCategoryForm categoryData={categoryData} getForm={form=>this.form=form}/>
        </Modal>
        <Modal
          title="更新分类"
          visible={this.state.setNameVisible}
          width={300}
          onCancel={()=>this.setState({setNameVisible:false})}
          onOk={this.setName}
        >
          <UpdataCategoryNameForm categoryName={category.name} updataForm={form=>this.form=form}/>
        </Modal>
      </Card>
    )
  }
}