// Contact page enquiry forms. Field `name`s must match what public/contact_form.php reads.

const half = 'col-md-6';
const full = 'col-md-12';

export const contactForms = [
  {
    id: 'sales',
    label: 'Sales Enquiry',
    fields: [
      { name: 'firstname', label: 'First Name', placeholder: 'First name', col: half },
      { name: 'lastname', label: 'Last Name', placeholder: 'Last name', col: half },
      { name: 'email', label: 'Email', type: 'email', placeholder: 'Email *', required: true, col: half },
      { name: 'phone', label: 'Phone', type: 'tel', placeholder: 'Phone *', required: true, col: half },
      { name: 'companyname', label: 'Company Name', required: true, col: half },
      { name: 'roleinthecompany', label: 'Role in the Company', col: half },
      { name: 'companywebsite', label: 'Company Website', type: 'url', col: full },
      { name: 'locationoraddress', label: 'Location or Address', col: full },
      { name: 'message', label: 'Message', type: 'textarea', placeholder: 'Message *', required: true, col: full },
    ],
  },
  {
    id: 'general',
    label: 'General Enquiry',
    fields: [
      { name: 'fname', label: 'First name', required: true },
      { name: 'position', label: 'Position', required: true },
      { name: 'cname', label: 'Company name', required: true },
      { name: 'mail', label: 'Email', type: 'email', required: true },
      {
        name: 'department',
        label: 'Department',
        type: 'select',
        required: true,
        options: [
          'Advertising Related',
          'Education',
          'Government/Military/Public Service',
          'Hospitality/Recreation',
          'ICT/IT Related',
          'Marketing & PR',
          'Media/Publishing',
          'Retail',
        ],
      },
      { name: 'location', label: 'Location or Address' },
      { name: 'number', label: 'Phone', type: 'tel' },
      { name: 'description', label: 'Description', type: 'textarea' },
    ],
  },
  {
    id: 'voice',
    label: 'Voice it Form',
    fields: [
      {
        name: 'relationwithacs',
        label: 'Relation with ACS',
        type: 'select',
        required: true,
        options: ['Business Partner of ACS', 'Not a Business Partner of ACS'],
      },
      {
        name: 'typeofsubmission',
        label: 'Type of submission',
        type: 'select',
        required: true,
        options: ['Complaint', 'Appreciation', 'Feedback/Suggestion'],
      },
      { name: 'company-name', label: 'Company name', required: true },
      { name: 'fullname', label: 'Full name', required: true },
      {
        name: 'jobtitle',
        label: 'Job title',
        type: 'select',
        required: true,
        options: ['CEO', 'Director', 'Executive Officer', 'Executive Director', 'Manager', 'Senior Manager', 'Other'],
      },
      { name: 'call', label: 'Phone', type: 'tel', col: half },
      { name: 'Email', label: 'Email', type: 'email', col: half },
      { name: 'description', label: 'Description', type: 'textarea', required: true },
      { name: 'file-upload', label: 'File upload', type: 'file' },
    ],
  },
];
