
// type PropsType = {
//     [x: string]: any;
//     datetime: string;
// }

// export const formatDate = ({datetime}: PropsType) => {
//     const date = Date.parse(datetime);
    
//     const year = new Intl.DateTimeFormat('vi', { year: 'numeric' }).format(date);
//     const month = new Intl.DateTimeFormat('vi', { month: 'long' }).format(date);
//     const day = new Intl.DateTimeFormat('vi', { day: '2-digit' }).format(date);
//     const weekday = new Intl.DateTimeFormat('vi', { weekday: 'long' }).format(date);
//     const hours = date.getHours();
//     const minutes = date.getMinutes();

//     const result = `${hours} giờ ${minutes} phút - ${weekday}, Ngày ${day}, ${month}, ${year} `;
//     return (
//         <>
//             <span className="font-medium text-16 text-gray-700">{result}</span>
//         </>
//     )
// }