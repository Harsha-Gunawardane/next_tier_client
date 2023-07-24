const approvedData = [
  {
    id: 'S101',
    fullName: 'K.P. Nimal Perera',
    subject: 'Chemistry',
    class: '2023 A/L',
    status: 'approved',
  },
  {
    id: 'S102',
    fullName: 'M.L. Sujith Liyanage',
    subject: 'Physics',
    class: '2024 A/L',
    status: 'approved',
  },
  {
    id: 'S103',
    fullName: 'Chithra Kuruppu',
    subject: 'ICT',
    class: '2023 A/L',
    status: 'approved',
  },
];

const pendingData = [
  {
    id: 'S1012',
    fullName: 'Lahiru Disanayaka',
    subject: 'Biology',
    class: '2024 A/L',
    status: 'pending',
  },
  {
    id: 'S109',
    fullName: 'Ajith Manamperi',
    subject: 'Agriculture',
    class: '2023 A/L',
    status: 'pending',
  },
  {
    id: 'S110',
    fullName: 'Ranga Gunarathna',
    subject: 'Physics',
    class: '2025 A/L',
    status: 'pending',
  },
];

const rejectedData = [
  {
    id: 'S113',
    fullName: 'Prabath De Silva',
    subject: 'Accounting',
    class: '2023 A/L',
    status: 'rejected',
  },
  {
    id: 'S115',
    fullName: 'Mahash Indula',
    subject: 'Physics',
    class: '2025 A/L',
    status: 'rejected',
  },
  {
    id: 'S116',
    fullName: 'Damayanthi Disanayaka',
    subject: 'ICT',
    class: '2023 A/L',
    status: 'rejected',
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
    subject: 'Physics',
    teacher: 'Sujith Liyanage',
    examYear: '2023 A/L',
    time: '9AM - 12PM',
    details: 'Adnavced Mechanics module starting. Practicals under it also discused.',
  },
  {
    subject: 'ICT',
    teacher: 'Ranga Gunarathna',
    examYear: '2024 A/L',
    time: '10AM - 12PM',
    details: 'Computer Performance module starting.',
  },
  {
    subject: 'Chemistry',
    teacher: 'Chandrani Dias',
    examYear: '2025 A/L',
    time: '1PM - 3PM',
    details: 'Organic chemistry module starting.',
  },
  {
    subject: 'Physics',
    teacher: 'Kapila Patabadige',
    examYear: '2023 A/L',
    time: '9AM - 12PM',
    details: 'Adnavced Mechanics module starting. Practicals under it also discused.',
  },
  {
    subject: 'Physics',
    teacher: 'Kapila Patabadige',
    examYear: '2023 A/L',
    time: '9AM - 12PM',
    details: 'Adnavced Mechanics module starting. Practicals under it also discused.',
  },
  {
    subject: 'Physics',
    teacher: 'Kapila Patabadige',
    examYear: '2023 A/L',
    time: '9AM - 12PM',
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


const data = {
  viewTeacher: viewTeacherData,
  allRequests: allRequestsData,
  approved: approvedData,
  pending: pendingData,
  rejected: rejectedData,
  classes: classDetails,
  halls: hallDetails,
 };

export default data;
