let ok = false;
let promise = new Promise((resolve, reject) => {

  // como temos mais de uma instrução, precisamos colocar um bloco em nossa arrow function! Lembrou?
  setTimeout(() => {
    if (ok) {
      resolve('PROMISE CONCLUÍDA');
    } else {
      reject('HOUVE PROBLEMAS');
    }
  }, 2000);
});

promise
  .then(resultado => console.log(resultado))
  .catch(erro => console.log(erro));