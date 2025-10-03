"use client";

import { 
  Box, 
  Container, 
  Typography, 
  Card, 
  CardContent, 
  CardActions,
  CardMedia,
  Button, 
  Paper,
  IconButton,
  Chip,
  CircularProgress
} from '@mui/material';
import Navbar from '@/components/Navbar';
import GitHubIcon from '@mui/icons-material/GitHub';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import FolderIcon from '@mui/icons-material/Folder';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { useState } from 'react';

const projects = [
  {
    id: 1,
    name: "Location Notebook",
    videoThumbnail: "",
    videoSource: "/videos/location-notebook.mp4",
    whyBuilt: "I developed Location Notebook to help people save and organize their favorite places around the world. Many travelers and locals struggle to remember great restaurants, parks, cafes they've discovered, so I wanted to create an intuitive platform where users can pin their favorite locations on a corkboard-style interface.",
    howBuilt: "I built this application using Angular and TypeScript for the frontend architecture. The project features a responsive corkboard design with pinned location cards, each containing coordinates, descriptions, and photos. I implemented efficient data binding and component-based architecture that Angular provides, along with TypeScript's strong typing for better development experience and code reliability.",
    githubLink: "https://github.com/egecan12/ReiseMerker",
    demoLink: "https://reisemerker-client-93ff.onrender.com",
      tech: ["#Angular", "#TypeScript", "#MEAN Stack", "#Docker"]
  },
  {
    id: 2,
    name: "Delights of Constantinepolis",
    videoThumbnail: "",
    videoSource: "/videos/delights-of-cons.mp4",
    whyBuilt: "This was my very first project, developed in 2019. I built it to learn JavaScript and DOM manipulation by creating a game from scratch with Phaser.js. Although the architecture is far from perfect, I’m happy that my first project still runs and brings back memories. It’s a meaningful milestone for me, showing how far I’ve come as a developer.",
    howBuilt: '',
    githubLink: "https://github.com/egecan12/PhaserJS-Delight-Fighter",
    demoLink: "https://web-game-delight-fighter.onrender.com/",
      tech: ["#JavaScript", "#HTML", "#PhaserJS", "#MongoDB"]
  },
  {
    id: 3,
    name: "Website Tracker Pro",
    videoThumbnail: "/images/web-tracking.png",
    whyBuilt: "I created this project to automate website monitoring for businesses. Many companies need real-time tracking of competitor websites and important updates without manual checking.",
    howBuilt: "I developed this using Node.js and Express.js backend with MongoDB for data storage. The system includes advanced web scraping algorithms, SMS notifications via Twilio, and Google Sheets integrationสำหรับ detailed reporting. I solved challenges with different website structures using adaptive parsing algorithms.",
    githubLink: "https://github.com/egecan12/Website-Monitoring-System",
    demoLink: "https://website-change-tracker.onrender.com",
      tech: ["#Node.js", "#Express.js", "#MongoDB", "#Twilio", "#Web Scraping"]
  },
  {
    id: 4,
    name: "AI Pokedex Hub",
    videoThumbnail: "/images/pokedex-ss.png",
    whyBuilt: "This project combines artificial intelligence with Pokemon recognition to create an interactive Pokedex experience. I wanted users to identify Pokemon instantly using their camera.",
    howBuilt: "Built with React and Next.js frontend, implementing custom AI models for real-time Pokemon detection. Used Tailwind CSS for styling and integrated Web APIs for camera access. Performance optimization was achieved through efficient image processing and lazy loading techniques.",
    githubLink: "https://github.com/egecan12/Ai-Integrated-Pokedex",
    demoLink: "https://egecan12.github.io/Ai-Integrated-Pokedex/",
      tech: ["#React", "#Next.js", "#AI/ML", "#Web APIs", "#Camera Integration"]
  }
];

