import React from 'react'
import propTypes from 'prop-types'
import { Card, WingBlank } from 'antd-mobile';
import {withRouter} from 'react-router-dom'

@withRouter

class UserCard extends React.Component{
    static propTypes = {
        userlist:propTypes.array.isRequired
    }
    handleClick(v){
        this.props.history.push(`./chat/${v._id}`)
    }
    render(){
        const Body = Card.Body 
        return (
            <div>
                <WingBlank>
                        {this.props.userlist.map(v=>(
                            v.avatar?(<Card 
                                        key={v._id}
                                        onClick={()=>this.handleClick(v)}
                                        style={{zIndex:10}}
                                        >
                                <Card.Header
                                title={v.user}
                                thumb={require(`../img/${v.avatar}.png`)}
                                extra={<span>{v.title}</span>}
                                ></Card.Header>
                                <Body>
                                    {v.type==='boss'?<div>公司：{v.company}</div>:null}
                                    {v.desc.split('\n').map(d=>(
                                    <div key={d}>{d}</div>))}
                                    {v.type==='boss'?<div>薪资：{v.money}</div>:null}
                                </Body>
                            </Card>):null
                        ))}
                    </WingBlank>
         </div>)
    }
}

export default UserCard