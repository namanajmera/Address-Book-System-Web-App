class AddressBookSystem {

   get id() {
      return this._id;
   }
   set id(id) {
      this._id = id;
   }

   get fullName() {
      return this._fullName;
   }

   set fullName(fullName) {
      this._fullName = fullName;
   }

   get phoneNumber() {
      return this._phoneNumber;
   }

   set phoneNumber(phoneNumber) {
      this._phoneNumber = phoneNumber
   }

   get address() {
      return this._address;
   }

   set address(address) {
      this._address = address;
   }

   get state() {
      return this._state;
   }

   set state(state) {
      this._state = state;
   }

   get city() {
      return this._city;
   }

   set city(city) {
      this._city = city;
   }

   get zip() {
      return this._zip;
   }

   set zip(zip) {
      this._zip = zip;
   }

   toString() {
      return "[ id: " + this.id + ", Full Name: " + this.fullName + ", Phone Number: " + this.phoneNumber + ", Address: " + this.address + ", State: " + this.state + ", City: " + this.city + ", ZipCode: " + this.zip + "]";
   }
}