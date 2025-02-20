import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";


const Login = () => {
    const { handleGoogleLogin, user } = useContext(AuthContext);
    return (
        <>
          
          <dialog id="login_modal" className="modal modal-open">
            <div className="modal-box">
              <h2 className="text-2xl font-bold mb-4">Welcome to Task Manager</h2>
              <p className="mb-4">Please sign in with Google to continue.</p>
              <div className="modal-action">
                <button onClick={handleGoogleLogin} className="btn btn-primary">
                  Sign in with Google
                </button>
              </div>
            </div>
          </dialog>
        </>
      );
    };

export default Login;