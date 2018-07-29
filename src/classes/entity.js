import Vector from './vector'

class Entity {
  constructor(props) {
    this.id = props.id || -1
    this.position = new Vector(props.x||0, props.y||0)
    this.target = new Vector(props.tx||0, props.ty||0)
    this.velocity = new Vector(0, 0)
    this.acceleration = new Vector(0, 0)
    this.size = props.size || 10
    this.maxSpeed = props.maxSpeed || 100
    this.maxForce = props.maxForce || 5
  }

  move() {
    const arrive = this.arrive(this.target)
    this.applyForce(arrive)
  }

  update() {
    this.move()
    this.position = this.position.add(this.velocity)
    this.velocity = this.velocity.add(this.acceleration)
    this.acceleration = this.acceleration.multiply(0)
  }

  arrive(target) {
    // Calculate the desired velocity
    let desired = this.target.subtract(this.position)
    const d = desired.length()
    
    // Check the distance to detect whether the character
    // is inside the slowing area
    desired = (d < 10)
      ? desired.normalize().multiply(this.maxForce * (d / 100))
      : desired.normalize().multiply(this.maxForce)
    
    // Set the steering based on this
    return desired.subtract(this.velocity)
  }

  applyForce(force) {
    this.acceleration = this.acceleration.add(force)
  }

  setTarget(target) {
    this.target = new Vector(target.x, target.y)
  }

}

export default Entity
