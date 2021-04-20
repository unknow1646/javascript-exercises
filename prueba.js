// Propiedad intelectual: Esta prueba fue desarrollada por TCIT el año 2014 y registrada bajo propiedad intelectual, cualquier publicación o difamación podría estar sujeta a acciones legales. Hay otras empresas que nos han copiado esta prueba, no aceptes imitaciones, exige el original xD
// No realizar la prueba en repl.it al hacerlo su respuesta queda disponible para otros postulantes, tampoco subirla a repositorios de github públicos
// No editar
const clients = [
  { id: 1, taxNumber: '86620855', name: 'HECTOR ACUÑA BOLAÑOS'},
  { id: 2, taxNumber: '7317855K', name: 'JESUS RODRIGUEZ ALVAREZ'},
  { id: 3, taxNumber: '73826497', name: 'ANDRES NADAL MOLINA'},
  { id: 4, taxNumber: '88587715', name: 'SALVADOR ARNEDO MANRIQUEZ'},
  { id: 5, taxNumber: '94020190', name: 'VICTOR MANUEL ROJAS LUCAS'},
  { id: 6, taxNumber: '99804238', name: 'MOHAMED FERRE SAMPER' }
];
const accounts = [
  { clientId: 6, bankId: 1, balance: 15000 },
  { clientId: 1, bankId: 3, balance: 18000 },
  { clientId: 5, bankId: 3, balance: 135000 },
  { clientId: 2, bankId: 2, balance: 5600 },
  { clientId: 3, bankId: 1, balance: 23000 },
  { clientId: 5, bankId: 2, balance: 15000 },
  { clientId: 3, bankId: 3, balance: 45900 },
  { clientId: 2, bankId: 3, balance: 19000 },
  { clientId: 4, bankId: 3, balance: 51000 },
  { clientId: 5, bankId: 1, balance: 89000 },
  { clientId: 1, bankId: 2, balance: 1600 },
  { clientId: 5, bankId: 3, balance: 37500 },
  { clientId: 6, bankId: 1, balance: 19200 },
  { clientId: 2, bankId: 3, balance: 10000 },
  { clientId: 3, bankId: 2, balance: 5400 },
  { clientId: 3, bankId: 1, balance: 9000 },
  { clientId: 4, bankId: 3, balance: 13500 },
  { clientId: 2, bankId: 1, balance: 38200 },
  { clientId: 5, bankId: 2, balance: 17000 },
  { clientId: 1, bankId: 3, balance: 1000 },
  { clientId: 5, bankId: 2, balance: 600 },
  { clientId: 6, bankId: 1, balance: 16200 },
  { clientId: 2, bankId: 2, balance: 10000 }
]
const banks = [
  { id: 1, name: 'SANTANDER' },
  { id: 2, name: 'CHILE' },
  { id: 3, name: 'ESTADO' }
];

/*
  SECCIÓN PROBLEMAS
    - No promover la copia:
	  - No preguntar en StackOverflow, foros, o similares ya que estas preguntas/respuestas quedan disponibles a otros candidatos
	  - No subir a repositorios públicos (github, o similares)
	  - Otros sitios como codepen o editores de texto on-line (codepen, repl, o similares), dejan guardado el código, por lo que les pedimos tampoco usar editores on-line, la mejor forma de debuggear su código es usando un interprete de javascript como node y ejecutarlo de manera local
	  - Para nosotros es fácil detectar pruebas con copia, no pierda su tiempo intentando hacerlo
	  - Posteriormente, se evaluará conocimiento en es6 en entrevistas presenciales
    - Las siguientes son preguntas básicas de Javascript y manejo de datos. Se evaluará eficiencia, ORDEN y claridad del código entregado.
    - Se debe programar un algoritmo para cada método y que este retorne lo requerido.
    - Debe usar nombres explicativos para sus variables.
    - Usar sintaxis ES6.
    - Los resultados son evaluados con un test automatizado, revise que sus retornos sean con la estructura de datos solicitada en cada pregunta.
	- Métodos menos verbosos, DRY, y buenas prácticas en el código mejoran el puntaje final de su prueba
	- Si necesita hacer supuestos que afecten las respuestas entregadas, por favor déjelos escritos en el cuerpo del correo cuando envíe su prueba (No en este archivo). Supuestos que contradigan lo solicitado, no serán considerados como válidos.
	- Su prueba debe ejecutarse sin errores con: node nombre-apellido.js
            - Su prueba debe ejecutarse sin errores en la consola del inspector de Google Chrome
*/

// 0 Arreglo con los ids de clientes
function listClientsIds() {
  return clients.map((client) => client.id);
};

// 1 Arreglo con los ids de clientes ordenados por rut
function listClientsIdsSortByTaxNumber() {
  clients.sort( (a,b) => a.taxNumber.localeCompare( b.taxNumber ) );
  return clients.map((client) => client.id);
  };

