

(async ()=>{
  await require('./crawler-tienphong')()
  await require('./crawler-vnexpress')()
  await require('./crawler-tuoitre')()
})()