



const run = async () => {
  await require('./crawler-tienphong')();
  await require('./crawler-tuoitre')();
  await require('./crawler-vnexpress')();
  return null
}

export default run;