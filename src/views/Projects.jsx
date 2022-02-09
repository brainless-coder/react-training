import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container } from "reactstrap";
import ProjectCard from "../components/ProjectCard";
import { userDataInitiate, userDataSuccess } from '../redux/users/action';

export default function Projects() {
  // const [users, setUsers] = useState([]);
  const dispatch = useDispatch();
  const users = useSelector(state => state.user);

  const getUsers = async () => {
    const res = await fetch('https://reqres.in/api/users');
    const data = await res.json();
    const usersData = data.data;
    dispatch(userDataSuccess(usersData));
  }


  useEffect(() => {
    dispatch(userDataInitiate());
    getUsers();
  }, []);


  return (
    <Container>
      <h1>Projects Page</h1>
      {
      users.userData.map((user) => (
        <ProjectCard
          imgSrcUrl={user.avatar}
          lastName={user.last_name}
          imgAltText={user.id}
          firstName={user.first_name}
        />
      ))
      }
    </Container>
  );
}
