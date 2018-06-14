import React from 'react'
import {connect} from 'react-redux'
import { Result, List, WhiteSpace, Modal } from 'antd-mobile';
import browserCookie from 'browser-cookies'
import {logoutSubmit} from '../../redux/user.redux'
import {Redirect} from 'react-router-dom'

@connect(
    state=>state.user,
    {logoutSubmit}
)

class User extends React.Component{
    constructor(props){
        super(props)
        this.logout = this.logout.bind(this)
    }
    logout(){
        const alert = Modal.alert
        alert('注销','确认退出吗？？？',[
            {text: '取消' },
            {text: '确认' , onPress:()=>{
                browserCookie.erase('userid')
                this.props.logoutSubmit()
            }}
        ])
    }
    render(){
        const props = this.props
        const Item = List.Item
        const Brief = List.Item.Brief
        return props.user?(
            <div>
                <Result
                    img={<img src={require(`../img/${props.avatar}.png`)} alt="图1" />}
                    title={props.user}
                    message={this.props.type==='boss'?props.company:null}
                 />
                 <List renderHeader={()=>'简介'}>
                    <Item multipleLine >
                        {props.title}
                        {this.props.desc.split('\n').map(v=><Brief key={v}>{v}</Brief>)}
                        {this.props.type==='boss'?<Brief>{props.money}</Brief>:null}
                        
                    </Item>
                </List>  
                <WhiteSpace />
                <List>
                    <Item 
                    onClick={this.logout} style={{zIndex: 100}}
                    >退出登录</Item>
                </List>
            </div>
        ):<div><Redirect to={props.redirectTo}/></div>
    }
}

export default User