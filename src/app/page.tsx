"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
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
  Paper,
} from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import Navbar from '@/components/Navbar';

export default function HomePage() {
  // const t = useTranslations('Index');
  
  // Demo project data - replace with your own
  const projects = [
    {
      title: 'Portfolio Website',
      description: 'A personal portfolio website built with Next.js and Material UI',
      tech: ['Next.js', 'TypeScript', 'MUI'],
      github: 'https://github.com/yourusername/portfolio',
      demo: 'https://yourportfolio.com'
    },
    {
      title: 'E-commerce Platform',
      description: 'A full-stack e-commerce platform with user authentication and payment processing',
      tech: ['React', 'Node.js', 'MongoDB'],
      github: 'https://github.com/yourusername/ecommerce',
      demo: 'https://yourecommerce.com'
    },
    {
      title: 'Task Management App',
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
          <Typography variant="h2" fontWeight="bold" mb={2}>
            Hello, I'm Egecan Kahyaoglu
          </Typography>
          <Typography variant="h5" mb={4} sx={{ maxWidth: '800px' }}>
            Frontend Developer & UI/UX Enthusiast
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
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
                Hello! I'm a passionate software developer with a focus on creating responsive and intuitive web applications. 
                With expertise in modern JavaScript frameworks and a background in computer science, 
                I enjoy solving complex problems and building user-friendly experiences.
              </Typography>
              <Typography variant="body1" paragraph>
                When I'm not coding, you'll find me exploring new technologies, contributing to open-source projects, 
                or sharing my knowledge through technical articles and tutorials. I believe in continuous learning 
                and staying updated with the latest industry trends.
              </Typography>
            </Box>
            
            <Box flex={1}>
              <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
                <Typography variant="h6" fontWeight="bold" mb={2}>
                  Skills & Technologies
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {['JavaScript', 'TypeScript', 'React', 'Next.js', 'Node.js', 'Express', 
                    'MongoDB', 'PostgreSQL', 'GraphQL', 'REST API', 'Git', 'CI/CD',
                    'HTML5', 'CSS3', 'Tailwind CSS', 'Material UI'].map((skill) => (
                    <Chip 
                      key={skill} 
                      label={skill} 
                      sx={{ m: 0.5 }}
                    />
                  ))}
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
          
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
            {projects.map((project, index) => (
              <Box 
                key={index} 
                sx={{ 
                  width: { 
                    xs: '100%', 
                    sm: 'calc(50% - 16px)', 
                    lg: 'calc(33.333% - 21.333px)' 
                  } 
                }}
              >
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h5" component="div" fontWeight="bold" gutterBottom>
                      {project.title}
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
            ))}
          </Box>
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
              © {new Date().getFullYear()} Your Name. All rights reserved.
            </Typography>
            
            <Stack direction="row" spacing={1}>
              <IconButton 
                aria-label="github" 
                sx={{ color: 'white' }}
                href="https://github.com/yourusername"
                target="_blank"
              >
                <GitHubIcon />
              </IconButton>
              <IconButton 
                aria-label="linkedin" 
                sx={{ color: 'white' }}
                href="https://linkedin.com/in/yourusername"
                target="_blank"
              >
                <LinkedInIcon />
              </IconButton>
              <IconButton 
                aria-label="email" 
                sx={{ color: 'white' }}
                href="mailto:your.email@example.com"
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