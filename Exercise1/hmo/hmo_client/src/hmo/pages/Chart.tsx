
import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import { getCovid19 as getCovid19Api } from '../services/covid19Details.service';
import NumberOfNoVaccinated from './numberOfVaccinated/numberOfNoVaccinated';

const ChartComponent = () => {
  const [numSicks, setNumSicks] = useState(Array(31).fill(0));
  const [daysInMonth, setDaysInMonth] = useState<number[]>([]);

  const updateNumSicks = (startDay: number, endDay: number) => {
    setNumSicks(prevNumSicks => {
      const updatedNumSicks = [...prevNumSicks];
      for (let i = startDay; i < endDay; i++) {
        updatedNumSicks[i - 1]++;
      }
      return updatedNumSicks;
    });
  };

  useEffect(() => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const prevMonth = (month === 0) ? 11 : month - 1; // אם החודש הנוכחי הוא ינואר, החודש הקודם הוא דצמבר
    const daysInPrevMonth = new Date(year, prevMonth + 1, 0).getDate(); // מספר הימים בחודש הקודם
console.log(new Date(year, month, 0).getDate());
console.log(new Date(year, month, 0).getMonth());

    const daysArray = Array.from({ length: daysInPrevMonth }, (_, i) => i + 1);
    setDaysInMonth(daysArray);

    console.log(prevMonth)

    async function fetchData() {
      try {
        const res = await getCovid19Api();
        res.forEach((element: { recoveryDate: string | number | Date; positiveTestDate: string | number | Date; }) => {
          if (element.positiveTestDate) {
            const dateStartSick = new Date(element.positiveTestDate);
            const dateEndSick = new Date(element.recoveryDate);
            if(month!=0){
            //אם היהחולה לפני ובחודש שעבר החלים
            if (dateStartSick instanceof Date&&(dateStartSick.getFullYear()===year ||dateStartSick.getFullYear()+1===year) && dateEndSick instanceof Date && dateStartSick.getMonth() !== prevMonth && dateEndSick.getMonth() === prevMonth) {
              updateNumSicks(0, dateEndSick.getDate());
            } else {// אם התחיל להיות חולה בחודש שעבר ולא סיים או סיים
              if (dateStartSick instanceof Date &&(dateStartSick.getFullYear()===year||dateStartSick.getFullYear()+1===year )&& dateEndSick instanceof Date && dateStartSick.getMonth() === prevMonth && dateEndSick.getMonth() === prevMonth) {
                updateNumSicks(dateStartSick.getDate(), dateEndSick.getDate());
              } else {//אם היה חולה בחודש שעבר והחלים בחודש שעבר
                if (dateStartSick instanceof Date&&dateStartSick.getFullYear()===year && !(dateEndSick instanceof Date) && dateStartSick.getMonth() === prevMonth || dateStartSick instanceof Date && dateEndSick instanceof Date && dateStartSick.getMonth() === prevMonth) {
                  updateNumSicks(dateStartSick.getDate(),new Date(year, month, 0).getDate());
                }
                else{
                  if (dateStartSick instanceof Date&&dateStartSick.getFullYear()+1===year&& !(dateEndSick instanceof Date) && dateStartSick.getMonth() === prevMonth || dateStartSick instanceof Date && dateEndSick instanceof Date && dateStartSick.getMonth() === prevMonth) {
                    updateNumSicks(dateStartSick.getDate(),new Date(year+1, 0, 0).getDate());
                  }
                }
              }
            }
          }
        }
        });
      } catch (error) {
        console.error('Error fetching Covid-19 details:', error);
      }
    }
    fetchData();
  }, []);

  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstanceRef = useRef<Chart>();

  useEffect(() => {
    const ctx = chartRef.current?.getContext('2d');

    if (ctx) {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }

      chartInstanceRef.current = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: daysInMonth,
          datasets: [{
            label: 'מספר החולים הפעילים בכל יום בחודש האחרון',
            data: numSicks,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  }, [numSicks, daysInMonth]); 

  return (
    <div style={{width: '80%', margin: 'auto'}}>
      <canvas ref={chartRef}></canvas>
      <h3 style={{"textAlign":"center"}}><NumberOfNoVaccinated/></h3>
    </div>
  );
};

export default ChartComponent;




