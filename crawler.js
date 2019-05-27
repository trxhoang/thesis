



(async ()=> {
  await require('./crawler-tienphong')();
  await require('./crawler-tuoitre')();
  await require('./crawler-vnexpress')();
})()