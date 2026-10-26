// Portfolio (service line) pages, rendered by pages/PortfolioPage.jsx.

export const portfolios = [
  {
    slug: 'artificial-intelligence-solutions',
    title: ['Artificial Intelligence', 'Solutions'],
    image: '/assets/img/services/Artificial Intelligence.avif',
    imageAlt: 'Artificial Intelligence Solutions — ACS Technologies',
    heading: 'Applied AI — Built for Real-World Impact',
    paragraphs: [
      'ACS Technologies deploys production-grade AI solutions that go beyond proof-of-concept. Our team combines deep expertise in machine learning, deep learning, and computer vision with over four decades of systems integration experience — delivering AI that performs reliably in mission-critical, operational environments.',
      'Our most significant deployment to date is an AI-based military application for the Indian Armed Forces, using Recurrent Neural Networks (RNN) and supervised machine learning models to enhance target identification and classification — with measurable improvements in situational awareness in live operational conditions.',
      'Beyond defence, our AI capabilities power intelligent analytics within our IOTIQ platform, processing high-velocity IoT data streams to surface actionable insights for facility management, energy optimisation, and predictive maintenance. We are also actively developing AI-driven solutions for e-Governance and India\'s Digital Transformation agenda.',
    ],
    capabilities: {
      title: 'Our AI Capabilities',
      subtitle: 'End-to-end expertise across the full spectrum of applied AI',
      items: [
        {
          icon: 'bi-cpu',
          title: 'Machine Learning & Deep Learning',
          text: 'Custom classification, prediction, and anomaly detection models built on TensorFlow and PyTorch — trained on your data and deployed in your environment.',
        },
        {
          icon: 'bi-eye',
          title: 'Computer Vision & Target Recognition',
          text: 'CNN-based object detection and image classification, including production-tested applications for target identification under real-world operational conditions.',
        },
        {
          icon: 'bi-bar-chart-line',
          title: 'AI-Powered Analytics',
          text: 'Big data pipelines combined with intelligent ML models to surface patterns and predictions from high-volume enterprise and IoT data streams.',
        },
        {
          icon: 'bi-chat-text',
          title: 'Natural Language Processing',
          text: 'Document classification, intelligent search, and automated text processing for government workflows, helpdesk automation, and knowledge management.',
        },
        {
          icon: 'bi-building',
          title: 'AI for e-Governance & Digital India',
          text: 'Automated decision-support tools, citizen-service AI, and intelligent document processing tailored to central and state government requirements.',
        },
        {
          icon: 'bi-diagram-3',
          title: 'Edge AI for Industrial IoT',
          text: 'Lightweight ML models deployed at the edge — on gateways, embedded systems, and IOTIQ nodes — for real-time inference without cloud dependency.',
        },
      ],
    },
    offerings: {
      title: 'Technologies & Frameworks',
      subtitle: '',
      items: [
        { icon: 'bi-layers', title: 'Deep Learning', text: 'TensorFlow · PyTorch · Keras · ONNX' },
        { icon: 'bi-braces', title: 'Machine Learning', text: 'scikit-learn · XGBoost · LightGBM' },
        { icon: 'bi-camera', title: 'Computer Vision', text: 'OpenCV · YOLO · ResNet · EfficientDet' },
        { icon: 'bi-database', title: 'Big Data', text: 'Apache Spark · Hadoop · MongoDB · Kafka' },
        { icon: 'bi-bezier2', title: 'Neural Architectures', text: 'CNN · RNN · LSTM · Transformer' },
        { icon: 'bi-cloud-upload', title: 'Deployment', text: 'Docker · REST APIs · Edge/Embedded · Cloud-agnostic' },
      ],
    },
    highlight: {
      icon: 'bi-shield-check',
      title: 'Proven in Defence',
      text: 'ACS deployed an AI-based military target identification and classification system for the Indian Armed Forces — one of India\'s early operational AI deployments in a defence context. The system uses RNN and ML models tuned for real-time target discrimination, and continues to operate in active service.',
    },
    brochures: [],
    cta: {
      title: 'Ready to bring AI to your operations?',
      text: 'Whether you need to automate a process, extract intelligence from data, or build a bespoke AI system — our team can scope and deliver it.',
    },
    legacyPath: 'artificial_intelligence_solutions.html',
  },
  {
    slug: 'software-development',
    title: ['Software', 'Development'],
    image: '/assets/img/services/Software Development.avif',
    imageAlt: 'Software Development — ACS Technologies',
    heading: 'Bespoke Software — Engineered for Your Business',
    paragraphs: [
      'ACS Technologies delivers end-to-end custom software development services, combining structured and object-oriented analysis with multi-platform implementation expertise. From enterprise web applications and mobile apps to complex data-driven systems, we build software that is reliable, scalable, and tailored precisely to your operational requirements.',
      'Our team brings deep proficiency across a broad technology stack — .NET, Java, Python, PHP, Angular, and more — backed by rigorous IV&V testing practices that include both manual and automated validation. We also specialise in Big Data and advanced analytics solutions built on Hadoop, Kubernetes, and modern container architectures.',
      'Whether you are modernising a legacy system, building a new platform from scratch, or integrating intelligent data pipelines, ACS has the engineering depth and delivery experience to get it done.',
    ],
    capabilities: {
      title: 'Our Development Capabilities',
      subtitle: 'Full-cycle software engineering across web, mobile, data, and enterprise platforms',
      items: [
        {
          icon: 'bi-code-slash',
          title: 'Custom Application Development',
          text: 'Bespoke enterprise applications designed around your workflows — using structured and object-oriented methodologies with rigorous design documentation and review cycles.',
        },
        {
          icon: 'bi-phone',
          title: 'Mobile Application Development',
          text: 'Native and cross-platform mobile solutions for Android and iOS, delivering performant, user-friendly applications that integrate seamlessly with your backend systems.',
        },
        {
          icon: 'bi-bar-chart-line',
          title: 'Big Data & Analytics',
          text: 'Custom analytics solutions on Hadoop, Spark, R, and Kubernetes-based container architectures — turning large, complex datasets into actionable business intelligence.',
        },
        {
          icon: 'bi-globe',
          title: 'Web & Portal Development',
          text: 'Scalable web applications and enterprise portals built with Angular, React, PHP, and Java Spring — designed for performance, accessibility, and long-term maintainability.',
        },
        {
          icon: 'bi-shield-check',
          title: 'IV&V Testing & Quality Assurance',
          text: 'Independent Verification & Validation (IV&V) services using manual and automated testing frameworks — ensuring software correctness, security, and compliance before deployment.',
        },
        {
          icon: 'bi-database',
          title: 'Database Design & Integration',
          text: 'Expert data modelling and integration across relational and NoSQL platforms — Oracle, MySQL, SQL Server, PostgreSQL, and RavenDB — with robust data migration and ETL pipelines.',
        },
      ],
    },
    offerings: {
      title: 'Technologies & Platforms',
      subtitle: '',
      items: [
        { icon: 'bi-braces', title: 'Languages', text: 'Java · Python · .NET/C# · PHP · C++' },
        { icon: 'bi-layout-text-window', title: 'Front-End Frameworks', text: 'Angular · AngularJS · React · JSP' },
        { icon: 'bi-phone', title: 'Mobile', text: 'Android · iOS · Linux · Windows' },
        { icon: 'bi-database', title: 'Databases', text: 'Oracle · MySQL · SQL Server · PostgreSQL · RavenDB' },
        { icon: 'bi-hdd-stack', title: 'Big Data', text: 'Hadoop · Kubernetes · Spark · R' },
        { icon: 'bi-boxes', title: 'Containers & DevOps', text: 'Docker · Kubernetes · CI/CD Pipelines · REST APIs' },
      ],
    },
    highlight: {
      icon: 'bi-award',
      title: 'Trusted by Government & Defence',
      text: 'ACS Technologies has delivered mission-critical software systems for India\'s defence forces, government bodies, and large enterprises — combining decades of engineering experience with a disciplined, standards-driven delivery process.',
    },
    brochures: [],
    cta: {
      title: 'Ready to build your next software solution?',
      text: 'Whether you need a new platform, a modernised legacy system, or an intelligent data application — our engineering team is ready to scope and deliver it.',
    },
    legacyPath: 'software_development.html',
  },
  {
    slug: 'it-infrastructure',
    title: ['IT', 'Infrastructure'],
    image: '/assets/img/services/IT Infrastructure.avif',
    imageAlt: 'IT Infrastructure — ACS Technologies',
    heading: 'End-to-End IT Infrastructure Transformation',
    paragraphs: [
      'ACS Technologies delivers comprehensive IT infrastructure solutions that underpin the digital transformation of enterprises. From design and procurement through to deployment, integration, and ongoing support, we provide a fully managed pathway to a resilient, high-performance IT environment.',
      'We partner with the world\'s leading technology vendors — IBM, Dell, HP, Cisco, Juniper, Microsoft, VMware, Citrix, and Trend Micro — to source, configure, and integrate the right infrastructure components for your scale and budget. Our solutions span on-premises, cloud, and hybrid architectures.',
      'Whether you are upgrading ageing infrastructure, scaling for growth, or migrating to the cloud, our experienced team ensures seamless delivery with minimal disruption to your operations.',
    ],
    capabilities: {
      title: 'Our Infrastructure Capabilities',
      subtitle: 'Reliable, scalable infrastructure solutions from leading global technology partners',
      items: [
        {
          icon: 'bi-server',
          title: 'Server & Storage Solutions',
          text: 'Enterprise-grade server and storage infrastructure from IBM, Dell, and HP — designed for high availability, performance, and long-term scalability.',
        },
        {
          icon: 'bi-diagram-3',
          title: 'Network Design & Integration',
          text: 'End-to-end LAN, WAN, and data centre networking using Cisco and Juniper equipment — from architecture design to implementation and performance tuning.',
        },
        {
          icon: 'bi-layers',
          title: 'Virtualisation & VDI',
          text: 'VMware and Citrix-based virtualisation solutions that consolidate infrastructure, reduce hardware costs, and enable flexible remote workspaces through Virtual Desktop Infrastructure.',
        },
        {
          icon: 'bi-cloud-upload',
          title: 'Cloud & Hybrid IT',
          text: 'Cloud migration strategy, hybrid cloud design, and Microsoft Azure/AWS integration — enabling enterprises to scale dynamically while maintaining control over critical on-premises assets.',
        },
        {
          icon: 'bi-shield-lock',
          title: 'IT Security & Endpoint Protection',
          text: 'Enterprise security infrastructure powered by Trend Micro and leading SIEM platforms — covering endpoint protection, threat detection, and compliance management.',
        },
        {
          icon: 'bi-people',
          title: 'IT Consulting & Strategy',
          text: 'Independent advisory services that align your IT infrastructure strategy with your business objectives — covering technology roadmaps, vendor selection, and total cost of ownership analysis.',
        },
      ],
    },
    offerings: {
      title: 'Technology Partners & Platforms',
      subtitle: '',
      items: [
        { icon: 'bi-server', title: 'Compute & Storage', text: 'IBM · Dell · HP · Lenovo' },
        { icon: 'bi-diagram-3', title: 'Networking', text: 'Cisco · Juniper · Aruba · Fortinet' },
        { icon: 'bi-layers', title: 'Virtualisation', text: 'VMware · Citrix · Hyper-V · KVM' },
        { icon: 'bi-windows', title: 'Productivity & OS', text: 'Microsoft · Windows Server · Active Directory' },
        { icon: 'bi-shield-lock', title: 'Security', text: 'Trend Micro · Sophos · Palo Alto · SIEM' },
        { icon: 'bi-cloud', title: 'Cloud', text: 'Microsoft Azure · AWS · Hybrid Cloud · HCI' },
      ],
    },
    highlight: {
      icon: 'bi-building-gear',
      title: 'Enterprise IT, End to End',
      text: 'ACS Technologies provides complete IT infrastructure solutions for government agencies, defence establishments, and large enterprises across India — from initial design and procurement through to integration, commissioning, and ongoing managed support.',
    },
    brochures: [],
    cta: {
      title: 'Ready to transform your IT infrastructure?',
      text: 'Whether you need to upgrade servers, redesign your network, or move to a cloud or hybrid model — our team can design and deliver the right solution.',
    },
    legacyPath: 'it_infrastructure.html',
  },
  {
    slug: 'security-surveillance',
    title: ['Security &', 'Surveillance'],
    image: '/assets/img/services/Security & Surveillance.avif',
    imageAlt: 'Security and Surveillance — ACS Technologies',
    heading: 'Intelligent, Integrated Physical Security',
    paragraphs: [
      'ACS Technologies delivers comprehensive physical security and safety system solutions, combining IP-based technologies with enterprise IT integration to create proactive, intelligent security environments. Our systems move beyond traditional monitoring — they analyse, correlate, and alert in real time to keep people and assets safe.',
      'Our security solutions span video surveillance, access control, fire detection, and public address systems. Advancements in IP-based analytics have enabled these systems to deliver direct business value when integrated with existing IT infrastructure — giving organisations greater situational awareness, reduced incident response times, and stronger compliance posture.',
      'From initial assessment and design through to deployment, integration, and operational management, ACS handles the full security lifecycle.',
    ],
    capabilities: {
      title: 'Our Security & Surveillance Capabilities',
      subtitle: 'Proactive, integrated security systems for enterprise, government, and critical infrastructure',
      items: [
        {
          icon: 'bi-camera-video',
          title: 'Video Surveillance Systems',
          text: 'IP-based CCTV and video management systems with intelligent analytics — covering camera deployment, VMS integration, storage design, and real-time monitoring.',
        },
        {
          icon: 'bi-door-open',
          title: 'Access Control Systems',
          text: 'Biometric and card-based access management solutions that control and audit entry to facilities, zones, and critical assets — integrated with HR and identity management systems.',
        },
        {
          icon: 'bi-fire',
          title: 'Fire Detection & Alarm Systems',
          text: 'Addressable and conventional fire detection and alarm systems designed to relevant Indian and international standards — with centralised monitoring and automatic response integration.',
        },
        {
          icon: 'bi-megaphone',
          title: 'Public Address Systems',
          text: 'Enterprise and campus-wide PA systems for emergency announcements, zoned audio distribution, and integration with fire alarm and building management systems.',
        },
        {
          icon: 'bi-bezier2',
          title: 'IT & Security Integration',
          text: 'Converging physical security systems with enterprise IT infrastructure — enabling unified dashboards, automated incident response, and integration with SIEM and ERP platforms.',
        },
        {
          icon: 'bi-clipboard-check',
          title: 'Compliance & Standards',
          text: 'Security system design and auditing that ensures conformance with relevant regulatory and industry standards — covering data retention policies, privacy compliance, and audit trails.',
        },
      ],
    },
    offerings: {
      title: 'Technologies & Platforms',
      subtitle: '',
      items: [
        {
          icon: 'bi-camera-video',
          title: 'Video Management',
          text: 'IP Cameras · NVR/DVR · VMS Platforms · Video Analytics',
        },
        { icon: 'bi-door-open', title: 'Access Control', text: 'Biometrics · RFID · Smart Cards · Face Recognition' },
        {
          icon: 'bi-fire',
          title: 'Fire & Life Safety',
          text: 'Addressable FAS · Suppression Integration · NBC Standards',
        },
        {
          icon: 'bi-shield-lock',
          title: 'Physical Security',
          text: 'Perimeter Protection · Intrusion Detection · PSIM',
        },
        {
          icon: 'bi-megaphone',
          title: 'Audio Systems',
          text: 'IP-PA · Zoned Audio · Emergency Communication · Intercom',
        },
        {
          icon: 'bi-bar-chart-line',
          title: 'Integration & Analytics',
          text: 'SIEM Integration · Remote Monitoring · AI-based Video Analytics',
        },
      ],
    },
    highlight: {
      icon: 'bi-shield-check',
      title: 'From Reactive to Proactive Security',
      text: 'ACS Technologies has deployed integrated security and surveillance systems across government facilities, critical infrastructure, and enterprise campuses — combining physical security hardware with intelligent IT integration to deliver systems that don’t just record incidents, but help prevent them.',
    },
    brochures: [],
    cta: {
      title: 'Ready to secure your facility?',
      text: 'From a security assessment through to full system deployment and integration — our team can design and deliver a solution tailored to your site and requirements.',
    },
    legacyPath: 'security_surveillance.html',
  },
  {
    slug: 'geospatial-technologies',
    title: ['Geospatial', 'Technologies'],
    image: '/assets/img/services/Geospatial Technologies.avif',
    imageAlt: 'Geospatial Technologies — ACS Technologies',
    heading: 'Geospatial Intelligence — Decades of Domain Expertise',
    paragraphs: [
      'ACS Technologies brings over three to four decades of deep geospatial expertise to government agencies, research institutions, and large corporates. Our seasoned professionals have led major Geospatial Technology initiatives for ISRO/Space Application Centre and national infrastructure programmes — combining traditional survey science with the latest AI-powered spatial analytics.',
      'Our capabilities span the full geospatial data lifecycle: from drone and aerial data capture, through precision survey (DGPS, GPS, ETS, LiDAR), to multi-layer GIS modelling, high-resolution satellite imagery analysis (optical, microwave, interferometric), and custom visualisation tools.',
      'We also apply geospatial technologies to critical societal challenges including urban planning, flood and drought disaster management, emergency response systems, and transport engineering — supporting India\'s development agenda with data-driven spatial decision-making.',
    ],
    capabilities: {
      title: 'Our Geospatial Capabilities',
      subtitle: 'From data capture to spatial intelligence — comprehensive geospatial services for government and enterprise',
      items: [
        {
          icon: 'bi-map',
          title: 'GIS Solutions & Mapping',
          text: 'Geographic Information System design, implementation, and customisation — creating multi-layer spatial databases and interactive mapping portals for government and enterprise clients.',
        },
        {
          icon: 'bi-broadcast-pin',
          title: 'Drone & Aerial Imaging',
          text: 'UAV-based drone surveys, photogrammetry, and aerial imaging with high-resolution data capture — processed into orthorectified imagery, 3D point clouds, and digital elevation models.',
        },
        {
          icon: 'bi-globe2',
          title: 'Remote Sensing & Satellite Imagery',
          text: 'Analysis of high-resolution optical, microwave, and interferometric satellite imagery — supporting land use classification, change detection, and agricultural monitoring.',
        },
        {
          icon: 'bi-cpu',
          title: 'AI-Based Spatial Analytics',
          text: 'Machine learning and deep learning applied to geospatial data — enabling automated feature extraction, anomaly detection, and predictive spatial modelling for infrastructure and disaster management.',
        },
        {
          icon: 'bi-building',
          title: 'Urban Planning & Disaster Management',
          text: 'Geospatial intelligence for urban planning, transport engineering, and emergency response — including flood, drought, and disaster scenario modelling for government agencies.',
        },
        {
          icon: 'bi-graph-up',
          title: 'Custom GeoData Tools & Visualisation',
          text: 'Bespoke geospatial data conversion, raster/vector modelling, and custom visualisation applications — delivering intuitive spatial insight tools for operational and planning use.',
        },
      ],
    },
    offerings: {
      title: 'Technologies & Instruments',
      subtitle: '',
      items: [
        { icon: 'bi-compass', title: 'Field Survey', text: 'DGPS · GPS · ETS · Total Station · LiDAR' },
        {
          icon: 'bi-broadcast-pin',
          title: 'Aerial & Drone',
          text: 'UAV Platforms · Photogrammetry · Orthorectification · DSM/DTM',
        },
        {
          icon: 'bi-globe2',
          title: 'Satellite Imagery',
          text: 'Optical · SAR/Microwave · Interferogram · Multi-spectral',
        },
        { icon: 'bi-map', title: 'GIS Platforms', text: 'ArcGIS · QGIS · ERDAS · Custom Web GIS' },
        { icon: 'bi-cpu', title: 'AI & ML', text: 'Python · TensorFlow · Spatial ML · Feature Extraction' },
        {
          icon: 'bi-layers',
          title: 'Data Processing',
          text: 'Raster/Vector Modelling · Topology Editing · Spatial Databases',
        },
      ],
    },
    highlight: {
      icon: 'bi-globe-americas',
      title: 'Trusted by ISRO and National Agencies',
      text: 'ACS Technologies\' geospatial professionals have delivered programmes for ISRO\'s Space Application Centre, central and state government bodies, and large corporate clients — bringing 3–4 decades of hands-on experience in India\'s most demanding geospatial projects.',
    },
    brochures: [],
    cta: {
      title: 'Need geospatial expertise for your next project?',
      text: 'Whether you need drone surveys, satellite imagery analysis, GIS solutions, or AI-powered spatial analytics — our team has the instruments, the software, and the domain knowledge to deliver.',
    },
    legacyPath: 'geospatial_technologies.html',
  },
  {
    slug: 'smart-facilities-management',
    title: ['Smart Facilities', 'Management'],
    image: '/assets/img/services/SFM Main.jpg',
    imageAlt: 'Smart Facilities Management — ACS Technologies',
    heading: 'Transforming Facilities into Smart Integrated Spaces',
    paragraphs: [
      'At ACS Technologies, we redefine how facilities operate through our Smart Facility Management (SFM) solutions. Powered by IoT, AI, and advanced analytics, our comprehensive platform streamlines operations, boosts sustainability, and enhances occupant comfort — transforming your facility from a passively managed asset into an intelligently optimised environment.',
      'Our IOTIQ-powered SFM platform provides real-time visibility and control across energy, HVAC, lighting, security, and maintenance systems. Sensor-driven automation replaces manual processes, predictive algorithms prevent costly downtime, and integrated dashboards give facility managers a single pane of glass across all building systems.',
      'We deliver SFM solutions for commercial campuses, industrial facilities, data centres, government buildings, and smart city infrastructure — fully tailored to your operational requirements and sustainability goals.',
    ],
    capabilities: {
      title: 'Our Smart Facilities Capabilities',
      subtitle: 'Intelligent building systems that reduce cost, improve comfort, and enhance security',
      items: [
        {
          icon: 'bi-eye',
          title: 'Remote Monitoring',
          text: 'Real-time surveillance and diagnostics of facility operations across energy, HVAC, lighting, and security systems — with alerts, dashboards, and historical analytics accessible from anywhere.',
        },
        {
          icon: 'bi-sliders',
          title: 'Remote Controlling',
          text: 'Manage HVAC, lighting, access, and energy systems remotely from any device — enabling rapid response to changing conditions, emergency shutdowns, and scheduled optimisation routines.',
        },
        {
          icon: 'bi-robot',
          title: 'Intelligent Automation',
          text: 'Dynamic building systems that respond automatically to occupancy, environmental conditions, and time schedules — using ML models and sensor fusion for continuous optimisation.',
        },
        {
          icon: 'bi-lightning',
          title: 'Energy Management & Sustainability',
          text: 'IoT-driven energy monitoring with real-time consumption dashboards, demand forecasting, and automated load control — delivering measurable reductions in energy cost and carbon footprint.',
        },
        {
          icon: 'bi-camera-video',
          title: 'Integrated Building Security',
          text: 'Unified security layer connecting CCTV, access control, intrusion detection, and fire systems — with air quality monitoring, occupancy analytics, and automated safety alerts.',
        },
        {
          icon: 'bi-tools',
          title: 'Predictive Maintenance',
          text: 'AI-driven fault detection and maintenance scheduling that identifies equipment issues before they escalate — reducing unplanned downtime and extending asset life.',
        },
      ],
    },
    offerings: {
      title: 'Technologies & Platform',
      subtitle: '',
      items: [
        { icon: 'bi-broadcast', title: 'IoT Platform', text: 'IOTIQ · MQTT · Edge Gateways · Sensor Networks' },
        {
          icon: 'bi-cpu',
          title: 'AI & Analytics',
          text: 'Predictive ML Models · Anomaly Detection · Energy Forecasting',
        },
        {
          icon: 'bi-thermometer-sun',
          title: 'Building Systems',
          text: 'HVAC · BMS · Lighting Control · Water Management',
        },
        {
          icon: 'bi-shield-lock',
          title: 'Security Integration',
          text: 'CCTV · Access Control · Fire & Gas Detection · Intrusion',
        },
        {
          icon: 'bi-layout-text-window',
          title: 'Dashboard & Reporting',
          text: 'Web & Mobile Dashboards · SLA Reporting · API Integration',
        },
        {
          icon: 'bi-cloud',
          title: 'Cloud & On-Premise',
          text: 'Hybrid Deployment · OPC-UA · SCADA · Cloud-agnostic',
        },
      ],
    },
    highlight: {
      icon: 'bi-buildings',
      title: 'Intelligent Facilities, Measurable Results',
      text: 'ACS Technologies\' SFM solutions have been deployed in commercial campuses, industrial facilities, and government buildings — delivering documented reductions in energy consumption, maintenance costs, and security incidents through IoT-driven automation and AI-powered analytics.',
    },
    brochures: [],
    cta: {
      title: 'Ready to make your facility smarter?',
      text: 'Whether you want to cut energy costs, automate building operations, or unify your security and facilities management — our IOTIQ-powered SFM platform can be tailored to your needs.',
    },
    legacyPath: 'smart_facilities_management.html',
  },
  {
    slug: 'electro-mechanical-projects',
    title: ['Electro Mechanical', 'Projects'],
    image: '/assets/img/services/Electro Mechanical Projects.png',
    imageAlt: 'Electro Mechanical Projects — ACS Technologies',
    heading: 'Reliable Electro-Mechanical Solutions, Engineered to Last',
    paragraphs: [
      'ACS Technologies Limited is a leading provider of comprehensive electro-mechanical solutions across diverse industries. With deep expertise in design, installation, maintenance, and servicing, we deliver tailored electro-mechanical systems that optimise performance, reduce downtime, and meet our clients\' most demanding operational requirements.',
      'Our project capabilities span the full spectrum of electro-mechanical engineering — from industrial and commercial electrification and control panel systems through to specialised applications in water supply, wastewater management, mine dewatering, and hazardous environment lighting.',
      'We are also the manufacturer of the ACS BEAST PUMP — a high-performance industrial fluid pumping solution engineered for heavy-duty dewatering and fluid transfer applications.',
    ],
    capabilities: {
      title: 'Our Electro-Mechanical Capabilities',
      subtitle: 'End-to-end design, supply, installation, and maintenance of electro-mechanical systems',
      items: [
        {
          icon: 'bi-lightbulb',
          title: 'Engineering Consultancy',
          text: 'Expert technical consultancy for electro-mechanical project planning, feasibility assessment, detailed design, and specifications — ensuring engineering excellence from concept to commissioning.',
        },
        {
          icon: 'bi-plug',
          title: 'Electrical & Mechanical Contracting',
          text: 'Industrial and commercial electrification projects including power distribution, cable laying, control wiring, and LT panel installation — delivered to IEC and IS standards.',
        },
        {
          icon: 'bi-toggles',
          title: 'LT Control Panel Systems',
          text: 'Design, fabrication, and installation of Low Tension (LT) motor control centres, distribution boards, and automation panels for industrial, commercial, and infrastructure applications.',
        },
        {
          icon: 'bi-droplet',
          title: 'Water Supply & Wastewater Management',
          text: 'Electro-mechanical systems for water supply infrastructure, wastewater treatment plants, and sewage pumping stations — designed for reliability in municipal and industrial environments.',
        },
        {
          icon: 'bi-water',
          title: 'Mine & Construction Dewatering',
          text: 'High-capacity dewatering systems for mine sites and large construction projects — including our proprietary ACS BEAST PUMP engineered for extreme-duty fluid transfer in harsh environments.',
        },
        {
          icon: 'bi-lamp',
          title: 'Hazardous Area Lighting',
          text: 'Zone-classified hazardous area lighting solutions for oil & gas, mining, and chemical plant environments — compliant with ATEX and IS standards for explosive atmospheres.',
        },
      ],
    },
    offerings: {
      title: 'Products & Solutions',
      subtitle: '',
      items: [
        {
          icon: 'bi-toggles',
          title: 'LT Control Panels',
          text: 'MCC · Distribution Boards · Automation Panels · PLC',
        },
        {
          icon: 'bi-water',
          title: 'ACS BEAST Pump',
          text: 'Mine Dewatering · Construction · Industrial Fluid Transfer',
        },
        {
          icon: 'bi-lamp',
          title: 'Hazardous Lighting',
          text: 'ATEX · Zone 1/Zone 2 · LED Flameproof · IS-Compliant',
        },
        {
          icon: 'bi-plug',
          title: 'Cable Works',
          text: 'HT/LT Cables · Cable Laying · Conduit Systems · Terminations',
        },
        { icon: 'bi-droplet', title: 'Water Systems', text: 'Water Supply · Wastewater Treatment · Sewage Pumping' },
        {
          icon: 'bi-tools',
          title: 'Repair & AMC',
          text: 'Electro-Mechanical Repairs · Annual Maintenance · Spare Parts',
        },
      ],
    },
    highlight: {
      icon: 'bi-gear-wide-connected',
      title: 'Product Brochures Available',
      text: 'Download our detailed product and service brochures for full technical specifications on our Electro-Mechanical Projects portfolio and the ACS BEAST PUMP — our flagship industrial fluid pumping solution.',
    },
    brochures: [
      { label: 'Download EMP Brochure', href: '/assets/docs/Services/ACS EMP.pdf' },
      { label: 'Download BEAST Pump Brochure', href: '/assets/docs/Services/ACS BEAST  PUMP.pdf' },
    ],
    cta: {
      title: 'Have an electro-mechanical project requirement?',
      text: 'From engineering consultancy and equipment supply to full project execution and ongoing maintenance — our team is ready to discuss your requirements.',
    },
    legacyPath: 'electro_mechanical_projects.html',
  },
  {
    slug: 'telecom-services',
    title: ['Telecom', 'Services'],
    image: '/assets/img/services/Telecom Services.avif',
    imageAlt: 'Telecom Services — ACS Technologies',
    heading: 'Telecom Solutions Built on Decades of Network Expertise',
    paragraphs: [
      'ACS Technologies brings multi-decade telecom expertise to operators, infrastructure companies, and enterprises across India. Our specialists have deep domain knowledge in Radio Access Networks, wireless communication, core network elements, and systems integration — enabling us to deliver end-to-end telecom solutions for OpComs, InfraComs, and private networks.',
      'From 4G/5G cell site integration and CBRS deployments to transport routing, switching, and VoIP solutions, ACS covers the full technology stack required for modern telecom infrastructure delivery. Our team handles site design, RAN delivery, network commissioning, and ongoing integration support.',
      'Whether you are rolling out new network infrastructure, upgrading existing sites, or integrating disparate systems — our experienced telecom engineers ensure on-time, quality delivery.',
    ],
    capabilities: {
      title: 'Our Telecom Capabilities',
      subtitle: 'End-to-end telecom system integration and network solutions for operators and enterprises',
      items: [
        {
          icon: 'bi-bezier2',
          title: 'Network Integration',
          text: 'Site design, RAN delivery, and network integration services for greenfield and upgrade projects — covering civil, power, and equipment installation through to testing and acceptance.',
        },
        {
          icon: 'bi-reception-4',
          title: '4G / 5G / CBRS Integration',
          text: 'Complete 4G LTE, 5G NR, and CBRS cell site integration — from RF design and antenna configuration through to core connectivity and spectrum management.',
        },
        {
          icon: 'bi-wifi',
          title: 'Wireless Cell Sites',
          text: 'Macro, micro, and small cell deployment services — including tower erection, RF optimisation, and co-location management for urban and rural coverage requirements.',
        },
        {
          icon: 'bi-router',
          title: 'Transport Routing & Switching',
          text: 'IP/MPLS transport network design and integration — covering backhaul, microwave, fibre transport, and core routing and switching for carrier-grade networks.',
        },
        {
          icon: 'bi-diagram-3',
          title: 'Core Network Elements',
          text: 'Integration and configuration of core network components — EPC, IMS, HSS, and next-generation 5G core — ensuring seamless interoperability across multi-vendor environments.',
        },
        {
          icon: 'bi-telephone',
          title: 'VoIP & OTT Solutions',
          text: 'Voice-over-IP and over-the-top communication solutions for enterprise and carrier environments — including SIP trunking, unified communications, and carrier-grade VoIP platforms.',
        },
      ],
    },
    offerings: {
      title: 'Technologies & Standards',
      subtitle: '',
      items: [
        { icon: 'bi-reception-4', title: 'Radio Access', text: '4G LTE · 5G NR · CBRS · Small Cells · DAS' },
        { icon: 'bi-router', title: 'Transport', text: 'IP/MPLS · Microwave · Fibre Backhaul · SDH/PDH' },
        { icon: 'bi-diagram-3', title: 'Core Network', text: 'EPC · IMS · HSS · 5G Core · NFV/SDN' },
        { icon: 'bi-telephone', title: 'VoIP & UC', text: 'SIP · VoLTE · OTT Platforms · Unified Communications' },
        {
          icon: 'bi-wifi',
          title: 'RF & Wireless',
          text: 'RF Planning · Drive Testing · Antenna Systems · Propagation',
        },
        {
          icon: 'bi-tools',
          title: 'Integration & Testing',
          text: 'System Integration · FAT/SAT · Network Commissioning · OSS/BSS',
        },
      ],
    },
    highlight: {
      icon: 'bi-broadcast',
      title: 'Multi-Decade Telecom Expertise',
      text: 'ACS Technologies\' telecom team has delivered system integration, RAN deployments, and network integration projects for major OpComs and InfraComs across India — with a track record spanning 2G/3G legacy modernisation through to active 4G/5G rollouts.',
    },
    brochures: [],
    cta: {
      title: 'Have a telecom project requirement?',
      text: 'Whether you need cell site integration, network roll-out support, transport design, or core network integration — our telecom engineers are ready to help.',
    },
    legacyPath: 'telecom_services.html',
  },
  {
    slug: 'managed-services',
    title: ['Managed', 'Services'],
    image: '/assets/img/services/Managed Services.avif',
    imageAlt: 'Managed Services — ACS Technologies',
    heading: 'Managed IT Services — Optimised for Performance, Built for Reliability',
    paragraphs: [
      'ACS Technologies\' Managed Services practice helps organisations optimise their IT assets, reduce operational costs, and increase productivity — without the overhead of building and maintaining large in-house IT teams. We deliver both on-site and remote managed service models, as well as hybrid combinations tailored to your specific needs.',
      'Our team brings considerable experience managing complex IT environments across government, defence, and enterprise sectors. Using industry-proven operational processes, modern monitoring tools, and deep technical expertise, we ensure smooth, efficient, and secure running of your IT infrastructure around the clock.',
      'From helpdesk and end-user support to proactive infrastructure management and governance reporting, ACS acts as an extension of your IT function — delivering measurable SLA outcomes and continuous improvement.',
    ],
    capabilities: {
      title: 'Our Managed Services Capabilities',
      subtitle: 'Comprehensive IT management services — on-site, remote, or hybrid',
      items: [
        {
          icon: 'bi-pc-display',
          title: 'IT Asset Management',
          text: 'Complete lifecycle management of IT assets — from procurement and deployment through to maintenance, tracking, and disposal — maximising asset value and minimising hidden costs.',
        },
        {
          icon: 'bi-display',
          title: 'Remote Infrastructure Monitoring',
          text: '24/7 remote monitoring of servers, networks, storage, and cloud environments — with proactive alerting, capacity planning, and incident response to minimise downtime.',
        },
        {
          icon: 'bi-headset',
          title: 'Helpdesk & End-User Support',
          text: 'Multi-tier helpdesk services for end-users — covering incident management, request fulfilment, and technical troubleshooting with defined SLA targets and escalation paths.',
        },
        {
          icon: 'bi-people',
          title: 'On-Site IT Support',
          text: 'Dedicated on-site engineers providing hands-on infrastructure maintenance, desktop support, and day-to-day IT operations management at your facility.',
        },
        {
          icon: 'bi-shield-check',
          title: 'Proactive Maintenance & Patching',
          text: 'Scheduled preventive maintenance, security patching, firmware updates, and vulnerability management — keeping your systems stable, secure, and up to date.',
        },
        {
          icon: 'bi-clipboard-data',
          title: 'IT Governance & Reporting',
          text: 'Regular SLA performance reports, capacity planning reviews, and technology roadmap input — providing management visibility and accountability over your IT operations.',
        },
      ],
    },
    offerings: {
      title: 'Tools & Frameworks',
      subtitle: '',
      items: [
        { icon: 'bi-display', title: 'Monitoring', text: 'Zabbix · Nagios · PRTG · Grafana · CloudWatch' },
        { icon: 'bi-ticket', title: 'ITSM', text: 'ServiceNow · Jira Service Management · ITIL · Ticketing' },
        { icon: 'bi-shield-check', title: 'Security', text: 'Endpoint Protection · Patch Management · SIEM · SOC' },
        {
          icon: 'bi-hdd-network',
          title: 'Infrastructure',
          text: 'Servers · Networks · Storage · Virtualisation · Cloud',
        },
        {
          icon: 'bi-bar-chart-line',
          title: 'Reporting',
          text: 'SLA Dashboards · Capacity Reports · Incident Analytics',
        },
        { icon: 'bi-arrow-repeat', title: 'Automation', text: 'Ansible · PowerShell · RPA · Scripted Remediation' },
      ],
    },
    highlight: {
      icon: 'bi-check-circle',
      title: 'Experienced Across Government, Defence & Enterprise',
      text: 'ACS Technologies has managed IT operations for government bodies, defence establishments, and large enterprises across India — delivering consistent SLA performance, reduced IT costs, and high user satisfaction through our blend of on-site expertise and remote monitoring capabilities.',
    },
    brochures: [],
    cta: {
      title: 'Looking to optimise your IT operations?',
      text: 'Whether you need full managed services, supplemental IT staffing, or a remote monitoring and management solution — our team can design the right engagement model for you.',
    },
    legacyPath: 'managed_services.html',
  },
];
