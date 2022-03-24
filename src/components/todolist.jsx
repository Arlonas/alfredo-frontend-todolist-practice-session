import { Card, CardBody, Button, CardText } from "reactstrap";

const ToDoList = ({ action, status, deletetodos, toggleStatus }) => {
  return (
    <Card className="my-2">
      <CardBody>
        <div className="d-flex justify-content-between">
          <div>
            <CardText>{action}</CardText>
          </div>
          <div className="d-flex align-items-center">
            {status ? (
              <Button
                className="mx-2"
                onClick={toggleStatus}
                color="success"
              >
                Done
              </Button>
            ) : (
              <Button
                className="mx-2"
                onClick={toggleStatus}
                color="warning"
              >
                On Going
              </Button>
            )}
            <Button onClick={deletetodos} className="mx-2" color="danger">
              Delete
            </Button>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default ToDoList;
