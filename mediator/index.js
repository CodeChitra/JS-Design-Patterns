// Mediator (Air Traffic Control)
class AirTrafficControl {
  constructor() {
    this.planes = [];
  }

  registerPlane(plane) {
    this.planes.push(plane);
  }

  requestLanding(plane) {
    console.log(`ATC: ${plane.name} requesting landing`);
    // ATC grants permission based on its conditions
    console.log(`ATC: Permission granted to ${plane.name} to land`);
  }
}

// Plane (Colleague)
class Plane {
  constructor(name, atc) {
    this.name = name;
    this.atc = atc;
    this.atc.registerPlane(this);
  }

  land() {
    console.log(`${this.name} preparing to land`);
    this.atc.requestLanding(this); // Requests landing through ATC
  }
}

// Client Code
const atc = new AirTrafficControl();
const plane1 = new Plane("Flight 101", atc);
const plane2 = new Plane("Flight 202", atc);

plane1.land(); // Request handled through ATC
plane2.land(); // Request handled through ATC
