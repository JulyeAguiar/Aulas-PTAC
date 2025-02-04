// import React, { useState, useEffect } from "react";

// const ReservaPage = () => {
//   const [mesas, setMesas] = useState([]);
//   const [mesaId, setMesaId] = useState("");
//   const [nPessoas, setNPessoas] = useState("");
//   const [data, setData] = useState("");
//   const [mensagem, setMensagem] = useState("");

//   useEffect(() => {
//     // Buscar mesas disponíveis
//     fetch("http://localhost:3000/mesas")
//       .then((res) => res.json())
//       .then((data) => setMesas(data))
//       .catch((error) => console.error("Erro ao buscar mesas:", error));
//   }, []);

//   const handleReserva = async (e) => {
//     e.preventDefault();

//     const response = await fetch("http://localhost:3000/reservas", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ mesaId, n_pessoas: nPessoas, data })
//     });

//     const result = await response.json();
//     setMensagem(result.mensagem);
//   };

//   return (
//     <div>
//       <h1>Fazer uma Reserva</h1>
//       <form onSubmit={handleReserva}>
//         <label>Mesa:</label>
//         <select value={mesaId} onChange={(e) => setMesaId(e.target.value)}>
//           <option value="">Selecione uma mesa</option>
//           {mesas.map((mesa) => (
//             <option key={mesa.id} value={mesa.id}>{mesa.nome} - {mesa.n_lugares} lugares</option>
//           ))}
//         </select>

//         <label>Número de Pessoas:</label>
//         <input
//           type="number"
//           value={nPessoas}
//           onChange={(e) => setNPessoas(e.target.value)}
//           min="1"
//         />

//         <label>Data:</label>
//         <input
//           type="date"
//           value={data}
//           onChange={(e) => setData(e.target.value)}
//         />

//         <button type="submit">Reservar</button>
//       </form>
//       {mensagem && <p>{mensagem}</p>}
//     </div>
//   );
// };

// export default ReservaPage;
