import React from 'react'

export default function newForm (Comp){
    return class WrapperComp extends React.Component{
        constructor(props){
            super(props)
            this.state={}
            this.handleChange = this.handleChange.bind(this)
        }
        handleChange(key,val){
            this.setState({
                [key]:val
            })
        }
        render(){
            return(
                <Comp state={this.state} handleChange={this.handleChange}  {...this.props} />
            )
        }
    }
}