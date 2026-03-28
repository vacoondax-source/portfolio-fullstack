import profile from "../images/portfolio.png";

function Home() {
  return (
    <div className="container" style={{ textAlign: "center" }}>
      <img
        src={profile}
        alt="profile"
        style={{ width: "150px", borderRadius: "50%" }}
      />

      <h1>Hi, I'm Abdullahi 👋</h1>
      <p>I build modern web applications using React & Node.js</p>

      <button>View My Projects</button>
    </div>
  );
}

export default Home;