const BASE_URL = 'https://reqres.in/api/users/';
const POSTMAN_URL = 'https://httpbin.org/post';

//Código principal dentro del evento load
// para asegurar la carga de los componentes
window.addEventListener('load', (ev) => {
  let numsecs = document.getElementById('numsecs');
  let user = document.getElementById('user');
  let boton = document.querySelector('button');

  boton.addEventListener('click', (ev) => {
    ev.preventDefault();
    clearFields();
    procesarFetch(numsecs.value, user.value);
  });
});

function clearFields() {
  document.querySelectorAll('span').forEach((element) => {
    element.innerHTML = '';
    console.log(element);
  });
}

const httpStatus = document.getElementById('status');

function procesarFetch(numsecs, user) {
  let url = BASE_URL+user+'?delay='+numsecs+'';
  fetch(url)
    .then((response)=>{
      if(response.ok){
        return response.json();
      } else {
        throw new Error(response.status);  
      }
    })
    .then((response)=>{
      const id = document.getElementById('id');
      const email = document.getElementById('email');
      id.textContent = response.data.id;
      email.textContent = response.data.email; 

      const userInfo = {
        id: response.data.id,
        email: response.data.email,
        first_name: response.data.first_name,
        last_name: response.data.last_name
      };

        return fetch('https://httpbin.org/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userInfo)
      })
      .then((response)=>{
        if(response.ok){
          httpStatus.textContent = response.status;
          return response.json();
        } else {
          throw new Error(response.status);  
        }
      })
      .then((response)=>{
        const name = document.getElementById('name');
        name.textContent = response.json.first_name;
        httpStatus.textContent = 200;
      })
      .catch((error)=>{
        httpStatus.textContent = error;
      })
    })
    .catch((error)=>{
      httpStatus.textContent = error;
    })




}
