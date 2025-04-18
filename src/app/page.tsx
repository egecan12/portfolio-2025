"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
// import { useTranslations } from 'next-intl';
import {
  Box,
  Button,
  Container,
  Typography,
  Divider,
  Stack,
  Avatar,
  IconButton,
  Chip,
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Paper,
  CircularProgress,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import CodeIcon from '@mui/icons-material/Code';
import StarIcon from '@mui/icons-material/Star';
import ForkRightIcon from '@mui/icons-material/ForkRight';
import Navbar from '@/components/Navbar';
import { getEnhancedUserRepos, type GithubRepo } from '@/lib/github';

export default function HomePage() {
  // const t = useTranslations('Index');
  const [projects, setProjects] = useState<Array<GithubRepo & { readmeImage: string | null }>>([]);
  const [loading, setLoading] = useState(true);
  
  // GitHub projeleri için veri çekme
  useEffect(() => {
    async function fetchProjects() {
      try {
        // Kullanıcı adını kendi kullanıcı adınızla değiştirin
        const repos = await getEnhancedUserRepos('egecan12');
        setProjects(repos);
      } catch (error) {
        console.error('Projeler yüklenirken hata oluştu:', error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchProjects();
  }, []);
  
  // Yedek proje verileri (API hatası durumunda kullanılacak)
  const fallbackProjects = [
    {
      id: 1,
      name: 'Portfolio Website',
      description: 'A personal portfolio website built with Next.js and Material UI',
      tech: ['Next.js', 'TypeScript', 'MUI'],
      github: 'https://github.com/yourusername/portfolio',
      demo: 'https://yourportfolio.com'
    },
    {
      id: 2,
      name: 'E-commerce Platform',
      description: 'A full-stack e-commerce platform with user authentication and payment processing',
      tech: ['React', 'Node.js', 'MongoDB'],
      github: 'https://github.com/yourusername/ecommerce',
      demo: 'https://yourecommerce.com'
    },
    {
      id: 3,
      name: 'Task Management App',
      description: 'A task management application with drag-and-drop functionality',
      tech: ['React', 'Redux', 'Firebase'],
      github: 'https://github.com/yourusername/taskmanager',
      demo: 'https://yourtaskmanager.com'
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

  return (
    <Box>
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
                src="/images/egecankahyaoglu.png"
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
      <Box sx={{ py: 10 }}>
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
      <Box sx={{ py: 10, bgcolor: '#f5f5f5' }}>
        <Container maxWidth="lg">
          <Typography variant="h3" fontWeight="bold" mb={1}>
            Recent Projects
          </Typography>
          <Divider sx={{ mb: 4 }} />
          
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
                        image={project.readmeImage || `https://opengraph.githubassets.com/1/egecan12/${project.name}`}
                        alt={project.name}
                        sx={{ objectFit: "cover" }}
                      />
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Typography variant="h5" component="div" fontWeight="bold" gutterBottom>
                          {project.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" paragraph>
                          {project.description || 'No description available'}
                        </Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
                          {project.language && (
                            <Chip 
                              key={project.language}
                              icon={<CodeIcon fontSize="small" />}
                              label={project.language}
                              size="small" 
                              color="primary"
                              variant="outlined"
                            />
                          )}
                          {project.topics && project.topics.map((topic) => (
                            <Chip 
                              key={topic} 
                              label={topic} 
                              size="small" 
                              variant="outlined"
                            />
                          ))}
                        </Box>
                        
                        {project.stargazers_count > 0 && (
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                            <StarIcon fontSize="small" sx={{ color: 'gold', mr: 0.5 }} />
                            <Typography variant="body2" color="text.secondary">
                              {project.stargazers_count}
                            </Typography>
                          </Box>
                        )}
                        {project.forks_count > 0 && (
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, ml: project.stargazers_count > 0 ? 2 : 0 }}>
                            <ForkRightIcon fontSize="small" sx={{ color: 'primary.main', mr: 0.5 }} />
                            <Typography variant="body2" color="text.secondary">
                              {project.forks_count}
                            </Typography>
                          </Box>
                        )}
                      </CardContent>
                      <CardActions>
                        <Button 
                          size="small" 
                          startIcon={<GitHubIcon />} 
                          href={project.html_url}
                          target="_blank"
                        >
                          Code
                        </Button>
                        {project.homepage && (
                          <Button 
                            size="small" 
                            startIcon={<OpenInNewIcon />} 
                            href={project.homepage}
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
                        <Button 
                          size="small" 
                          startIcon={<OpenInNewIcon />} 
                          href={project.demo}
                          target="_blank"
                        >
                          Demo
                        </Button>
                      </CardActions>
                    </Card>
                  </Box>
                ))
              )}
            </Box>
          )}
        </Container>
      </Box>

      {/* Articles Section */}
      <Box sx={{ py: 10 }}>
        <Container maxWidth="lg">
          <Typography variant="h3" fontWeight="bold" mb={1}>
            Articles
          </Typography>
          <Divider sx={{ mb: 4 }} />
          
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={4} flexWrap="wrap">
            {articles.map((article, index) => (
              <Box key={index} sx={{ width: { xs: '100%', md: 'calc(50% - 16px)' } }}>
                <Card>
                  <CardContent>
                    <Typography variant="overline" color="text.secondary">
                      {article.date}
                    </Typography>
                    <Typography variant="h5" component="div" fontWeight="bold" gutterBottom>
                      {article.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {article.description}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button 
                      size="small" 
                      endIcon={<ArrowForwardIcon />} 
                      href={article.link}
                      target="_blank"
                    >
                      Read Article
                    </Button>
                  </CardActions>
                </Card>
              </Box>
            ))}
          </Stack>
        </Container>
      </Box>

      {/* Contact Section */}
      <Box sx={{ py: 10, bgcolor: '#f5f5f5' }}>
        <Container maxWidth="lg">
          <Typography variant="h3" fontWeight="bold" mb={1}>
            Get In Touch
          </Typography>
          <Divider sx={{ mb: 4 }} />
          
          <Box sx={{ maxWidth: '700px', mx: 'auto', textAlign: 'center' }}>
            <Typography variant="body1" paragraph>
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
                startIcon={<EmailIcon />}
                sx={{ bgcolor: '#2c5364', '&:hover': { bgcolor: '#203a43' } }}
                href="mailto:your.email@example.com"
              >
                Email Me
              </Button>
              <Button 
                variant="outlined" 
                startIcon={<LinkedInIcon />}
                href="https://linkedin.com/in/yourusername"
            target="_blank"
              >
                LinkedIn
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
                href="https://linkedin.com/in/egecan12"
          target="_blank"
              >
                <LinkedInIcon />
              </IconButton>
              <IconButton 
                aria-label="email" 
                sx={{ color: 'white' }}
                href="mailto:egecankahyaoglu@gmail.com"
              >
                <EmailIcon />
              </IconButton>
            </Stack>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}