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
  
  for await (const result of response.body) {
    loaded += result.length;
    console.log(((loaded / total) * 100).toFixed(2), '%');
  }
}
