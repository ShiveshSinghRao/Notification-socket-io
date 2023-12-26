import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Card from "./components/Card";
import { posts } from "./data.js";
import { io } from "socket.io-client";
const App = () => {
  const [username, setusername] = useState("");
  const [user, setuser] = useState("");
  console.log(user);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    setSocket(io("http://localhost:3003"));
  }, []);

  useEffect(() => {
    socket?.emit("newUser", user);
  }, [socket, user]);

  return (
    <div className="container">
      {user ? (
        <>
          <Navbar socket={socket} />
          {posts.map((post) => (
            <Card key={post.id} post={post} socket={socket} user={user} />
          ))}
          <span className="username">{user}</span>
        </>
      ) : (
        <div className="login">
          <input
            type="text"
            placeholder="User Name"
            onChange={(e) => setusername(e.target.value)}
          />
          <button onClick={() => setuser(username)}>Login</button>
        </div>
      )}
    </div>
  );
};

export default App;
