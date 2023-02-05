export default class v2 {
	x = 0
	y = 0
	constructor(x: number, y: number) {
		this.x = x ?? 0
		this.y = y ?? 0
	}
	add(x: number, y: number) {
		return new v2(this.x + x, this.y + y)
	}
	addVec(v: v2) {
		return new v2(this.x + v.x, this.y + v.y)
	}
	sub(v: v2) {
		return new v2(this.x - v.x, this.y - v.y)
	}
	mul(v: v2) {
		return new v2(this.x * v.x, this.y * v.y)
	}
	mulScalar(s: number) {
		return new v2(this.x * s, this.y * s)
	}
	div(v: v2) {
		return new v2(this.x / v.x, this.y / v.y)
	}
	mag() {
		return Math.sqrt(this.mag2())
	}
	mag2() {
		return this.x * this.x + this.y * this.y
	}
	normalize() {
		return this.divScalar(this.mag())
	}
	divScalar(s: number) {
		return new v2(this.x / s, this.y / s)
	}
	dot(v: v2) {
		return this.x * v.x + this.y * v.y
	}
	cross(v: { y: number; x: number }) {
		return this.x * v.y - this.y * v.x
	}
	rotate(angle: number) {
		const s = Math.sin(angle)
		const c = Math.cos(angle)
		return new v2(this.x * c - this.y * s, this.x * s + this.y * c)
	}
	rotateAround(v: v2, angle: number) {
		const s = Math.sin(angle)
		const c = Math.cos(angle)
		const x = this.x - v.x
		const y = this.y - v.y
		return new v2(x * c - y * s + v.x, x * s + y * c + v.y)
	}
	copy() {
		return new v2(this.x, this.y)
	}
	distanceTo(v: v2) {
		return Math.sqrt(this.distanceTo2(v))
	}
	distanceTo2(v: v2) {
		return Math.pow(this.x - v.x, 2) + Math.pow(this.y - v.y, 2)
	}
}
