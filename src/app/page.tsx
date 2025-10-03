"use client";

import Image from 'next/image';
import { useState, useEffect } from 'react';
// import { useTranslations } from 'next-intl';
import {
  Box,
  Button,
  Container,
  Typography,
  Divider,
  Stack,
  IconButton,
  Chip,
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Paper,
  CircularProgress,
  Grid,
} from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import CodeIcon from '@mui/icons-material/Code';
import StarIcon from '@mui/icons-material/Star';
import ForkRightIcon from '@mui/icons-material/ForkRight';
import Navbar from '@/components/Navbar';
import { getEnhancedUserRepos, type GithubRepo } from '@/lib/github';
import AppleIcon from '@mui/icons-material/Apple';
import PublicIcon from '@mui/icons-material/Public';
import AndroidIcon from '@mui/icons-material/Android';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import IosShareIcon from '@mui/icons-material/IosShare';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

const profileImage = '/images/egecankahyaoglu.png';

export default function HomePage() {
  // const t = useTranslations('Index');
  const [projects, setProjects] = useState<Array<{
    id: number;
    name: string;
    description: string;
    tech: string[];
    github: string;
    demo: string | null;
    readmeImage: string;
  }>>([]);
  const [loading, setLoading] = useState(true);
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  
  // Carousel navigation functions
  const handlePrevious = () => {
    setCurrentProjectIndex((prevIndex) => 
      prevIndex === 0 ? fallbackProjects.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentProjectIndex((prevIndex) => 
      prevIndex === fallbackProjects.length - 1 ? 0 : prevIndex + 1
    );
  };
  
  // GitHub projeleri için veri çekme
  useEffect(() => {
    async function fetchProjects() {
      try {
        console.log('Fetching GitHub projects...');
        const repos = await getEnhancedUserRepos('egecan12');
        console.log('Fetched repos:', repos);
        if (repos && repos.length > 0) {
          // README resimlerini kullanma, sadece bizim resimlerimizi kullan
          setProjects(fallbackProjects);
        } else {
          console.log('No repos found, using fallback projects');
          setProjects(fallbackProjects);
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
        setProjects(fallbackProjects);
      } finally {
        setLoading(false);
      }
    }
    
    fetchProjects();
  }, []);
  
  // Structured data for SEO
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Egecan Kahyaoglu",
    "jobTitle": "MSc Software Engineer",
    "url": "https://egecankahyaoglu.netlify.app/",
    "sameAs": [
      "https://github.com/egecan12",
      "https://www.linkedin.com/in/egecan-kahyaoglu/"
    ],
    "knowsAbout": [
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "Node.js",
      "Express",
      "MongoDB",
      "PostgreSQL",
      "MySQL",
      "Docker"
    ],
    "worksFor": {
      "@type": "Organization",
      "name": "Your Current Company" // Replace with your actual company name
    }
  };

  // Yedek proje verileri (API hatası durumunda kullanılacak)
  const fallbackProjects = [
    {
      id: 1,
      name: 'Location Notebook App',
      description: 'I developed this weeb app to help people save and organize their favorite places around the world. Many travelers and locals struggle to remember great restaurants, parks, cafes they\'ve discovered, so I wanted to create a platform where users can pin their favorite locations on a corkboard-style interface.',
      howBuilt: 'I built this application using Angular and TypeScript for the frontend architecture. The project features a responsive corkboard design with pinned location cards, each containing coordinates, descriptions, and photos. I implemented efficient data binding and component-based architecture that Angular provides, along with TypeScript\'s strong typing for better development experience and code reliability.',
      tech: ['#Angular', '#TypeScript', '#MEAN Stack', '#Docker'],
      github: 'https://github.com/egecan12/ReiseMerker',
      demo: 'https://reisemerker-client-93ff.onrender.com',
      readmeImage: '/images/pokedex-ss.png',
      videoSource: '/videos/location-notebook.mp4'
    },
    {
      id: 2,
      name: 'Delights of Constantinople (2019)',
      description: 'This was my very first project, developed in 2019. I built it to learn JavaScript and DOM manipulation by creating a game from scratch with Phaser.js. Although the architecture is far from perfect, I\'m happy that my first project still runs and brings back memories. It\'s a meaningful milestone for me, showing how far I\'ve come as a developer.',
      howBuilt: 'Built a 2D fighting game using Phaser.js framework. Features include multiple characters, special moves, and engaging gameplay mechanics.',
      tech: ['#JavaScript', '#HTML', '#PhaserJS', '#MongoDB'],
      github: 'https://github.com/egecan12/PhaserJS-Delight-Fighter',
      demo: 'https://web-game-delight-fighter.onrender.com/',
      readmeImage: '/images/delight-fighter.png',
      videoSource: '/videos/delights-of-cons.mp4'
    },
    {
      id: 3,
      name: 'Website Tracker API',
      description: 'I created this project to automate website monitoring for businesses. Many companies need real-time tracking of competitor websites and important updates without manual checking.',
      howBuilt: 'I developed this using Node.js and Express.js backend with MongoDB for data storage. The system includes advanced web scraping algorithms, SMS notifications via Twilio, and Google Sheets integration for detailed reporting.',
      tech: ['#Node.js', '#Express.js', '#MongoDB', '#Twilio', '#Web Scraping'],
      github: 'https://github.com/egecan12/Website-Monitoring-System',
      demo: 'https://website-change-tracker.onrender.com',
      readmeImage: '/images/web-tracking.png'
    },
    {
      id: 5,
      name: 'Diffinity App',
      description: 'A modern text comparison tool for macOS built with SwiftUI. Features include real-time diff highlighting, character-level comparison, line numbers, dark/light mode support, and native macOS integration.',
      tech: ['Swift', 'SwiftUI', 'macOS', 'Xcode'],
      github: 'https://github.com/egecan12/Diffinity',
      demo: null,
      readmeImage: '/images/diffinity-banner.png'
    },
    {
      id: 6,
      name: 'Anatolian Tiger',
      description: 'A mobile game developed with Unity, featuring engaging gameplay mechanics and immersive graphics. The game showcases advanced game development techniques and cross-platform compatibility.',
      tech: ['Unity', 'C#', 'Game Development', 'Mobile'],
      github: 'https://github.com/egecan12/Anatolia_Mobile_Game',
      demo: 'https://play.unity.com/en/games/56dd7836-6490-4042-91c4-99274e46870c/webgl',
      readmeImage: '/images/anatolia.png'
    }
  ];



  // Applications data with platform information only
  const applications = [
    {
      name: 'AI-Integrated Pokedex',
      platform: 'Web',
      icon: '/images/pokedex.png',
      github: 'https://egecan12.github.io/Ai-Integrated-Pokedex/'
    },
    {
      name: 'ProdTrack',
      platform: 'React Native & Web',
      icon: '/images/prodtrack-icon.png',
      github: 'https://github.com/egecan12/Production-Tracking-System'
    },
    {
      name: 'Diffinity',
      platform: 'Mac',
      icon: '/images/diffinity.png',
      github: 'https://github.com/egecan12/Diffinity'
    },
    {
      name: 'Delights of Constantinople v2',
      platform: 'Web',
      icon: '/images/anatolia-game.png',
      github: 'https://play.unity.com/en/games/56dd7836-6490-4042-91c4-99274e46870c/webgl'
    }
  ];

  return (
    <Box>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <Navbar />

      {/* Hero Section */}
      <Box
        sx={{
          py: 12,
          background: 'linear-gradient(to right, #0f2027, #203a43, #2c5364)',
          color: 'white'
        }}
      >
        <Container maxWidth="lg">
          <Stack direction={{ xs: 'column', md: 'row' }} alignItems="center" spacing={4}>
            <Box sx={{ textAlign: { xs: 'center', md: 'left' }, flex: 1 }}>
              <Typography variant="h2" fontWeight="bold" mb={2}>
                Hello, I'm Egecan Kahyaoglu
              </Typography>
              <Typography variant="h5" mb={4} sx={{ maxWidth: '800px' }}>
                MSc Software Engineer
              </Typography>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ justifyContent: { xs: 'center', md: 'flex-start' } }}>
                <Button 
                  variant="contained" 
                  size="large" 
                  endIcon={<ArrowForwardIcon />}
                  href="#projects"
                  sx={{ 
                    bgcolor: '#2c5364', 
                    '&:hover': { bgcolor: '#203a43' }
                  }}
                >
                  View My Work
                </Button>
                <Button 
                  variant="outlined" 
                  size="large"
                  href="#contact"
                  sx={{ 
                    color: 'white', 
                    borderColor: 'white',
                    '&:hover': { borderColor: '#90caf9', color: '#90caf9' }
                  }}
                >
                  Contact Me
                </Button>
              </Stack>
            </Box>
            
            <Box
              sx={{
                position: 'relative',
                width: { xs: 250, sm: 300, md: 350 },
                height: { xs: 250, sm: 300, md: 350 },
                borderRadius: '50%',
                overflow: 'hidden',
                border: '4px solid rgba(255, 255, 255, 0.2)',
                boxShadow: '0 8px 30px rgba(0, 0, 0, 0.3)',
                mt: { xs: 4, md: 0 }
              }}
            >
              <Image
                src={profileImage}
                alt="Egecan Kahyaoglu"
                fill
                priority
                style={{ objectFit: 'cover' }}
              />
            </Box>
          </Stack>
        </Container>
      </Box>

      {/* About Section */}
      <Box id="about" sx={{ py: 10 }}>
        <Container maxWidth="lg">
          <Typography variant="h3" fontWeight="bold" mb={1}>
            About My Journey
          </Typography>
          <Divider sx={{ mb: 4 }} />
          
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={4}>
            <Box flex={1}>
              <Typography variant="body1" paragraph>
                Hi there! I've been working with web technologies for over 5 years now. I started with JavaScript and PHP, then fell in love with React ecosystem. At my previous job, I built several e-commerce platforms using Node.js and MongoDB, and I'm quite proud of how they turned out!
              </Typography>
              <Typography variant="body1" paragraph>
                Recently, I've been using Next.js and TypeScript for most of my projects - they make my code much more reliable. I've also got hands-on experience with database systems like PostgreSQL and MySQL from my time working at a fintech startup. For DevOps stuff, I'm comfortable with Docker, GitLab CI/CD, and have set up monitoring with Grafana.
              </Typography>
              <Typography variant="body1" paragraph>
                After spending 8 amazing years working in Canada, currently working in Berlin. I'm fluent in English and Türkish, and intermediate in Deutsch, which has been incredibly helpful in my international career journey. 
              </Typography>
              <Typography variant="body1" paragraph>
                Outside of work, I enjoy tinkering with C# and Unity - I've made a couple of small games just for fun. When I'm not coding, you'll probably find me hiking or trying to cook something new!
              </Typography>
            </Box>
            
            <Box flex={1}>
              <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
                <Typography variant="h6" fontWeight="bold" mb={2}>
                  Skills & Technologies
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                  <Box sx={{ width: { xs: 'calc(33.333% - 16px)', sm: 'calc(25% - 16px)', md: 'calc(16.666% - 16px)' }, textAlign: 'center' }}>
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" alt="JavaScript" width="40" height="40" />
                    <Typography variant="caption" display="block">JavaScript</Typography>
                  </Box>
                  <Box sx={{ width: { xs: 'calc(33.333% - 16px)', sm: 'calc(25% - 16px)', md: 'calc(16.666% - 16px)' }, textAlign: 'center' }}>
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" alt="TypeScript" width="40" height="40" />
                    <Typography variant="caption" display="block">TypeScript</Typography>
                  </Box>
                  <Box sx={{ width: { xs: 'calc(33.333% - 16px)', sm: 'calc(25% - 16px)', md: 'calc(16.666% - 16px)' }, textAlign: 'center' }}>
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="React" width="40" height="40" />
                    <Typography variant="caption" display="block">React</Typography>
                  </Box>
                  <Box sx={{ width: { xs: 'calc(33.333% - 16px)', sm: 'calc(25% - 16px)', md: 'calc(16.666% - 16px)' }, textAlign: 'center' }}>
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" alt="Next.js" width="40" height="40" />
                    <Typography variant="caption" display="block">Next.js</Typography>
                  </Box>
                  <Box sx={{ width: { xs: 'calc(33.333% - 16px)', sm: 'calc(25% - 16px)', md: 'calc(16.666% - 16px)' }, textAlign: 'center' }}>
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" alt="Node.js" width="40" height="40" />
                    <Typography variant="caption" display="block">Node.js</Typography>
                  </Box>
                  <Box sx={{ width: { xs: 'calc(33.333% - 16px)', sm: 'calc(25% - 16px)', md: 'calc(16.666% - 16px)' }, textAlign: 'center' }}>
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" alt="Express" width="40" height="40" />
                    <Typography variant="caption" display="block">Express</Typography>
                  </Box>
                  <Box sx={{ width: { xs: 'calc(33.333% - 16px)', sm: 'calc(25% - 16px)', md: 'calc(16.666% - 16px)' }, textAlign: 'center' }}>
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" alt="MongoDB" width="40" height="40" />
                    <Typography variant="caption" display="block">MongoDB</Typography>
                  </Box>
                  <Box sx={{ width: { xs: 'calc(33.333% - 16px)', sm: 'calc(25% - 16px)', md: 'calc(16.666% - 16px)' }, textAlign: 'center' }}>
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" alt="PostgreSQL" width="40" height="40" />
                    <Typography variant="caption" display="block">PostgreSQL</Typography>
                  </Box>
                  <Box sx={{ width: { xs: 'calc(33.333% - 16px)', sm: 'calc(25% - 16px)', md: 'calc(16.666% - 16px)' }, textAlign: 'center' }}>
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" alt="MySQL" width="40" height="40" />
                    <Typography variant="caption" display="block">MySQL</Typography>
                  </Box>
                  <Box sx={{ width: { xs: 'calc(33.333% - 16px)', sm: 'calc(25% - 16px)', md: 'calc(16.666% - 16px)' }, textAlign: 'center' }}>
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoftsqlserver/microsoftsqlserver-plain.svg" alt="SQL Server" width="40" height="40" />
                    <Typography variant="caption" display="block">SQL Server</Typography>
                  </Box>
                  <Box sx={{ width: { xs: 'calc(33.333% - 16px)', sm: 'calc(25% - 16px)', md: 'calc(16.666% - 16px)' }, textAlign: 'center' }}>
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg" alt="Redis" width="40" height="40" />
                    <Typography variant="caption" display="block">Redis</Typography>
                  </Box>
                  <Box sx={{ width: { xs: 'calc(33.333% - 16px)', sm: 'calc(25% - 16px)', md: 'calc(16.666% - 16px)' }, textAlign: 'center' }}>
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg" alt="C#" width="40" height="40" />
                    <Typography variant="caption" display="block">C#</Typography>
                  </Box>
                  <Box sx={{ width: { xs: 'calc(33.333% - 16px)', sm: 'calc(25% - 16px)', md: 'calc(16.666% - 16px)' }, textAlign: 'center' }}>
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg" alt="PHP" width="40" height="40" />
                    <Typography variant="caption" display="block">PHP</Typography>
                  </Box>
                  <Box sx={{ width: { xs: 'calc(33.333% - 16px)', sm: 'calc(25% - 16px)', md: 'calc(16.666% - 16px)' }, textAlign: 'center' }}>
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" alt="CSS3" width="40" height="40" />
                    <Typography variant="caption" display="block">CSS3</Typography>
                  </Box>
                  <Box sx={{ width: { xs: 'calc(33.333% - 16px)', sm: 'calc(25% - 16px)', md: 'calc(16.666% - 16px)' }, textAlign: 'center' }}>
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg" alt="Redux" width="40" height="40" />
                    <Typography variant="caption" display="block">Redux</Typography>
                  </Box>
                  <Box sx={{ width: { xs: 'calc(33.333% - 16px)', sm: 'calc(25% - 16px)', md: 'calc(16.666% - 16px)' }, textAlign: 'center' }}>
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/npm/npm-original-wordmark.svg" alt="npm" width="40" height="40" />
                    <Typography variant="caption" display="block">npm</Typography>
                  </Box>
                  <Box sx={{ width: { xs: 'calc(33.333% - 16px)', sm: 'calc(25% - 16px)', md: 'calc(16.666% - 16px)' }, textAlign: 'center' }}>
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" alt="Docker" width="40" height="40" />
                    <Typography variant="caption" display="block">Docker</Typography>
                  </Box>
                  <Box sx={{ width: { xs: 'calc(33.333% - 16px)', sm: 'calc(25% - 16px)', md: 'calc(16.666% - 16px)' }, textAlign: 'center' }}>
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/digitalocean/digitalocean-original.svg" alt="DigitalOcean" width="40" height="40" />
                    <Typography variant="caption" display="block">DigitalOcean</Typography>
                  </Box>
                  <Box sx={{ width: { xs: 'calc(33.333% - 16px)', sm: 'calc(25% - 16px)', md: 'calc(16.666% - 16px)' }, textAlign: 'center' }}>
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/gitlab/gitlab-original.svg" alt="GitLab" width="40" height="40" />
                    <Typography variant="caption" display="block">GitLab</Typography>
                  </Box>
                  <Box sx={{ width: { xs: 'calc(33.333% - 16px)', sm: 'calc(25% - 16px)', md: 'calc(16.666% - 16px)' }, textAlign: 'center' }}>
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg" alt="Jenkins" width="40" height="40" />
                    <Typography variant="caption" display="block">Jenkins</Typography>
                  </Box>
                  <Box sx={{ width: { xs: 'calc(33.333% - 16px)', sm: 'calc(25% - 16px)', md: 'calc(16.666% - 16px)' }, textAlign: 'center' }}>
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/grafana/grafana-original.svg" alt="Grafana" width="40" height="40" />
                    <Typography variant="caption" display="block">Grafana</Typography>
                  </Box>
                  <Box sx={{ width: { xs: 'calc(33.333% - 16px)', sm: 'calc(25% - 16px)', md: 'calc(16.666% - 16px)' }, textAlign: 'center' }}>
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/unity/unity-original.svg" alt="Unity" width="40" height="40" />
                    <Typography variant="caption" display="block">Unity</Typography>
                  </Box>
                </Box>
              </Paper>
            </Box>
          </Stack>
        </Container>
      </Box>

      {/* Projects Section */}
      <Box id="projects" sx={{ 
        py: 10, 
        background: 'linear-gradient(to right, #0f2027, #203a43, #2c5364)',
        color: 'white',
        position: 'relative',
        overflow: 'visible' 
      }}>
        <Container maxWidth="lg">
          <Typography variant="h3" fontWeight="bold" mb={3} color="white" textAlign="center">
            Recent Projects
          </Typography>
          
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 6 }}>
              <CircularProgress size={60} thickness={4} />
            </Box>
          ) : (
            <Box sx={{ position: 'relative' }}>
              {/* Navigation Arrows */}
              <IconButton
                onClick={handlePrevious}
                sx={{
                  position: 'fixed',
                  left: { xs: 20, sm: 40, md: 60, lg: 80 },
                  top: '50vh',
                  transform: 'translateY(-50%)',
                  
                  // Glassmorphism design
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.15), rgba(255,255,255,0.05))',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  
                  // Shape and size
                  width: { xs: 56, sm: 64, md: 72 },
                  height: { xs: 56, sm: 64, md: 72 },
                  borderRadius: '50%',
                  
                  // Colors and effects
                  color: '#fff',
                  zIndex: 1000,
                  
                  // Modern shadows
                  boxShadow: `
                    0 8px 32px rgba(0,0,0,0.12),
                    0 0 0 1px rgba(255,255,255,0.05),
                    inset 0 1px 0 rgba(255,255,255,0.1)
                  `,
                  
                  // Smooth transitions
                  transition: 'all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)',
                  
                  '&:hover': {
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.25), rgba(255,255,255,0.15))',
                    transform: 'translateY(-50%) scale(1.15)',
                    boxShadow: `
                      0 16px 48px rgba(0,0,0,0.2),
                      0 0 0 1px rgba(255,255,255,0.1),
                      inset 0 1px 0 rgba(255,255,255,0.2)
                    `,
                    '& .MuiSvgIcon-root': {
                      transform: 'translateX(-2px)'
                    }
                  },
                  
                  '&:active': {
                    transform: 'translateY(-50%) scale(0.95)',
                    transition: 'all 0.1s ease'
                  },
                  
                  '@media (max-width: 960px)': {
                    left: 24,
                    top: '45vh',
                    width: 64,
                    height: 64,
                    '&:hover': {
                      transform: 'translateY(-50%) scale(1.1)'
                    },
                    '&:active': {
                      transform: 'translateY(-50%) scale(0.95)'
                    }
                  }
                }}
              >
                <ArrowBackIosIcon sx={{ 
                  fontSize: { xs: 24, sm: 26, md: 28 },
                  transition: 'transform 0.3s ease',
                  filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))'
                }} />
              </IconButton>

              <IconButton
                onClick={handleNext}
                sx={{
                  position: 'fixed',
                  right: { xs: 20, sm: 40, md: 60, lg: 80 },
                  top: '50vh',
                  transform: 'translateY(-50%)',
                  
                  // Glassmorphism design
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.15), rgba(255,255,255,0.05))',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  
                  // Shape and size
                  width: { xs: 56, sm: 64, md: 72 },
                  height: { xs: 56, sm: 64, md: 72 },
                  borderRadius: '50%',
                  
                  // Colors and effects
                  color: '#fff',
                  zIndex: 1000,
                  
                  // Modern shadows
                  boxShadow: `
                    0 8px 32px rgba(0,0,0,0.12),
                    0 0 0 1px rgba(255,255,255,0.05),
                    inset 0 1px 0 rgba(255,255,255,0.1)
                  `,
                  
                  // Smooth transitions
                  transition: 'all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)',
                  
                  '&:hover': {
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.25), rgba(255,255,255,0.15))',
                    transform: 'translateY(-50%) scale(1.15)',
                    boxShadow: `
                      0 16px 48px rgba(0,0,0,0.2),
                      0 0 0 1px rgba(255,255,255,0.1),
                      inset 0 1px 0 rgba(255,255,255,0.2)
                    `,
                    '& .MuiSvgIconRoot': {
                      transform: 'translateX(2px)'
                    }
                  },
                  
                  '&:active': {
                    transform: 'translateY(-50%) scale(0.95)',
                    transition: 'all 0.1s ease'
                  },
                  
                  '@media (max-width: 960px)': {
                    right: 24,
                    top: '45vh',
                    width: 64,
                    height: 64,
                    '&:hover': {
                      transform: 'translateY(-50%) scale(1.1)'
                    },
                    '&:active': {
                      transform: 'translateY(-50%) scale(0.95)'
                    }
                  }
                }}
              >
                <ArrowForwardIosIcon sx={{ 
                  fontSize: { xs: 24, sm: 26, md: 28 },
                  transition: 'transform 0.3s ease',
                  filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))'
                }} />
              </IconButton>

              <Paper 
                elevation={3}
                sx={{ 
                  backgroundColor: '#4a5568',
                  borderRadius: 3,
                  overflow: 'hidden',
                  mx: { xs: 1, sm: 2, md: 3 }
                }}
              >
                {/* Project Counter */}
                <Box sx={{ 
                  position: 'absolute', 
                  top: 20, 
                  right: 20, 
                  zIndex: 10,
                  display: 'flex',
                  gap: 1
                }}>
                  {fallbackProjects.map((_, index) => (
                    <Box
                      key={index}
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        backgroundColor: index === currentProjectIndex ? '#3b82f6' : 'rgba(255, 255, 255, 0.3)',
                        transition: 'all 0.3s ease'
                      }}
                    />
                  ))}
                </Box>

                <Box sx={{ 
                  display: { xs: 'block', md: 'flex' }, 
                  minHeight: { xs: 'auto', md: '500px' },
                  flexDirection: { xs: 'column', md: 'row' }
                }}>
                  {/* Karousel'da her seferinde tek proje gösterecek */}
                  {(() => {
                    const currentProject = fallbackProjects[currentProjectIndex];
                    return (
                      <>
                        {/* Sol Taraf - Video/Demo/GitHub Row */}
                        <Box sx={{ 
                          flex: 1, 
                          p: { xs: 2, md: 3 },
                          mb: { xs: 3, md: 0 }
                        }}>
                          {/* Browser Header */}
                          <Box 
                            sx={{
                              backgroundColor: '#2d3748',
                              borderRadius: '8px 8px 0 0',
                              p: 1,
                              display: 'flex',
                              alignItems: 'center',
                              gap: 1,
                              mb: 0
                            }}
                          >
                            <Box sx={{ width: 12, height: 12, backgroundColor: '#ef4444', borderRadius: '50%' }} />
                            <Box sx={{ width: 12, height: 12, backgroundColor: '#f59e0b', borderRadius: '50%' }} />
                            <Box sx={{ width: 12, height: 12, backgroundColor: '#10b981', borderRadius: '50%' }} />
                            <Box sx={{ flexGrow: 1 }} />
                            <Typography sx={{ color: '#9ca3af', fontSize: '0.8rem' }}>
                              My Projects
                            </Typography>
                          </Box>

                          {/* Video Player */}
                          <Box 
                            sx={{
                              backgroundColor: '#000',
                              borderRadius: '0 0 8px 8px',
                              overflow: 'hidden',
                              mb: 3
                            }}
                          >
                            {currentProject.videoSource ? (
                              // Special mobile mockup for Location Notebook
                              currentProject.id === 1 ? (
                                <Box sx={{ 
                                  display: 'flex', 
                                  justifyContent: 'center', 
                                  p: { xs: 2, md: 3 }
                                }}>
                                  {/* Mobile Phone Frame */}
                                  <Box
                                    sx={{
                                      width: { xs: 240, sm: 280 },
                                      height: { xs: 480, sm: 560 },
                                      backgroundColor: '#1a1a1a',
                                      borderRadius: '25px',
                                      padding: '8px',
                                      boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                                      position: 'relative',
                                      '&::before': {
                                        content: '""',
                                        position: 'absolute',
                                        top: '15px',
                                        left: '50%',
                                        transform: 'translateX(-50%)',
                                        width: '60px',
                                        height: '4px',
                                        backgroundColor: '#333',
                                        borderRadius: '2px'
                                      }
                                    }}
                                  >
                                    {/* Screen */}
                                    <Box
                                      sx={{
                                        width: '100%',
                                        height: '100%',
                                        backgroundColor: '#000',
                                        borderRadius: '20px',
                                        overflow: 'hidden',
                                        position: 'relative'
                                      }}
                                  >
                                      <video
                                        style={{
                                          width: '100%',
                                          height: '100%',
                                          objectFit: 'cover'
                                        }}
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                      >
                                        <source src={currentProject.videoSource} type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>
                                      
                                      {/* Home Indicator */}
                                      <Box
                                        sx={{
                                          position: 'absolute',
                                          bottom: '8px',
                                          left: '50%',
                                          transform: 'translateX(-50%)',
                                          width: '120px',
                                          height: '4px',
                                          backgroundColor: 'rgba(255,255,255,0.3)',
                                          borderRadius: '2px'
                                        }}
                                      />
                                    </Box>
                                  </Box>
                                </Box>
                              ) : (
                                // Regular video player for other projects
                                <Box
                                  sx={{
                                    aspectRatio: '16/9',
                                    backgroundColor: '#000',
                                    position: 'relative'
                                  }}
                                >
                                  <video
                                    style={{
                                      width: '100%',
                                      height: '100%',
                                      objectFit: 'cover'
                                    }}
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                  >
                                    <source src={currentProject.videoSource} type="video/mp4" />
                                    Your browser does not support the video tag.
                                  </video>
                                </Box>
                              )
                            ) : (
                              <Box
                                sx={{
                                  aspectRatio: '16/9',
                                  backgroundColor: '#000',
                                  position: 'relative',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  backgroundImage: `url(${currentProject.readmeImage})`,
                                  backgroundSize: 'cover',
                                  backgroundPosition: 'center',
                                }}
                              >
                                {/* Play Button Overlay */}
                                <Box
                                  sx={{
                                    width: 80,
                                    height: 80,
                                    borderRadius: '50%',
                                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease',
                                    '&:hover': {
                                      backgroundColor: '#fff',
                                      transform: 'scale(1.1)'
                                    }
                                  }}
                                >
                                  <PlayArrowIcon 
                                    sx={{ 
                                      fontSize: 40, 
                                      color: '#000',
                                      ml: 0.5 
                                    }} 
                                  />
                                </Box>
                              </Box>
                            )}
                          </Box>

                          {/* Large Action Buttons */}
                          <Box sx={{ 
                            display: 'flex', 
                            gap: 2,
                              flexDirection: { xs: 'column', sm: 'row' }
                          }}>
                            {currentProject.demo && (
                              <Button
                                variant="contained"
                                href={currentProject.demo}
                                target="_blank"
                                sx={{
                                  backgroundColor: '#3b82f6',
                                  color: 'white',
                                  flex: 1,
                                  py: 1.5,
                                  '&:hover': { backgroundColor: '#2563eb' }
                                }}
                              >
                                Demo
                              </Button>
                            )}
                            <Button
                              variant="outlined"
                              startIcon={<GitHubIcon />}
                              href={currentProject.github}
                              target="_blank"
                              sx={{
                                borderColor: '#9ca3af',
                                color: '#d1d5db',
                                flex: 1,
                                py: 1.5,
                                '&:hover': {
                                  borderColor: '#6b7280',
                                  backgroundColor: 'rgba(255,255,255,0.1)'
                                }
                              }}
                            >
                              GitHub
                            </Button>
                          </Box>
                        </Box>

                        {/* Sağ Taraf - Text Content Row */}
                        <Box sx={{ 
                          flex: 1, 
                          p: { xs: 2, md: 4 }, 
                          display: 'flex', 
                          flexDirection: 'column', 
                          justifyContent: 'center' 
                        }}>
                          {/* Project Title */}
                          <Typography 
                            variant="h4" 
                            fontWeight="bold" 
                            mb={4}
                            sx={{ 
                              color: '#60a5fa', 
                              fontSize: { xs: '1.5rem', md: '2rem' }
                            }}
                          >
                            {currentProject.name}
                          </Typography>

                          {/* Why I built this project */}
                          <Box sx={{ mb: 4 }}>
                            <Typography 
                              variant="h6" 
                              fontWeight="bold" 
                              mb={3}
                              sx={{ 
                                color: '#fff',
                                fontSize: '1.2rem'
                              }}
                            >
                              Why I built this project
                            </Typography>
                            <Typography 
                              sx={{ 
                                color: '#cbd5e0',
                                lineHeight: 1.8,
                                fontSize: '1rem'
                              }}
                            >
                              {currentProject.description}
                            </Typography>
                          </Box>

                          {/* How I built it */}
                          <Box sx={{ mb: 4 }}>
                            <Typography 
                              variant="h6" 
                              fontWeight="bold" 
                              mb={3}
                              sx={{ 
                                color: '#fff',
                                fontSize: '1.2rem'
                              }}
                            >
                              How I built it
                            </Typography>
                            <Typography 
                              sx={{ 
                                color: '#cbd5e0',
                                lineHeight: 1.8,
                                fontSize: '1rem',
                                mb: 4
                              }}
                            >
                              {currentProject.howBuilt || 'Built using modern web technologies and best practices.'}
                            </Typography>

                            {/* Technology Tags */}
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
                              {currentProject.tech.map((tech, techIndex) => (
                                <Box
                                  key={techIndex}
                                  sx={{
                                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                                    border: '1px solid rgba(59, 130, 246, 0.3)',
                                    borderRadius: '20px',
                                    px: 2,
                                    py: 1,
                                  }}
                                >
                                  <Typography
                                    sx={{
                                      color: '#60a5fa',
                                      fontSize: '0.9rem',
                                      fontWeight: 500
                                    }}
                                  >
                                    {tech}
                                  </Typography>
                                </Box>
                              ))}
                            </Box>
                          </Box>
                        </Box>
                      </>
                    );
                  })()}
                </Box>
              </Paper>
            </Box>
          )}
        </Container>
      </Box>

      {/* Applications Section */}
      <Box id="applications" sx={{ 
        py: 10, 
        background: 'linear-gradient(135deg, #9b59b6 0%, #8e44ad 50%, #6c3483 100%)',
        boxShadow: 'inset 0 0 30px rgba(0,0,0,0.2)'
      }}>
        <Container maxWidth="lg">
          <Typography variant="h3" fontWeight="bold" mb={3} color="white" textAlign="center">
            My Applications
          </Typography>
          
          <Box sx={{ 
            display: 'grid', 
            gridTemplateColumns: { xs: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
            justifyContent: 'center',
            gap: { xs: 2, sm: 3, md: 4 },
            mt: 6,
            px: { xs: 2, md: 0 }
          }}>
            {applications.map((app, index) => (
              <Box 
                key={index} 
                component="a"
                href={app.github}
                target="_blank"
                sx={{ 
                  textDecoration: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  width: '100%'
                }}
              >
                <Box 
                  sx={{ 
                    p: { xs: 2, md: 3 },
                    width: { xs: 120, md: 180 },
                    height: { xs: 120, md: 180 },
                    display: 'flex', 
                    justifyContent: 'center',
                    alignItems: 'center',
                    background: 'rgba(255,255,255,0.15)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: '20px',
                    boxShadow: '0 15px 35px rgba(0,0,0,0.2)',
                    transition: 'transform 0.2s ease-out',
                    '&:hover': {
                      transform: 'translateY(-10px)',
                      boxShadow: '0 25px 45px rgba(0,0,0,0.3)',
                    }
                  }}
                >
                  <Box 
                    component="img" 
                    src={app.icon} 
                    alt={app.name} 
                    sx={{ 
                      width: { xs: 80, md: 120 }, 
                      height: { xs: 80, md: 120 },
                      objectFit: 'contain',
                      filter: 'drop-shadow(0 5px 15px rgba(0,0,0,0.2))',
                      transition: 'transform 0.2s ease-out',
                      '&:hover': {
                        transform: 'scale(1.1)'
                      }
                    }}
                  />
                </Box>
                <Box sx={{ mt: { xs: 1, md: 2 }, textAlign: 'center' }}>
                  <Typography variant="h6" fontWeight="bold" color="white" sx={{ 
                    mb: 0.5,
                    fontSize: { xs: '0.9rem', md: '1.25rem' }
                  }}>
                    {app.name}
                  </Typography>
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    gap: 0.5
                  }}>
                    {app.platform === 'Mac' && (
                      <AppleIcon sx={{ color: 'rgba(255,255,255,0.7)', fontSize: { xs: 16, md: 20 } }} />
                    )}
                    {app.platform === 'Web' && (
                      <>
                        <PublicIcon sx={{ color: 'rgba(255,255,255,0.7)', fontSize: { xs: 16, md: 20 } }} />
                        {app.name === 'Anatolia Game' && (
                          <SportsEsportsIcon sx={{ color: 'rgba(255,255,255,0.7)', fontSize: { xs: 16, md: 20 } }} />
                        )}
                      </>
                    )}
                    {app.platform === 'React Native & Web' && (
                      <>
                        <AndroidIcon sx={{ color: 'rgba(255,255,255,0.7)', fontSize: { xs: 16, md: 20 } }} />
                        <PhoneIphoneIcon sx={{ color: 'rgba(255,255,255,0.7)', fontSize: { xs: 16, md: 20 } }} />
                        <PublicIcon sx={{ color: 'rgba(255,255,255,0.7)', fontSize: { xs: 16, md: 20 } }} />
                      </>
                    )}
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
          
          {/* Decorative elements */}
          <Box sx={{ 
            mt: 8, 
            height: '40px', 
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
            borderRadius: '20px'
          }} />
        </Container>
      </Box>

      {/* Contact Section */}
      <Box id="contact" sx={{ py: 10, bgcolor: '#4602b3' }}>
        <Container maxWidth="lg">
          <Typography variant="h3" fontWeight="bold" mb={1} color="white" textAlign="center">
            Get In Touch
          </Typography>
          <Divider sx={{ mb: 4, bgcolor: 'rgba(255, 255, 255, 0.2)' }} />
          
          <Box sx={{ maxWidth: '700px', mx: 'auto', textAlign: 'center' }}>
            <Typography variant="body1" paragraph color="white">
              I'm currently open to new opportunities and collaborations. Whether you have a question, a project idea, 
              or just want to connect, feel free to reach out!
            </Typography>
            
            <Stack 
              direction={{ xs: 'column', sm: 'row' }} 
              spacing={2} 
              justifyContent="center"
              my={4}
            >
              <Button 
                variant="contained" 
                startIcon={<LinkedInIcon />}
                href="https://www.linkedin.com/in/egecan-kahyaoglu/"
                target="_blank"
                sx={{ bgcolor: '#2c5364', '&:hover': { bgcolor: '#203a43' } }}
              >
                Connect on LinkedIn
              </Button>
            </Stack>
          </Box>
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{ py: 6, bgcolor: '#0f2027', color: 'white' }}>
        <Container maxWidth="lg">
          <Stack 
            direction={{ xs: 'column', md: 'row' }} 
            justifyContent="space-between"
            alignItems="center"
            spacing={2}
          >
            <Typography variant="body2">
              © {new Date().getFullYear()} Egecan Kahyaoglu. All rights reserved.
            </Typography>
            
            <Stack direction="row" spacing={1}>
              <IconButton 
                aria-label="github" 
                sx={{ color: 'white' }}
                href="https://github.com/egecan12"
          target="_blank"
              >
                <GitHubIcon />
              </IconButton>
              <IconButton 
                aria-label="linkedin" 
                sx={{ color: 'white' }}
                href="https://www.linkedin.com/in/egecan-kahyaoglu/"
                target="_blank"
              >
                <LinkedInIcon />
              </IconButton>
            </Stack>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}