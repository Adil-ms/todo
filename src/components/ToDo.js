import React, { useEffect, useState } from 'react'
// import styled from 'styled-components'
import styled from 'styled-components'


function ToDo() {
  const [tasks, setTasks] = useState([
    {
            id:1,
            title: "Buy a needy",
          },
          {
            id: 2,
            title: "Clean a house",
          },
          {
            id: 3,
            title: "Visit Friend",
          },
          {
            id: 4,
            title: "Interact with family",
          },
  ])
  const [completed, setCompleted] = useState([
    {
            id: 5,
            title: "Clean the house",
          },
          {
            id: 6,
            title: "Do Homework",
          },
          {
            id: 7,
            title: "Play fun things",
          },
          {
            id: 8,
            title: "30 mn wrk 5 min rest"
          },
  ])

  const [newTask, setNewTask] = useState("");
  const [itemCount, setItemCount] = useState(0);

  useEffect(() => {
    setItemCount(completed.length + tasks.length)
  }, [])

  const deleteTasks = (id) => {
    let new_list = tasks.filter((task) => task.id !== id);
    setTasks(new_list);
  }

  const deleteTaskCompleted = (id) => {
    let new_list = completed.filter((complete) => complete.id !== id);
    setCompleted(new_list);
  }

  const completeTask = (id) => {
    let current_task = tasks.find((task) => task.id == id);
    setCompleted([...completed, current_task]);

    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));

  }

  const revertTask = (id) => {
    let current_task = completed.find((task) => task.id == id);
    setTasks([...tasks, current_task]);

    let new_list = completed.filter((complete) => complete.id !== id);
    setCompleted(new_list
      
    )

  }
  const renderTasks = () => {
    return tasks.map((task)=> (
        <ListItems>
        <LeftContainer onClick={() => completeTask(task.id)}>
          <CheckContainer></CheckContainer>
          <ItemContent>{task.id}, {task.title}</ItemContent>
        </LeftContainer>
        <ItemRightContainer>
          <ActionButton onClick={() => deleteTasks(task.id)}>
            <ButtonImage src={require("./assets/delete.svg").default} />
          </ActionButton>
        </ItemRightContainer>
      </ListItems>
    ))
  }
  const renderCompleted = () => {
    return completed.map((complete) => (
        <ListItems>
        <LeftContainer>
          <CheckContainerCompleted>
            <TickImage src={require("./assets/tick-green.svg").default} />
          </CheckContainerCompleted>
          <ItemContentCompleted>{complete.id}, {complete.title}</ItemContentCompleted>
        </LeftContainer>
        <ItemRightContainer>
          <ActionButton>
            <ButtonImage onClick={() => revertTask(complete.id)} src={require("./assets/revert.svg").default} />
          </ActionButton>
          <ActionButton onClick={() => deleteTaskCompleted(complete.id)}>
              <ButtonImage src={require("./assets/delete.svg").default} />
          </ActionButton>
        </ItemRightContainer>
      </ListItems>
    ))
  }

  const addNewTask = (event) => {
    event.preventDefault();
    let new_task = {
      id: itemCount + 1,
      title: newTask,
    }
    if (newTask) {
      setTasks([...tasks, new_task]);
      setNewTask("")
      setItemCount((prev) => prev + 1);
    }
    
  }

    return  <Container>
        <Heading>ToDo List </Heading>
        <ToDoContainer>
          <SubHeading>Things to be done</SubHeading>
          <ToDoList>
            {renderTasks()}
          </ToDoList>
        </ToDoContainer>

        <NewToDoForm>
          <FormInput value={newTask} onChange={(e) => setNewTask(e.target.value)} placeholder="Type new task" />
          <FormSubmitButton onClick={(e) => addNewTask(e)} >Add new</FormSubmitButton>
        </NewToDoForm>

        <ToDoContainer>
          <SubHeading>Completed</SubHeading>
          <ToDoList>
            {renderCompleted()}
          </ToDoList>
        </ToDoContainer>
    </Container>
}
export default ToDo;

const Container = styled.div`
  width: 90% auto;
  margin: 0 auto;
  max-width: 1000px;
  padding: 50px 10%;
  border-left: 2px solid #f5f5f5;
  border-right: 2px solid #f5f5f5;
  min-height: 100vh;
`;
const Heading = styled.h1`
  font-size: 52px;
  font-wight: bold;
  text-align: center;
  margin-bottom: 40px;

`;
const ToDoContainer = styled.div`

`;
const SubHeading = styled.h3`
  font-size: 36px;
  color: #050241;
`;
const ToDoList = styled.ul`
  
`;
const ListItems = styled.li`
  display:flex;
  align-items: center;
  justify-content : space-between;
  margin-bottom: 20px;
`;
const LeftContainer = styled.div`
  display: flex;
  align-items: center;

`;
const CheckContainer = styled.span`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 2px solid #050241;
  display: inline-block;
  margin-right: 15px;
  cursor: pointer;
`;
const ItemContent = styled.span`
  cursor: pointer;
  font-size: 28px;
`;
const ItemRightContainer = styled.div`

`;
const ActionButton = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  margin-right: 20px;
  ouline: none;
  &:last-child {
    margin-right: 0;

  }
`;
const ButtonImage = styled.img``;
const NewToDoForm = styled.form`
  display: flex;
  margin-left: 40px;
  margin-top: 30px;
  position: relative;
  &::before {
    content: "";
    background-image: url(${require("./assets/plus.svg").default});
    position: absolute;
    width: 16px;
    height: 16px;
    display: block;
    left: 10px;
    top: 0;
    bottom: 0;
    margin: auto 0;
    z-index:2;
  }
`;
const FormInput = styled.input`
  display: block;
  width: 100%;
  outline: none;
  border: 1px solid #c6c6c6;
  border-right: none;
  padding: 0 10px 0 35px;
  font-size: 22px;
  // padding: 10px 150px 10px 10px;
`;
const FormSubmitButton = styled.button`
  padding: 15px 25px;
  white-space: nowrap;
  border: none;
  background: #050241;
  color: #fff;
  cursor: pointer;
  border-radius: 6px;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
`;

const CheckContainerCompleted = styled(CheckContainer)`
  display: flex;
  align-items: center;
  justify-content: center;
  border-color: #06c6c6;
`;
const ItemContentCompleted = styled(ItemContent)`
  color: #06c6c6;
`;
const TickImage = styled.img``;





