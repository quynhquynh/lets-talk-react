import React from 'react'
import Radio from './Radio'
import Checkbox from './Checkbox'


class Skills extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            discipline: '',
            experience: {
                visual: false,
                ux: false,
                front: false
            },
            place: {
                texas: false,
                ca: false,
                china: false,
                ireland: false,
                uk: false, 
                germany: false,
                else: false
            }
        }
    }

    handleRadio = (e, type) => {
        this.setState({
            [type]: e.target.value
        })
    }

    handleCheck = (e, type, checkbox) => {
        this.setState(prevState => {
            let experience = {...prevState.experience}
            let place = {...prevState.place}
            type === 'experience' ? experience[checkbox] = !experience[checkbox] : place[checkbox] = !place[checkbox]
            return type === 'experience' ? ({experience}) : ({place})
        })
    }
    

    handleClick = action => {
        this.props.history.push(action === 'next' ? '/portfolio' : '/info')
    }

    handleSubmit = (e, action) => {
        e.preventDefault()
        const {discipline, experience, place} = this.state
        const experience_array = [], place_array= []
        const addItem = (state, arr) => {
            for(let key in state){
                state[key] && arr.push(key)
            }
        }
        addItem(experience, experience_array)
        addItem(place, place_array)
        const skills = []
        skills.push({discipline})
        skills.push({experience: experience_array})
        skills.push({place: place_array})
        this.props.skills(skills, this.props.section)
        console.log('submit')
    }

    validate = (discipline, experience, place) => {
        const errors = {
            discipline: discipline ? '' : '*Please choose one',
            experience: !Object.values(experience).every(field => !field) ? '' : 'Please choose at least one',
            place: !Object.values(place).every(field => !field) ? '' : 'Please choose at lease one'
        }
        return errors
    }

    isSubmitDisabled = errors => !Object.values(errors).every(err => !err)



    render(){
        const radio = [{id: 'design', name: 'discipline', label: 'Design Research'}, {id: 'visual', name: 'discipline', label: 'Visual Design'}, {id: 'ux', name: 'discipline', label: 'UX Design'}, {id: 'front', name: 'discipline', label: 'Front-end Dev'}]
        const experiences = [{id: 'visual1', name: 'experience', label: 'Visual design'}, {id: 'ux1', name: 'experience', label: 'UX design'}, {id: 'front1', name: 'experience', label: 'Front-end Development'}]
        const places = [{id: 'texas', name: 'place', label: 'Austin, texas'}, {id: 'ca', name: 'place', label: 'New York, New York'}, {id: 'china', name: 'place', label: 'Shanghai, china'}, {id: 'ireland', name: 'place', label: 'Dublin, ireland'}, {id: 'uk', name: 'place', label: 'Hunley, United Kingdom'}, {id: 'germany', name: 'place', label: 'Boelingen, Germany'}, {id: 'else', name: 'place', label: 'Somewhere else'}]

        const { discipline, experience, place } = this.state
        const errors = this.validate(discipline, experience, place)


        return(
            <form onSubmit={this.handleSubmit}>
                <h4>Which is your primary design discipline?*</h4>
        
                <ul className="row-selection">
                    {radio.map((item, i) => <Radio 
                                                key={i} 
                                                id={item.id} 
                                                name={item.name}
                                                label={item.label} 
                                                checked={discipline === item.id} 
                                                onChange={e => this.handleRadio(e, item.name)} />)}
                </ul>

                {errors.discipline && <p>*Please choose one</p>}
        
                <br/>
                <div className="column-selection">
                    <div className="col">
                        <h4>Do you have experience with any other disciplines?</h4>
                        <ul className="col-down">
                            {experiences.map((item, i) => <Checkbox
                                                            key={i}
                                                            name={item.name}
                                                            id={item.id}
                                                            label={item.label}
                                                            onChange={e => this.handleCheck(e, item.name, item.id)} />)}
                        </ul>
                        {errors.experience && <p>*Please choose at least one</p>}
                    </div>
        
                    <div className="col">
                        <h4>Where are you interested in working?*</h4>
                        <p>You must be legally authorized to work without visa sponsorship in the location(s) you choose</p>
                        <ul className="col-down">
                            {places.map((item, i) => <Checkbox
                                                        key={i}
                                                        name={item.name}
                                                        label={item.label}
                                                        id={item.id}
                                                        onChange={e => this.handleCheck(e, item.name, item.id)} />)}
                        </ul>
                        {errors.place && <p>*Please choose at least one</p>}
                    </div>
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

    


export default Skills