let isUpdate = false;
let addressBookObj = {};


window.addEventListener("DOMContentLoaded", () => {
   checkForUpdate();
})

const save = (event) => {
   event.preventDefault();
   event.stopPropagation();
   try {
      setAddressBookObject();
      if (site_properties.use_local_storage.match("true")) {
         createAndUpdateStorage();
         window.location.replace(site_properties.home_page)
      }
      else {
      }
   } catch (submitError) {
      alert(submitError);
      return;
   }
}

const setAddressBookObject = () => {
   if (!isUpdate) addressBookObj.id = createContactId();
   addressBookObj._fullName = document.querySelector("#name").value;
   addressBookObj._phoneNumber = document.querySelector("#number").value;
   addressBookObj._address = document.querySelector("#address").value;
   addressBookObj._city = document.querySelector("#city").value;
   addressBookObj._state = document.querySelector("#state").value;
   addressBookObj._zip = document.querySelector("#zip").value;
}

function createAndUpdateStorage() {
   let addressBookList = JSON.parse(localStorage.getItem("AddressBookList"));
   if (addressBookList) {
      let addressBookData = addressBookList.find(contact => contact.id == addressBookObj.id)
      if (!addressBookData) {
         addressBookList.push(addressBookObj)
      } else {
         const index = addressBookList.map(contact => contact.id).indexOf(addressBookData.id)
         addressBookList.splice(index, 1, addressBookObj)
      }
   } else {
      addressBookList = [addressBookObj]
   }

   alert("Store in Local Storage...!!")
   localStorage.setItem("AddressBookList", JSON.stringify(addressBookList))
}

const createAddressData = (id) => {
   let addressBookData = new AddressBookSystem()
   if (!id) addressBookData.id = createContactId()
   else addressBookData.id = id;
   setAddressData(addressBookData);
   return addressBookData;
}

const setAddressData = (addressBookData) => {
   addressBookData.fullName = addressBookObj._fullName;
   addressBookData.phoneNumber = addressBookObj._phoneNumber;
   addressBookData.address = addressBookObj._address;
   addressBookData.state = addressBookObj._state;
   addressBookData.city = addressBookObj._city;
   addressBookData.zip = addressBookObj._zip;


   alert("Contact Added Successfully.....!!!\n" + addressBookData.toString());
};

const createContactId = () => {
   let contactID = localStorage.getItem("ContactId");
   contactID = !contactID ? 1 : (parseInt(contactID) + 1).toString();
   localStorage.setItem("ContactId", contactID);
   return contactID;
};

const createAddress = () => {
   let addressBookData = new AddressBookSystem();

   addressBookData.id = new Date().getTime() + 1
   addressBookData.fullName = document.querySelector("#name").value
   addressBookData.phoneNumber = document.querySelector("#number").value
   addressBookData.address = document.querySelector("#address").value
   addressBookData.state = document.querySelector("#state").value
   addressBookData.city = document.querySelector("#city").value
   addressBookData.zip = document.querySelector("#zip").value

   alert("Address Book Updated Successfully..!!\n" + addressBookData.toString());
   return addressBookData;
}

const checkForUpdate = () => {
   const addressBookJson = localStorage.getItem('editContact')
   isUpdate = addressBookJson ? true : false
   if (!isUpdate) return
   addressBookObj = JSON.parse(addressBookJson)
   setForm()
}

const setForm = () => {
   setValue("#name", addressBookObj._fullName);
   setValue("#number", addressBookObj._phoneNumber);
   setValue("#address", addressBookObj._address);
   setValue("#state", addressBookObj._state)
   setValue("#city", addressBookObj._city)
   setValue("#zip", addressBookObj._zip)
}

const setValue = (propertyId, value) => {
   const element = document.querySelector(propertyId);
   element.value = value;
};