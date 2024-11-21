export const Toolbar = ({ mode, setMode }) => {
  return (
    <div style={{ position: "absolute", top: 10, left: 10 }}>
      <button onClick={() => setMode("select")} style={{ marginRight: 5 }}>
        Select Mode
      </button>
      <button onClick={() => setMode("add")}>Add Mode</button>
      <p>Current Mode: {mode}</p>
    </div>
  );
};