// 2 Arreglo con los nombres de cliente ordenados de mayor a menor por la suma TOTAL de los saldos de cada cliente en los bancos que participa.
function sortClientsTotalBalances() {
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    var arreglo = [];
    for(let id of listClientsIds()){
        arreglo[id-1]=[(accounts.filter(account=> account.clientId==id).map((account) => account.balance).reduce(reducer)),id];
    }
    arreglo.sort((a,b) => b[0]-a[0])
    var array= [];
    for(let j in clients){
      array[j]=clients.find(nombreCliente => nombreCliente.id == arreglo[j][1])
    }
    return array.map((nombre) => nombre.name );
}

// 3 Objeto en que las claves sean los nombres de los bancos y los valores un arreglo con los ruts de sus clientes ordenados alfabeticamente por nombre.
function banksClientsTaxNumbers() {
  // CODE HERE
  var bancosObjeto = {};
  var cuentas =[]
  var arreglo =[]
  for(let i of banks){
    cuentas=accounts.filter(idBanco => idBanco.bankId == i.id);
    for(let j of cuentas ){
      arreglo.push(clients.find(bancoCliente => bancoCliente.id == j.clientId));
    }
    arreglo = arreglo.filter((item, index) => {
      return arreglo.indexOf(item) === index;
    });
    rut=(arreglo.sort((a,b) => a.name.localeCompare( b.name ))).map(rut => rut.taxNumber);
    bancosObjeto[i.name]=rut;
    arreglo=[];  
  }
  return bancosObjeto;
}

// 4 Arreglo ordenado decrecientemente con los saldos de clientes que tengan más de 25.000 en el Banco SANTANDER
function richClientsBalances() {
  var saldos= accounts.filter(cuentas => cuentas.balance > 25000 );
  saldos= (saldos.filter(banco => banco.bankId == 1)).sort((a,b)=> b.balance - a.balance);
  saldos= saldos.map((saldos) => saldos.balance);
  return saldos

}

// 5 Arreglo con ids de bancos ordenados crecientemente por la cantidad TOTAL de dinero que administran.
function banksRankingByTotalBalance() {
  saldo =[];
  total=[];
  for(let i of banks){
    saldo=accounts.filter(banco1 => banco1.bankId==i.id);
    
    saldo=saldo.map((bal) => bal.balance);
    
    total.push([saldo.reduce((accumulator, currentValue) => accumulator + currentValue),i.id]);
  }
  
  return (total.sort((a,b) => a[0]-b[0])).map((ids) => ids[1]);;
}

// 6 Objeto en que las claves sean los nombres de los bancos y los valores el número de clientes que solo tengan cuentas en ese banco.
function banksFidelity() {
  var objeto ={};
  var arreglo =[];
  var cont=0;
  for(let i of banks){
    arreglo  = accounts.filter(contador => contador.bankId == i.id);
    arreglo= arreglo.map((clientes) => clientes.clientId);
    arreglo = arreglo.filter((item, index) => {
      return arreglo.indexOf(item) === index;
    })
    objeto[i.name]=arreglo.length;
  }
  return objeto;
}

// 7 Objeto en que las claves sean los nombres de los bancos y los valores el id de su cliente con menos dinero.
function banksPoorClients() {
  var objeto = {};
  var arreglo =[];
  var aux = [];
  for(let i of banks){
    arreglo=accounts.filter(banco1 => banco1.bankId==i.id);
    arreglo=arreglo.sort((a,b) => a.balance -b.balance);
    arreglo=arreglo.map(idMenor => idMenor.clientId);
    objeto[i.name]=arreglo[0];
  }
  return objeto;
}

// 8 Agregar nuevo cliente con datos ficticios a "clientes" y agregar una cuenta en el BANCO ESTADO con un saldo de 9000 para este nuevo empleado. 
// Luego devolver el lugar que ocupa este cliente en el ranking de la pregunta 2.
// No modificar arreglos originales para no alterar las respuestas anteriores al correr la solución
function newClientRanking() {
  var arreglo = [];
  maximo = (clients.map(cliente => cliente.id)).length;
  var nuevoCliente = { id: maximo+1, taxNumber: '88888888', name: 'RODRIGO FERNANDEZ LARRAIN'};
  var nuevaCuenta = { clientId: nuevoCliente.id, bankId: 3, balance: 9000 };
  clients.push(nuevoCliente);
  accounts.push(nuevaCuenta);
  arreglo =sortClientsTotalBalances();
  ranking=arreglo.findIndex(i => i == nuevoCliente.name) + 1;
  return "El usuario: "+nuevoCliente.name+" ocupa el puesto "+ranking+ " en el ranking."
}

// No modificar, eliminar o alterar cualquier línea de código o comentario de acá para abajo
// Cualquier cambio hará que su prueba quede invalidada automáticamente
console.log('Pregunta 0');
console.log(listClientsIds());
console.log('Pregunta 1');
console.log(listClientsIdsSortByTaxNumber());
console.log('Pregunta 2');
console.log(sortClientsTotalBalances());
console.log('Pregunta 3');
console.log(banksClientsTaxNumbers());
console.log('Pregunta 4');
console.log(richClientsBalances());
console.log('Pregunta 5');
console.log(banksRankingByTotalBalance());
console.log('Pregunta 6');
console.log(banksFidelity());
console.log('Pregunta 7');
console.log(banksPoorClients());
console.log('Pregunta 8');
console.log(newClientRanking());

  