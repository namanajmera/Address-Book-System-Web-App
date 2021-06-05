let addressBookList;
let site_properties = {
   home_page: "../pages/address_book_home.html",
   add_contact_page: "../pages/address_book_form.html"
}

window.addEventListener("DOMContentLoaded", (event) => {
   addressBookList = getAddressDateFromStorage();
   document.querySelector(".address-count").innerHTML = addressBookList.length;
   createInnerHTML();
   localStorage.removeItem('editContact')
})

const getAddressDateFromStorage = () => {
   return localStorage.getItem("AddressBookList") ? JSON.parse(localStorage.getItem("AddressBookList")) : [];
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
                  <img id="${contact._id}" src="/assets/delete_black_24dp.svg" alt="delete" class="actions" onclick="remove(this)">
                  <img id="${contact._id}" src="/assets/edit_black_24dp.svg" alt="edit" class="actions" onclick="update(this)">
               </td>
            </tr>
      `
      document.querySelector("#display").innerHTML = innerHTML;
   }
}




const remove = (node) => {
   let addressBookData = addressBookList.find(contact => contact._id == node.id)
   if (!addressBookData) return
   const index = addressBookList.map(contact => contact._id)
      .indexOf(addressBookData._id);
   addressBookList.splice(index, 1);
   localStorage.setItem("AddressBookList", JSON.stringify(addressBookList))
   document.querySelector(".address-count").innerHTML = addressBookList.length;
   createInnerHTML();
}

const update = (node) => {
   let addressBookData = addressBookList.find(contact => contact._id == node.id);
   if (!addressBookData) return
   localStorage.setItem('editContact', JSON.stringify(addressBookData))
   window.location.replace(site_properties.add_contact_page)
}