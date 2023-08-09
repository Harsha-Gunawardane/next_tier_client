const approvedData = [
  {
    id: 'S101',
    fullName: 'K.P. Nimal Perera',
    subject: 'Chemistry',
    class: '2023 A/L',
    status: 'Approved',
  },
  {
    id: 'S102',
    fullName: 'M.L. Sujith Liyanage',
    subject: 'Physics',
    class: '2024 A/L',
    status: 'Approved',
  },
  {
    id: 'S103',
    fullName: 'Chithra Kuruppu',
    subject: 'ICT',
    class: '2023 A/L',
    status: 'Approved',
  },
];

const pendingData = [
  {
    id: 'S1012',
    fullName: 'Lahiru Disanayaka',
    subject: 'Biology',
    class: '2024 A/L',
    status: 'Pending',
  },
  {
    id: 'S109',
    fullName: 'Ajith Manamperi',
    subject: 'Agriculture',
    class: '2023 A/L',
    status: 'Pending',
  },
  {
    id: 'S110',
    fullName: 'Ranga Gunarathna',
    subject: 'Physics',
    class: '2025 A/L',
    status: 'Pending',
  },
];

const rejectedData = [
  {
    id: 'S113',
    fullName: 'Prabath De Silva',
    subject: 'Accounting',
    class: '2023 A/L',
    status: 'Rejected',
    description: 'The Hall is not available at the requested time.',
  },
  {
    id: 'S115',
    fullName: 'Mahash Indula',
    subject: 'Physics',
    class: '2025 A/L',
    status: 'Rejected',
    description: 'The Hall is not available at the requested time.',
  },
  {
    id: 'S116',
    fullName: 'Damayanthi Disanayaka',
    subject: 'ICT',
    class: '2023 A/L',
    status: 'Rejected',
    description: 'The Hall is not available at the requested time.',
  },
];

const allRequestsData = [...approvedData, ...pendingData, ...rejectedData];

const viewTeacherData = [
  {
    id: 'S101',
    fullName: 'Nimal Perera',
    address: '23/A Araliya Road, Kandy',
    phoneNo: '0712345234',
    stream: 'Physical Science',
    subject: 'Chemistry',
    qualification: 'BSc.Sp, Msc, MBQ Qualified Teacher',
    profileImage: '/InstituteStaffAssets/avtr5.jpg',
  },
  {
    id: 'S102',
    fullName: 'Sujith Liyanage',
    address: '23/A Araliya Road, Kandy',
    phoneNo: '0712345234',
    stream: 'Physical Science',
    subject: 'Physics',
    qualification: 'BSc (Hons), MSc Kelaniya',
    profileImage: '/InstituteStaffAssets/avtr3.jpg',
  },
  {
    id: 'S103',
    fullName: 'Chithra Kuruppu',
    address: '23/A Araliya Road, Kandy',
    phoneNo: '0712345234',
    stream: 'Physical Science',
    subject: 'ICT',
    qualification: 'BSc.Sp, Msc, MBQ Qualified Teacher',
    profileImage: '/InstituteStaffAssets/avtr2.jpg',
  },
  {
    id: 'S103',
    fullName: 'Chithra Kuruppu',
    address: '23/A Araliya Road, Kandy',
    phoneNo: '0712345234',
    stream: 'Biologicalcal Science',
    subject: 'Biology',
    qualification: 'BSc.Sp, Msc, MBQ Qualified Teacher',
    profileImage: '/InstituteStaffAssets/avtr6.jpg',
  },
];

