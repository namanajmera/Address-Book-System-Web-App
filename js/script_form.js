let site_properties = {
   home_page: "../pages/address_book_home",
   add_contact_page: "../pages/address_book_form"
}

const save = () => {
   try {
      let addressBookData = createAddressData();
      createAndUpdateStorage(addressBookData);
   } catch (submitError) {
      alert(submitError);
      return;
   }
}

function createAndUpdateStorage(addressBookData) {
   let addressBookList = JSON.parse(localStorage.getItem("AddressBookList"));

   if (addressBookList != undefined) {
      addressBookList.push(addressBookData)
   } else {
      addressBookList = [addressBookData]
   }

   alert("Store in Local Storage...!!")
   localStorage.setItem("AddressBookList", JSON.stringify(addressBookList))
}

const createAddressData = () => {
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
