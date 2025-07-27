import { useSession, signIn, signOut } from "next-auth/react";
import { useState } from "react";

export default function Home() {
  const { data: session } = useSession();
  const [salary, setSalary] = useState(100);
  const [result, setResult] = useState(null);

  async function getMeetingCost() {
    const res = await fetch(`/api/calendar?salary=${salary}`);
    const data = await res.json();
    setResult(data);
  }

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      {!session ? (
        <button onClick={() => signIn("google")}>Login with Google</button>
      ) : (
        <div>
          <p>Welcome, {session.user.name}</p>
          <button onClick={() => signOut()}>Sign out</button>

          <div style={{ marginTop: "2rem" }}>
            <label>Hourly Rate ($): </label>
            <input
              type="number"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              style={{ marginRight: "1rem" }}
            />
            <button onClick={getMeetingCost}>Calculate Meeting Cost</button>
          </div>

          {result && (
            <div style={{ marginTop: "2rem" }}>
              <h3>Summary for This Week</h3>
              <p>Total Meeting Hours: {result.totalHours.toFixed(2)}</p>
              <p>Estimated Cost: ${result.totalCost.toFixed(2)}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
