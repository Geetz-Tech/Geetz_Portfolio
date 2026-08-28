export type Project={name:string;category:string;displayCategory?:string;description:string;private?:boolean;featured?:boolean;needsReview?:boolean;accent:string;monogram:string;role?:string;technologies:string[];status:string;website?:string;industry?:string;focus?:string[];visual?:'network'|'signal'|'modules'|'ledger'|'routes'|'campus'|'growth'|'legal';logo?:{src:string;width:number;height:number}};

export const profile={name:'Geetha K S',brand:'GEETZ',role:'Senior AI Product Engineer',positioning:'Python Full-Stack Developer · AI Product Builder',company:'Kripra’s Digital AI Pvt. Ltd.',companyRole:'Founder',email:'geethasritnj@gmail.com',linkedin:'https://www.linkedin.com/in/geethaks20',github:'https://github.com/Geetz_tech',whatsapp:'https://wa.me/919361574733?text=Hi%20Geetha%2C%20I%20came%20across%20your%20portfolio%20and%20would%20like%20to%20connect%20regarding%20a%20project%20or%20collaboration.',companyWebsite:'https://kriprasdigitalai.com/en',resume:''};

export type Expertise={number:string;title:string;text:string;tags:string[];icon:'stack'|'spark'|'grid'|'layers'|'blueprint'|'loop';primary?:boolean};
export const expertise:Expertise[]=[
  {number:'01',title:'Full-Stack Engineering',text:'Python/FastAPI backends integrated with React frontends, built for production reliability.',tags:['Python','FastAPI','React','PostgreSQL'],icon:'stack',primary:true},
  {number:'02',title:'AI / LLM Integration',text:'NLP-based processing and LLM/GenAI workflows — prompt engineering, inference, orchestration — built into working products.',tags:['NLP','GenAI','Prompt Engineering','Orchestration'],icon:'spark',primary:true},
  {number:'03',title:'Enterprise SaaS Architecture',text:'Multi-tenant platforms with JWT authentication and role-based access control, engineered for scale.',tags:['Multi-Tenant','JWT','RBAC'],icon:'grid'},
  {number:'04',title:'API & Backend Systems',text:'REST APIs and microservices with async programming, Pydantic, and dependency injection.',tags:['REST APIs','Microservices'],icon:'layers'},
  {number:'05',title:'Data & Database Engineering',text:'PostgreSQL, SQL Server, and Snowflake — schema design, data migration, and optimization.',tags:['PostgreSQL','SQL Server','Snowflake'],icon:'blueprint'},
  {number:'06',title:'Workflow Automation',text:'RPA (UiPath) and process automation that removes repetitive operational work.',tags:['RPA / UiPath','Test Automation'],icon:'loop'},
];

export const products:Project[]=[
  {name:'Farmora',category:'Intelligent Agriculture Platform',description:'AI-driven monitoring and management for advanced agricultural production environments.',private:true,featured:true,accent:'#51b99b',monogram:'FA',role:'Product development',technologies:['Python','FastAPI'],status:'Private commercial product',focus:['Intelligent monitoring','Production management'],visual:'growth'},
  {name:'EDNORYX',category:'AI Education Platform',description:'Academic operations, student intelligence, parent engagement, and campus workflows in one digital environment.',private:true,featured:true,accent:'#8c6cff',monogram:'ED',role:'Product architecture & engineering',technologies:['Python','FastAPI','React'],status:'Private commercial product',focus:['Academic operations','Student intelligence','Campus workflows'],visual:'campus'},
  {name:'StaffTract.AI',category:'AI Workforce & Recruitment Platform',displayCategory:'AI Workforce Intelligence',description:'AI-powered workforce and recruitment platform for hiring workflows, workforce operations, documentation control, deployment coordination, and intelligent automation.',private:true,featured:true,accent:'#7c72ff',monogram:'ST',role:'Product architecture & engineering',technologies:['Python','FastAPI','PostgreSQL','React','Multi-tenant SaaS'],status:'Private commercial product',focus:['Recruitment workflows','Workforce operations','Intelligent automation'],visual:'network'},
  {name:'JusticeAngel',category:'AI-Powered Legal Intelligence',description:'AI-assisted legal intelligence platform designed to help structure legal information, analyse case-related content, and support more efficient legal research and decision workflows.',private:true,featured:true,accent:'#a87cff',monogram:'JA',role:'Product architecture & engineering',technologies:[],status:'Private commercial product',visual:'legal'},
  {name:'KriPra SmartERP AI',category:'AI-Enabled Enterprise ERP Platform',displayCategory:'Enterprise Operations Platform',description:'Enterprise ERP platform for integrated business operations, workflow automation, modular enterprise processes, and intelligent digital operations.',private:true,featured:true,accent:'#b071ff',monogram:'SE',role:'Platform architecture & engineering',technologies:['Python','FastAPI','PostgreSQL'],status:'Proprietary product',focus:['Integrated operations','Modular processes','Workflow automation'],visual:'modules'},
  {name:'Faturaix',category:'GST & E-Invoicing Compliance SaaS',description:'Compliance-focused invoicing platform supporting GST-oriented workflows and Saudi ZATCA-aligned digital invoicing requirements.',private:true,accent:'#9a8dff',monogram:'FX',technologies:[],status:'Private commercial product',focus:['Digital invoicing','GST-oriented workflows','ZATCA alignment'],visual:'ledger'},
  {name:'Pyrosk AI',category:'AI Marketing & Lead Automation Platform',description:'AI-assisted marketing and lead automation platform for campaign workflows, digital engagement, lead management, and business growth automation.',private:true,accent:'#dd6dff',monogram:'PY',technologies:[],status:'Proprietary product',focus:['Campaign workflows','Lead management','Growth automation'],visual:'signal'},
  {name:'Trade ERP / CRM',category:'Commodity & Trade Operations Platform',description:'Enterprise trade operations platform supporting procurement, logistics, documentation, CRM processes, and transaction visibility.',private:true,accent:'#6d9dff',monogram:'TR',technologies:[],status:'Private commercial product',focus:['Trade operations','Documentation flow','Transaction visibility'],visual:'routes'},
];

