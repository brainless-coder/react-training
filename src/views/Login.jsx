import { useReducer } from "react";
import * as yup from "yup";
import { Button, Container, Form, FormGroup, Input, Label } from "reactstrap";

const authConstans = {
  setEmail: "SET_EMAIL",
  setPassword: "SET_PASSWORD",
  setEmailError: "SET_EMAIL_ERROR",
  setPasswordError: "SET_PASSWORD_ERROR",
};

const initialState = {
  email: "",
  password: "",
  emailError: "",
  passwordError: ""
};

const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case authConstans.setEmail: {
      return {
        ...state,
        email: payload,
      };
    }
    case authConstans.setPassword:
      return {
        ...state,
        password: payload,
      };
    case authConstans.setEmailError:
      return {
        ...state,
        emailError: payload,
      };
    case authConstans.setPasswordError:
      return {
        ...state,
        passwordError: payload,
      };
    default:
      return state;
  }
};

export default function Login(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { email, password, emailError, passwordError } = state;
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  // Defining our schema for yup validations
  let loginSchema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required().min(8),
  });

  const validateLogin = async () => {
    const res = await fetch("https://reqres.in/api/login", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    return res.status;
  };

  const onSubmit = (event) => {
    event.preventDefault();

    dispatch({type: authConstans.setEmailError, payload: ""})
    dispatch({type: authConstans.setPasswordError, payload: ""})
    // Validate the email & password first
    loginSchema.validate({ email, password }, { abortEarly: false })
    .then(async (res) => {
      let status = await validateLogin();
      // run this only when login is successful
      if (status === 200) props.onLoginSuccess();
      else alert('bad credentials');
    }).catch(err => {
      // yup ka catch
      err.inner.forEach(e => {
        // console.log(e.path, e.message);
        if (e.path === 'email') {
          dispatch({ type: authConstans.setEmailError, payload: e.message });
        }

        if (e.path === 'password') {
          dispatch({ type: authConstans.setPasswordError, payload: e.message });
        }
      });
    });

  };

  return (
    <Container>
      <h1>Login View</h1>
      <Form inline onSubmit={onSubmit} method="POST">
        <FormGroup floating>
          {/* ye ek controlled input hai, iski value ab hamesa email ke barabar hi hogi, wo email jo upar me hai, useState ke saath */}
          <Input
            id="email"
            type="email"
            value={email}
            placeholder="Email"
            onChange={(e) =>
              dispatch({ type: authConstans.setEmail, payload: e.target.value })
            }
          />
          <div>{emailError && <sub>{emailError} </sub>}</div>
          <Button
            type="button"
            color="danger"
            onClick={() =>
              dispatch({ type: authConstans.setEmail, payload: "" })
            }
          >
            &times;
          </Button>
          <Label for="email">Email</Label>
        </FormGroup>
        <FormGroup floating>
          <Input
            id="password"
            type="password"
            value={password}
            placeholder="password"
            onChange={(e) =>
              dispatch({
                type: authConstans.setPassword,
                payload: e.target.value,
              })
            }
          />
          <Label for="examplePassword">Password</Label>
          <div>{passwordError && <sub>{passwordError}</sub>}</div>
          <Button
            type="button"
            color="danger"
            onClick={() =>
              dispatch({ type: authConstans.setPassword, payload: "" })
            }
          >
            &times;
          </Button>
        </FormGroup>
        <Button
          type="submit"
          color="success"
          size="lg"
          style={{
            width: "46%",
          }}
        >
          Submit
        </Button>{" "}
        <Button
          type="reset"
          color="danger"
          outline
          size="lg"
          style={{
            width: "46%",
          }}
        >
          Reset
        </Button>
      </Form>
    </Container>
  );
}
