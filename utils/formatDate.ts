export const formatDate = (ms: number) => {
    const date = new Date(ms);
    
    const day = date.getDate().toString().padStart(2, '0');
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month = monthNames[date.getMonth()];
    
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    
    hours %= 12;
    hours = hours || 12;
    const h = hours.toString().padStart(2, '0');

    return `${day} ${month}, ${h}:${minutes}${ampm}`;
  };