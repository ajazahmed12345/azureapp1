import './App.css';
import React, { useState } from 'react';

function App() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const [input1, setInput1] = useState('');
    const [input2, setInput2] = useState('');
    const [input3, setInput3] = useState('');
    const [input4, setInput4] = useState('');

    const [towers, setTowers] = useState({
        A: [],
        B: [],
        C: []
    });

    const [showCongrats, setShowCongrats] = useState(false);

    const initializeTowers = (diskCount, source) => {
        const disks = Array.from({ length: diskCount }, (_, i) => diskCount - i);
        setTowers({
            A: source === 'A' ? disks : [],
            B: source === 'B' ? disks : [],
            C: source === 'C' ? disks : []
        });
    };

    const moveDisk = (from, to) => {
        setTowers(prev => {
            const fromStack = [...prev[from]];
            const toStack = [...prev[to]];
            if (fromStack.length === 0) return prev;

            const disk = fromStack.pop();
            toStack.push(disk);

            return {
                ...prev,
                [from]: fromStack,
                [to]: toStack
            };
        });
    };

    const animateMoves = async (moves) => {
        setShowCongrats(false);
        for (let move of moves) {
            await new Promise(resolve => setTimeout(resolve, 1500));
            const match = move.match(/Move disk \d+ from: (\w) to: (\w)/);
            if (!match) continue;
            const [, from, to] = match;
            moveDisk(from, to);
        }
        setShowCongrats(true);
    };

    const fetchData = async () => {
        const numDisks = parseInt(input1, 10);
        if (isNaN(numDisks)) {
            alert('Please enter a valid number of disks');
            return;
        }

        setLoading(true);
        setData([]);
        initializeTowers(numDisks, input2.toUpperCase());

        try {
            const response = await fetch(`/api/toh/${numDisks}/${input2}/${input3}/${input4}`);
            const result = await response.json();
            setData(result);
            animateMoves(result);
        } catch (error) {
            console.error('Error fetching data:', error);
            setData(['Error fetching data']);
        } finally {
            setLoading(false);
        }
    };

    const renderTower = (label) => (
        <div className="tower">
            <div className="tower-label">{label}</div>
            <div className="peg">
                {towers[label].slice().map((disk, i) => (
                    <div key={i} className={`disk disk-${disk}`}>
                        {disk}
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <div style={{ padding: '2rem' }}>
            <h1>Tower of Hanoi Animated</h1>

            <div style={{ marginBottom: '1rem' }}>
                <input
                    type="number"
                    placeholder="No of Disks"
                    value={input1}
                    onChange={(e) => setInput1(e.target.value)}
                    style={{ marginRight: '0.5rem' }}
                />
                <input
                    type="text"
                    placeholder="Source (A/B/C)"
                    value={input2}
                    onChange={(e) => setInput2(e.target.value.toUpperCase())}
                    style={{ marginRight: '0.5rem' }}
                />
                <input
                    type="text"
                    placeholder="Destination"
                    value={input3}
                    onChange={(e) => setInput3(e.target.value.toUpperCase())}
                    style={{ marginRight: '0.5rem' }}
                />
                <input
                    type="text"
                    placeholder="Auxiliary"
                    value={input4}
                    onChange={(e) => setInput4(e.target.value.toUpperCase())}
                />
            </div>

            <button onClick={fetchData} disabled={loading}>
                {loading ? 'Solving...' : 'Start Animation'}
            </button>

            <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '2rem' }}>
                {renderTower('A')}
                {renderTower('B')}
                {renderTower('C')}
            </div>

            {showCongrats && (
                <div className="congrats-message">
                    🎉 Congratulations! 🎉 TOH solved.
                </div>
            )}


            <div style={{ marginTop: '2rem' }}>
                {data.map((item, index) => (
                    <div
                        key={index}
                        style={{
                            padding: '10px',
                            marginBottom: '8px',
                            backgroundColor: '#f1f1f1',
                            color: 'darkblue',
                            borderRadius: '8px',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                        }}
                    >
                        {item}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;