export const clients:Project[]=[
  {name:'Smart Green Solutions',category:'Metals, Energy, Agriculture & Digital',industry:'Diversified group spanning Metals & Minerals, Oil & Gas, AI-powered Agriculture, and Enterprise SaaS/IT',description:'Technology engagement; implementation scope and deliverables remain client-confidential.',needsReview:true,accent:'#9f74ff',monogram:'SGS',role:'Software delivery',technologies:[],status:'Confidential engagement',website:'https://www.sgstechsa.com/',logo:{src:'/clients/smart-green-solutions.png',width:1600,height:595}},
  {name:'Krishvi Global',category:'Multi-Sector Corporate Group',industry:'Strategy, governance, and enterprise consulting across a multi-sector holding group',description:'Technology engagement; implementation scope and deliverables remain client-confidential.',needsReview:true,accent:'#6389ff',monogram:'KG',role:'Software delivery',technologies:[],status:'Confidential engagement',website:'https://krishviglobal.com/',logo:{src:'/clients/krishvi-global.png',width:375,height:375}},
  {name:'IIC Arabia',category:'Industrial, Marine & Facility Solutions',industry:'Independent inspection, technical assurance, and field execution for industrial and marine assets in Saudi Arabia',description:'Technology engagement; implementation scope and deliverables remain client-confidential.',needsReview:true,accent:'#b275e7',monogram:'IIC',role:'Software delivery',technologies:[],status:'Confidential engagement',website:'https://iicarabia.com/',logo:{src:'/clients/iic-arabia.png',width:6000,height:2400}},
];

export const technologyGroups=[
  {name:'Backend',items:['Python','FastAPI','Flask','REST APIs','Microservices','Async Programming','Pydantic'],needsReview:false},
  {name:'Frontend',items:['React','Component-Based UI','JWT Authentication','RBAC'],needsReview:false},
  {name:'AI / ML',items:['NLP','LLM / GenAI Workflows','Prompt Engineering','ML Model Integration'],needsReview:false},
  {name:'Databases',items:['PostgreSQL','SQLite','Snowflake','MS SQL Server','SQLAlchemy ORM'],needsReview:false},
  {name:'Cloud & DevOps',items:['Google Cloud Platform','Docker','CI/CD','Git'],needsReview:false},
  {name:'Automation & QA',items:['RPA (UiPath)','Test Automation','Migration Testing'],needsReview:false},
];

export const outcomes=[
  {category:'Architecture',title:'Multi-Tenant SaaS Architecture',text:'Secure, role-aware application architecture designed around JWT/RBAC and maintainable enterprise workflows.'},
  {category:'Automation',title:'AI Workflow Automation',text:'NLP/LLM-assisted processing integrated into production-oriented application workflows.'},
  {category:'Data Engineering',title:'Cloud / Data Migration',text:'Verified enterprise migration and testing experience involving Teradata, MS SQL Server, and Google Cloud.'},
  {category:'Delivery',title:'End-to-End Product Ownership',text:'Backend services, database design, API integrations, and React frontends delivered as a single accountable owner.'},
  {category:'Leadership',title:'Engineering Mentorship',text:'Code review and technical guidance for junior developers as part of ongoing engineering practice.'},
];

