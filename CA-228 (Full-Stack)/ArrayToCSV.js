function arrayToCSV(data) {
    return data.map(row =>
      row.map(item => {
        // Wrap item in quotes if it contains comma or quotes
        if (typeof item === 'string' && (item.includes(',') || item.includes('"'))) {
          return `"${item.replace(/"/g, '""')}"`; // Escape double quotes
        }
        return item;
      }).join(',')
    ).join('\n');
  }
  
  
  const array2D = [
    ['Name', 'Age', 'City'],
    ['Chandan', 18, 'Basti'],
    ['Aman', 25, 'Lucknow'],
    ['Ashish', 22, 'Ayodhya']
  ];
  
  const csvString = arrayToCSV(array2D);
  console.log(csvString);
  