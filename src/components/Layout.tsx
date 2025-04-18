import { ReactNode } from 'react';
import { Link, usePathname } from '@/lib/i18n';
import { useTranslations } from 'next-intl';
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const t = useTranslations('Navigation');
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-background text-text">
      <header className="fixed top-0 w-full bg-background/80 backdrop-blur-sm z-50">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-xl font-bold">
              Egecan Kahyaoglu
            </Link>
            <div className="hidden md:flex space-x-6">
              <Link href="/about" className="hover:text-primary transition-colors">
                {t('about')}
              </Link>
              <Link href="/projects" className="hover:text-primary transition-colors">
                {t('projects')}
              </Link>
              <Link href="/articles" className="hover:text-primary transition-colors">
                {t('articles')}
              </Link>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex space-x-2">
              <Link href={pathname} locale="en" className="hover:text-primary transition-colors">
                🇬🇧
              </Link>
              <Link href={pathname} locale="de" className="hover:text-primary transition-colors">
                🇩🇪
              </Link>
            </div>
            <div className="flex space-x-4">
              <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                <FiGithub size={24} />
              </a>
              <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                <FiLinkedin size={24} />
              </a>
              <a href="mailto:your@email.com" className="hover:text-primary transition-colors">
                <FiMail size={24} />
              </a>
            </div>
          </div>
        </nav>
      </header>

      <main className="pt-20">
        {children}
      </main>

      <footer className="bg-background-light py-8 mt-16">
        <div className="container mx-auto px-4 text-center text-text-muted">
          <p>© {new Date().getFullYear()} Egecan Kahyaoglu. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
} 