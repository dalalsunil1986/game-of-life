import React, { Component } from 'react'
import './App.css'

import Specimen from './classes/specimen'
import Food from './classes/food'
import Poison from './classes/poison'

class App extends Component {
  state = {
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight,
    specimens: [],
    food: [],
    poison: [],
  }

  componentDidMount() {
    const food = this.generateRandomFood(10)
    const poison = this.generateRandomPoison(10)
    const specimens = this.generateRandomSpecimens(5)
    this.setState({
      specimens,
      food,
      poison,
    })
    
    setInterval(() => {
      let remove
      if (this.state.food.length === 0) return
      this.setState(prevState => ({
        specimens: prevState.specimens.map(specimen => {
          const closest = specimen.nearest(prevState.food)
          specimen.seek(closest)

          this.handleCollisions(this.setState)
          
          return specimen
        }),
        food: prevState.food.filter(food => food !== remove)
      }))
      
    }, 100)

  }

  handleCollisions(specimen, setState) {
    for(let i=0; i<this.state.specimens.length; i++) {
      const specimen = this.state.specimens[i]

      for(let j=0; j<this.state.food.length; j++) {
        const food = this.state.food[j]
        const d = specimen.position.distanceTo(food.position)
        if (d <= specimen.size/2 || d <= food.size/2)
          specimen.collide(food, this.removeFromState)
      }

      for(let j=0; j<this.state.poison.length; j++) {
        const poison = this.state.poison[j]
        const d = specimen.position.distanceTo(poison.position)
        if (d <= specimen.size/2 || d <= poison.size/2)
          specimen.collide(poison, this.removeFromState)
      }
    }

  }

  removeFromState = (key, entity) => {
    console.log(`removing ${entity.id} from ${key}`)
    this.setState(prevState => ({
      [key]: prevState[key].filter(e => e !== entity)
    }))
  }

  generateRandomSpecimens = (count) => {
    return new Array(count).fill(undefined).map((_, i) => new Specimen({
      id: `specimen-${i}`,
      x: Math.floor(Math.random()*(this.state.width - Specimen.size)),
      y: Math.floor(Math.random()*(this.state.height - Specimen.size)),
    }))
  }

  generateRandomFood = (count) => {
    return new Array(count).fill(undefined).map((_, i) => new Food({
      id: `food-${i}`,
      x: Math.floor(Math.random()*(this.state.width - Food.size)),
      y: Math.floor(Math.random()*(this.state.height - Food.size)),
    }))
  }

  generateRandomPoison = (count) => {
    return new Array(count).fill(undefined).map((_, i) => new Poison({
      id: `poison-${i}`,
      x: Math.floor(Math.random()*(this.state.width - Food.size)),
      y: Math.floor(Math.random()*(this.state.height - Food.size)),
    }))
  }

  render() {
    return <div
      className='canvas'
      style={{
        width: this.state.width,
        height: this.state.height,
        overflow: 'hidden',
      }}
    >
    {
      this.state.specimens.map((specimen, i) => <div
        key={i}
        className="specimen entity"
        style={{
          left: specimen.position.x,
          top: specimen.position.y,
          width: specimen.size,
          height: specimen.size,
        }}
      />)
    }

    {
      this.state.food.map((fd, i) => <div
        key={i}
        className="food entity"
        style={{
          left: fd.position.x,
          top: fd.position.y,
          width: fd.size,
          height: fd.size,
          backgroundColor: fd.color,
        }}
      />)
    }

    {
      this.state.poison.map((ps, i) => <div
        key={i}
        className="poison entity"
        style={{
          left: ps.position.x,
          top: ps.position.y,
          width: ps.size,
          height: ps.size,
          backgroundColor: ps.color,
        }}
      />)
    }

    </div>
  }
}

export default App;
