class Vector {
  constructor(x, y) {
    this.x = x
    this.y = y
  }

  add(vector) {
    return new Vector(this.x+vector.x, this.y+vector.y)
  }

  subtract(vector) {
    return new Vector(this.x-vector.x, this.y-vector.y)
  }

  multiply(val) {
    return new Vector(this.x*val, this.y*val)
  }

  limit(high) {
    const len = this.length()
    if(len > high * high && len > 0) {
      const ratio = high / Math.sqrt(len)
      return new Vector(this.x*ratio, this.y*ratio)
    }
    return new Vector(this.x, this.y)
  }

  normalize() {
    return new Vector(
      this.x/(Math.sqrt(this.x * this.x + this.y * this.y)), this.y/(Math.sqrt(this.x * this.x + this.y * this.y))
    )
  }

  distanceTo(v) {
    return Math.abs(Math.sqrt(
      (this.x - v.x) * (this.x - v.x) + 
      (this.y - v.y) * (this.y - v.y)
    ))
  }
  
  getDirection() {
    return Math.atan2(this.y, this.x)
  }

  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y)
  }

  magnitude() {
    const mag = this.length()
    return isNaN(mag) ? 0.0 : mag
  }

  setMagnitude(m) {
    var direction = this.getDirection()
    this.x = Math.cos(direction) * m
    this.y = Math.sin(direction) * m
  }
  
}

export default Vector
