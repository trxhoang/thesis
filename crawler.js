


const tienphong = require('./crawler-tienphong')
const vnexpress = require('./crawler-vnexpress')
(async ()=>{
  await tienphong();
  await vnexpress()
  // await require('./crawler-tuoitre')()
})()