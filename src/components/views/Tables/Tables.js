import { useSelector } from 'react-redux';
import { getTables } from '../../../redux/tablesRedux';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';


const Tables = () => {
  const tables = useSelector(getTables);
  const navigate = useNavigate();

  return (
    <ListGroup variant="flush" className="mt-4">
      {tables.map((table) => (
        <ListGroup.Item key={table.id}>
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center mt-3">
              <h3>Table {table.id}</h3>
              <h5 className="mx-3"><b>Status:</b> {table.status}</h5>
            </div>
            <Button variant="dark" onClick={() => navigate(`/table/${table.id}`)}>Read More</Button>
          </div>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default Tables;
