import React from 'react'
import { NavBar, List, InputItem, TextareaItem, Button} from 'antd-mobile'
import AvatarSelector from '../../component/avatar-selector/avatar-selector'
import {connect} from 'react-redux'
import {update} from '../../redux/user.redux'
import {Redirect} from 'react-router-dom'

@connect(
    state=>state.user,
    {update}
)

class GeniusInfo extends React.Component{
    constructor(props){
        super(props)
        this.state={
            title:'',
            desc:''
        }
    }
    onChange(key,val){
        this.setState({
            [key]:val
        })
    }
    render(){
        const path = this.props.location.pathname
        const Redirects = this.props.redirectTo
        return (
            <div>
                {Redirects && Redirect!==path? <Redirect to={this.props.redirectTo}></Redirect> : null}
                <NavBar mode='dark'>牛人完善信息页面</NavBar>
                <AvatarSelector 
                selectAvatar={(imgname)=>{
                    this.setState({
                        avatar:imgname
                    })
                }}
                />
                <List>
                    <InputItem
                    onChange={(v)=>this.onChange('title',v)}
                    >求职岗位</InputItem>
                    <TextareaItem
                    onChange={(v)=>this.onChange('desc',v)}
                    rows={3}
                    title="个人简介"
                    autoHeight
                    ></TextareaItem>
                    <Button 
                    onClick={()=>{
                        this.props.update(this.state)
                    }}
                    type='primary'>保存</Button>
                </List>
            </div>
        )
    }
}

export default GeniusInfo