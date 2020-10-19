import React from 'react';
import { Button } from 'react-bootstrap';

const Heading = () => {
    return (
        <div className="container jumbotron">
            <h1>Full Stack Blogging</h1>
            <h2>Powered by Node and MongoDB</h2>
            <h3>Frontend revamped with React</h3>
            <Button className="mt-5">Get Started</Button>      
        </div>
    );
};

export default Heading;