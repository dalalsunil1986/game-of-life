import Entity from './entity'

class Specimen extends Entity {
  static size = 20
  static maxSpeed = 500
  
  constructor(props) {
    props.maxSpeed = Specimen.maxSpeed
    props.size = Specimen.size
    super(props)
  }

  seek(target) {
    if (!target) return
    this.setTarget(target.position)
    this.update()
  }

  collide(entity, removeFromState) {
    entity.consume(this, removeFromState)
  }

  kill(removeFromState) {
    removeFromState('specimens', this)
  }

  nearest = (collection) => {
    let closest = collection[0]
    for(var i=0; i<collection.length; i++) {
      if (this.position.distanceTo(collection[i].position) < this.position.distanceTo(closest.position)) closest = collection[i]
    }
    return closest
  }
}

export default Specimen
