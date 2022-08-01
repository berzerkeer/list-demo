import style from './App.module.css';
import ComponentExample from '@/components/componentExample';

function App() {
  return (
    <div className={style.hello}>
      <ComponentExample />
    </div>
  );
}

export default App;
