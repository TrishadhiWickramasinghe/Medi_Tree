export class AVLNode {
  constructor(patient) {
    this.patient = patient;
    this.priority = patient.priorityScore;
    this.left = null;
    this.right = null;
    this.height = 1;
  }
}