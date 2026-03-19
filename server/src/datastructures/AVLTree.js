import { AVLNode } from './AVLNode.js';

export class AVLTree {

  constructor() {
    this.root = null;
  }

  // Get height of a node
  getHeight(node) {
    return node ? node.height : 0;
  }

  // Get balance factor of a node
  getBalance(node) {
    return node ? this.getHeight(node.left) - this.getHeight(node.right) : 0;
  }

  // Update height of a node
  updateHeight(node) {
    node.height = 1 + Math.max(
      this.getHeight(node.left),
      this.getHeight(node.right)
    );
  }

  // Right rotation
  rotateRight(y) {
    const x = y.left;
    const T2 = x.right;

    x.right = y;
    y.left = T2;

    this.updateHeight(y);
    this.updateHeight(x);

    return x;
  }

  // Left rotation
  rotateLeft(x) {
    const y = x.right;
    const T2 = y.left;

    y.left = x;
    x.right = T2;

    this.updateHeight(x);
    this.updateHeight(y);

    return y;
  }

  // Balance the node after insert/delete
  balance(node) {
    this.updateHeight(node);
    const balanceFactor = this.getBalance(node);

    // Left Left case
    if (balanceFactor > 1 && this.getBalance(node.left) >= 0)
      return this.rotateRight(node);

    // Left Right case
    if (balanceFactor > 1 && this.getBalance(node.left) < 0) {
      node.left = this.rotateLeft(node.left);
      return this.rotateRight(node);
    }

    // Right Right case
    if (balanceFactor < -1 && this.getBalance(node.right) <= 0)
      return this.rotateLeft(node);

    // Right Left case
    if (balanceFactor < -1 && this.getBalance(node.right) > 0) {
      node.right = this.rotateRight(node.right);
      return this.rotateLeft(node);
    }

    return node;
  }

  // Insert a patient into the tree
  insert(patient) {
    this.root = this._insert(this.root, patient);
  }

  _insert(node, patient) {
    if (!node) return new AVLNode(patient);

    if (patient.priorityScore > node.priority)
      node.left = this._insert(node.left, patient);
    else if (patient.priorityScore < node.priority)
      node.right = this._insert(node.right, patient);
    else
      node.left = this._insert(node.left, patient);

    return this.balance(node);
  }

  // Get the node with the minimum priority (leftmost)
  getMinNode(node) {
    let current = node;
    while (current.right !== null)
      current = current.right;
    return current;
  }

  // Delete a patient by their ID
  delete(patientId) {
    this.root = this._delete(this.root, patientId);
  }

  _delete(node, patientId) {
    if (!node) return null;

    if (node.patient._id.toString() === patientId.toString()) {
      if (!node.left || !node.right)
        return node.left || node.right;

      const successor = this.getMinNode(node.right);
      node.patient = successor.patient;
      node.priority = successor.priority;
      node.right = this._delete(node.right, successor.patient._id);
    } else {
      node.left = this._delete(node.left, patientId);
      node.right = this._delete(node.right, patientId);
    }

    return this.balance(node);
  }

  // Search for a patient by ID
  search(patientId) {
    return this._search(this.root, patientId);
  }

  _search(node, patientId) {
    if (!node) return null;
    if (node.patient._id.toString() === patientId.toString()) return node.patient;
    const left = this._search(node.left, patientId);
    return left || this._search(node.right, patientId);
  }

  // In-order traversal — returns sorted queue (highest priority first)
  getSortedQueue() {
    const result = [];
    this._inOrder(this.root, result);
    return result;
  }

  _inOrder(node, result) {
    if (!node) return;
    this._inOrder(node.left, result);
    result.unshift(node.patient);
    this._inOrder(node.right, result);
  }

  // Get the highest priority patient (leftmost node)
  getNextPatient() {
    if (!this.root) return null;
    let current = this.root;
    while (current.left) current = current.left;
    return current.patient;
  }

  // Get tree structure for visualization
  getTreeStructure() {
    return this._getStructure(this.root);
  }

  _getStructure(node) {
    if (!node) return null;
    return {
      priority: node.priority,
      patientName: node.patient.name,
      patientId: node.patient._id,
      height: node.height,
      balanceFactor: this.getBalance(node),
      left: this._getStructure(node.left),
      right: this._getStructure(node.right)
    };
  }

  // Get size of the tree
  getSize() {
    return this._getSize(this.root);
  }

  _getSize(node) {
    if (!node) return 0;
    return 1 + this._getSize(node.left) + this._getSize(node.right);
  }
}

// Singleton instance shared across the app
export const avlTree = new AVLTree();