// const regForm = document.getElementById('regform');
// const loginForm = document.getElementById('loginform');

// if (regForm) {
//     regForm.addEventListener('submit', async e => {
//         e.preventDefault();
//         const username = e.target.querySelector('[name="username"]').value;
//         const password = e.target.querySelector('[name="password"]').value;
//         const email = e.target.querySelector('[name="email"]').value;
        
//         const response = await fetch('/registration', {
//             method: "POST",
//             headers: {
//                 'Content-Type': "application/json"
//             },
//             body: JSON.stringify({ username, password, email })
//         });
//         // const newUser = await response.json();
//         // console.log('APP new user:', newUser);
//         window.location.href = '/channels';
//         // window.location.reload(true);
//     });
// };

// if (loginForm) {
//     loginForm.addEventListener('submit', async e => {
//         e.preventDefault();
//         const email = e.target.querySelector('[name="email"]').value;
//         const password = e.target.querySelector('[name="password"]').value;

//         const response = await fetch('/login', {
//             method: "POST",
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({ email, password })
//         });
//         window.location.href = '/channels';
//     });
// };