const classDetails = [ 
  {
    id: 'S101',
    subject: 'Physics',
    teacher: 'Sujith Liyanage',
    examYear: '2023 A/L',
    startTime: '09.00 AM',
    endTime: '11.00 AM',
    profileImage: '/InstituteStaffAssets/avtr6.jpg',
    details: 'Adnavced Mechanics module starting. Practicals under it also discused.',
  },
  {
    id: 'S102',
    subject: 'ICT',
    teacher: 'Ranga Gunarathna',
    examYear: '2024 A/L',
    startTime: '10.00 AM',
    endTime: '12.00 PM',
    profileImage: '/InstituteStaffAssets/avtr2.jpg',
    details: 'Computer Performance module starting.',
  },
  {
    id: 'S103',
    subject: 'Chemistry',
    teacher: 'Chandrani Dias',
    examYear: '2025 A/L',
    startTime: '21.30 PM',
    endTime: '23.30 PM',
    profileImage: '/InstituteStaffAssets/avtr3.jpg',
    details: 'Organic chemistry module starting.',
  },
  {
    id: 'S104',
    subject: 'Physics',
    teacher: 'Kapila Patabadige',
    examYear: '2023 A/L',
    startTime: '18.00 PM',
    endTime: '20.30 PM',
    profileImage: '/InstituteStaffAssets/avtr5.jpg',
    details: 'Adnavced Mechanics module starting. Practicals under it also discused.',
  },
  {
    id: 'S105',
    subject: 'Physics',
    teacher: 'Kapila Patabadige',
    examYear: '2023 A/L',
    startTime: '20.00 PM',
    endTime: '22.00 PM',
    profileImage: '/InstituteStaffAssets/avtr7.jpg',
    details: 'Adnavced Mechanics module starting. Practicals under it also discused.',
  },
  {
    id: 'S106',
    subject: 'Physics',
    teacher: 'Kapila Patabadige',
    examYear: '2023 A/L',
    startTime: '21.00 PM',
    endTime: '22.30 PM',
    profileImage: '/InstituteStaffAssets/avtr6.jpg',
    details: 'Adnavced Mechanics module starting. Practicals under it also discused.',
  },
  {
    id: 'S107',
    subject: 'Chemistry',
    teacher: 'Nimal Karunanayaka',
    examYear: '2024 A/L',
    startTime: '13.30 PM',
    endTime: '16.30 PM',
    profileImage: '/InstituteStaffAssets/avtr8.jpg',
    details: 'Adnavced Mechanics module starting. Practicals under it also discused.',
  },
];

const hallDetails = [ 
  {
    hallImage: '/InstituteStaffAssets/hall2.webp',
    hallNo: 'W001',
    capacity: '50',
    facilities: 'A/C Condition, Internet Access',
  },
  {
    hallImage: '/InstituteStaffAssets/hall3.webp',
    hallNo: 'W002',
    capacity: '100',
    facilities: 'A/C Condition',
  },
  {
    hallImage: '/InstituteStaffAssets/hall6.jpg',
    hallNo: 'W003',
    capacity: '350',
    facilities: 'A/C Condition, Audio-Visual Equipments',
  },
  {
    hallImage: '/InstituteStaffAssets/hall1.jpg',
    hallNo: 'W004',
    capacity: '50',
    facilities: 'A/C Condition',
  },
  {
    hallImage: '/InstituteStaffAssets/hall3.webp',
    hallNo: 'W002',
    capacity: '70',
    facilities: 'A/C Condition',
  },
  {
    hallImage: '/InstituteStaffAssets/hall4.jpg',
    hallNo: 'W002',
    capacity: '200',
    facilities: 'A/C Condition',
  },
  {
    hallImage: '/InstituteStaffAssets/hall7.jpg',
    hallNo: 'W005',
    capacity: '200',
    facilities: 'A/C Condition',
  },
  {
    hallImage: '/InstituteStaffAssets/hall8.jpg',
    hallNo: 'W006',
    capacity: '200',
    facilities: 'A/C Condition',
  },
];

const complaintRequests =[
  {
    "id": 1,
    "date": "12/07/2023",
    "profileName": "/InstituteStaffAssets/avtr1.png",
    "status" : "Pending",
    "name":"Anura",
    "email": "henryJ123@gmail.com",
    "action":"",
    "description":"The timetable for the Science class keeps changing without prior notice."
  },
  {
    "id": 4,
    "date": "18/07/2023",
    "profileName": "/InstituteStaffAssets/avtr4.jpg",
    "status" : "Pending",
    "name":"Henry",
    "email": "Henry@gmail.com",
    "action":"",
    "description":"The classroom environment during the Physics lectures is very noisy and distracting."
  },
  {
    "id": 8,
    "date": "18/07/2023",
    "profileName": "/InstituteStaffAssets/avtr5.jpg",
    "status" : "Pending",
    "name":"Kamal",
    "email": "Kamal45@gmail.com",
    "action":"",
    "description":"The classroom environment during the Physics lectures is very noisy and distracting."
  },
]
const data = {
  viewTeacher: viewTeacherData,
  allRequests: allRequestsData,
  approved: approvedData,
  pending: pendingData,
  rejected: rejectedData,
  classes: classDetails,
  halls: hallDetails,
  complain : complaintRequests,
 };

export default data;
