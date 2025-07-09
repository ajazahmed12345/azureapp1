import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';

function App() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false); // 👈 add loading flag

    const [input1, setInput1] = useState('');
    const [input2, setInput2] = useState('');
    const [input3, setInput3] = useState('');
    const [input4, setInput4] = useState('');

    const fetchData = async () => {
        const numInput1 = parseInt(input1, 10);
        if (isNaN(numInput1)) {
            alert('Please enter a valid number for Input 1');
            return;
        }

        setLoading(true);
        setData([]);
        await new Promise(resolve => setTimeout(resolve, 0));

        try {
            const response = await fetch(`/api/toh/${numInput1}/${input2}/${input3}/${input4}`);
            const result = await response.json();
            setData(result);
        } catch (error) {
            console.error('Error fetching data:', error);
            setData(['Error fetching data']);
        } finally {
            setLoading(false); // 👈 stop loading
        }
    };

    return (
        <div style={{ padding: '2rem' }}>
            <h1>My Custom UI</h1>

            <div style={{ marginBottom: '1rem' }}>
                <input
                    type="number"
                    placeholder="Input 1"
                    value={input1}
                    onChange={(e) => setInput1(e.target.value)}
                    style={{ marginRight: '0.5rem' }}
                />
                <input
                    type="text"
                    placeholder="Input 2"
                    value={input2}
                    onChange={(e) => setInput2(e.target.value)}
                    style={{ marginRight: '0.5rem' }}
                />
                <input
                    type="text"
                    placeholder="Input 3"
                    value={input3}
                    onChange={(e) => setInput3(e.target.value)}
                    style={{ marginRight: '0.5rem' }}
                />
                <input
                    type="text"
                    placeholder="Input 4"
                    value={input4}
                    onChange={(e) => setInput4(e.target.value)}
                />
            </div>

            <button onClick={fetchData}>Load Data</button>

            {/* Render loading or result */}
            <div style={{ marginTop: '1rem' }}>
                {!loading && data.length > 0 && (
                    <ul>
                        {data.map((item, index) => (
                            <li key={index}
                                style={{
                                padding: '10px',
                                marginBottom: '8px',
                                backgroundColor: '#f1f1f1',
                                color: 'black',
                                borderRadius: '8px',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                            }}
                            >
                                {item}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

export default App;



