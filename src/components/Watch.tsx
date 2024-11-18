import React, { useEffect, useState } from 'react';
import { TForm } from './types';

type Props = {
  data: TForm;
  onDelete: (watch: TForm) => void;
};

const Watch: React.FC<Props> = ({ data, onDelete }) => {
  const [hh, setHh] = useState(0);
  const [mm, setMm] = useState(0);
  const [ss, setSs] = useState(0);

  const { name, timezone } = data;

  useEffect(() => {
    const initialTime = new Date().toLocaleString('en-US', { timeZone: timezone });
    const initialHours = new Date(initialTime).getHours();
    const initialMinutes = new Date(initialTime).getMinutes();
    const initialSeconds = new Date(initialTime).getSeconds();

    setHh(initialHours * 30);
    setMm(initialMinutes * 6);
    setSs(initialSeconds * 6);

    const interval = setInterval(() => {
      setSs(prevSs => {
        const newSs = prevSs + 6;
        if (newSs === 360) {
          setMm(prevMm => {
            const newMm = prevMm + 6;
            if (newMm === 360) {
              setHh(prevHh => prevHh + 30);
              return 0;
            }
            return newMm;
          });
          return 0;
        }
        return newSs;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timezone]);

  return (
    <div className='watch'>
      <button className='delete_btn' onClick={() => onDelete(data)}>X</button>
      <div className='name'>{name}</div>
      <div className="clock">
        <div className="hour">
          <div
            className="hr"
            id="hr"
            style={{ transform: `rotate(${hh + (mm / 12)}deg)` }}
          />
        </div>
        <div className="min">
          <div
            className="mn"
            id="mn"
            style={{ transform: `rotate(${mm}deg)` }}
          />
        </div>
        <div className="sec">
          <div
            className="sc"
            id="sc"
            style={{ transform: `rotate(${ss}deg)` }}
          />
        </div>
      </div>
    </div>
  );
};

export default Watch;