export const workflow=[
  {label:'Discover',statement:'Understand the problem before choosing the stack.',signals:['Requirements','Domain context','Constraints']},
  {label:'Architect',statement:'Turn requirements into a system that can evolve.',signals:['System boundaries','APIs','Data model']},
  {label:'Design',statement:'Make complex workflows understandable.',signals:['User flows','Interaction systems','Responsive UI']},
  {label:'Engineer',statement:'Turn architecture into working software.',signals:['Backend','Frontend','Data','Automation']},
  {label:'Intelligence',statement:'Add AI where it improves the workflow.',signals:['LLM','NLP','ML','AI workflows']},
  {label:'Ship',statement:'Validate, deploy and keep the system production-ready.',signals:['Testing','QA','Deployment']},
];

export type CurrentRole={label:string;role:string;org:string;type:string};
export type JourneyItem={role:string;org:string;period:string;location:string;stage:string;detail:string;signals?:string[];currentRoles?:CurrentRole[]};
export const journey:JourneyItem[]=[
  {
    role:'Two concurrent roles',
    org:'Professional practice & entrepreneurship',
    period:'2025 — Present',
    location:'',
    stage:'AI Product Engineering / Founder Leadership',
    detail:'Two distinct dimensions of current professional work, held concurrently from 2025 to the present.',
    currentRoles:[
      {label:'Professional Role',role:'Senior AI Product Engineer',org:'Pragatham Solutions and Services OPC Pvt Ltd',type:'Professional Employment'},
      {label:'Founder / Entrepreneurship',role:'Founder',org:'Kripra’s Digital AI Pvt. Ltd.',type:'Founder / Entrepreneurship'},
    ],
  },
  {
    role:'IT Consultant',
    org:'GreenwaveX Technologies',
    period:'06/2024 — 06/2025',
    location:'Sheridan, Wyoming (Remote)',
    stage:'Product / Systems Leadership',
    detail:'Led IT strategy and a digital transformation initiative, directed an ERP implementation, and strengthened backup and disaster-recovery reliability.',
  },
  {
    role:'Freelance Technology Consultant',
    org:'Small & Medium Scale Business',
    period:'06/2022 — 06/2024',
    location:'Riyadh, Saudi Arabia',
    stage:'Full-Stack / Product Development',
    detail:'Designed technology solutions and optimized ERP & CRM implementations for client businesses, from requirements through delivery.',
  },
  {
    role:'Data Test Engineer',
    org:'Macy’s Digital / Cognizant',
    period:'05/2021 — 06/2022',
    location:'Chennai, India',
    stage:'Enterprise Systems',
    detail:'Executed migration testing from Teradata and MS SQL Server to Google Cloud, maintaining data integrity and test documentation for a production-scale migration.',
  },
  {
    role:'Data Test Engineer',
    org:'PETCO / Cognizant',
    period:'02/2021 — 05/2021',
    location:'Chennai, India',
    stage:'Enterprise Systems',
    detail:'Designed scalable test pipelines and automated regression testing to support business-requirement compliance.',
  },
  {
    role:'Infra Developer',
    org:'Toyota Motor Sales North America / Cognizant',
    period:'05/2018 — 01/2021',
    location:'Chennai, India',
    stage:'Software Engineering',
    detail:'Developed and optimized Python backend applications for enterprise systems, and automated workflows using Python, UiPath, SQL, and Unix.',
  },
  {
    role:'Programmer Analyst',
    org:'Discover / Cognizant',
    period:'10/2017 — 05/2018',
    location:'Chennai, India',
    stage:'Enterprise Operations / Automation',
    detail:'Provided L1 and L2 support, incident and problem management, and test operations; implemented RPA bots for repetitive financial processes and supported software testing and deployment.',
  },
  {
    role:'Research Assistant',
    org:'Brees Technologies',
    period:'04/2017 — 10/2017',
    location:'India',
    stage:'Research / Data Migration',
    detail:'Assisted with data-migration planning and testing, and supported research initiatives in networking and communication systems.',
  },
  {
    role:'Customer Support Executive',
    org:'Allsec Technologies Limited',
    period:'10/2016 — 04/2017',
    location:'India',
    stage:'Technical Support',
    detail:'Provided customer support services, resolved technical issues, and maintained clear communication with customers.',
  },
];
