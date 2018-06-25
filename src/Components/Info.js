import React from 'react'
import Input from './Input'

class Info extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            info: {
                name: '',
                email: '',
                verified: '',
                phone: '',
                city: '',
                state: '',
                country: '',
                post: '',
                more: ''
            },
            touched: {
                name: false,
                email: false,
                verified: false,
                phone: false,
                city: false,
                state: false,
                country: false,
                post: false,
                more: false
            }
        }
    }

    handleChange = (e, field) => {
        //e.target.value.length < 5 && this.setState state not updated with more than 5 characters, using name not updated but still displayed in input field
        let info = {...this.state.info}
        info[field] = e.target.value
        this.setState({info})
    }

    handleSubmit = e => {
        e.preventDefault()
        console.log('submit')
        this.props.personal(this.state.info, this.props.section)
    }

    handleClick = action => {
        this.props.history.push(action === 'next' ? '/lets-talk-react/skills' : '/lets-talk-react')
    }

    validate = (name, email, verified, phone, city, country) => {
        const regexName = /^([A-Z][a-z'-]*\s)+([a-z]+\s)*[A-Z]([a-z(A-Z)?'-])*$/
        const regexPhone = /^((\+|00)\d{1,3})?[\s-]?\d{10}$/
        const regexEmail = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9]+[.][a-zA-Z0-9.]+$/
        const regexCity = /^[A-Z][A-Za-z' -]+$/
        const regexCtry = /^[A-Z][A-Za-z' -]+$/
        const errors = {
            name: regexName.test(name) ? '' : 'Please enter full name with alphabetic characters',
            email: regexEmail.test(email) ? '' : 'Please enter valid email',
            verified: email === verified ? '' : 'Not matched',
            phone: regexPhone.test(phone) ? '' : 'Please enter valid phone number',
            city: regexCity.test(city) ? '' : 'Please enter city name',
            country: regexCtry.test(country) ? '' : 'Please enter country',
            state: ''
        }
        return errors
    }

    isSubmitDisabled = errors => !Object.values(errors).every(err => !err)

    handleBlur = (e, field) => {
        console.log(`${field} is touched`)
        let touched = [...this.state.touched]
        touched[field] = true
        this.setState({touched})
        //this.setState(prevState => ({...prevState.touched, name: true}))
    }


    render(){
        const info = this.state.info
        const { name, email, verified, phone, city, country } = info
        const errors = this.validate(name, email, verified, phone, city, country)

        const top_left = [{name: 'name', placeholder: 'Full name*'}, {name: 'email', placeholder: 'Email*'}, {name: 'verified', placeholder: 'Re-enter email'}]
        const top_right = [{name: 'phone', placeholder: 'Phone*'}]
        const low_middle_top = [{name: 'city', placeholder: 'City*'}, {name: 'state', placeholder: 'State'}, {name: 'country', placeholder: 'Country/Region*'}, {name: 'post', placeholder: 'Zip/Postal code'}]

        const checkValid = field => {
            if(!this.state.touched[field]){
                return true
            }else{
                console.log(errors[field])
                return errors[field] ? false : true
            }
        }

        return(
            <form onSubmit={this.handleSubmit}>
                <div className="top">

                    <div className="top-left">
                        {top_left.map((item, i) => <Input 
                                                        key ={i} 
                                                        name={item.name} 
                                                        className={checkValid(item.name) ? 'valid' : 'invalid'}
                                                        onBlur={e => this.handleBlur(e, item.name)}
                                                        value={info[item.name]}
                                                        placeholder={item.placeholder} 
                                                        onChange={e => this.handleChange(e, item.name)}/>)}
                    </div>

                    <div className="top-right">
                        {top_right.map((item, i) => <Input 
                                                        key ={i} 
                                                        name={item.name} 
                                                        className={checkValid(item.name) ? 'valid' : 'invalid'}
                                                        onBlur={e => this.handleBlur(e, item.name)}
                                                        value={info[item.name]}
                                                        placeholder={item.placeholder} 
                                                        onChange={e => this.handleChange(e, item.name)}/>)} 
                    </div>

                </div>

                <div className="middle-top">
                    <div className="address">
                        <textarea id="address" style={{height: 70, width: '100%'}} placeholder="Address"></textarea>
                    </div>
                    <div className="low-middle-top">
                    {low_middle_top.map((item, i) => <Input 
                                                        key ={i} 
                                                        name={item.name} 
                                                        className={checkValid(item.name) ? 'valid' : 'invalid'}
                                                        onBlur={e => this.handleBlur(e, item.name)}
                                                        value={info[item.name]}
                                                        placeholder={item.placeholder} 
                                                        onChange={e => this.handleChange(e, item.name)} />)} 
                    </div>
                    <input type="text" name="more" className='valid' placeholder="How did you hear about us" value={info.more} onChange={(e) => this.handleChange(e, 'more')} />
                </div>
                
                <div className='footer-btn'>
                    <button onClick={()=> this.handleClick('back')}>Back</button>
                    <button onClick={() => this.handleClick('next')}>Next</button>
                    <button className='save-btn' type='submit' disabled={this.isSubmitDisabled(errors)}>Save</button>
                </div>
            </form>

        )
    }
}



export default Info
