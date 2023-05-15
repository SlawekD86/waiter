import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/views/NavBar/NavBar';
import Footer from './components/views/Footer/Footer';
import Home from './components/pages/Home/Home';
import Table from './components/pages/Table/Table';
import { fetchTables } from './redux/tablesRedux';
import { fetchStatus } from './redux/tableStatusRedux';
import { useDispatch } from 'react-redux';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTables());
    dispatch(fetchStatus());
  }, [dispatch]);

  return (
    <Container>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/table/:id" element={<Table />} />
      </Routes>
      <Footer />
    </Container>
  );
};

export default App;
