/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [time, setTime] = useState<number>(-1);
  const [value, setValue] = useState("");

  const handleSubmit = () => {
    setTime(Number(value) * 60);
    setValue('');
  }

  const handleRestart = () => {
    setTime(-1);
  }

  useEffect(() => {
    const startTime = setInterval(() => {
      if (time >= 1) {
        setTime((prev) => prev - 1);
      } else {
        clearInterval(startTime);
      }
    }, 1000);

    return () => clearInterval(startTime);
  }, [time]);

  const renderLayout = () => {
    if (time === -1) {
      return (
        <div className="relative h-[50px] w-[500px] flex justify-center items-center">
          <input value={value} onChange={(e) => setValue(Number(e.target.value) > 10000 ? "10000" : e.target.value)} max={10000} placeholder="Nhập số phút" className="w-full text-[black] h-full text-[20px] pl-[16px] rounded-[8px] pr-[50px]" type="number" />
          <span onClick={handleSubmit} className="absolute right-[12px] top-1/2 -translate-y-1/2 text-green-400 text-[12px] cursor-pointer">Xác nhận</span>
        </div>
      )
    }

    if (time === 0) {
      return (
        <div className="flex justify-center items-center">
          <span>Done!</span>
          <span onClick={handleRestart} className=" text-green-400 text-[12px] cursor-pointer">Restart</span>
        </div>
      )
      
    }

    return (
      <>
        <span className="w-[260px] inline-block">{`${`0${Math.floor(hour)}`.slice(-2)}`}</span>
        <span>:</span>
        <span className="w-[260px] inline-block">{`${`0${Math.floor(minute)}`.slice(-2)}`}</span>
        <span>:</span>
        <span className="w-[260px] inline-block">{`${`0${second}`.slice(-2)}`}</span>
      </>
    )
  }

  const hour = time / 3600;
  const minute = (time - (Math.floor(hour) * 3600)) / 60;
  const second = time - Math.floor(hour) * 3600 - Math.floor(minute) * 60;

  return (
    <div className="flex justify-center items-center bg-[black] w-screen h-screen text-[white] gap-3 text-[200px] font-[700]">
      {renderLayout()}
    </div>
  )
}

export default App
