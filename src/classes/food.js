import Entity from './entity'

class Food extends Entity {
  static size = 10

  constructor(props) {
    props.size = Food.size
    super(props)
  }

  consume(consumer, removeFromState) {
    consumer.size += this.size
    removeFromState('food', this)
  }
  
}

export default Food
