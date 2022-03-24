import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "reactstrap";
import { axiosInstance } from "./configs/api";
import ToDoList from "./components/todolist";
import {
  FormControl,
  FormLabel,
  Input,
  useToast,
  Spinner,
  Stack,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const toast = useToast();

  const fetchTodoList = () => {
    setIsLoading(true);

    setTimeout(async () => {
      try {
        const res = await axiosInstance.get("/todos");

        setTodoList(res.data.result);
      } catch (err) {
        toast({
          title: "Failed to fetch data",
          description: err.message,
          status: "error",
          duration: 4000,
          isClosable: true,
          position: "top",
        });
      }
      setIsLoading(false);
    }, 2000);
  };

  const renderTodoList = () => {
    return todoList.map((val) => {
      return (
        <ToDoList date={val.date} action={val.action} status={val.status} deletetodos={() => deletetodos(val.id)} />
      );
    });
  };

  useEffect(() => {
    fetchTodoList();
  }, []);

  const [inputValues, setInputValues] = useState({
    todoInput: "",
  });

  const inputHandler = (event) => {
    const { value } = event.target;

    setInputValues({
      ...inputValues,
      todoInput: value,
    });
  };

  const addTodos = async () => {
    const newToDoData = {
      action: inputValues.todoInput,
      status: "Ongoing",
    };
    try {
      const res = await axiosInstance.post("/todos", newToDoData);
    } catch (err) {
      toast({
        title: "Failed to add data",
        description: err.message,
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top",
      });
    }
    fetchTodoList();
  };

  const deletetodos = async (id) => {
    try {
      const res = await axiosInstance.delete(`/todos/:${id}`)
    } catch (err) {
      toast({
        title: "failed to delete todos",
        description: err.message,
        status:"error",
        duration: 4000,
        isClosable: true,
        position: "top"
      })
    }
    fetchTodoList()
  }

  const toggleTodoStatus = async (id) => {
    const dataToFind = todoList.find((val) => {
      return val.id === id;
    });
    try {
      const res = await axiosInstance.patch(`/todos/:${id}`)
    } catch (err) {
      toast({
        title: "Failed to add data",
        description: err.message,
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top",
      });
    }
  };

  return (
    <>
      <div className="container">
        <div className="row my-3">
          <div className="offset-3 col-5">
            <FormControl variant="floating" id="input-your-todos" isRequired>
              <Input onChange={inputHandler} name="todoInput" placeholder=" " />
              <FormLabel>Input Your Todos</FormLabel>
            </FormControl>
          </div>
          <div className="col-2">
            <Button  onClick={addTodos} color="success">Add Todo</Button>
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-md-10 offset-md-1 col-lg-6 offset-lg-3">
            <Stack alignItems={"center"}>
              {isLoading ? <Spinner /> : null}
            </Stack>
            {renderTodoList()}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
