function App() {
  const sendHello = async () => {
    await fetch('http://localhost:6782/hello', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: 'Hello world' })
    });
    alert('Message envoyé !');
  };

  return (
    <div>
      <button onClick={sendHello}>Envoyer Hello world à la DB</button>
    </div>
  )
}

export default App
