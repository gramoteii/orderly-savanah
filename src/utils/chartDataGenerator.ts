
// Helper function to generate random numbers for chart data
export const generateRandomValue = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Generate daily data for the last 14 days
export const generateDailyData = () => {
  const data = [];
  const today = new Date();
  
  for (let i = 13; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    
    data.push({
      name: `${date.getDate()}.${date.getMonth() + 1}`,
      value: generateRandomValue(20000, 150000)
    });
  }
  
  return data;
};

// Generate weekly data for the last 12 weeks
export const generateWeeklyData = () => {
  const data = [];
  const today = new Date();
  
  for (let i = 11; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - (i * 7));
    
    data.push({
      name: `W${Math.floor((date.getDate() + date.getDay()) / 7) + 1}`,
      value: generateRandomValue(150000, 750000)
    });
  }
  
  return data;
};

// Generate monthly data for the last 12 months
export const generateMonthlyData = () => {
  const data = [];
  const today = new Date();
  const months = ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'];
  
  for (let i = 11; i >= 0; i--) {
    const date = new Date(today);
    date.setMonth(today.getMonth() - i);
    
    data.push({
      name: months[date.getMonth()],
      value: generateRandomValue(500000, 3000000)
    });
  }
  
  return data;
};

// Generate quarterly data for the last 8 quarters
export const generateQuarterlyData = () => {
  const data = [];
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentQuarter = Math.floor(today.getMonth() / 3) + 1;
  
  for (let i = 7; i >= 0; i--) {
    const quarterOffset = i % 4;
    const yearOffset = Math.floor(i / 4);
    const quarter = currentQuarter - quarterOffset <= 0 
      ? 4 + (currentQuarter - quarterOffset) 
      : currentQuarter - quarterOffset;
    const year = quarter > currentQuarter 
      ? currentYear - 1 - yearOffset 
      : currentYear - yearOffset;
    
    data.push({
      name: `Q${quarter} ${year}`,
      value: generateRandomValue(1500000, 9000000)
    });
  }
  
  return data;
};

// Generate yearly data for the last 5 years
export const generateYearlyData = () => {
  const data = [];
  const today = new Date();
  const currentYear = today.getFullYear();
  
  for (let i = 4; i >= 0; i--) {
    const year = currentYear - i;
    
    data.push({
      name: `${year}`,
      value: generateRandomValue(6000000, 30000000)
    });
  }
  
  return data;
};
