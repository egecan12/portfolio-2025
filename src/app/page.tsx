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
      name: 'AI-Integrated Pokedex',
      description: 'A modern Pokedex application that uses AI to detect and identify Pokemon in real-time using device camera. Features include real-time Pokemon detection, voice synthesis, PWA support, and detailed Pokemon stats.',
      tech: ['React', 'AI', 'PWA', 'Web APIs'],
      github: 'https://github.com/egecan12/Ai-Integrated-Pokedex',
      demo: 'https://egecan12.github.io/Ai-Integrated-Pokedex/',
      readmeImage: '/images/pokedex-ss.png'
    },
    {
      id: 2,
      name: 'Website Monitoring System',
      description: 'An API that monitors specific changes on webpages. Features include automated monitoring, email/SMS notifications, Google Sheets integration, and customizable tracking intervals.',
      tech: ['Node.js', 'MongoDB', 'Express.js', 'Twilio'],
      github: 'https://github.com/egecan12/Website-Monitoring-System',
      demo: 'https://website-change-tracker.onrender.com',
      readmeImage: '/images/web-tracking.png'
    },
    {
      id: 3,
      name: 'Production Tracking System',
      description: 'A comprehensive production tracking system built with React Native and web support. Helps businesses monitor and manage their production processes efficiently.',
      tech: ['React Native', 'Web', 'Node.js', 'MongoDB'],
      github: 'https://github.com/egecan12/Production-Tracking-System',
      demo: null,
      readmeImage: '/images/prodtrack-icon.png'
    },
    {
      id: 4,
      name: 'Delights of Constantinople',
      description: 'A 2D fighting game built with PhaserJS. Features include multiple characters, special moves, and engaging gameplay mechanics.',
      tech: ['PhaserJS', 'JavaScript', 'HTML5', 'CSS3'],
      github: 'https://github.com/egecan12/PhaserJS-Delight-Fighter',
      demo: 'https://web-game-delight-fighter.onrender.com/',
      readmeImage: '/images/delight-fighter.png'
    },
    {
      id: 5,
      name: 'Diffinity',
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

  // Demo article data - replace with your own
  const articles = [
    {
      title: 'Building a Modern Portfolio with Next.js and MUI',
      description: 'Learn how to create a professional developer portfolio using Next.js, TypeScript, and Material UI',
      date: 'June 15, 2023',
      link: 'https://yourblog.com/portfolio-tutorial'
    },
    {
      title: 'The Power of TypeScript in React Applications',
      description: 'Discover how TypeScript improves developer experience and code quality in React projects',
      date: 'May 3, 2023',
      link: 'https://yourblog.com/typescript-react'
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
            About Me
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
      <Box id="projects" sx={{ py: 10, bgcolor: '#c98a02' }}>
        <Container maxWidth="lg">
          <Typography variant="h3" fontWeight="bold" mb={1} color="inherit">
            Recent Projects
          </Typography>
          <Divider sx={{ mb: 4, bgcolor: 'rgba(0, 0, 0, 0.2)' }} />
          
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 6 }}>
              <CircularProgress size={60} thickness={4} />
            </Box>
          ) : (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
              {projects && projects.length > 0 ? (
                projects.map((project) => (
                  <Box 
                    key={project.id} 
                    sx={{ 
                      width: { 
                        xs: '100%', 
                        sm: 'calc(50% - 16px)', 
                        lg: 'calc(33.333% - 21.333px)' 
                      } 
                    }}
                  >
                    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                      <CardMedia
                        component="img"
                        height="140"
                        image={project.readmeImage}
                        alt={project.name}
                        sx={{ 
                          objectFit: "cover",
                          height: '200px',
                          backgroundColor: '#f5f5f5'
                        }}
                      />
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Typography variant="h5" component="div" fontWeight="bold" gutterBottom>
                          {project.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" paragraph>
                          {project.description}
                        </Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
                          {project.tech.map((tech) => (
                            <Chip 
                              key={tech} 
                              label={tech} 
                              size="small" 
                              variant="outlined"
                            />
                          ))}
                        </Box>
                      </CardContent>
                      <CardActions>
                        <Button 
                          size="small" 
                          startIcon={<GitHubIcon />} 
                          href={project.github}
                          target="_blank"
                        >
                          Code
                        </Button>
                        {project.demo && (
                          <Button 
                            size="small" 
                            startIcon={<OpenInNewIcon />} 
                            href={project.demo}
                            target="_blank"
                          >
                            Demo
                          </Button>
                        )}
                      </CardActions>
                    </Card>
                  </Box>
                ))
              ) : (
                // Yedek projeler (API hatası veya sonuç yoksa)
                fallbackProjects.map((project) => (
                  <Box 
                    key={project.id} 
                    sx={{ 
                      width: { 
                        xs: '100%', 
                        sm: 'calc(50% - 16px)', 
                        lg: 'calc(33.333% - 21.333px)' 
                      } 
                    }}
                  >
                    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                      <CardMedia
                        component="img"
                        height="140"
                        image={`https://opengraph.githubassets.com/1/yourusername/${project.name.toLowerCase().replace(/\s+/g, '-')}`}
                        alt={project.name}
                        sx={{ objectFit: "cover" }}
                      />
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Typography variant="h5" component="div" fontWeight="bold" gutterBottom>
                          {project.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" paragraph>
                          {project.description}
                        </Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
                          {project.tech.map((tech) => (
                            <Chip 
                              key={tech} 
                              label={tech} 
                              size="small" 
                              variant="outlined"
                            />
                          ))}
                        </Box>
                      </CardContent>
                      <CardActions>
                        <Button 
                          size="small" 
                          startIcon={<GitHubIcon />} 
                          href={project.github}
                          target="_blank"
                        >
                          Code
                        </Button>
                        {project.demo && (
                          <Button 
                            size="small" 
                            startIcon={<OpenInNewIcon />} 
                            href={project.demo}
                            target="_blank"
                          >
                            Demo
                          </Button>
                        )}
                      </CardActions>
                    </Card>
                  </Box>
                ))
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
            My Applications
          </Typography>
          
          <Box sx={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            justifyContent: 'center',
            gap: { xs: 4, md: 8 },
            mt: 6
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
                }}
              >
                <Box 
                  sx={{ 
                    p: 3,
                    width: 180,
                    height: 180,
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
                      width: 120, 
                      height: 120, 
                      objectFit: 'contain',
                      filter: 'drop-shadow(0 5px 15px rgba(0,0,0,0.2))',
                      transition: 'transform 0.2s ease-out',
                      '&:hover': {
                        transform: 'scale(1.1)'
                      }
                    }}
                  />
                </Box>
                <Box sx={{ mt: 2, textAlign: 'center' }}>
                  <Typography variant="h6" fontWeight="bold" color="white" sx={{ mb: 0.5 }}>
                    {app.name}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                    {app.platform === 'Mac' && (
                      <AppleIcon sx={{ color: 'rgba(255,255,255,0.7)', fontSize: 20 }} />
                    )}
                    {app.platform === 'Web' && (
                      <>
                        <PublicIcon sx={{ color: 'rgba(255,255,255,0.7)', fontSize: 20 }} />
                        {app.name === 'Anatolia Game' && (
                          <SportsEsportsIcon sx={{ color: 'rgba(255,255,255,0.7)', fontSize: 20 }} />
                        )}
                      </>
                    )}
                    {app.platform === 'React Native & Web' && (
                      <>
                        <AndroidIcon sx={{ color: 'rgba(255,255,255,0.7)', fontSize: 20 }} />
                        <PhoneIphoneIcon sx={{ color: 'rgba(255,255,255,0.7)', fontSize: 20 }} />
                        <PublicIcon sx={{ color: 'rgba(255,255,255,0.7)', fontSize: 20 }} />
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