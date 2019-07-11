window.addEventListener('load', async () => {
  await demo('https://source.unsplash.com/random');
  await demo('index.html');
});

async function demo(url) {
  console.log(url);
  const response = await fetch(url);
  response.headers.forEach(console.log);

  const total = Number(response.headers.get('content-length'));
  let loaded = 0;

  // Note that this does not work but looks much more elegant - my SO Q: https://stackoverflow.com/q/56991610/2715716
  // https://stackoverflow.com/a/47759960/2715716
  // for await (const { length } of response.body.getReader()) {
  //   loaded += length;
  //   console.log(((loaded / total) * 100).toFixed(2), '%');
  // }

  const reader = response.body.getReader();
  let result;
  while (!(result = await reader.read()).done) {
    loaded += result.value.length;
    console.log(loaded, '/', total);
  }
}
