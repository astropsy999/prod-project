import React, {useState} from 'react';
import classes from './Counter.module.scss'

export const Counter = () => {
    const [count, setCount] = useState(0)

    const increment = ()=> {
        setCount(count+1)
    }
    const decrement = ()=> {
        setCount(count-1)
    }

    return (
        <div className={classes.btn}>
            <h1>{count}</h1>
            <button onClick={increment}>+</button>
            <button onClick={decrement}>-</button>
        </div>
    );
};

export default Counter;