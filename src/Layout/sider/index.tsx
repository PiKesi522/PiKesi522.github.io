import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import './index.css';

const NavigationBar = (): JSX.Element => {
    const navigate = useNavigate();
    const login = () => {
        navigate('./a');
    }
    return (
        <div className='navigation-bar'>
            <div onClick={login}>asd</div>
        </div>
    )
}

export default NavigationBar;