import Main from './Layout/main/index';
import NavigationBar from './Layout/sider';
import './App.css';

const App = (): JSX.Element => {
    return (
        <div className='app'>
            <NavigationBar />
            <Main />
        </div>
    )
}

export default App;