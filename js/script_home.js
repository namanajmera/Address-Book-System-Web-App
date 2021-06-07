let addressBookList;
window.addEventListener("DOMContentLoaded", (event) => {
   if (site_properties.use_local_storage.match("true")) {
      getAddressDataFromStorage();
   } else {
      getAddressDataFromServer();
   }
})

const getAddressDataFromStorage = () => {
   addressBookList = localStorage.getItem("AddressBookList") ? JSON.parse(localStorage.getItem("AddressBookList")) : [];
   processAddressBookDataResponse()
}

const processAddressBookDataResponse = () => {
   document.querySelector(".address-count").innerHTML = addressBookList.length;
   createInnerHTML();
   localStorage.removeItem('editContact')
}

const getAddressDataFromServer = () => {
   makeServiceCall("GET", site_properties.server_url, true)
      .then(responseText => {
         addressBookList = JSON.parse(responseText);
         processAddressBookDataResponse()
      }).catch(error => {
         console.log("GET Error Status: " + JSON.stringify(error))
         addressBookList = []
         processAddressBookDataResponse();
      })
}

const createInnerHTML = () => {
   const headerHTML = `
         <th>Full Name</th>
         <th>Address</th>
         <th>City</th>
         <th>State</th>
         <th>Zip Code</th>
         <th>Phone Number</th>
         <th></th>
   `

   if (addEventListener.length == 0)
      return

   let innerHTML = `${headerHTML}`
   for (const contact of addressBookList) {
      innerHTML = `${innerHTML}
            <tr>
               <td>${contact._fullName}</td>
               <td>${contact._address}</td>
               <td>${contact._city}</td>
               <td>${contact._state}</td>
               <td>${contact._zip}</td>
               <td>${contact._phoneNumber}</td>
               <td>
                  <img id="${contact.id}" src="/assets/delete_black_24dp.svg" alt="delete" class="actions" onclick="remove(this)">
                  <img id="${contact.id}" src="/assets/edit_black_24dp.svg" alt="edit" class="actions" onclick="update(this)">
               </td>
            </tr>
      `
      document.querySelector("#display").innerHTML = innerHTML;
   }
}

const remove = (node) => {
   let addressBookData = addressBookList.find(contact => contact.id == node.id)
   if (!addressBookData) return
   const index = addressBookList.map(contact => contact.id)
      .indexOf(addressBookData.id);
   addressBookList.splice(index, 1);
   if (site_properties.use_local_storage.match("true")) {
      localStorage.setItem("AddressBookList", JSON.stringify(addressBookList))
      document.querySelector(".address-count").innerHTML = addressBookList.length;
      createInnerHTML();
   } else {
      const deleteURL = site_properties.server_url + addressBookData.id.toString();
      makeServiceCall("DELETE", deleteURL, true).then(responseText => {
         createInnerHTML();
      }).catch(error => {
         console.log("Delete Error Status " + JSON.stringify(error))
      })
   }
}

const update = (node) => {
   let addressBookData = addressBookList.find(contact => contact.id == node.id);
   if (!addressBookData) return
   localStorage.setItem('editContact', JSON.stringify(addressBookData))
   window.location.replace(site_properties.add_contact_page)
}