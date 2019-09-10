import React from 'react';

import AddTodo from './Containers/AddTodo/AddTodo';
import VisibleTodoList from './Containers/VisibleTodoList/VisibleTodoList';
import Footer from './Components/Footer/Footer';

const App = () => (
    <div className="App">
        <p style={{ textAlign: 'center' }}>Exercitando Redux</p>
        <div>
            <AddTodo />
            <VisibleTodoList />
            <Footer />
        </div>
    </div>
);

export default App;
