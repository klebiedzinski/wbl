export const converter = (data, filename) => {
    const headers = Object.keys(data[0]).toString();

    const main = data.map(row => Object.values(row).toString());

    const csv = [headers, ...main].join('\n');
    
    download(csv, filename);
}

const download = (csv, filename) => {
    const blob = new Blob([csv], { type: 'application/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    a.download = `${filename}_${day}-${month}-${year}.csv`;
    a.href = url;
    a.style.display = 'none';
    document.body.appendChild(a);
    
    a.click();

    a.remove();
    window.URL.revokeObjectURL(url);
}
