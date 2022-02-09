import {useEffect, useState} from 'react';
import { Container } from "reactstrap";
import ProjectCard from "../components/ProjectCard";

export default function Projects() {
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    const res = await fetch('https://reqres.in/api/users');
    const data = await res.json();
    const usersData = data.data;
    setUsers(usersData);
  }

  useEffect(() => {
    getUsers();
  }, []);



  return (
    <Container>
      <h1>Projects Page</h1>
      {
      users.map((user) => (
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
