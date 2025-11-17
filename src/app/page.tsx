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
import { getDeveloperApps, type PlayStoreApp } from '@/lib/playstore';
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
  const [androidApps, setAndroidApps] = useState<PlayStoreApp[]>([]);
  const [loadingApps, setLoadingApps] = useState(true);
  
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

  // Manuel Android uygulamaları listesi
  const fallbackAndroidApps: PlayStoreApp[] = [
    {
      id: 'locationdiary',
      title: 'LocationDiary',
      description: 'Save and organize your favorite places around the world',
      icon: '/images/locationdiary.png',
      rating: 0,
      installCount: '0+',
      url: 'https://play.google.com/store/apps/dev?id=4826739613983721645',
      developer: 'Kahyaoglu Software',
      category: 'Travel & Local'
    }
  ];

  // Android uygulamaları için veri çekme
  useEffect(() => {
    // Şimdilik direkt manuel listeyi kullan
    setAndroidApps(fallbackAndroidApps);
    setLoadingApps(false);
    
    // İleride API entegrasyonu için:
    // async function fetchAndroidApps() {
    //   try {
    //     const apps = await getDeveloperApps('4826739613983721645');
    //     if (apps && apps.length > 0) {
    //       setAndroidApps(apps);
    //     } else {
    //       setAndroidApps(fallbackAndroidApps);
    //     }
    //   } catch (error) {
    //     console.error('Error fetching Android apps:', error);
    //     setAndroidApps(fallbackAndroidApps);
    //   } finally {
    //     setLoadingApps(false);
    //   }
    // }
    // fetchAndroidApps();
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
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
            <Typography variant="h3" fontWeight="bold">
              About My Journey
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography component="span" sx={{ fontSize: '2rem', lineHeight: 1 }}>
                🇹🇷
              </Typography>
              <Typography component="span" sx={{ fontSize: '2rem', lineHeight: 1 }}>
                🇨🇦
              </Typography>
              <Typography component="span" sx={{ fontSize: '2rem', lineHeight: 1 }}>
                🇩🇪
              </Typography>
            </Box>
          </Box>
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
                  position: 'absolute',
                  left: { xs: -10, sm: -20, md: -40, lg: -60 },
                  top: '50%',
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
                    left: 4,
                    top: '50%',
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
                  position: 'absolute',
                  right: { xs: -10, sm: -20, md: -40, lg: -60 },
                  top: '50%',
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
                    right: 4,
                    top: '50%',
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

      {/* Developer Accounts Section */}
      <Box id="developer-accounts" sx={{ py: 10, bgcolor: '#1a1a2e' }}>
        <Container maxWidth="lg">
          <Typography variant="h3" fontWeight="bold" mb={1} color="white" textAlign="center">
            Developer Accounts
          </Typography>
          <Divider sx={{ mb: 4, bgcolor: 'rgba(255, 255, 255, 0.2)' }} />
          
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: { xs: 'column', md: 'row' },
            gap: 4,
            mt: 6
          }}>
            {/* Android Developer Account Card */}
            <Card
              sx={{
                maxWidth: { xs: '100%', md: 500 },
                backgroundColor: '#2d2d44',
                borderRadius: 3,
                overflow: 'hidden',
                boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 20px 60px rgba(0,0,0,0.4)'
                }
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, gap: 3 }}>
                  <Box
                    sx={{
                      width: { xs: 80, md: 100 },
                      height: { xs: 80, md: 100 },
                      borderRadius: 2,
                      overflow: 'hidden',
                      backgroundColor: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}
                  >
                    <Image
                      src="/images/android-developer-logo.png"
                      alt="Kahyaoglu Software Android Developer"
                      width={100}
                      height={100}
                      style={{ objectFit: 'contain', padding: '8px' }}
                    />
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h5" fontWeight="bold" color="white" mb={1}>
                      Android Developer
                    </Typography>
                    <Typography variant="body2" color="rgba(255,255,255,0.7)">
                      Kahyaoglu Software
                    </Typography>
                  </Box>
                </Box>
                
                <Typography variant="body1" color="rgba(255,255,255,0.9)" paragraph sx={{ mb: 3 }}>
                  I've recently launched my Android developer account on Google Play Store! As a software engineer passionate about mobile development, 
                  I'm excited to share my Android applications with users worldwide. This marks a new chapter in my development journey, 
                  expanding beyond web and desktop applications into the mobile ecosystem.
                </Typography>
                
                <Typography variant="body2" color="rgba(255,255,255,0.7)" paragraph sx={{ mb: 3 }}>
                  Stay tuned for innovative Android apps built with modern technologies and best practices. 
                  I'm committed to creating high-quality, user-friendly mobile experiences.
                </Typography>
                
                <Button
                  variant="contained"
                  startIcon={<AndroidIcon />}
                  endIcon={<OpenInNewIcon />}
                  href="https://play.google.com/store/apps/dev?id=4826739613983721645"
                  target="_blank"
                  sx={{
                    backgroundColor: '#3ddc84',
                    color: '#000',
                    fontWeight: 'bold',
                    px: 3,
                    py: 1.5,
                    '&:hover': {
                      backgroundColor: '#34c271',
                    }
                  }}
                >
                  Visit Play Store Developer Page
                </Button>
              </CardContent>
            </Card>
          </Box>

          {/* Android Apps Grid */}
          {androidApps.length > 0 && (
            <Box sx={{ mt: 8 }}>
              <Typography variant="h4" fontWeight="bold" mb={3} color="white" textAlign="center">
                My Android Applications
              </Typography>
              
              {loadingApps ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', my: 6 }}>
                  <CircularProgress sx={{ color: '#3ddc84' }} />
                </Box>
              ) : (
                <Box sx={{ 
                  display: 'grid', 
                  gridTemplateColumns: { xs: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
                  justifyContent: 'center',
                  gap: { xs: 2, sm: 3, md: 4 },
                  mt: 6,
                  px: { xs: 2, md: 0 }
                }}>
                  {androidApps.map((app) => (
                    <Box 
                      key={app.id} 
                      component="a"
                      href={app.url || `https://play.google.com/store/apps/details?id=${app.id}`}
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
                        {app.icon ? (
                          <Box 
                            component="img" 
                            src={app.icon} 
                            alt={app.title} 
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
                            onError={(e: any) => {
                              // Icon yüklenemezse fallback icon göster
                              const img = e.target;
                              img.style.display = 'none';
                              const parent = img.parentElement;
                              if (parent && !parent.querySelector('.fallback-icon')) {
                                const fallback = document.createElement('div');
                                fallback.className = 'fallback-icon';
                                fallback.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 24 24" fill="rgba(255,255,255,0.7)"><path d="M17.523 15.3414c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5506 0 .9989.4482.9989.9993.0001.5511-.4483.9997-.9989.9997m-11.046 0c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5506 0 .9989.4482.9989.9993 0 .5511-.4483.9997-.9989.9997m11.4045-6.02l1.9973-3.4592a.416.416 0 00-.1521-.5671a.416.416 0 00-.5671.1521l-2.0223 3.503C15.5902 8.2439 13.8533 7.8508 12 7.8508s-3.5902.3931-5.1345 1.0757L4.8431 5.4235a.4161.4161 0 00-.5671-.1521a.4157.4157 0 00-.1521.5671l1.9973 3.4592C2.6889 11.186.8531 12.8508.8531 15.8508c0 .8542.6717 1.5757 1.5317 1.5757h18.2304c.86 0 1.5317-.7215 1.5317-1.5757c0-3-1.8358-4.664-4.6345-5.5294"/></svg>';
                                parent.appendChild(fallback);
                              }
                            }}
                          />
                        ) : (
                          <AndroidIcon sx={{ 
                            color: 'rgba(255,255,255,0.7)', 
                            fontSize: { xs: 64, md: 96 } 
                          }} />
                        )}
                      </Box>
                      <Box sx={{ mt: { xs: 1, md: 2 }, textAlign: 'center' }}>
                        <Typography variant="h6" fontWeight="bold" color="white" sx={{ 
                          mb: 0.5,
                          fontSize: { xs: '0.9rem', md: '1.25rem' }
                        }}>
                          {app.title}
                        </Typography>
                        <Box sx={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center', 
                          gap: 0.5
                        }}>
                          <AndroidIcon sx={{ color: 'rgba(255,255,255,0.7)', fontSize: { xs: 16, md: 20 } }} />
                          {app.rating > 0 && (
                            <>
                              <StarIcon sx={{ color: '#ffc107', fontSize: { xs: 14, md: 16 } }} />
                              <Typography variant="caption" color="rgba(255,255,255,0.7)" sx={{ fontSize: { xs: '0.7rem', md: '0.8rem' } }}>
                                {app.rating.toFixed(1)}
                              </Typography>
                            </>
                          )}
                        </Box>
                      </Box>
                    </Box>
                  ))}
                </Box>
              )}
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
            My Web Applications
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
                        {app.name === 'Delights of Constantinople v2' ? (
                          <SportsEsportsIcon sx={{ color: 'rgba(255,255,255,0.7)', fontSize: { xs: 16, md: 20 } }} />
                        ) : app.name === 'Anatolia Game' ? (
                          <SportsEsportsIcon sx={{ color: 'rgba(255,255,255,0.7)', fontSize: { xs: 16, md: 20 } }} />
                        ) : (
                          <PublicIcon sx={{ color: 'rgba(255,255,255,0.7)', fontSize: { xs: 16, md: 20 } }} />
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

      {/* Education Section */}
      <Box id="education" sx={{ py: 10, bgcolor: '#0f2027' }}>
        <Container maxWidth="lg">
          <Typography variant="h3" fontWeight="bold" mb={3} color="white" textAlign="center">
            Education
          </Typography>
          
          <Stack spacing={4} sx={{ mt: 6 }}>
            {/* M.Sc Software Engineering */}
            <Card sx={{ 
              backgroundColor: '#1a2332',
              borderLeft: '4px solid #3b82f6',
              transition: 'transform 0.2s ease',
              '&:hover': {
                transform: 'translateX(8px)',
              }
            }}>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 3 }}>
                  <Box sx={{ display: 'flex', gap: 3, flex: 1, alignItems: 'flex-start' }}>
                    <Box
                      sx={{
                        width: { xs: 60, md: 80 },
                        height: { xs: 60, md: 80 },
                        borderRadius: 2,
                        overflow: 'hidden',
                        backgroundColor: '#fff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        p: 1
                      }}
                    >
                      <Box 
                        component="img" 
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/University_of_applied_sciences_europe_-_Small_Logo.svg/1200px-University_of_applied_sciences_europe_-_Small_Logo.svg.png"
                        alt="UE Logo"
                        sx={{ 
                          width: '100%',
                          height: '100%',
                          objectFit: 'contain'
                        }}
                        onError={(e: any) => {
                          const target = e.target as HTMLImageElement;
                          if (!target.src.includes('placeholder')) {
                            target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80"%3E%3Crect fill="%233b82f6" width="80" height="80"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="24" fill="white"%3EUE%3C/text%3E%3C/svg%3E';
                          }
                        }}
                      />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="h5" fontWeight="bold" color="white" mb={1}>
                        M.Sc Software Engineering
                      </Typography>
                      <Typography variant="subtitle1" color="#90caf9" mb={1}>
                        Master Degree
                      </Typography>
                      <Typography variant="body1" color="rgba(255,255,255,0.8)">
                        University of Europe for Applied Sciences, Berlin, Germany 🇩🇪
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ 
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    border: '1px solid rgba(59, 130, 246, 0.3)',
                    borderRadius: '8px',
                    px: 2,
                    py: 1
                  }}>
                    <Typography variant="body2" color="#60a5fa" fontWeight="bold">
                      Sept. 2024 – Aug. 2025
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>

            {/* Computer Programming */}
            <Card sx={{ 
              backgroundColor: '#1a2332',
              borderLeft: '4px solid #10b981',
              transition: 'transform 0.2s ease',
              '&:hover': {
                transform: 'translateX(8px)',
              }
            }}>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 3 }}>
                  <Box sx={{ display: 'flex', gap: 3, flex: 1, alignItems: 'flex-start' }}>
                    <Box
                      sx={{
                        width: { xs: 60, md: 80 },
                        height: { xs: 60, md: 80 },
                        borderRadius: 2,
                        overflow: 'hidden',
                        backgroundColor: '#fff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        p: 1
                      }}
                    >
                      <Box 
                        component="img" 
                        src="https://www.eduopinions.com/wp-content/uploads/2018/09/GeorgianUniversity-logo.jpg"
                        alt="Georgian College Logo"
                        sx={{ 
                          width: '100%',
                          height: '100%',
                          objectFit: 'contain'
                        }}
                        onError={(e: any) => {
                          const target = e.target as HTMLImageElement;
                          if (!target.src.includes('placeholder')) {
                            target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80"%3E%3Crect fill="%2310b981" width="80" height="80"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="20" fill="white"%3EGC%3C/text%3E%3C/svg%3E';
                          }
                        }}
                      />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="h5" fontWeight="bold" color="white" mb={1}>
                        Computer Programming
                      </Typography>
                      <Typography variant="subtitle1" color="#90caf9" mb={1}>
                        Ontario College Diploma
                      </Typography>
                      <Typography variant="body1" color="rgba(255,255,255,0.8)">
                        Georgian College, Barrie, ON, Canada 🇨🇦
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ 
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    border: '1px solid rgba(16, 185, 129, 0.3)',
                    borderRadius: '8px',
                    px: 2,
                    py: 1
                  }}>
                    <Typography variant="body2" color="#34d399" fontWeight="bold">
                      Sept. 2018 – Aug. 2020
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>

            {/* Business Administration */}
            <Card sx={{ 
              backgroundColor: '#1a2332',
              borderLeft: '4px solid #f59e0b',
              transition: 'transform 0.2s ease',
              '&:hover': {
                transform: 'translateX(8px)',
              }
            }}>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 3 }}>
                  <Box sx={{ display: 'flex', gap: 3, flex: 1, alignItems: 'flex-start' }}>
                    {/* Two logos side by side */}
                    <Box sx={{ display: 'flex', gap: 1, flexDirection: 'column', flexShrink: 0 }}>
                      <Box
                        sx={{
                          width: { xs: 60, md: 80 },
                          height: { xs: 60, md: 80 },
                          borderRadius: 2,
                          overflow: 'hidden',
                          backgroundColor: '#fff',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          p: 1
                        }}
                      >
                        <Box 
                          component="img" 
                          src="https://4ab256ba.delivery.rocketcdn.me/wp-content/uploads/2024/12/Anadolu_University_imtiyaz_449518d815.png"
                          alt="Anadolu University Logo"
                          sx={{ 
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain'
                          }}
                          onError={(e: any) => {
                            const target = e.target as HTMLImageElement;
                            if (!target.src.includes('placeholder')) {
                              target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80"%3E%3Crect fill="%23f59e0b" width="80" height="80"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="20" fill="white"%3EAÜ%3C/text%3E%3C/svg%3E';
                            }
                          }}
                        />
                      </Box>
                      <Box
                        sx={{
                          width: { xs: 60, md: 80 },
                          height: { xs: 60, md: 80 },
                          borderRadius: 2,
                          overflow: 'hidden',
                          backgroundColor: '#fff',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          p: 1
                        }}
                      >
                        <Box 
                          component="img" 
                          src="https://upload.wikimedia.org/wikipedia/en/thumb/0/04/Utoronto_coa.svg/1200px-Utoronto_coa.svg.png"
                          alt="University of Toronto Logo"
                          sx={{ 
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain'
                          }}
                          onError={(e: any) => {
                            const target = e.target as HTMLImageElement;
                            if (!target.src.includes('placeholder')) {
                              target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80"%3E%3Crect fill="%23002a5c" width="80" height="80"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="18" fill="white"%3EUT%3C/text%3E%3C/svg%3E';
                            }
                          }}
                        />
                      </Box>
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="h5" fontWeight="bold" color="white" mb={1}>
                        Business Administration
                      </Typography>
                      <Typography variant="subtitle1" color="#90caf9" mb={1}>
                        Bachelor's Degree
                      </Typography>
                      <Typography variant="body1" color="rgba(255,255,255,0.8)" mb={1}>
                        Anadolu University, Eskisehir, Turkey 🇹🇷
                      </Typography>
                      <Typography variant="body2" color="rgba(255,255,255,0.6)" fontStyle="italic">
                        Equivalency: University of Toronto, Canada 🇨🇦
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ 
                    backgroundColor: 'rgba(245, 158, 11, 0.1)',
                    border: '1px solid rgba(245, 158, 11, 0.3)',
                    borderRadius: '8px',
                    px: 2,
                    py: 1
                  }}>
                    <Typography variant="body2" color="#fbbf24" fontWeight="bold">
                      Sept. 2013 – Jun. 2017
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Stack>
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