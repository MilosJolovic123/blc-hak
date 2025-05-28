export const Login = () => {
  return (<div className="min-h-screen flex flex-col justify-center items-center bg-green-50 px-4">
  <div className="bg-white rounded-3xl shadow-md p-8 w-full max-w-sm">
      {/**<img src="leaf.png" alt="app-logo" className="w-20 h-20 mx-auto mb-1"/> */} 
    <h1 className="text-2xl font-bold text-[#1A237E] mb-1 text-center">IDGreenChain</h1>
    <p className="mb-6 text-gray-600 text-center">Tvoj identitet, tvoja kontrola</p>
    <input type="email" placeholder="Email" className="w-full p-3 mb-4 border border-gray-300 rounded-xl" />
    <input type="password" placeholder="Lozinka" className="w-full p-3 mb-6 border border-gray-300 rounded-xl" />
    <button className="w-full bg-green-600 text-white py-3 rounded-xl">Prijavi se</button>
    <div className="flex justify-between mt-4 text-sm text-green-700">
      <a href="#">Zaboravili ste lozinku?</a>
          <a href="#">Kreiraj novi nalog</a>
        </div>
      </div>
    </div>
  );
};
