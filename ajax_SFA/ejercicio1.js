fetch('https://fakerapi.it/api/v2/persons?_quantity=1')
    .then((response)=>{
        if(response.ok){
            return response.json();
        } else {
            throw new Error(response.status);
        }
    })
    .then((datos)=>{
        datos.data.forEach(dato => {
            let cont = document.getElementById('container');
            let div = document.createElement('div');
            let usuario =
            `<p>NOMBRE: ${dato.firstname}</p>
            <p>APELLIDO: ${dato.lastname}</p>
            <p>EMAIL:${dato.email}</p>
            <p>DIRECCIÓN:${dato.address.street}</p>
            <p>PAIS: ${dato.address.country}</p>`;
            div.innerHTML=usuario;
            cont.appendChild(div);
        });
    })
    .catch((error)=>{
        console.log('ERROR EN LA PETICIÓN:',error);
    })