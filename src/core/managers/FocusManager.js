
class FocusManager {
  constructor() {
    this.focusId = null;
    this.focusedObject = null; // To store the actual focused object for the dialog
  }

  update(context) {
    
  }

  setFocus(object) {
    if (object && object.id) {
      this.focusId = object.id;
      this.focusedObject = object; // Store the whole object
    } else {
      this.blur(); // Clear focus if invalid data is passed
    }
  }

  blur() {
    this.focusId = null;
    this.focusedObject = null;
  }
}

export default FocusManager;