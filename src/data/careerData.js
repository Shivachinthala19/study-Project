import { courses10th } from './courses10th';
import { exams10th } from './exams10th';
import { courses12th } from './courses12th';
import { exams12th } from './exams12th';

// Comprehensive dataset containing detailed information for each study stream and exam
export const careerData = {
    ...courses10th,
    ...exams10th,
    ...courses12th,
    ...exams12th
};

// Search Graph: Maps user input to the career keys above
export const courseGraph = [
    // =============== AFTER 10TH COURSES ===============
    { key: 'inter', label: 'Intermediate (11th & 12th)', type: 'course', afterKeywords: ['10th', 'ssc', 'matric', 'tenth', 'secondary'] },
    { key: 'polytechnic', label: 'Polytechnic Diploma', type: 'course', afterKeywords: ['10th', 'ssc', 'matric', 'poly'] },
    { key: 'iti', label: 'ITI', type: 'course', afterKeywords: ['10th', 'ssc', 'matric', 'iti'] },
    { key: 'diploma', label: 'Diploma Courses', type: 'course', afterKeywords: ['10th', 'ssc', 'matric'] },
    { key: 'toss', label: 'TOSS (Open School)', type: 'course', afterKeywords: ['10th', 'ssc', 'failed'] },
    { key: 'vocational', label: 'Vocational Courses', type: 'course', afterKeywords: ['10th', 'ssc', 'skills'] },
    { key: 'building-supervisor', label: 'Building Supervisor', type: 'course', afterKeywords: ['10th', 'technical'] },
    { key: 'mico-bosch', label: 'MICO Bosch Training', type: 'course', afterKeywords: ['10th', 'technical', 'industry'] },
    { key: 'digital-marketing-10th', label: 'Digital Marketing', type: 'course', afterKeywords: ['any', '10th', 'short', 'digital'] },
    { key: 'mlt-10th', label: 'MLT (Lab Tech)', type: 'course', afterKeywords: ['10th', 'science', 'medical'] },
    { key: 'ms-cit', label: 'MS-CIT', type: 'course', afterKeywords: ['10th', 'computer', 'skills'] },

    // =============== AFTER 10TH EXAMS ===============
    { key: 'rrb-clerk', label: 'RRB Clerk / Group D', type: 'exam', afterKeywords: ['10th', 'railway', 'job'] },
    { key: 'post-office-gds', label: 'Post Office GDS', type: 'exam', afterKeywords: ['10th', 'postal', 'job'] },
    { key: 'gd-constable', label: 'SSC GD Constable', type: 'exam', afterKeywords: ['10th', 'police', 'armed forces'] },
    { key: 'navy-mr', label: 'Navy MR', type: 'exam', afterKeywords: ['10th', 'navy', 'military'] },
    { key: 'ntse', label: 'NTSE Scholarship', type: 'exam', afterKeywords: ['10th', 'scholarship', 'science'] },
    { key: 'forest-guard', label: 'Forest Guard', type: 'exam', afterKeywords: ['10th', 'police', 'outdoors'] },

    // =============== AFTER 12TH COURSES ===============
    { key: 'mbbs', label: 'MBBS (Medical)', type: 'course', afterKeywords: ['12th', 'bipc', 'pcb', 'neet', 'medicine'] },
    { key: 'bams', label: 'BAMS (Ayurveda)', type: 'course', afterKeywords: ['12th', 'bipc', 'pcb', 'medicine'] },
    { key: 'bds', label: 'BDS (Dental)', type: 'course', afterKeywords: ['12th', 'bipc', 'pcb', 'teeth'] },
    { key: 'bvsc', label: 'BVSc (Veterinary)', type: 'course', afterKeywords: ['12th', 'bipc', 'animals'] },
    
    { key: 'btech-cs', label: 'B.Tech CSE/IT', type: 'course', afterKeywords: ['12th', 'pcm', 'mpc', 'computer', 'coding'] },
    { key: 'btech-mech', label: 'B.Tech Mechanical', type: 'course', afterKeywords: ['12th', 'pcm', 'mpc', 'machines'] },
    { key: 'btech-civil', label: 'B.Tech Civil', type: 'course', afterKeywords: ['12th', 'pcm', 'mpc', 'construction'] },
    { key: 'btech-biomed', label: 'B.Tech Biomedical', type: 'course', afterKeywords: ['12th', 'pcm', 'medical', 'tech'] },

    { key: 'bba', label: 'BBA (Management)', type: 'course', afterKeywords: ['12th', 'any', 'business', 'admin'] },
    { key: 'bcom-gen', label: 'B.Com (Accounts/Gen)', type: 'course', afterKeywords: ['12th', 'commerce', 'finance'] },
    { key: 'hotel-mgmt-12th', label: 'Hotel Management (BHM)', type: 'course', afterKeywords: ['12th', 'any', 'hospitality'] },
    { key: 'psychology-12th', label: 'Psychology (BA/BSc)', type: 'course', afterKeywords: ['12th', 'any', 'mind'] },
    { key: 'law-integrated', label: 'Integrated LLB (5 Year)', type: 'course', afterKeywords: ['12th', 'any', 'law', 'lawyer'] },

    // =============== AFTER 12TH EXAMS ===============
    { key: 'jee-main', label: 'JEE Main/Advanced', type: 'exam', afterKeywords: ['12th', 'pcm', 'engineering', 'iit'] },
    { key: 'bitsat', label: 'BITSAT', type: 'exam', afterKeywords: ['12th', 'pcm', 'engineering', 'bits'] },
    { key: 'neet-ug', label: 'NEET-UG', type: 'exam', afterKeywords: ['12th', 'bipc', 'medicine', 'neet'] },
    { key: 'nda', label: 'NDA & NA', type: 'exam', afterKeywords: ['12th', 'any', 'army', 'navy', 'airforce'] },
    { key: 'ssc-chsl', label: 'SSC CHSL', type: 'exam', afterKeywords: ['12th', 'any', 'govt', 'clerk'] },
    { key: 'clat', label: 'CLAT (Law)', type: 'exam', afterKeywords: ['12th', 'any', 'law', 'nlu'] },
    { key: 'rrb-ntpc-12th', label: 'RRB NTPC (Railway)', type: 'exam', afterKeywords: ['12th', 'any', 'railway', 'job'] }
];