// Grid layout için ayrı project verisi
const gridProjects = [
  {
    id: 1,
    name: 'Location Notebook',
    description: 'I developed Location Notebook to help people save and organize their favorite places around the world. Many travelers and locals struggle to remember great restaurants, parks, cafes they\'ve discovered, so I wanted to create an intuitive platform where users can pin their favorite locations on a corkboard-style interface.',
    tech: ['Angular', 'TypeScript', 'MEAN Stack', 'Docker'],
    github: 'https://github.com/egecan12/ReiseMerker',
    demo: 'https://reisemerker-client-93ff.onrender.com',
    readmeImage: '/images/note.png'
  },
  {
    id: 2,
    name: 'Delights of Constantinople v2',
    description: "This was my very first project, developed in 2019. I built it to learn JavaScript and DOM manipulation by creating a game from scratch with Phaser.js. Although the architecture is far from perfect, I'm happy for my first project still runs and brings back memories.",
    tech: ['JavaScript', 'HTML', 'PhaserJS', 'MongoDB'],
    github: 'https://github.com/egecan12/PhaserJS-Delight-Fighter',
    demo: 'https://web-game-delight-fighter.onrender.com/',
    readmeImage: '/images/delight-fighter.png'
  },
  {
    id: 3,
    name: 'Website Tracker Pro',
    description: 'I created this project to automate website monitoring for businesses. Many companies need real-time tracking of competitor websites and important updates without manual checking. The system includes SMS notifications and detailed reporting.',
    tech: ['Node.js', 'Express.js', 'MongoDB', 'Twilio', 'Web Scraping'],
    github: 'https://github.com/egecan12/Website-Monitoring-System',
    demo: 'https://website-change-tracker.onrender.com',
    readmeImage: '/images/web-tracking.png'
  },
  {
    id: 4,
    name: 'AI Pokedex Hub',
    description: 'This project combines artificial intelligence with Pokemon recognition to create an interactive Pokedex experience. I wanted users to identify Pokemon instantly using their camera.',
    tech: ['React', 'Next.js', 'AI/ML', 'Web APIs', 'Camera Integration'],
    github: 'https://github.com/egecan12/Ai-Integrated-Pokedex',
    demo: 'https://egecan12.github.io/Ai-Integrated-Pokedex/',
    readmeImage: '/images/pokedex-ss.png'
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

export default function ProjectsPage() {
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);

  const handlePrevious = () => {
    setCurrentProjectIndex((prevIndex) => 
      prevIndex === 0 ? projects.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentProjectIndex((prevIndex) => 
      prevIndex === projects.length - 1 ? 0 : prevIndex + 1
    );
  };

  const currentProject = projects[currentProjectIndex];

  return (
    <Box sx={{ backgroundColor: '#1a1a1a', minHeight: '100vh' }}>
      <Navbar />
      
      {/* Hero Section */}
      <Box
        sx={{
          py: 8,
          background: 'linear-gradient(to right, #0f2027, #203a43, #2c5364)',
          color: 'white'
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography 
              variant="h1" 
              fontWeight="bold" 
              mb={3}
              sx={{ 
                background: 'linear-gradient(45deg, #ffffff, #90caf9)', 
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontSize: { xs: '2.5rem', md: '4rem' }
              }}
            >
              My Projects
            </Typography>
            <Typography 
              variant="h5" 
              sx={{ 
                maxWidth: '600px', 
                mx: 'auto',
                opacity: 0.8,
                fontWeight: 300
              }}
            >
              A collection of my work, showcasing various technologies and solutions I've built
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Single Project Section */}
      <Box sx={{ py: 8, backgroundColor: '#2d3748', minHeight: 'calc(100vh - 400px)', position: 'relative', overflow: 'visible' }}>
        <Box sx={{ maxWidth: '1200px', mx: 'auto', px: 0, overflow: 'visible', position: 'relative' }}>
          {/* Modern Glassmorphism Navigation Arrows */}
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
              {projects.map((_, index) => (
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
                        backgroundImage: `url(${currentProject.videoThumbnail})`,
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
                  <Button
                    variant="contained"
                    href={currentProject.demoLink}
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
                  <Button
                    variant="outlined"
                    startIcon={<GitHubIcon />}
                    href={currentProject.githubLink}
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
                <Box sx={{ mb: 6 }}>
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
                      fontSize: '1rem',
                      mb: 2
                    }}
                  >
                    {currentProject.whyBuilt}
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
                    {currentProject.howBuilt}
                  </Typography>

                  {/* Technology Tags */}
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
                    {currentProject.tech.map((tech, techIndex) => (
                      <Box
                        key={techIndex}
                        sx={{
                          px: 3,
                          py: 1,
                          backgroundColor: '#4a5568',
                          borderRadius: 1,
                          border: '1px solid #718096'
                        }}
                      >
                        <Typography sx={{ color: '#e2e8f0', fontSize: '0.9rem' }}>
                          {tech}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </Box>
              </Box>
            </Box>
          </Paper>
        </Box>
      </Box>

      {/* Traditional Projects Grid Section */}
      <Box sx={{ py: 10, bgcolor: '#c98a02' }}>
        <Container maxWidth="lg">
          <Typography variant="h3" fontWeight="bold" mb={1} color="inherit">
            Recent Projects
          </Typography>
          <Typography variant="h6" mb={4} sx={{ opacity: 0.9, color: 'inherit' }}>
            Explore the complete collection of my hobby projects
          </Typography>
          
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
            {gridProjects.map((project) => (
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
            ))}
          </Box>
        </Container>
      </Box>
    </Box>
  );
}