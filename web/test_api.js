async function test() {
  try {
    const res = await fetch('http://localhost:3000/api/projects');
    const text = await res.text();
    console.log('STATUS:', res.status);
    console.log('RESPONSE:', text);
  } catch (err) {
    console.error('ERROR:', err);
  }
}
test();
