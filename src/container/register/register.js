import React from 'react'
import {Redirect} from 'react-router-dom'
import Logo from '../../component/logo/logo'
import { List, InputItem, WhiteSpace, Button, Radio } from 'antd-mobile';
import { connect } from 'react-redux'
import { regisger } from '../../redux/user.redux'
import newForm from '../../component/new-form/new-form'

const RadioItem = Radio.RadioItem

@connect(
    state=>state.user,
    {regisger}
)
@newForm

class Register extends React.Component{
    constructor(props){
        super(props)
        this.handleRegister = this.handleRegister.bind(this)
    }
    componentDidMount(){
        this.props.handleChange('type','genius')
    }
    handleChange(key,val){
        this.setState({
            [key]:val
        })
    }
    handleRegister(){
        this.props.regisger(this.props.state)
    }
    render(){
        return(
            <div>
                {this.props.redirectTo?<Redirect to={this.props.redirectTo} />: null}
                <Logo></Logo>
                <List>
                    {this.props.msg ? <p className='error-msg'>{this.props.msg}</p>:null}
                    <InputItem
                        onChange={v=>this.props.handleChange('user',v)}
                    >用户</InputItem>
                    <WhiteSpace />
                    <InputItem 
                        type="password"
                        onChange={v=>this.props.handleChange('pwd',v)}
                    >密码</InputItem>
                    <WhiteSpace />
                    <InputItem 
                        type="password"
                        onChange={v=>this.props.handleChange('repeatpwd',v)}
                    >确认密码</InputItem>
                    <WhiteSpace />
                    <RadioItem 
                        checked={this.props.state.type==='genius'}
                        onChange={()=>this.props.handleChange('type','genius')}
                    >
                        牛人
                    </RadioItem>
                    <RadioItem 
                        checked={this.props.state.type==='boss'}
                        onChange={()=>this.props.handleChange('type','boss')}
                    >
                        boss
                    </RadioItem>
                    <Button type='primary' onClick={()=>this.handleRegister()}>注册</Button>
                </List>
            </div>
        )
    }
}

export default Register