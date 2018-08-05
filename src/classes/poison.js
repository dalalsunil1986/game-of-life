import Entity from './entity'

class Poison extends Entity {
  static size = 10

  constructor(props) {
    props.size = Poison.size
    super(props)
  }

  consume(consumer, removeFromState) {
    consumer.kill(removeFromState)
    removeFromState('poison', this)
  }
  
}

export default Poison
