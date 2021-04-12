console.log('client side javascript file is being loaded');

// client side api
// fetch('http://puzzle.mead.io/puzzle').then ((response)=> {
//     response.json().then((data)=> {
//         console.log(data);
//     })
// })

// fetch('http://localhost:3000/weather?address=!').then ((response) => {
//     response.json().then((data)=> {
//         if(data.geoError) {
//             console.log(data.geoError);
//         } else {
//             console.log(data.forcastData);
//             console.log(data.address);
//             console.log(data.error);
//         }
//     })
// })
// Select the output of the form
const weatherForm = document.querySelector('form');
const searchElement = document.querySelector('input');
const msgError = document.querySelector('#msg1');
const msgText = document.querySelector('#msg2');

// Add event listener
weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();// stops refreshing
    const location = searchElement.value;

    msgError.textContent = 'Loading ...';
    msgText.textContent = '';
    //console.log(location);
    fetch('http://localhost:3000/weather?address='+ location).then ((response) => {
        response.json().then((data)=> {
            msgError.textContent = 'Loading...';
            if(data.geoError) {
                msgError.textContent = 'Error';
                msgText.textContent = data.geoError;
            } else {
                msgError.textContent = data.address;
                msgText.textContent = data.forcastData;
            }
        })  
    })
})

