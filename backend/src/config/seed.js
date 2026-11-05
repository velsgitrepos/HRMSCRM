const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });
const { sequelize, Admin, Team, Testimonial, Career } = require('../models');

const seedDatabase = async () => {
  try {
    console.log(`Connecting to MySQL database for seeding: ${process.env.DB_NAME || 'talent_carpet'}`);
    await sequelize.authenticate();
    console.log('Connected to MySQL server.');

    // Sync all tables (resets tables)
    await sequelize.sync({ force: true });
    console.log('Cleared existing tables and recreated schemas...');

    // 1. Create Default Admin
    const adminUsername = process.env.ADMIN_USERNAME || 'TCadmin';
    const adminPassword = process.env.ADMIN_PASSWORD || 'MubeenIrshad123';
    
    await Admin.create({
      username: adminUsername,
      password: adminPassword,
    });
    console.log(`Seeded admin user: Username -> "${adminUsername}", Password -> "${adminPassword}"`);

    // 2. Seed Team Members
    const teamMembers = [
    /*  {
        name: 'Sarah Jenkins',
        designation: 'Founder & Managing Director',
        experience: '15+ Years',
        linkedinUrl: 'https://linkedin.com/in/sarah-jenkins-talentcarpet',
        whatsappNumber: '+91 96770 70837',
        imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
      },
      {
        name: 'David Chen',
        designation: 'Head of IT Recruitment',
        experience: '10 Years',
        linkedinUrl: 'https://linkedin.com/in/david-chen-talentcarpet',
        whatsappNumber: '+91 96770 70837',
        imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
      },
      {
        name: 'Priya Nair',
        designation: 'Senior HR Consultant',
        experience: '8 Years',
        linkedinUrl: 'https://linkedin.com/in/priya-nair-talentcarpet',
        whatsappNumber: '+91 96770 70837',
        imageUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400',
      },
      {
        name: 'Marcus Thorne',
        designation: 'Executive Search Lead',
        experience: '12 Years',
        linkedinUrl: 'https://linkedin.com/in/marcus-thorne-talentcarpet',
        whatsappNumber: '+91 96770 70837',
        imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400',
      },*/
    ];
    await Team.bulkCreate(teamMembers);
    console.log(`Seeded ${teamMembers.length} team members.`);

    // 3. Seed Testimonials
    const testimonials = [
      {
        clientName: 'Atla Tarun',
        company: 'Candidate',
        type: 'Candidate',
        rating: 5,
        review: 'I had a very good experience with Talent Carpet HR Solutions. The team was professional, supportive, and always responsive. They helped me to find the opportunity. I really appreciate their efforts and support.',
        clientImageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
      },
      {
        clientName: 'Harshal Rajput',
        company: 'Candidate',
        type: 'Candidate',
        rating: 4,
        review: 'I had a very good experience with Talent Carpet HR Solutions. The team was professional, supportive, and responsive throughout the recruitment process. They provided clear communication, timely updates, and helpful guidance at every stage. I truly appreciate their efforts in making the entire process smooth and well-coordinated. Thank you to the Talent Carpet HR Solutions team for your valuable support and assistance. I would definitely recommend Talent Carpet HR Solutions to candidates looking for professional and reliable recruitment support.',
        clientImageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
      },
      {
        clientName: 'Salman',
        company: 'Candidate',
        type: 'Candidate',
        rating: 5,
        review: 'I have a very good experience working with nivetha and talent carpet hr solutions they provided the job opportunities that aligned with my skillset and with their help and support i got the job and from there on i got the support from nivetha and she always have been in touch with me regarding any queries and time to time she made sure i did not have any problems in my current company and always follow up with me in case of any issue. I am very thankful for the support i received and wish good fortune for both nivetha and talent carpet hr solutions.',
        clientImageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
      },
      {
        clientName: 'Sathish Kumar',
        company: 'Candidate',
        type: 'Candidate',
        rating: 5,
        review: 'My experience with Talent Carpet was very good. The team was supportive and helped me throughout the process. Thank you for your guidance and support in my career journey! 😊🙏',
        clientImageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200',
      },
      {
        clientName: 'Revolite Infotech',
        company: 'Revolite Infotech',
        type: 'Employer',
        rating: 5,
        review: 'Thank you for reaching out. We’ve had a good experience working with Talent Carpet HR Solutions. Your team has been responsive, supportive, and quick to understand our requirements. The candidate quality and overall coordination have also been good.',
        clientImageUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200',
      },
    ];
    await Testimonial.bulkCreate(testimonials);
    console.log(`Seeded ${testimonials.length} client testimonials.`);

    // 4. Seed Careers
    const careers = [
      {
        jobTitle: 'SAP Master Data Management',
        location: 'Chennai',
        experience: '1+ Years',
        employmentType: 'Full-time',
        description: 'Role: SAP Master Data Management\nNotice Period: Immediate joiners\n\nSkills Set: MDM experience with SAP, Material Master, Vendor Master, Customer Master, data cleansing, data validation, standardization, codification, and master data governance.',
        applyEmail: 'mubeen@talentcarpet.com',
        status: 'Open',
      },
      {
        jobTitle: 'Asset Engineer',
        location: 'Chennai',
        experience: '3-5 Years',
        employmentType: 'Full-time',
        description: 'Role: Asset Engineer\nNotice Period: Immediate joiner\nType of Employment: Permanent\nEducation: BE (Mech) (ELEC) (INST)\n\nSkills:\n- Quality Check\n- Plant Maintenance\n- SAP PM Module\n- Data Cleansing',
        applyEmail: 'mubeen@talentcarpet.com',
        status: 'Open',
      },
      {
        jobTitle: 'Senior Data Modeller',
        location: 'Hyderabad / Bangalore / Chennai / Pune (Hybrid)',
        experience: '8-10 Years',
        employmentType: 'Contract',
        description: 'Role: Senior Data Modeller\nContract: 1 Year (Extendable)\nWork Timing: 11 AM - 8 PM IST\nLocation: Hyderabad, Bangalore, Chennai, Pune (Hybrid)\n\nKey Skills:\n- Data Modeling & Data Architecture\n- Insurance Domain Knowledge (Life & Annuities, Property & Casualty)\n- ERwin Data Modeler, ER/Studio, PowerDesigner, Enterprise Architect\n- Conceptual, Logical & Physical Data Modeling\n- OLTP & OLAP Data Modeling\n- Policy Administration & Claims Management\n- Underwriting, Billing & Reinsurance',
        applyEmail: 'mubeen@talentcarpet.com',
        status: 'Open',
      },
      {
        jobTitle: 'Senior Full Stack Developer',
        location: 'Mumbai / Hybrid',
        experience: '5+ Years',
        employmentType: 'Full-time',
        description: 'We are seeking a senior engineer proficient in React, Node.js, and SQL to join an international Fintech client team. You will lead development of critical payment gateway features, optimize databases, and mentor junior developers. Solid knowledge of AWS and Docker is required.',
        applyEmail: 'careers@talentcarpet.com',
        status: 'Open',
      },
      {
        jobTitle: 'Executive HR Consultant',
        location: 'Delhi NCR / On-site',
        experience: '4-8 Years',
        employmentType: 'Full-time',
        description: 'Seeking a talent partner to advise corporate clients on HR policy formulation, compliance frameworks, performance management systems, and employee engagement models. Excellent communication and presentation skills are critical.',
        applyEmail: 'consulting@talentcarpet.com',
        status: 'Open',
      },
      {
        jobTitle: 'Contract Recruitment Consultant (IT)',
        location: 'Remote (India)',
        experience: '2+ Years',
        employmentType: 'Contract',
        description: 'Join our team for a 6-month contract role (extendable) to source, screen, and schedule interviews for software engineering roles. Requires a strong recruiter who is comfortable with high volume sourcing and active LinkedIn utilization.',
        applyEmail: 'careers@talentcarpet.com',
        status: 'Open',
      },
      {
        jobTitle: 'VP of Product Engineering',
        location: 'Bangalore / On-site',
        experience: '12+ Years',
        employmentType: 'Full-time',
        description: 'Executive search position on behalf of a hyper-growth unicorn. You will manage multiple engineering director verticals, align tech architecture with business roadmaps, and scale the team from 80 to 200 developers. Exceptional technical leadership background is required.',
        applyEmail: 'executive@talentcarpet.com',
        status: 'Closed',
      },
    ];
    await Career.bulkCreate(careers);
    console.log(`Seeded ${careers.length} career postings.`);

    console.log('MySQL Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding MySQL database:', error);
    process.exit(1);
  }
};

seedDatabase();
