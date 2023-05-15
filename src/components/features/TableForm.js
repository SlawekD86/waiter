import React, { useEffect, useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getTableById, editTable } from '../../redux/tablesRedux';
import { getStatusList } from '../../redux/tableStatusRedux';

const TableForm = () => {
  const { id } = useParams();
  const tableData = useSelector((state) => getTableById(state, id));
  const tableStatus = useSelector(getStatusList);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [status, setStatus] = useState(tableData?.status);
  const [peopleAmount, setPeopleAmount] = useState(tableData?.peopleAmount);
  const [maxPeopleAmount, setMaxPeopleAmount] = useState(tableData?.maxPeopleAmount);
  const [bill, setBill] = useState(tableData?.bill);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedTable = {
      id,
      status,
      peopleAmount,
      maxPeopleAmount,
      bill,
    };
    dispatch(editTable(updatedTable));
    navigate('/');
  };

  useEffect(() => {
    if (tableData) {
      setStatus(tableData.status);
      setPeopleAmount(tableData.peopleAmount);
      setMaxPeopleAmount(tableData.maxPeopleAmount);
      setBill(tableData.bill);
    }
  }, [tableData]);

  return (
    <Container>
      <h3>Table {id}</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="d-flex align-items-center mt-4">
          <Form.Label>
            <strong>Status:</strong>
          </Form.Label>
          <Form.Select
            as="select"
            className="mx-4"
            style={{ width: '130px' }}
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            {tableStatus.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="d-flex align-items-center mt-4">
          <Form.Label className="me-4">
            <strong>People: </strong>
          </Form.Label>
          <Form.Control
            style={{ width: '40px' }}
            value={peopleAmount}
            onChange={(e) => setPeopleAmount(e.target.value)}
          />
          <span className="mx-2">/</span>
          <Form.Control
            style={{ width: '40px' }}
            value={maxPeopleAmount}
            onChange={(e) => setMaxPeopleAmount(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="d-flex align-items-center mt-4">
          <Form.Label>
            <strong>Bill: </strong>
            <span className="ms-4 me-2">$</span>
          </Form.Label>
          <Form.Control
            style={{ width: '56px' }}
            value={bill}
            onChange={(e) => setBill(e.target.value)}
          />
        </Form.Group>
        <Button type="submit" className="mt-3 btn-dark">
          Update
        </Button>
      </Form>
    </Container>
  );
};

export default TableForm;
