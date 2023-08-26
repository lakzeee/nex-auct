import { getSession, getTokenWorkAround } from "@/app/Actions/authActions";
import Heading from "@/app/Components/layout/Heading";
import AuthTest from "@/app/session/AuthTest";

export default async function Page() {
  const session = await getSession();
  const token = await getTokenWorkAround();

  return (
    <div>
      <Heading title="Session Dashboard" />
      <div>
        <h3>Session Data</h3>
        <pre>{JSON.stringify(session, null, 2)}</pre>
      </div>
      <div>
        <h3>Token Data</h3>
        <pre>{JSON.stringify(token, null, 2)}</pre>
      </div>
      <div className="mt-4">
        <AuthTest />
      </div>
    </div>
  );
}
