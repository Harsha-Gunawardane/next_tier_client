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
      subject: 'Chemistry',
      email: 'nimal@gmail.com',
      profileImage: '/InstituteStaffAssets/avtr5.jpg',
    },
    {
      id: 'S102',
      fullName: 'Sujith Liyanage',
      subject: 'Physics',
      email: 'sujithliyanage@gmail.com',
      profileImage: '/InstituteStaffAssets/avtr3.jpg',
    },
    {
      id: 'S103',
      fullName: 'Chithra Kuruppu',
      subject: 'ICT',
      email: 'chithra94@gmail.com',
      profileImage: '/InstituteStaffAssets/avtr2.jpg',
    },
  ];
  
  const classDetails = [ 
    {
      subject: 'Physics',
      teacher: 'Sujith Liyanage',
      examYear: '2023 A/L',
      time: '9AM - 12PM',
    },
    {
      subject: 'ICT',
      teacher: 'Ranga Gunarathna',
      examYear: '2024 A/L',
      time: '10AM - 12PM',
    },
    {
      subject: 'Chemistry',
      teacher: 'Chandrani Dias',
      examYear: '2025 A/L',
      time: '1PM - 3PM',
    },
    {
      subject: 'Physics',
      teacher: 'Kapila Patabadige',
      examYear: '2023 A/L',
      time: '9AM - 12PM',
    },
  ];

  const data = {
    viewTeacher: viewTeacherData,
    allRequests: allRequestsData,
    approved: approvedData,
    pending: pendingData,
    rejected: rejectedData,
    classes: classDetails,
    
  };
  
  export default data;
  