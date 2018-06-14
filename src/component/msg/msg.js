import React from 'react'
import {connect} from 'react-redux'
import { List,Badge } from 'antd-mobile'

@connect(
    state=>state
)

class Msg extends React.Component{
    getLast(arr){
        return arr[arr.length-1]
    }
    render(){
        //  按照聊天用户分组，根据chatid
        const msgGroup = {}
        this.props.chat.chatmsg.forEach(v=>{
            msgGroup[v.chatid]=msgGroup[v.chatid] || []
            msgGroup[v.chatid].push(v)
        })
        const chatList = Object.values(msgGroup).sort((a,b)=>{
            const a_last = this.getLast(a).create_time
            const b_last = this.getLast(b).create_time
            return b_last - a_last
        })
        const Item = List.Item
        const Brief = Item.Brief
        const userId = this.props.user._id
        return(
            <div>
                {chatList.map(v=>{
                    const lastItem = this.getLast(v)
                    const targetId = lastItem.from === userId ? lastItem.to :lastItem.from
                    const unreadNum = v.filter(v=>!v.read && v.to===userId).length
                    if(!this.props.chat.users[targetId]){
                        return null
                    }
                    return (
                        <List  key={lastItem._id}>
                            <Item 
                            arrow="horizontal"
                            onClick={()=>{
                                this.props.history.push(`/chat/${targetId}`)
                            }}
                            extra={<Badge text={unreadNum}></Badge>}
                            thumb={require(`../img/${this.props.chat.users[targetId].avatar}.png`)}
                            >
                                {lastItem.content}
                                <Brief>
                                    {this.props.chat.users[targetId].name}
                                </Brief>
                            </Item>
                        </List>
                    )
                    })}
            </div>
        )
    }
}

export default Msg