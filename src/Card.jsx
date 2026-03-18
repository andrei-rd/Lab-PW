
function Card(props) {
  return (
    <div style={{ border: '1px solid #ddd', padding: '15px', margin: '10px', borderRadius: '5px' }}>
      <h3>{props.title}</h3>
      <p>{props.description}</p>
    </div>
  );
}

export default Card;