// /* eslint-disable react/prop-types */
// import React from 'react'
// import { FaSpaceShuttle, FaSun, FaRegPaperPlane } from 'react-icons/fa';
// import moment from 'moment';

// export const TaskDate = ({setTaskDate, showTaskDate, setShowTaskDate}) => showTaskDate && (
//     <div>
//         <ul>
//             <li
//                 onClick={() => {
//                     setShowTaskDate(false);
//                     setTaskDate(moment().format('DD/MM/YYYY'));
//                 }}
//                 >
//                     <span>
//                         <FaSpaceShuttle />
//                         <span>Today</span>
//                     </span>
//             </li>
//             <li
//                 onClick={() => {
//                     setShowTaskDate(false);
//                     setTaskDate(moment()
//                         .add(1, 'day')
//                         .format('DD/MM/YYYY'));
//                 }}
//                 data-testid="task-date-tomorrow"
//                 >
//                     <span>
//                         <FaSun />
//                         <span>Tomorrow</span>
//                     </span>
//             </li>
//             <li
//                 onClick={() => {
//                     setShowTaskDate(false);
//                     setTaskDate(moment()
//                         .add(7, 'days')
//                         .format('DD/MM/YYYY'));
//                 }}
//                 data-testid="task-date-next-week"
//                 >
//                     <span>
//                         <FaRegPaperPlane />
//                         <span>Next Week</span>
//                     </span>
//             </li>
//         </ul>
//     </div>
// )