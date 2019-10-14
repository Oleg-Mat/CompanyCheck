// const newAuction = document.forms['new-auction'];

// newAuction.addEventListener('submit', async (e) => {
//   e.preventDefault();
//   const [nameInput, conditionInput,datestartInput,dateendInput,descriptionInput] = e.target.elements;

//   const response = await fetch('/users/profile/auction/:id', {
//     method: 'POST',
//     headers: {
//       'Content-type': 'application/json',
//     },
//     body: JSON.stringify({
//       name: nameInput.value,
//       condition: conditionInput.value,
//       datestart: datestartInput.value,
//       dateend: dateendInput.value,
//       description: descriptionInput,
//     }),
//   });

//   const newAuction = await response.json();
//   console.log(newAuction);
// });
